-- CreateEnum
CREATE TYPE "OfferType" AS ENUM ('HOTEL', 'FLIGHT', 'MULTI');

-- CreateTable
CREATE TABLE "Offer" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" "OfferType" NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);
