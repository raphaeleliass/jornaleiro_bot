import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { user } from "../db/schema";
import { api } from "../lib/api";
import { db } from "../lib/db";
import type { MessageInterface } from "../types/types";

export const messagesRoutes = new Hono();

messagesRoutes.post("/send-message", async (c) => {
	const { message }: MessageInterface = await c.req.json();

	if (
		!message ||
		message.text.length < 0 ||
		message.text.toLocaleLowerCase().indexOf("marco") < 0
	)
		return c.text("invalid message", 400);

	await api.post("/sendMessage", {
		chat_id: message.chat.id,
		text: "Polo!!",
	});

	const regUser = await db
		.select()
		.from(user)
		.where(eq(user.chatId, message.chat.id))
		.limit(1)
		.get();

	if (!regUser) {
		await db.insert(user).values({
			name: message.from.first_name,
			chatId: message.chat.id,
			isBot: message.from.is_bot,
			languageCode: message.from.language_code,
		});

		console.log("user cadastrado");
	}

	return c.json({ ok: true }, 200);
});
