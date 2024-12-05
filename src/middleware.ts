import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server'
import { verifyJwtToken } from '@/lib/jwt'

export default withAuth({
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        authorized: ({ req, token }) => {
            // Check for NextAuth token
            if (token) return true

            // Check for custom JWT token
            const authToken = req.cookies.get('auth_token')
            if (authToken && verifyJwtToken(authToken.value)) return true

            return false
        }
    }
})

export const config = {
    matcher: [
        "/profile/:path*",
        "/dashboard/:path*",
    ]
}
