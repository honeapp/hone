import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import clientPromise from "@/lib/mongodb"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                otp: { label: "OTP", type: "text" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.otp) return null
                
                const client = await clientPromise
                const db = client.db()
                
                const user = await db.collection('users').findOne({
                    email: credentials.email.toLowerCase(),
                    isVerified: true,
                    verificationCode: null
                })

                if (!user) return null

                return {
                    id: user._id.toString(),
                    email: user.email,
                    profileCompleted: user.profileCompleted
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.profileCompleted = user.profileCompleted
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
                session.user.profileCompleted = token.profileCompleted
            }
            return session
        }
    },
    pages: {
        signIn: '/auth/login',
        error: '/auth/error'
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    }
})

export { handler as GET, handler as POST }