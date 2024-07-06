/*
  Warnings:

  - A unique constraint covering the columns `[activationLink]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "activated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "activationLink" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_activationLink_key" ON "user"("activationLink");
