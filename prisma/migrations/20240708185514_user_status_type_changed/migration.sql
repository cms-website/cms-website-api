/*
  Warnings:

  - Changed the type of `status` on the `Users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "userStatus" AS ENUM ('INACTIVE', 'ACTIVE', 'DELETED', 'BLOCKED');

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "status",
ADD COLUMN     "status" "userStatus" NOT NULL;
