import { PrismaClient } from "@prisma/client";
import { cleanEnv } from "./env";

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

const databaseUrl = cleanEnv(process.env.DATABASE_URL);

export const db =
	globalForPrisma.prisma ??
	new PrismaClient({
		datasources: {
			db: {
				url: databaseUrl,
			},
		},
	});

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = db;
}

