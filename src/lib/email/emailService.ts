import nodemailer from 'nodemailer';

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

export const sendOTPEmail = async (email: string, otp: string) => {
    try {
        console.log('Initiating OTP email send to:', email);
        
        const mailOptions = {
            from: {
                name: 'Heaven on Earth Connections',
                address: process.env.EMAIL_FROM!
            },
            to: email,
            subject: 'Your Heaven on Earth Connections Verification Code',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #100F0A; text-align: center; margin-bottom: 30px;">Verify Your Email</h1>
                    <div style="background-color: #FBF8F1; padding: 30px; border-radius: 12px; text-align: center;">
                        <p style="font-size: 18px; color: #100F0A; margin-bottom: 20px;">Your verification code is:</p>
                        <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #100F0A; margin: 30px 0;">
                            ${otp}
                        </div>
                        <p style="color: #666; margin-top: 20px;">This code will expire in 10 minutes.</p>
                    </div>
                </div>
            `,
            headers: {
                'X-Priority': '1',
                'X-MSMail-Priority': 'High'
            }
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully:', info.messageId);
        
        return true;
    } catch (error) {
        console.error('Failed to send OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
};

// Keep the transporter verification
transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP connection error:', error);
    } else {
        console.log('SMTP server is ready to send emails');
    }
});
