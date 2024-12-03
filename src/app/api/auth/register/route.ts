import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
    try {
        await connectDB();
        
        const data = await req.json();
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

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            email,
            password: hashedPassword,
            fullName,
            dateOfBirth,
            gender,
            location,
            churchDenomination,
            maritalStatus,
            interests,
            occupation,
            about,
            photos,
            createdAt: new Date(),
            isVerified: false,
            profileCompleted: true
        });

        return NextResponse.json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        }, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Error registering user' },
            { status: 500 }
        );
    }
}