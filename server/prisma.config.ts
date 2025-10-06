import dotenv from "dotenv";
import path from "node:path";
import type { PrismaConfig } from "prisma";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  schema: path.join("prisma", "schema", "schema.prisma"),
  migrations: {
    path: path.join("prisma", "schema", "migrations"),
  },
  views: {
    path: path.join("prisma", "schema", "views"),
  },
  typedSql: {
    path: path.join("prisma", "schema", "queries"),
  },
} satisfies PrismaConfig;
