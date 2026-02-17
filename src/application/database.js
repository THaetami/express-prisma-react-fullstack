import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { logger } from "./logging.js";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prismaClient = new PrismaClient({
  adapter: adapter,
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

// Event handlers
prismaClient.$on("error", (e) => {
  logger.error({
    message: e.message,
    target: e.target,
    timestamp: new Date().toISOString(),
  });
});

prismaClient.$on("warn", (e) => {
  logger.warn({
    message: e.message,
    target: e.target,
    timestamp: new Date().toISOString(),
  });
});

prismaClient.$on("info", (e) => {
  logger.info({
    message: e.message,
    target: e.target,
    timestamp: new Date().toISOString(),
  });
});

prismaClient.$on("query", (e) => {
  logger.info({
    query: e.query,
    params: e.params,
    duration: e.duration,
    timestamp: new Date().toISOString(),
  });
});

process.on("SIGINT", async () => {
  await prismaClient.$disconnect();
  await pool.end();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prismaClient.$disconnect();
  await pool.end();
  process.exit(0);
});
