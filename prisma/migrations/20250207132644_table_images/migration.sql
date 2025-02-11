/*
  Warnings:

  - You are about to drop the column `banner` on the `comic` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `comic` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comic` DROP COLUMN `banner`,
    DROP COLUMN `thumbnail`;

-- CreateTable
CREATE TABLE `Image` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `type` ENUM('PROFILE', 'COMIC_BANNER', 'COMIC_THUMBNAIL', 'OTHER') NOT NULL,
    `mimeType` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `width` INTEGER NULL,
    `height` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `comicId` INTEGER NULL,

    UNIQUE INDEX `Image_url_key`(`url`),
    UNIQUE INDEX `Image_path_key`(`path`),
    UNIQUE INDEX `Image_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_comicId_fkey` FOREIGN KEY (`comicId`) REFERENCES `Comic`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
