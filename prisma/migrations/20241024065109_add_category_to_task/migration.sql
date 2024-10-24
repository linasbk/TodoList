/*
  Warnings:

  - Added the required column `category` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TaskCategory" AS ENUM ('Sport', 'Work', 'Personal', 'Activities');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "category" "TaskCategory" NOT NULL;
