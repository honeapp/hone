import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        const client = await clientPromise;
        const db = client.db();

        const userExists = await db.collection('users').findOne({
            $or: [
                { email: email.toLowerCase() },
                { "accounts.provider": "google", email: email.toLowerCase() },
                { "accounts.provider": "facebook", email: email.toLowerCase() }
            ]
        });

        return NextResponse.json({
            available: !userExists,
            message: userExists ? 'Email already registered' : 'Email available'
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to check email availability' },
            { status: 500 }
        );
    }
}
