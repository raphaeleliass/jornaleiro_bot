import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.DB_FILE_NAME) throw new Error("Missing DB_FILE_NAME variable");

export default defineConfig({
	dialect: "sqlite",
	out: "./drizzle",
	schema: "./src/db/schema.ts",
	dbCredentials: {
		url: process.env.DB_FILE_NAME,
	},
});
