-- CreateTable
CREATE TABLE `tasks` (
    `id_tasks` INTEGER NOT NULL AUTO_INCREMENT,
    `task_name` VARCHAR(191) NULL,
    `task_status` VARCHAR(191) NULL DEFAULT 'isActive',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tasks_id_tasks_key`(`id_tasks`),
    PRIMARY KEY (`id_tasks`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
