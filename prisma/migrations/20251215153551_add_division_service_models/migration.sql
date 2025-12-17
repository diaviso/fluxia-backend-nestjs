/*
  Warnings:

  - You are about to drop the column `division` on the `ExpressionDeBesoin` table. All the data in the column will be lost.
  - You are about to drop the column `service` on the `ExpressionDeBesoin` table. All the data in the column will be lost.
  - You are about to drop the column `division` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `service` on the `User` table. All the data in the column will be lost.
  - Added the required column `divisionId` to the `ExpressionDeBesoin` table without a default value. This is not possible if the table is not empty.

*/

-- CreateTable Division
CREATE TABLE "Division" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "directeurId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Division_pkey" PRIMARY KEY ("id")
);

-- CreateTable Service
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "divisionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- Insert default division for existing data
INSERT INTO "Division" ("nom", "code", "createdAt", "updatedAt") 
VALUES ('Division par défaut', 'DEFAULT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert default service for existing data
INSERT INTO "Service" ("nom", "code", "divisionId", "createdAt", "updatedAt")
SELECT 'Service par défaut', 'DEFAULT', id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM "Division" WHERE "code" = 'DEFAULT';

-- Add new columns to User
ALTER TABLE "User" 
ADD COLUMN "actif" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "divisionId" INTEGER,
ADD COLUMN "serviceId" INTEGER;

-- Migrate User data: assign default division to existing users
UPDATE "User" 
SET "divisionId" = (SELECT id FROM "Division" WHERE "code" = 'DEFAULT')
WHERE "divisionId" IS NULL;

-- Add new columns to ExpressionDeBesoin
ALTER TABLE "ExpressionDeBesoin" 
ADD COLUMN "divisionId" INTEGER,
ADD COLUMN "serviceId" INTEGER;

-- Migrate ExpressionDeBesoin data: assign default division
UPDATE "ExpressionDeBesoin" 
SET "divisionId" = (SELECT id FROM "Division" WHERE "code" = 'DEFAULT')
WHERE "divisionId" IS NULL;

-- Now make divisionId NOT NULL
ALTER TABLE "ExpressionDeBesoin" 
ALTER COLUMN "divisionId" SET NOT NULL;

-- Drop old string columns
ALTER TABLE "ExpressionDeBesoin" 
DROP COLUMN "division",
DROP COLUMN "service";

ALTER TABLE "User" 
DROP COLUMN "division",
DROP COLUMN "service";

-- CreateIndex
CREATE UNIQUE INDEX "Division_nom_key" ON "Division"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "Division_code_key" ON "Division"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Division_directeurId_key" ON "Division"("directeurId");

-- CreateIndex
CREATE UNIQUE INDEX "Service_code_divisionId_key" ON "Service"("code", "divisionId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpressionDeBesoin" ADD CONSTRAINT "ExpressionDeBesoin_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpressionDeBesoin" ADD CONSTRAINT "ExpressionDeBesoin_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Division" ADD CONSTRAINT "Division_directeurId_fkey" FOREIGN KEY ("directeurId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
