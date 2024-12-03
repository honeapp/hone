import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from '@/lib/mongodb-adapter'

export const options: NextAuthOptions = {
  try {


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
            // Check if this is a new user from Google
            const existingUser = await User.findOne({ email: user.email });

console.log("step 1",existingUser);
            if (!existingUser && account?.provider === 'google') {
                user.profileCompleted = false;
                console.log("step 2",account?.provider);
            }
            return true;
        },
        async session({ session, user }) {
            if (session?.user) {
              console.log("step 3",session?.user);
                session.user.id = user.id;
                session.user.profileCompleted = user.profileCompleted;
                if (!user.profileCompleted) {
                  console.log("step 4",user);
                    session.user.redirect = '/onboarding';
                }
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Force redirect to onboarding for new users
            if (!url.includes('/onboarding')) {
                return `${baseUrl}/onboarding`
            }
            return url
        }
    },
    session: {
        strategy: "database",
        maxAge: 30 * 24 * 60 * 60 // 30 days
    },
    debug: process.env.NODE_ENV === 'development'
  } catch (error) {
    console.log("error", error);

  }
}
