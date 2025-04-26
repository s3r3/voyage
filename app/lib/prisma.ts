import { PrismaClient } from "@prisma/client";

// Prisma Client hanya akan dibuat sekali pada saat aplikasi dijalankan dalam mode development.
// Pada production, Prisma Client tidak akan disimpan dalam global untuk menghindari masalah memory leak.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Menggunakan global untuk development agar Prisma Client tidak dibuat ulang setiap request.
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
