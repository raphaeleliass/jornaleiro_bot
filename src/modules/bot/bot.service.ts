import { HTTPException } from "hono/http-exception";
import * as messages from "../../data/messages";
import { sendMessage } from "../../lib/api";
import type { TelegramUpdate } from "../../types/types";
import type { UserService } from "../user/user.service";
import type { UserTypes } from "../user/user.types";

export class BotService {
	userService: UserService;

	constructor(userService: UserService) {
		this.userService = userService;

		this.userService.createUser = this.userService.createUser.bind(this);
		this.userService.findUser = this.userService.findUser.bind(this);
		this.userService.unsubscribeUser =
			this.userService.unsubscribeUser.bind(this);
		this.userService.subscribeUser = this.userService.subscribeUser.bind(this);
	}

	async processUpdate(payload: TelegramUpdate) {
		if (!payload)
			throw new HTTPException(400, { message: "Missing telegram payload" });

		const messageText = payload.message?.text;
		const from = payload.message?.from;

		if (!messageText || !from)
			throw new HTTPException(400, {
				message: "Missing messageText or from fields",
			});

		switch (messageText.toLocaleLowerCase()) {
			case "/start":
				return this.handleStart(from.id);

			case "/inscrever":
				return this.handleSubscribe(from.id);

			case "/confirmar":
				return this.handleRegister({
					name: from.first_name,
					chatId: from.id,
					isBot: from.is_bot,
					languageCode: from.language_code as string,
					subscribed: true,
				});

			case "/sair":
				return this.handleUnsubscribe(from.id);

			case "/termos":
				return this.handleTerms(from.id);

			case "/ajuda":
				return this.handleHelp(from.id);
		}
	}

	async handleStart(chatId: number) {
		await sendMessage(chatId, messages.start);
	}

	async handleSubscribe(chatId: number) {
		const registeredUser = await this.userService.findUser(chatId);

		if (registeredUser?.subscribed.valueOf() === true) {
			return await sendMessage(chatId, messages.register.existingUser);
		}

		await sendMessage(chatId, messages.confirm);
	}

	async handleRegister(userData: UserTypes) {
		const registeredUser = await this.userService.findUser(userData.chatId);

		if (!registeredUser) {
			await this.userService.createUser(userData);
			return await sendMessage(userData.chatId, messages.register.newUser);
		}

		if (registeredUser?.subscribed.valueOf() === true) {
			return await sendMessage(userData.chatId, messages.register.existingUser);
		}

		await this.userService.subscribeUser(userData.chatId);
		return sendMessage(userData.chatId, messages.register.exUser);
	}

	async handleTerms(chatId: number) {
		await sendMessage(chatId, messages.terms);
	}

	async handleUnsubscribe(chatId: number) {
		const registeredUser = await this.userService.findUser(chatId);

		if (!registeredUser) {
			return await sendMessage(
				chatId,
				"Você ainda não tem um cadastro, para fazer isso, digite /cadastrar",
			);
		}

		if (registeredUser.subscribed.valueOf() === false) {
			return await sendMessage(chatId, "Voce já foi removido!");
		}

		await this.userService.unsubscribeUser(chatId);

		await sendMessage(
			chatId,
			"Pronto! a partir de agora você não receberá mais notícias 🥹\n\n" +
				"Voce pode voltar a receber noticias à qualquer momento. Basta digitar /inscrever",
		);
	}

	async handleHelp(chatId: number) {
		await sendMessage(chatId, messages.help);
	}
}
