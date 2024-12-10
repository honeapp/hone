export const getOTPTemplate = (otp: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #FBF8F1; padding: 40px 20px; border-radius: 16px;">
            <img src="https://your-logo-url.com" alt="Logo" style="width: 150px; margin: 0 auto 30px; display: block;">
            
            <h1 style="color: #100F0A; text-align: center; margin-bottom: 30px; font-size: 24px;">
                Verify Your Email
            </h1>
            
            <div style="background-color: white; padding: 30px; border-radius: 12px; text-align: center; margin: 20px 0;">
                <p style="font-size: 18px; color: #100F0A; margin-bottom: 20px;">
                    Your verification code is:
                </p>
                
                <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #100F0A; margin: 30px 0; background: #f5f5f5; padding: 15px; border-radius: 8px;">
                    ${otp}
                </div>
                
                <p style="color: #666; margin-top: 20px; font-size: 14px;">
                    This code will expire in 10 minutes.
                </p>
            </div>
            
            <p style="color: #666; text-align: center; font-size: 12px; margin-top: 30px;">
                If you didn't request this code, please ignore this email.
            </p>
        </div>
    </div>
`;
