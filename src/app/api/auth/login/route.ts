import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { sendOTPEmail } from '@/lib/email/emailService';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const client = await clientPromise;
        const db = client.db();

        await db.collection('users').updateOne(
            { email: email.toLowerCase() },
            {
                $set: {
                    verificationCode: otp,
                    verificationExpires: new Date(Date.now() + 10 * 60 * 1000)
                }
            },
            { upsert: true }
        );

        await sendOTPEmail(email, otp);

        return NextResponse.json({ 
            success: true, 
            message: 'OTP sent successfully',
            email: email.toLowerCase()
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to send OTP' },
            { status: 500 }
        );
    }
}
