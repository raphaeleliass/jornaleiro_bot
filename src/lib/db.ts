import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";

if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN)
	throw new Error("Missing env variables");

export const db = drizzle({
	connection: {
		url: process.env.TURSO_DATABASE_URL as string,
		authToken: process.env.TURSO_AUTH_TOKEN as string,
	},
});

export type DrizzleDB = typeof db;
