import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        const client = await clientPromise;
        const db = client.db();

        const existingUser = await db.collection('users').findOne({ 
            email: email.toLowerCase() 
        });

        return NextResponse.json({
            available: !existingUser
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Email check failed' },
            { status: 500 }
        );
    }
}
