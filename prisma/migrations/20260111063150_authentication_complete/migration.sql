/*
  Warnings:

  - You are about to drop the column `type` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `sessionToken` on the `session` table. All the data in the column will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emailVerified` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "account_providerId_accountId_key";

-- DropIndex
DROP INDEX "session_sessionToken_key";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "type",
ADD COLUMN     "scope" TEXT;

-- AlterTable
ALTER TABLE "session" DROP COLUMN "sessionToken";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "emailVerified" SET NOT NULL,
ALTER COLUMN "emailVerified" SET DEFAULT false;

-- DropTable
DROP TABLE "VerificationToken";
