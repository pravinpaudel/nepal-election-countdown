/**
 * Email service for sending verification and notification emails
 * 
 * TODO: Configure with preferred email service: Resend, SendGrid, etc.
 */

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send verification email with token link
 */
export async function sendVerificationEmail(
  email: string,
  verificationToken: string
): Promise<void> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const verificationUrl = `${appUrl}/api/verify?token=${verificationToken}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .button { 
            display: inline-block; 
            padding: 12px 24px; 
            background-color: #0070f3; 
            color: white; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 20px 0;
          }
          .footer { margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>🗳️ Nepal Election Countdown - Verify Your Email</h2>
          <p>Thank you for subscribing to election updates!</p>
          <p>Please verify your email address by clicking the button below:</p>
          <a href="${verificationUrl}" class="button">Verify Email Address</a>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #0070f3;">${verificationUrl}</p>
          <p><strong>This link will expire in 24 hours.</strong></p>
          <div class="footer">
            <p>If you didn't request this, please ignore this email.</p>
            <p>Nepal Election Countdown Team</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
        Nepal Election Countdown - Verify Your Email

        Thank you for subscribing to election updates!

        Please verify your email address by visiting this link:
        ${verificationUrl}

        This link will expire in 24 hours.

        If you didn't request this, please ignore this email.

        Nepal Election Countdown Team
        `;

  await sendEmail({
    to: email,
    subject: "Verify your email - Nepal Election Countdown",
    html,
    text,
  });
}

/**
 * Send welcome email after successful verification
 */
export async function sendWelcomeEmail(email: string): Promise<void> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #0070f3; color: white; padding: 20px; border-radius: 5px; }
          .footer { margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🎉 Welcome to Nepal Election Countdown!</h2>
          </div>
          <p>Your email has been successfully verified!</p>
          <p>You'll now receive important updates and notifications about upcoming elections in Nepal.</p>
          <p>Stay informed and make your voice heard!</p>
          <div class="footer">
            <p>You can unsubscribe at any time from our emails.</p>
            <p>Nepal Election Countdown Team</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Welcome to Nepal Election Countdown!

Your email has been successfully verified!

You'll now receive important updates and notifications about upcoming elections in Nepal.

Stay informed and make your voice heard!

You can unsubscribe at any time from our emails.

Nepal Election Countdown Team
  `;

  await sendEmail({
    to: email,
    subject: "Welcome to Nepal Election Countdown! 🎉",
    html,
    text,
  });
}

/**
 * Core email sending function
 * 
 * TODO: Implement with email service provider
 * 
 */
async function sendEmail(options: EmailOptions): Promise<void> {
  // For development: Log email instead of sending
  if (process.env.NODE_ENV === "development") {
    console.log("\n📧 ===== EMAIL WOULD BE SENT =====");
    console.log("To:", options.to);
    console.log("Subject:", options.subject);
    console.log("Text:", options.text || "No text version");
    console.log("HTML Length:", options.html.length, "characters");
    console.log("================================\n");
    return;
  }
  
  // For now, throw an error in production to prevent silent failures
  throw new Error(
    "Email service not configured. Please set up Resend, SendGrid, or another email provider."
  );
}
