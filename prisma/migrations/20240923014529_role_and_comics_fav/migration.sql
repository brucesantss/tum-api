/*
  Warnings:

  - You are about to drop the column `ArtistId` on the `comic` table. All the data in the column will be lost.
  - Added the required column `artistId` to the `Comic` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `comic` DROP FOREIGN KEY `Comic_ArtistId_fkey`;

-- AlterTable
ALTER TABLE `comic` DROP COLUMN `ArtistId`,
    ADD COLUMN `artistId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('READER', 'ARTIST', 'ADMIN') NOT NULL DEFAULT 'READER';

-- CreateTable
CREATE TABLE `_ComicToUser` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ComicToUser_AB_unique`(`A`, `B`),
    INDEX `_ComicToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comic` ADD CONSTRAINT `Comic_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ComicToUser` ADD CONSTRAINT `_ComicToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Comic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ComicToUser` ADD CONSTRAINT `_ComicToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
