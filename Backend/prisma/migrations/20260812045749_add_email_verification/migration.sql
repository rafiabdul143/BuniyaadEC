-- CreateTable
CREATE TABLE "email_verifications" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "otp_hash" VARCHAR(255) NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "expires_at" TIMESTAMPTZ NOT NULL,
    "verified_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "email_verifications_user_id_expires_at_idx" ON "email_verifications"("user_id", "expires_at");

-- AddForeignKey
ALTER TABLE "email_verifications" ADD CONSTRAINT "email_verifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
