/*
  Warnings:

  - You are about to drop the column `role` on the `Invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "role" "Role"[];
