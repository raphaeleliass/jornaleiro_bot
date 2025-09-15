import { eq } from "drizzle-orm";
import { userTable } from "../../db/schema";
import type { DrizzleDB } from "../../lib/db";
import type { UserTypes } from "./user.types";

export class UserRepository {
	db: DrizzleDB;

	constructor(db: DrizzleDB) {
		this.db = db;
	}

	async findUser({ chatId }: UserTypes) {
		const user = await this.db
			.select()
			.from(userTable)
			.where(eq(userTable.chatId, chatId))
			.get();

		return user;
	}

	async registerUser({
		name,
		chatId,
		isBot,
		languageCode,
		subscribed,
	}: UserTypes) {
		const registeredUser = await this.db
			.insert(userTable)
			.values({ name, chatId, isBot, languageCode, subscribed })
			.returning();

		return registeredUser;
	}

	async unsubscribeUser({ chatId }: UserTypes) {
		const unsubscribedUser = await this.db
			.update(userTable)
			.set({ subscribed: false })
			.where(eq(userTable.chatId, chatId))
			.returning();

		return unsubscribedUser;
	}
}
