/**
 * Email service for sending verification and notification emails using SMTP
 * 
 * 
 * Configuration via environment variables:
 * - SMTP_HOST: SMTP server host (e.g., smtp.gmail.com)
 * - SMTP_PORT: SMTP server port (587 for TLS, 465 for SSL, 25 for unencrypted)
 * - SMTP_USER: SMTP username (usually your email)
 * - SMTP_PASS: SMTP password or app-specific password
 * - SMTP_FROM: From email address
 * - SMTP_SECURE: "true" for SSL (port 465), "false" for TLS/STARTTLS (port 587)
 */
// src/lib/email.ts
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Create and cache the SMTP transporter
 * Only created once per process to reuse connections
 */
let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (transporter) {
    return transporter;
  }

  // For development without SMTP configured, log to console instead
  const isDevMode = process.env.NODE_ENV === "development" || !process.env.NODE_ENV;
  const hasSmtpConfig = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

  if (isDevMode && !hasSmtpConfig) {
    console.warn(
      "⚠️  SMTP not configured. Emails will be logged to console only."
    );
    console.warn(
      "   Set SMTP_* environment variables to send real emails."
    );
    
    // Return a dummy transporter that logs instead of sending
    transporter = nodemailer.createTransport({
      jsonTransport: true,
    }) as Transporter;
    
    // Override sendMail for logging
    transporter.sendMail = async (mailOptions: nodemailer.SendMailOptions) => {
      console.log("\n📧 ===== EMAIL (DEVELOPMENT MODE - NOT SENT) =====");
      console.log("From:", mailOptions.from);
      console.log("To:", mailOptions.to);
      console.log("Subject:", mailOptions.subject);
      console.log("Text:", mailOptions.text || "No text version");
      console.log("HTML Length:", mailOptions.html || 0, "characters");
      console.log("================================================\n");
      // Return a shape compatible with nodemailer.SentMessageInfo
      return ({ messageId: "dev-mode-no-email" } as unknown) as nodemailer.SentMessageInfo;
    };
    return transporter;
  }

  // Production or development with SMTP configured
  const smtpConfig = {
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true for 465 (SSL), false for 587 (TLS)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };

  // Validate required config
  if (!smtpConfig.host || !smtpConfig.auth.user || !smtpConfig.auth.pass) {
    throw new Error(
      "SMTP configuration incomplete. Please set SMTP_HOST, SMTP_USER, and SMTP_PASS environment variables."
    );
  }

  transporter = nodemailer.createTransport(smtpConfig);

  // Verify connection on first use
  transporter.verify((error, success) => {
    if (error) {
      console.error("❌ SMTP connection failed:", error);
    } else {
      console.log("✅ SMTP server is ready to send emails");
    }
  });

  return transporter;
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
          <h2>Nepal Election Countdown - Verify Your Email</h2>
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
            <h2>Welcome to Nepal Election Countdown!</h2>
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
 * Core email sending function using SMTP
 * 
 * Sends email via configured SMTP server or logs to console in development
 * if SMTP is not configured.
 */
async function sendEmail(options: EmailOptions): Promise<void> {
  const transporter = getTransporter();
  
  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@example.com",
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw new Error(`Email sending failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
