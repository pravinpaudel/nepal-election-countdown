-- CreateTable
CREATE TABLE "Subscribers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "verificationToken" TEXT,
    "tokenExpiresAt" TIMESTAMP(3),
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastEmailSent" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscribers_email_key" ON "Subscribers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Subscribers_verificationToken_key" ON "Subscribers"("verificationToken");
