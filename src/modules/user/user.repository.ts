import { eq } from "drizzle-orm";
import { userTable } from "../../db/schema";
import type { DrizzleDB } from "../../lib/db";
import type { UserTypes } from "./user.types";

export class UserRepository {
	db: DrizzleDB;

	constructor(db: DrizzleDB) {
		this.db = db;

		this.createUser = this.createUser.bind(this);
		this.findUser = this.findUser.bind(this);
		this.unsubscribeUser = this.unsubscribeUser.bind(this);
		this.subscribeUser = this.subscribeUser.bind(this);
	}

	async findUser(chatId: number) {
		const user = this.db
			.select()
			.from(userTable)
			.where(eq(userTable.chatId, chatId))
			.get();

		return user;
	}

	async createUser({
		name,
		chatId,
		isBot,
		languageCode,
		subscribed,
	}: UserTypes) {
		const createdUser = await this.db
			.insert(userTable)
			.values({ name, chatId, isBot, languageCode, subscribed })
			.returning()
			.onConflictDoNothing();

		return createdUser;
	}

	async unsubscribeUser(chatId: number) {
		const unsubscribedUser = await this.db
			.update(userTable)
			.set({ subscribed: false })
			.where(eq(userTable.chatId, chatId))
			.returning();

		return unsubscribedUser;
	}

	async subscribeUser(chatId: number) {
		const subscribeUser = await this.db
			.update(userTable)
			.set({ subscribed: true })
			.where(eq(userTable.chatId, chatId))
			.returning();

		return subscribeUser;
	}
}
