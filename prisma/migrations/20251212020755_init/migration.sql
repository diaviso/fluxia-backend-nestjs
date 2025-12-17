/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "StatutEB" AS ENUM ('BROUILLON', 'EN_ATTENTE', 'VALIDE', 'REFUSE', 'PRIS_EN_CHARGE');

-- CreateEnum
CREATE TYPE "TypeMatiere" AS ENUM ('MATERIEL', 'SERVICE', 'AUTRE');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "ExpressionDeBesoin" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statut" "StatutEB" NOT NULL DEFAULT 'BROUILLON',
    "commentaireValidation" TEXT,

    CONSTRAINT "ExpressionDeBesoin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LigneEB" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "quantite" INTEGER NOT NULL,
    "justification" TEXT NOT NULL,
    "matiereId" INTEGER NOT NULL,
    "ebId" INTEGER NOT NULL,

    CONSTRAINT "LigneEB_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Matiere" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "type" "TypeMatiere" NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Matiere_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Matiere_code_key" ON "Matiere"("code");

-- AddForeignKey
ALTER TABLE "LigneEB" ADD CONSTRAINT "LigneEB_matiereId_fkey" FOREIGN KEY ("matiereId") REFERENCES "Matiere"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LigneEB" ADD CONSTRAINT "LigneEB_ebId_fkey" FOREIGN KEY ("ebId") REFERENCES "ExpressionDeBesoin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
