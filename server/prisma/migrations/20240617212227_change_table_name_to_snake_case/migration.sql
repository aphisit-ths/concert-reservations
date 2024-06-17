/*
  Warnings:

  - You are about to drop the `Reservation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReservationLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Reservation";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ReservationLog";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "reservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "concert_id" INTEGER NOT NULL,
    "reservation_date" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "reservation_concert_id_fkey" FOREIGN KEY ("concert_id") REFERENCES "concert" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "reservation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "reservation_log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reservation_date" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "action_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "reservation_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "reservation_log_reservation_date_fkey" FOREIGN KEY ("reservation_date") REFERENCES "reservation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
