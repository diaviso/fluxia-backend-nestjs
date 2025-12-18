/*
  Warnings:

  - You are about to drop the column `fournisseur` on the `BonCommande` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "StatutBonCommande" ADD VALUE 'PARTIELLEMENT_LIVRE';

-- AlterTable
ALTER TABLE "BonCommande" DROP COLUMN "fournisseur",
ADD COLUMN     "fournisseurId" INTEGER,
ADD COLUMN     "statut" "StatutBonCommande" NOT NULL DEFAULT 'EN_ATTENTE';

-- AlterTable
ALTER TABLE "LigneBonCommande" ADD COLUMN     "quantiteRecue" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Fournisseur" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "raisonSociale" TEXT NOT NULL,
    "adresse" TEXT,
    "telephone" TEXT,
    "email" TEXT,
    "ice" TEXT,
    "rc" TEXT,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fournisseur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reception" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "bonCommandeId" INTEGER NOT NULL,
    "dateReception" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "livreur" TEXT,
    "observations" TEXT,
    "pvGenere" BOOLEAN NOT NULL DEFAULT false,
    "pvUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reception_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LigneReception" (
    "id" SERIAL NOT NULL,
    "receptionId" INTEGER NOT NULL,
    "ligneBonCommandeId" INTEGER NOT NULL,
    "quantiteRecue" INTEGER NOT NULL,
    "quantiteConforme" INTEGER NOT NULL,
    "quantiteNonConforme" INTEGER NOT NULL DEFAULT 0,
    "observations" TEXT,

    CONSTRAINT "LigneReception_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fournisseur_code_key" ON "Fournisseur"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Reception_numero_key" ON "Reception"("numero");

-- AddForeignKey
ALTER TABLE "BonCommande" ADD CONSTRAINT "BonCommande_fournisseurId_fkey" FOREIGN KEY ("fournisseurId") REFERENCES "Fournisseur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reception" ADD CONSTRAINT "Reception_bonCommandeId_fkey" FOREIGN KEY ("bonCommandeId") REFERENCES "BonCommande"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LigneReception" ADD CONSTRAINT "LigneReception_receptionId_fkey" FOREIGN KEY ("receptionId") REFERENCES "Reception"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LigneReception" ADD CONSTRAINT "LigneReception_ligneBonCommandeId_fkey" FOREIGN KEY ("ligneBonCommandeId") REFERENCES "LigneBonCommande"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
