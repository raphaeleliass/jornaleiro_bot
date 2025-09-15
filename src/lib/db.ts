import { drizzle } from "drizzle-orm/bun-sqlite";

if (!process.env.DB_FILE_NAME) throw new Error("Missing DB_FILE_NAME variable");

export const db = drizzle(process.env.DB_FILE_NAME);

export type DrizzleDB = typeof db;
