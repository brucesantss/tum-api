/*
  Warnings:

  - Added the required column `isOriginalTum` to the `Comic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comic` ADD COLUMN `isOriginalTum` BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE `_CoCreators` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CoCreators_AB_unique`(`A`, `B`),
    INDEX `_CoCreators_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CoCreators` ADD CONSTRAINT `_CoCreators_A_fkey` FOREIGN KEY (`A`) REFERENCES `Comic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CoCreators` ADD CONSTRAINT `_CoCreators_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
