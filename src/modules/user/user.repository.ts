import { eq } from "drizzle-orm";
import { userTable } from "../../db/schema";
import type { DrizzleDB } from "../../lib/db";
import type { UserTypes } from "./user.types";

export class UserRepository {
	db: DrizzleDB;

	constructor(db: DrizzleDB) {
		this.db = db;
	}

	findUser = async (chatId: number) => {
		const user = this.db
			.select()
			.from(userTable)
			.where(eq(userTable.chatId, chatId))
			.get();

		return user;
	};

	createUser = async ({
		name,
		chatId,
		isBot,
		languageCode,
		subscribed,
	}: UserTypes) => {
		const createdUser = await this.db
			.insert(userTable)
			.values({ name, chatId, isBot, languageCode, subscribed })
			.returning()
			.onConflictDoNothing();

		return createdUser;
	};

	unsubscribeUser = async (chatId: number) => {
		const unsubscribedUser = await this.db
			.update(userTable)
			.set({ subscribed: false })
			.where(eq(userTable.chatId, chatId))
			.returning();

		return unsubscribedUser;
	};

	subscribeUser = async (chatId: number) => {
		const subscribeUser = await this.db
			.update(userTable)
			.set({ subscribed: true })
			.where(eq(userTable.chatId, chatId))
			.returning();

		return subscribeUser;
	};

	getAllSubscribedUsers = async () => {
		const users = await this.db
			.select()
			.from(userTable)
			.where(eq(userTable.subscribed, true));

		return users;
	};
}
