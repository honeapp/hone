import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import { getServerSession } from "next-auth"


const authHandler = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                otp: { label: "OTP", type: "text" }
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.otp) {
                        console.log('Missing credentials');
                        return null;
                    }
        
                    const client = await clientPromise;
                    const db = client.db();
        
                    // Add logging
                    console.log('Verifying OTP:', {
                        email: credentials.email,
                        otp: credentials.otp
                    });
        
                    const user = await db.collection('users').findOne({
                        email: credentials.email.toLowerCase(),
                        verificationCode: credentials.otp,
                        verificationExpires: { $gt: new Date() }
                    });
        
                    if (!user) {
                        console.log('User not found or invalid OTP');
                        return null;
                    }
        
                    // Update user before returning
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
                    );
        
                    // Add logging
                    console.log('User authenticated:', user._id);
        
                    return {
                        id: user._id.toString(),
                        email: user.email,
                        profileCompleted: user.profileCompleted
                    };
                } catch (error) {
                    console.error('Authorization error:', error);
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            allowDangerousEmailAccountLinking: true,
            profile(profile) {
                return {
                    id: profile.sub,
                    email: profile.email?.toLowerCase(), // Ensure email is lowercase
                    name: profile.name,
                    image: profile.picture,
                    emailVerified: profile.email_verified,
                    profileCompleted: false,
                    provider: 'google',
                    providerId: profile.sub
                };
            }
        }),
        
            FacebookProvider({
            clientId: process.env.FACEBOOK_ID!,
            clientSecret: process.env.FACEBOOK_SECRET!,
            profile(profile) {
                return {
                    id: profile.id,
                    email: profile.email,
                    name: profile.name,
                    image: profile.picture?.data?.url,
                    emailVerified: true,
                    profileCompleted: false
                };
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                const client = await clientPromise;
                const db = client.db();

                // Debug logging
                console.log('Google sign-in attempt:', { email: user.email });


                if (account?.provider === 'google' || account?.provider === 'facebook') {
                    const existingUser = await db.collection('users').findOne({
                        email: user.email?.toLowerCase()
                    });

                    if (existingUser) {
                        if (existingUser.profileCompleted) {
                            console.log('User already has completed profile');
                            return true; // Will redirect to /profile
                        }
                        return true; // Will redirect to /onboarding
                    }
    
        
                        // Create new user
                await db.collection('users').insertOne({
                    email: user.email?.toLowerCase(),
                        name: user.name,
                        image: user.image,
                        provider: 'google',
                        providerId: profile.sub,
                        emailVerified: true,
                        createdAt: new Date(),
                        profileCompleted: false,
                        isVerified: true,
                        lastLogin: new Date()
                });
                // Add welcome email for new Google/Facebook users
                try {
                    await sendWelcomeEmail(user.email!, user.name!);
                    console.log('Welcome email sent to social auth user:', user.email);
                } catch (emailError) {
                    console.error('Failed to send welcome email:', emailError);
                }
            }
            return true;
        
    } catch (error) {
        console.error('Sign in error:', error);
        return false;
    }
},
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.profileCompleted = user.profileCompleted;
                token.provider = user.provider;
            }
            return token;
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith(baseUrl)) {
                const client = await clientPromise;
                const db = client.db();
                const session = await getServerSession(authHandler);  // Pass the auth config
        
                if (session?.user?.email) {
                    const user = await db.collection('users').findOne({
                        email: session.user.email.toLowerCase()
                    });
        
                    if (!user?.profileCompleted) {
                        return `${baseUrl}/onboarding`;
                    }
                }
            }
            return url;
        },
    
            async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.profileCompleted = token.profileCompleted;
                session.user.provider = token.provider;
            }
            return session;
        }
    },
    pages: {
        signIn: '/auth/login',
        error: '/auth/error'
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60 // 30 days
    }
});

export { authHandler as GET, authHandler as POST };
