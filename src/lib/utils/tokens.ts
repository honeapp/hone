import crypto from 'crypto';
import VerificationToken from '@/models/VerificationToken';

export const generateVerificationToken = async (userId: string) => {
    const token = crypto.randomBytes(32).toString('hex');
    
    await VerificationToken.create({
        userId,
        token,
        createdAt: new Date()
    });
    
    return token;
};
