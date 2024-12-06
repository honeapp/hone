import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db();
        const interests = await db.collection('interests').find().toArray();
        return NextResponse.json(interests);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch interests' }, { status: 500 });
    }
}
