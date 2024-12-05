import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET!;

export function signJwtAccessToken(payload: any) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '1d'
    });
}

export function verifyJwtToken(token: string) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch {
        return null;
    }
}
