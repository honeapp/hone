import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json([]);
    }

    try {
        const client = await clientPromise;
        const db = client.db();
        
        const occupations = await db.collection('occupations')
            .find({ 
                title: { $regex: query, $options: 'i' }
            })
            .limit(5)
            .toArray();

        return NextResponse.json(occupations.map(o => o.title));
    } catch (error) {
        return NextResponse.json({ error: 'Failed to search occupations' }, { status: 500 });
    }
}
