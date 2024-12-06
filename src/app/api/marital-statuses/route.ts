import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db();
        const statuses = await db.collection('maritalStatuses').find().toArray();
        return NextResponse.json(statuses);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch marital statuses' }, { status: 500 });
    }
}
