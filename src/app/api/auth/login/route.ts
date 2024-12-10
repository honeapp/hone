import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { sendOTPEmail } from '@/lib/email/emailService';
import { validateEmail, validatePhone } from '@/lib/utils/validation';

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_ATTEMPTS = 15;

export async function POST(req: Request) {
    try {
        const { email, phone } = await req.json();
        const identifier = email?.toLowerCase() || phone;

        // Input validation
        if (!identifier) {
            return NextResponse.json(
                { success: false, message: 'Email or phone is required' },
                { status: 400 }
            );
        }

        if (email && !validateEmail(email)) {
            return NextResponse.json(
                { success: false, message: 'Invalid email format' },
                { status: 400 }
            );
        }

        if (phone && !validatePhone(phone)) {
            return NextResponse.json(
                { success: false, message: 'Invalid phone format' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db();

        // Check rate limiting
        const attempts = await db.collection('loginAttempts').findOne({
            identifier,
            timestamp: { $gt: new Date(Date.now() - RATE_LIMIT_WINDOW) }
        });

        if (attempts && attempts.count >= MAX_ATTEMPTS) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: 'Too many attempts. Please try again later.' 
                },
                { status: 429 }
            );
        }

        // Generate and store OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const expiryTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Update user record
        await db.collection('users').updateOne(
            { [email ? 'email' : 'phone']: identifier },
            {
                $set: {
                    verificationCode: otp,
                    verificationExpires: expiryTime,
                    lastLoginAttempt: new Date()
                }
            },
            { upsert: true }
        );

        // Update rate limiting
        await db.collection('loginAttempts').updateOne(
            { identifier },
            {
                $inc: { count: 1 },
                $set: { timestamp: new Date() }
            },
            { upsert: true }
        );

        // Send OTP
        if (email) {
            await sendOTPEmail(email, otp);
        } else {
            // Implement SMS sending here
            // await sendOTPSMS(phone, otp);
        }

        return NextResponse.json({
            success: true,
            message: 'OTP sent successfully',
            identifier
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Failed to send OTP',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}
