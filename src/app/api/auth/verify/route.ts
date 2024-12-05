import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: Request) {
    try {
        console.log('Starting email verification process');
        
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token');
        
        if (!token) {
            console.log('Verification failed: No token provided');
            return NextResponse.json({
                message: 'Verification token is required'
            }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();
        console.log('Connected to database');
        
        const user = await db.collection('users').findOne({
            _id: new ObjectId(token),
            isVerified: false,
            verificationExpires: { $gt: new Date() }
        });

        if (!user) {
            console.log('Verification failed: Invalid or expired token');
            return NextResponse.json({
                message: 'Invalid or expired verification link'
            }, { status: 400 });
        }

        console.log('Valid user found, proceeding with verification');

        await db.collection('users').updateOne(
            { _id: new ObjectId(token) },
            {
                $set: {
                    isVerified: true,
                    verificationExpires: null,
                    updatedAt: new Date()
                }
            }
        );

        console.log('User verified successfully');
        return NextResponse.redirect(new URL('/auth/verified', req.url));

    } catch (error) {
        console.error('Detailed verification error:', error);
        return NextResponse.json({
            message: 'Verification failed',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
