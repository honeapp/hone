import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';
import { v2 as cloudinary } from 'cloudinary';
import { sendWelcomeEmail } from '@/lib/email/emailService';

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
        console.log('Registration attempt:', data.email);

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
        const userExists = await db.collection('users').findOne({
            $or: [
                { email: data.email.toLowerCase() },
                { "accounts.provider": "google", email: data.email.toLowerCase() },
                { "accounts.provider": "facebook", email: data.email.toLowerCase() }
            ]
        });
        
        console.log('Existing user check:', userExists);

        if (userExists) {
            console.log('User exists:', userExists);

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
        const newUser = await db.collection('users').insertOne({
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
            profileCompleted: true,
            lastActive: new Date()
        });

        // Send welcome email
        await sendWelcomeEmail(email, fullName);

        return NextResponse.json({
            message: 'Registration successful. Please check your email.',
            user: {
                id: newUser.insertedId,
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
