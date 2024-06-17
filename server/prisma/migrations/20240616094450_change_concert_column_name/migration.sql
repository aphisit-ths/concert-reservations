/*
  Warnings:

  - You are about to drop the column `Description` on the `concert` table. All the data in the column will be lost.
  - Added the required column `description` to the `concert` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_concert" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "seat" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_concert" ("created_at", "deleted", "id", "seat", "updated_at") SELECT "created_at", "deleted", "id", "seat", "updated_at" FROM "concert";
DROP TABLE "concert";
ALTER TABLE "new_concert" RENAME TO "concert";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
