import type { Context } from "hono";
import type { TelegramUpdate } from "../../types/types";
import type { BotService } from "./bot.service";

export class BotController {
	botService: BotService;

	constructor(botService: BotService) {
		this.botService = botService;

		this.handler = this.handler.bind(this);
	}

	async handler(c: Context) {
		const payload: TelegramUpdate = await c.req.json();

		if (!payload.message)
			return c.json({ message: "Missing Telegram Payload" }, 400);

		await this.botService.processUpdate(payload);

		return c.json({ ok: true }, 200);
	}
}
