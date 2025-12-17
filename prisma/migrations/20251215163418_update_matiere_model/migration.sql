/*
  Warnings:

  - The values [MATERIEL,SERVICE,AUTRE] on the enum `TypeMatiere` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `nom` on the `Matiere` table. All the data in the column will be lost.
  - Added the required column `categorie` to the `Matiere` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designation` to the `Matiere` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unite` to the `Matiere` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Matiere` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategorieMatiere" AS ENUM ('INFORMATIQUE', 'MOBILIER', 'FOURNITURE', 'VEHICULE', 'EQUIPEMENT', 'MATERIEL_MEDICAL', 'PRODUIT_ENTRETIEN', 'PAPETERIE', 'AUTRE');

-- CreateEnum
CREATE TYPE "UniteMesure" AS ENUM ('PIECE', 'LOT', 'BOITE', 'PAQUET', 'KG', 'GRAMME', 'LITRE', 'MILLILITRE', 'METRE', 'METRE_CARRE', 'CARTON', 'PALETTE');

-- AlterEnum
BEGIN;
CREATE TYPE "TypeMatiere_new" AS ENUM ('CONSOMMABLE', 'DURABLE');
ALTER TABLE "Matiere" ALTER COLUMN "type" TYPE "TypeMatiere_new" USING ("type"::text::"TypeMatiere_new");
ALTER TYPE "TypeMatiere" RENAME TO "TypeMatiere_old";
ALTER TYPE "TypeMatiere_new" RENAME TO "TypeMatiere";
DROP TYPE "public"."TypeMatiere_old";
COMMIT;

-- AlterTable
ALTER TABLE "Matiere" DROP COLUMN "nom",
ADD COLUMN     "actif" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "categorie" "CategorieMatiere" NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "designation" TEXT NOT NULL,
ADD COLUMN     "seuilAlerte" INTEGER,
ADD COLUMN     "unite" "UniteMesure" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "valeurUnitaire" DOUBLE PRECISION;
