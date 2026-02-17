import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

// Buat connection pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter: adapter,
  log: ["query", "info", "warn", "error"],
});

const { hash } = bcrypt;

async function main() {
  try {
    console.log("Starting seed...");
    console.log("Database URL:", process.env.DATABASE_URL); // Cek URL

    const adminRole = await prisma.role.findUnique({
      where: { role: "ADMIN" },
    });

    if (!adminRole) {
      await prisma.role.create({
        data: { role: "ADMIN" },
      });
      console.log("✅ Role ADMIN berhasil dibuat.");
    } else {
      console.log("⏭️ Role ADMIN sudah ada.");
    }

    const employeeRole = await prisma.role.findUnique({
      where: { role: "EMPLOYEE" },
    });

    if (!employeeRole) {
      await prisma.role.create({
        data: { role: "EMPLOYEE" },
      });
      console.log("✅ Role EMPLOYEE berhasil dibuat.");
    } else {
      console.log("⏭️ Role EMPLOYEE sudah ada.");
    }

    const existingAdmin = await prisma.user.findUnique({
      where: { username: "supmin" },
    });

    if (!existingAdmin) {
      const hashedPassword = await hash("password", 10);
      await prisma.user.create({
        data: {
          name: "THaetami",
          username: "supmin",
          email: "supmin@laundry.com",
          password: hashedPassword,
          roleUser: {
            create: {
              role: { connect: { role: "ADMIN" } },
            },
          },
        },
      });
      console.log("✅ User Admin Super berhasil dibuat.");
    } else {
      console.log("⏭️ User Admin Super sudah ada.");
    }

    console.log("🎉 Seeder berhasil dijalankan!");
  } catch (error) {
    console.error("❌ Seeder error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
