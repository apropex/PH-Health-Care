import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

/*

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "error", "warn"], // optional: useful for debugging
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

*/
