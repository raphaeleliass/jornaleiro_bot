import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.DB_FILE_NAME) throw new Error("Missing DB_FILE_NAME variable");

export default defineConfig({
	dialect: "turso",
	out: "./drizzle",
	schema: "./src/db/schema.ts",
	dbCredentials: {
		url: process.env.TURSO_DATABASE_URL as string,
		authToken: process.env.TURSO_AUTH_TOKEN as string,
	},
});
