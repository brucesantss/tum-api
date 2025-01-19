/*
  Warnings:

  - You are about to drop the `_comictouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_comictouser` DROP FOREIGN KEY `_ComicToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_comictouser` DROP FOREIGN KEY `_ComicToUser_B_fkey`;

-- AlterTable
ALTER TABLE `comic` MODIFY `artist` VARCHAR(191) NULL DEFAULT '',
    MODIFY `author` VARCHAR(191) NULL DEFAULT '';

-- DropTable
DROP TABLE `_comictouser`;

-- CreateTable
CREATE TABLE `_UserFavorites` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_UserFavorites_AB_unique`(`A`, `B`),
    INDEX `_UserFavorites_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_UserFavorites` ADD CONSTRAINT `_UserFavorites_A_fkey` FOREIGN KEY (`A`) REFERENCES `Comic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserFavorites` ADD CONSTRAINT `_UserFavorites_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
