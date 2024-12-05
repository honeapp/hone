import nodemailer from 'nodemailer';
import { createVerificationEmailTemplate } from './templates/verificationEmail';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: true,
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

export const sendVerificationEmail = async (userId: string, email: string) => {
    try {
        console.log('Initiating verification email send to:', email);
        
        const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify?token=${userId}`;
        
        const mailOptions = {
            from: {
                name: 'Heaven on Earth Connections',
                address: process.env.EMAIL_FROM!
            },
            to: email,
            subject: 'Verify your Heaven on Earth Connections account',
            html: createVerificationEmailTemplate(verificationUrl),
            text: `Please verify your email by clicking: ${verificationUrl}`,
            headers: {
                'X-Priority': '1',
                'X-MSMail-Priority': 'High'
            }
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully:', info.messageId);
        
        return userId;
    } catch (error) {
        console.error('Failed to send verification email:', error);
        throw new Error('Failed to send verification email');
    }
};

// Verify transporter connection
transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP connection error:', error);
    } else {
        console.log('SMTP server is ready to send emails');
    }
});
