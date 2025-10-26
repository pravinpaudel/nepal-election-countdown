import { prisma } from "../../prisma/prisma";
import type { Prisma } from "@prisma/client";

/**
 * Repository responsible for CRUD operations on the `Subscribers` table.
 *
 * This class provides a thin data-access layer around the Prisma client so the
 * rest of the application can depend on a small, well-documented API instead
 * of direct Prisma calls.
 */
export class SubscriberRepository {
    /**
     * Find a subscriber by their email address.
     *
     * Inputs:
     * - email: subscriber's email (case-sensitive as stored; caller should
     *   normalize if needed)
     *
     * Returns:
     * - Promise resolving to the subscriber record or `null` if not found.
     *
     * Error modes / side effects:
     * - Propagates any Prisma errors (e.g. connection issues).
     */
    async findByEmail(email: string) {
        return prisma.subscribers.findUnique({
            where: { email },
        });
    }

    /**
     * Find a subscriber by their verification token.
     *
     * Inputs:
     * - token: verification token (string) previously generated and stored on the
     *   subscriber record.
     *
     * Returns:
     * - Promise resolving to the subscriber record or `null` if not found.
     *
     * Use case:
     * - Used during verification flows to locate the pending subscriber.
     */
    async findByVerificationToken(token: string) {
        return prisma.subscribers.findUnique({
            where: { verificationToken: token },
        });
    }

    /**
     * Create a new subscriber record.
     *
     * Inputs (data object):
     * - email: string - subscriber email (should be unique)
     * - verificationToken: string | null - token for email verification
     * - tokenExpiresAt: Date | null - token expiration timestamp
     * - isVerified: boolean - whether the email has been verified
     * - isActive: boolean - soft-delete flag (true when subscribed/active)
     * - lastEmailSent: Date | null - timestamp of the last outgoing email
     *
     * Returns:
     * - Promise resolving to the created subscriber record.
     *
     * Error modes / side effects:
     * - Will throw on unique constraint violations (duplicate email or token).
     */
    async create(data: {
        email: string;
        verificationToken: string;
        tokenExpiresAt: Date;
        isVerified: boolean;
        isActive: boolean;
        lastEmailSent: Date;
    }) {
        return prisma.subscribers.create({ data });
    }

    /**
     * Update a subscriber by `id`.
     *
     * Inputs:
     * - id: string - primary key of the subscriber record
     * - data: Prisma.SubscribersUpdateInput - partial update data (Prisma input
     *   type)
     *
     * Returns:
     * - Promise resolving to the updated subscriber record.
     *
     * Error modes / side effects:
     * - Throws if the record does not exist or on database errors.
     */
    async update(id: string, data: Prisma.SubscribersUpdateInput) {
        return prisma.subscribers.update({
            where: { id },
            data,
        });
    }

    /**
     * Update a subscriber by their email address.
     *
     * Inputs:
     * - email: string - unique email used to find the subscriber
     * - data: Prisma.SubscribersUpdateInput - fields to update
     *
     * Returns:
     * - Promise resolving to the updated subscriber record.
     *
     */
    async updateByEmail(email: string, data: Prisma.SubscribersUpdateInput) {
        return prisma.subscribers.update({
            where: { email },
            data,
        });
    }
}