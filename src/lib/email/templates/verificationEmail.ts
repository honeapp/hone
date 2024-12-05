export const createVerificationEmailTemplate = (verificationLink: string) => `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h1 style="color: #100F0A; text-align: center;">Verify Your Email</h1>
        <p>Welcome to Heaven on Earth Connections! Please verify your email address to complete your registration.</p>
        <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" 
               style="background-color: #100F0A; color: white; padding: 12px 30px; text-decoration: none; border-radius: 12px; display: inline-block;">
                Verify Email
            </a>
        </div>
        <p style="color: #666; font-size: 14px;">This link will expire in 24 hours.</p>
    </div>
`;
