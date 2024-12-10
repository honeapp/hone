type UserProfile = {
    id: string;
    email: string;
    name?: string;
    image?: string;
    emailVerified?: boolean;
    profileCompleted?: boolean;
    provider?: string;
}

type AuthError = {
    code: string;
    message: string;
}
