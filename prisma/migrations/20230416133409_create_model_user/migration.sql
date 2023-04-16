-- CreateTable
CREATE TABLE `users` (
    `id_users` INTEGER NOT NULL AUTO_INCREMENT,
    `name_user` VARCHAR(191) NOT NULL,
    `login_user` VARCHAR(191) NOT NULL,
    `password_user` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_id_users_key`(`id_users`),
    PRIMARY KEY (`id_users`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
