/*
  Warnings:

  - A unique constraint covering the columns `[proof_id]` on the table `Startup` will be added. If there are existing duplicate values, this will fail.
  - Made the column `proof_id` on table `Startup` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Startup" ALTER COLUMN "proof_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Startup_proof_id_key" ON "Startup"("proof_id");
