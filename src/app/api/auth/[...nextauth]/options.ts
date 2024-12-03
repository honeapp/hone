import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from '@/lib/mongodb-adapter'

export const options: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise, {
        databaseName: 'hoecweb'
    }),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            authorization: {
                params: {
                    prompt: "select_account",
                    access_type: "offline",
                    response_type: "code"
                }
            },
            profile(profile) {
                console.log('Google Profile Data:', profile);
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    profileCompleted: false
                }
            }
        })
    ],
    pages: {
        signIn: '/register',
        error: '/auth/error',
        newUser: '/onboarding'
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log('Sign In Callback:', { user, account, profile });
            return true;
        },
        async session({ session, user }) {
            console.log('Session Callback:', { session, user });
            if (session?.user) {
                session.user.id = user.id;
                session.user.profileCompleted = user.profileCompleted;
                if (!user.profileCompleted) {
                    session.user.redirect = '/onboarding';
                }
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            if (url.includes('/api/auth/callback')) {
                return `${baseUrl}/onboarding`;
            }
            if (url.startsWith(baseUrl)) {
                return url;
            }
            return baseUrl;
        }
    },
    session: {
        strategy: "database",
        maxAge: 30 * 24 * 60 * 60 // 30 days
    },
    debug: process.env.NODE_ENV === 'development'
}
