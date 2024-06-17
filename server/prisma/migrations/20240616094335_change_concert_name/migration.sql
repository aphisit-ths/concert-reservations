/*
  Warnings:

  - You are about to drop the `Concert` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Concert";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "concert" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "seat" INTEGER NOT NULL,
    "Description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false
);
