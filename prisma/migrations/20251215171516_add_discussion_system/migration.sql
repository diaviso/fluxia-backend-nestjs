/*
  Warnings:

  - You are about to drop the column `commentaireValidation` on the `ExpressionDeBesoin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ExpressionDeBesoin" DROP COLUMN "commentaireValidation";

-- CreateTable
CREATE TABLE "Discussion" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "auteurId" INTEGER NOT NULL,
    "expressionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Discussion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Discussion_expressionId_idx" ON "Discussion"("expressionId");

-- CreateIndex
CREATE INDEX "Discussion_auteurId_idx" ON "Discussion"("auteurId");

-- AddForeignKey
ALTER TABLE "Discussion" ADD CONSTRAINT "Discussion_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussion" ADD CONSTRAINT "Discussion_expressionId_fkey" FOREIGN KEY ("expressionId") REFERENCES "ExpressionDeBesoin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
