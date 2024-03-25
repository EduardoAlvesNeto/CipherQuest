/*
  Warnings:

  - You are about to drop the column `iv` on the `credit_card` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_credit_card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "expiration" TEXT NOT NULL,
    "cvv" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "credit_card_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_credit_card" ("brand", "createdAt", "cvv", "expiration", "id", "name", "number", "updatedAt", "user_id") SELECT "brand", "createdAt", "cvv", "expiration", "id", "name", "number", "updatedAt", "user_id" FROM "credit_card";
DROP TABLE "credit_card";
ALTER TABLE "new_credit_card" RENAME TO "credit_card";
CREATE UNIQUE INDEX "credit_card_number_key" ON "credit_card"("number");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
