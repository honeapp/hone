import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';
import { sendVerificationEmail } from '@/lib/email/emailService';
import { v2 as cloudinary } from 'cloudinary';
import { sendVerificationEmail } from '@/lib/email/emailService';


cloudinary.config({
    cloud_name: 'db8lnhf7s',
    api_key: '957638428478796',
    api_secret: 'F4_aX5gMi_wGuSlhQGDgoGc9dAQ'
});

export async function POST(req: Request) {
    try {
        const client = await clientPromise;
        const db = client.db();
        
        const data = await req.json();
        console.log('Received registration data:', data);

        const {
            email,
            password,
            fullName,
            dateOfBirth,
            gender,
            location,
            churchDenomination,
            maritalStatus,
            interests,
            occupation,
            about,
            photos
        } = data;

        // Validate all required fields
        const requiredFields = {
            email,
            password,
            fullName,
            dateOfBirth,
            gender,
            location,
            churchDenomination,
            maritalStatus,
            occupation
        };

        for (const [field, value] of Object.entries(requiredFields)) {
            if (!value) {
                return NextResponse.json(
                    { message: `${field} is required` },
                    { status: 400 }
                );
            }
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Check if user exists
        const userExists = await db.collection('users').findOne({ email: email.toLowerCase() });
        if (userExists) {
            return NextResponse.json(
                { message: 'Email already registered' },
                { status: 400 }
            );
        }

        // Validate password strength
        if (password.length < 8) {
            return NextResponse.json(
                { message: 'Password must be at least 8 characters long' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user with the existing structure
        const user = await db.collection('users').insertOne({
            email: email.toLowerCase(),
            password: hashedPassword,
            fullName,
            dateOfBirth: new Date(dateOfBirth),
            gender,
            location,
            churchDenomination,
            maritalStatus,
            interests: interests || [],
            occupation,
            about: about || '',
            photos: photos || [],
            createdAt: new Date(),
            isVerified: false,
            verificationExpires: new Date(+new Date() + 24 * 60 * 60 * 1000),
            profileCompleted: true,
            lastActive: new Date()
        });

        // Send verification email
        await sendVerificationEmail(user.insertedId.toString(), email);

        return NextResponse.json({
            message: 'Registration successful. Please check your email to verify your account.',
            user: {
                id: user.insertedId,
                email: email,
                fullName: fullName
            }
        }, { status: 201 });

    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json(
            {
                message: 'Registration failed',
                error: error.message
            },
            { status: 500 }
        );
    }
}