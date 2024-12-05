import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { signJwtAccessToken } from '@/lib/jwt'
import { getServerSession } from "next-auth"
import { authOptions } from "../[...nextauth]/route"

export async function POST(req: Request) {
    try {
        const { email, otp } = await req.json()
        const client = await clientPromise
        const db = client.db()

        // Add logging to track the verification attempt
        console.log('Verifying OTP:', { email, otp })

        const user = await db.collection('users').findOne({
            email: email.toLowerCase(),
            verificationCode: otp,
            verificationExpires: { $gt: new Date() }
        })

        if (!user) {
            // Add logging for invalid attempts
            console.log('Invalid OTP attempt:', { email, otp })
            return NextResponse.json({
                success: false,
                message: 'Invalid or expired code'
            }, { status: 400 })
        }

        // Update user verification status
        await db.collection('users').updateOne(
            { _id: user._id },
            {
                $set: {
                    isVerified: true,
                    verificationCode: null,
                    verificationExpires: null,
                    lastLogin: new Date()
                }
            }
        )

        const token = signJwtAccessToken({
            id: user._id.toString(),
            email: user.email
        })

        return NextResponse.json({
            success: true,
            token,
            redirectPath: user.profileCompleted ? '/profile' : '/register',
            user: {
                id: user._id,
                email: user.email,
                profileCompleted: user.profileCompleted || false
            }
        })

    } catch (error) {
        console.error('Verification error:', error)
        return NextResponse.json({
            success: false,
            message: 'Verification failed'
        }, { status: 500 })
    }
}