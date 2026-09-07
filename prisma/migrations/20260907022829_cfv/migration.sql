/*
  Warnings:

  - You are about to drop the column `Ability` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `Critical` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `Effect` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `Persona` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `Power` on the `Cards` table. All the data in the column will be lost.
  - Added the required column `ability` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `critical` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `effect` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `persona` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `power` to the `Cards` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cards" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cardNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "nation" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "clan" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "ability" TEXT NOT NULL,
    "persona" BOOLEAN NOT NULL,
    "power" INTEGER NOT NULL,
    "critical" INTEGER NOT NULL,
    "effect" TEXT NOT NULL,
    "setId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Cards_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cards" ("cardNumber", "clan", "createdAt", "grade", "id", "name", "nation", "race", "setId", "type", "updatedAt") SELECT "cardNumber", "clan", "createdAt", "grade", "id", "name", "nation", "race", "setId", "type", "updatedAt" FROM "Cards";
DROP TABLE "Cards";
ALTER TABLE "new_Cards" RENAME TO "Cards";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
