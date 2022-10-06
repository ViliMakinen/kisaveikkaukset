/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tournament` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserGroupPredictions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GroupToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_tournamentId_fkey";

-- DropForeignKey
ALTER TABLE "UserGroupPredictions" DROP CONSTRAINT "UserGroupPredictions_groupId_fkey";

-- DropForeignKey
ALTER TABLE "UserGroupPredictions" DROP CONSTRAINT "UserGroupPredictions_userId_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToUser" DROP CONSTRAINT "_GroupToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToUser" DROP CONSTRAINT "_GroupToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "groups" TEXT[],
ADD COLUMN     "lastName" TEXT NOT NULL;

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "Tournament";

-- DropTable
DROP TABLE "UserGroupPredictions";

-- DropTable
DROP TABLE "_GroupToUser";
