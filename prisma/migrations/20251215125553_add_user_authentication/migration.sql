/*
  Warnings:

  - Added the required column `createurId` to the `ExpressionDeBesoin` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('AGENT', 'VALIDATEUR', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nom" TEXT,
    "prenom" TEXT,
    "photo" TEXT,
    "googleId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'AGENT',
    "division" TEXT,
    "service" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- Create a default system user for existing data
INSERT INTO "User" ("email", "nom", "prenom", "googleId", "role", "createdAt", "updatedAt")
VALUES ('system@expression.local', 'Système', 'Utilisateur', 'system-default', 'ADMIN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- AlterTable - Add column with default value first
ALTER TABLE "ExpressionDeBesoin" ADD COLUMN "createurId" INTEGER;

-- Update existing rows to use the system user
UPDATE "ExpressionDeBesoin" SET "createurId" = (SELECT id FROM "User" WHERE email = 'system@expression.local');

-- Make the column NOT NULL after setting values
ALTER TABLE "ExpressionDeBesoin" ALTER COLUMN "createurId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ExpressionDeBesoin" ADD CONSTRAINT "ExpressionDeBesoin_createurId_fkey" FOREIGN KEY ("createurId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
