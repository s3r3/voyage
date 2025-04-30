/*
  Warnings:

  - The values [HOTEL,FLIGHT,MULTI] on the enum `OfferType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OfferType_new" AS ENUM ('hotel', 'flight', 'multi');
ALTER TABLE "Offer" ALTER COLUMN "type" TYPE "OfferType_new" USING ("type"::text::"OfferType_new");
ALTER TYPE "OfferType" RENAME TO "OfferType_old";
ALTER TYPE "OfferType_new" RENAME TO "OfferType";
DROP TYPE "OfferType_old";
COMMIT;
