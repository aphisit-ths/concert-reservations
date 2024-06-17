-- CreateTable
CREATE TABLE "Concert" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "seat" INTEGER NOT NULL,
    "Description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false
);