-- CreateEnum
CREATE TYPE "StatutBonCommande" AS ENUM ('EN_ATTENTE', 'VALIDE', 'ANNULE', 'LIVRE');

-- CreateTable
CREATE TABLE "BonCommande" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "expressionId" INTEGER NOT NULL,
    "dateEmission" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fournisseur" TEXT,
    "adresseLivraison" TEXT,
    "tauxTVA" DOUBLE PRECISION NOT NULL DEFAULT 20.0,
    "remise" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "observations" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BonCommande_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LigneBonCommande" (
    "id" SERIAL NOT NULL,
    "bonCommandeId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "quantite" INTEGER NOT NULL,
    "prixUnitaire" DOUBLE PRECISION NOT NULL,
    "matiereCode" TEXT NOT NULL,
    "matiereNom" TEXT NOT NULL,
    "unite" TEXT NOT NULL,

    CONSTRAINT "LigneBonCommande_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BonCommande_numero_key" ON "BonCommande"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "BonCommande_expressionId_key" ON "BonCommande"("expressionId");

-- AddForeignKey
ALTER TABLE "BonCommande" ADD CONSTRAINT "BonCommande_expressionId_fkey" FOREIGN KEY ("expressionId") REFERENCES "ExpressionDeBesoin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LigneBonCommande" ADD CONSTRAINT "LigneBonCommande_bonCommandeId_fkey" FOREIGN KEY ("bonCommandeId") REFERENCES "BonCommande"("id") ON DELETE CASCADE ON UPDATE CASCADE;
