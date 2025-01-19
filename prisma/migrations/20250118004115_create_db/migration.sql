/*
  Warnings:

  - Added the required column `synopsis` to the `Comic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comic` ADD COLUMN `artist` VARCHAR(191) NULL,
    ADD COLUMN `author` VARCHAR(191) NULL,
    ADD COLUMN `banner` VARCHAR(191) NULL,
    ADD COLUMN `dayChapterRelease` VARCHAR(191) NULL,
    ADD COLUMN `synopsis` VARCHAR(2000) NOT NULL,
    ADD COLUMN `thumbnail` VARCHAR(191) NULL,
    MODIFY `genreSecond` VARCHAR(191) NULL DEFAULT '';
