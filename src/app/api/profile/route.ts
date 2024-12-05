import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/app/api/auth/[...nextauth]/auth';

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const client = await clientPromise;
        const db = client.db();
        
        const userProfile = await db.collection('users').findOne(
            { email: session.user.email },
            {
                projection: {
                    password: 0,
                    verificationExpires: 0
                }
            }
        );

        return NextResponse.json(userProfile);
    } catch (error) {
        console.error('Profile fetch error:', error);
        return NextResponse.json(
            { message: 'Failed to fetch profile' },
            { status: 500 }
        );
    }
}
