import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
    try {
        const { otp } = await req.json();
        const client = await clientPromise;
        const db = client.db();

        // Verify OTP logic here
        const user = await db.collection('users').findOne({
            verificationCode: otp,
            verificationExpires: { $gt: new Date() }
        });

        if (!user) {
            return NextResponse.json({ message: 'Invalid or expired code' }, { status: 400 });
        }

        // Update user verification status
        await db.collection('users').updateOne(
            { _id: user._id },
            { 
                $set: { 
                    isVerified: true,
                    verificationCode: null,
                    verificationExpires: null
                }
            }
        );

        return NextResponse.json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error('OTP verification error:', error);
        return NextResponse.json({ message: 'Verification failed' }, { status: 500 });
    }
}
