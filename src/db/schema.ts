import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("users", {
	id: int().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	chatId: int("chat_id").notNull().unique(),
	isBot: int("is_bot", { mode: "boolean" }).notNull(),

	languageCode: text("language_code").notNull(),
	subscribed: int("subscribed", { mode: "boolean" }).notNull().default(true),
	acceptTerms: int("accept_terms", { mode: "boolean" }).notNull().default(true),
	createdAt: int("created_at", { mode: "timestamp" }).default(
		sql`(unixepoch())`,
	),
	updatedAt: int("updated_at", { mode: "timestamp" }).default(
		sql`(unixepoch())`,
	),
});

export const newsTable = sqliteTable("news", {
	id: int().primaryKey({ autoIncrement: true }),
	title: text().notNull(),
	description: text().notNull(),
	comment: text().notNull(),
	imagePath: text("image_path").notNull(),
	newsUrl: text("news_url").notNull(),
	createdAt: int("created_at", { mode: "timestamp" }).default(
		sql`(unixepoch())`,
	),
	updatedAt: int("updated_at", { mode: "timestamp" }).default(
		sql`(unixepoch())`,
	),
});
