import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("users_table", {
	id: int().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	chatId: int("chat_id").notNull().unique(),
	isBot: int("is_bot", { mode: "boolean" }).notNull(),
	languageCode: text("language_code").notNull(),
});
