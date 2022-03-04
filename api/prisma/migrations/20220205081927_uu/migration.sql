/*
  Warnings:

  - Added the required column `customerId` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PAID', 'OVERDUE', 'CANCEL');

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "customerId" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "status" "Status",
ADD COLUMN     "term" INTEGER;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
