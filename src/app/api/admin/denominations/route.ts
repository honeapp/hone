import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db();
        const denominations = await db.collection('denominations').find().toArray();
        return NextResponse.json(denominations);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch denominations' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { name } = await req.json();
        const client = await clientPromise;
        const db = client.db();
        
        await db.collection('denominations').insertOne({
            name,
            createdAt: new Date()
        });

        return NextResponse.json({ message: 'Denomination added successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add denomination' }, { status: 500 });
    }
}
