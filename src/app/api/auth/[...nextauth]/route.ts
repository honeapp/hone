import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from '@/lib/mongodb-adapter'

const handler = NextAuth({
    adapter: MongoDBAdapter(clientPromise, {
        databaseName: 'hoecweb'
    }),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
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
        }),
    ],
    session: {
        strategy: "database",
        maxAge: 30 * 24 * 60 * 60 // 30 days
    },
    debug: process.env.NODE_ENV === 'development',
    pages: {
        signIn: '/register',
        newUser: '/onboarding'
    },
    events: {
        async signIn(message) {
            console.log('Sign In Event:', message);
        },
        async createUser(message) {
            console.log('Create User Event:', message);
        },
        async error(message) {
            console.error('Auth Error Event:', message);
        }
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
                session.user.profileCompleted = user.profileCompleted || false;
            }
            return session;
        },
        async jwt({ token, user, account }) {
            console.log('JWT Callback:', { token, user, account });
            return token;
        }
    }
})

export { handler as GET, handler as POST }
