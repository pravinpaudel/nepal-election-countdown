import { prisma } from "../../prisma/prisma";
import type { Prisma } from "@prisma/client";

export class SubscriberRepository {
    async findByEmail(email: string) {
        return prisma.subscribers.findUnique({
            where: { email }
        });
    }

    async findByVerificationToken(token: string) {
        return prisma.subscribers.findUnique({
            where: { verificationToken: token }
        });
    }

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

    async update(id: string, data: Prisma.SubscribersUpdateInput) {
        return prisma.subscribers.update({
            where: { id },
            data
        });
    }

    async updateByEmail(email: string, data: Prisma.SubscribersUpdateInput) {
        return prisma.subscribers.update({
            where: { email },
            data
        });
    }
}