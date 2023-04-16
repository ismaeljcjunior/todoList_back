/*
  Warnings:

  - A unique constraint covering the columns `[login_user]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `users_login_user_key` ON `users`(`login_user`);
