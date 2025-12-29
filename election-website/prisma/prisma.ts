import { PrismaClient } from "@prisma/client";

type GlobalPrisma = typeof globalThis & { prisma?: PrismaClient };

const globalForPrisma = globalThis as GlobalPrisma;

// Reuse the Prisma client across hot reloads and connect once at startup.
const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (!globalForPrisma.prisma) {
	prisma
		.$connect()
		.then(() => console.log("✅[prisma] Connected to database"))
		.catch((err) => console.error("❌[prisma] Failed to connect to database", err));

	globalForPrisma.prisma = prisma;
}

export { prisma };