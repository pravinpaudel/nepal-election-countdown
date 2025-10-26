import { randomUUID } from "crypto";
import { SubscriberRepository } from "../repositories/subscriberRepository";
import { sendVerificationEmail, sendWelcomeEmail } from "../lib/email";
import { SubscribeResponse, VerifyResponse } from "../types/subscriber";

export class SubscriberService {
    private repository: SubscriberRepository;

    constructor() {
        this.repository = new SubscriberRepository();
    }

    async subscribe(email: string) {
        // Validate email format
        if (!this.isValidEmail(email)) {
            throw new Error("Invalid email format");
        }

        // Normalize email
        const normalizedEmail = email.toLowerCase().trim();

        // Check existing subscriber
        const existingSubscriber = await this.repository.findByEmail(normalizedEmail);

        // If verified & active -> Error
        if (existingSubscriber?.isVerified && existingSubscriber?.isActive) {
            throw new Error("This email is already subscribed to our updates");
        }

        // If verified but inactive -> Reactivate
        if (existingSubscriber?.isVerified && !existingSubscriber?.isActive) {
            const updated = await this.repository.update(existingSubscriber.id, {
                isActive: true,
                updatedAt: new Date(),
            });
            
            await sendWelcomeEmail(normalizedEmail);
            return {
                success: true,
                message: "Welcome back! Your subscription has been reactivated.",
                email: normalizedEmail,
                isVerified: true,
                isActive: true
            };
        }

        // Generate verification data
        const verificationToken = randomUUID();
        const tokenExpiresAt = new Date();
        tokenExpiresAt.setHours(tokenExpiresAt.getHours() + 24);

        // If unverified -> Update token
        if (existingSubscriber && !existingSubscriber.isVerified) {
            const updated = await this.repository.update(existingSubscriber.id, {
                verificationToken,
                tokenExpiresAt,
                lastEmailSent: new Date(),
                updatedAt: new Date(),
            });

            await sendVerificationEmail(normalizedEmail, verificationToken);
            return {
                success: true,
                message: "Verification email resent! Please check your inbox and verify your email address.",
                email: normalizedEmail,
                isVerified: false
            };
        }

        // New subscriber
        const subscriber = await this.repository.create({
            email: normalizedEmail,
            verificationToken,
            tokenExpiresAt,
            isVerified: false,
            isActive: false,
            lastEmailSent: new Date(),
        });

        await sendVerificationEmail(normalizedEmail, verificationToken);

        return {
            success: true,
            message: "Subscription initiated! Please check your email to verify your address.",
            email: normalizedEmail,
            isVerified: false,
            isActive: false
        };
    }

    async verify(token: string) {
        if (!token) {
            throw new Error("Verification token is required");
        }

        const subscriber = await this.repository.findByVerificationToken(token);

        if (!subscriber || !subscriber.tokenExpiresAt || subscriber.tokenExpiresAt < new Date()) {
            throw new Error("Invalid or expired verification token");
        }

        const updated = await this.repository.update(subscriber.id, {
            isVerified: true,
            isActive: true,
            verificationToken: null,
            tokenExpiresAt: null,
            updatedAt: new Date()
        });

        return {
            success: true,
            message: "Subscriber verified successfully",
            isVerified: true
        };
    }
    
    /**
     * Unsubscribe email from updates
     * 
     * @param email String
     * @returns A JSON object indicating success status and message
     * 
     * @example
     * {
     *   success: boolean;
     *   message: string;
     * }
     */
    async unsubscribe(email: string) {
        if (!this.isValidEmail(email)) {
            throw new Error("Invalid email format");
        }

        const normalizedEmail = email.toLowerCase().trim();
        const subscriber = await this.repository.findByEmail(normalizedEmail);

        if(subscriber && subscriber.isActive) {
            await this.repository.updateByEmail(normalizedEmail, {
                isActive: false,
                updatedAt: new Date()
            });
        }

        return {
            success: true,
            message: "You have been unsubscribed successfully.",
        }
    }

    /**
     * Check if email address is valid
     * @param email String
     * @returns Boolean
     */
    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}