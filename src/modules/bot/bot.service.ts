import { HTTPException } from "hono/http-exception";
import * as messages from "../../data/messages";
import { telegram } from "../../lib/utils/telegram";
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
		await telegram.sendMessage({ chatId, text: messages.start });
	}

	async handleSubscribe(chatId: number) {
		const registeredUser = await this.userService.findUser(chatId);

		if (registeredUser?.subscribed.valueOf() === true) {
			return await telegram.sendMessage({
				chatId,
				text: messages.register.existingUser,
			});
		}

		await telegram.sendMessage({ chatId, text: messages.confirm });
	}

	async handleRegister(userData: UserTypes) {
		const registeredUser = await this.userService.findUser(userData.chatId);

		if (!registeredUser) {
			await this.userService.createUser(userData);
			console.log("novo usuário");
			return await telegram.sendMessage({
				chatId: userData.chatId,
				text: messages.register.newUser,
			});
		}

		if (registeredUser?.subscribed.valueOf() === true) {
			return await telegram.sendMessage({
				chatId: userData.chatId,
				text: messages.register.existingUser,
			});
		}

		await this.userService.subscribeUser(userData.chatId);
		return telegram.sendMessage({
			chatId: userData.chatId,
			text: messages.register.exUser,
		});
	}

	async handleTerms(chatId: number) {
		await telegram.sendMessage({ chatId, text: messages.terms });
	}

	async handleUnsubscribe(chatId: number) {
		const registeredUser = await this.userService.findUser(chatId);

		if (!registeredUser) {
			return await telegram.sendMessage({
				chatId,
				// TODO CHANGE MESSAGES
				text: "Você ainda não tem um cadastro, para fazer isso, digite /cadastrar",
			});
		}

		if (registeredUser.subscribed.valueOf() === false) {
			return await telegram.sendMessage({
				chatId,
				// TODO CHANGE MESSAGE
				text: "Voce já foi removido!",
			});
		}

		await this.userService.unsubscribeUser(chatId);

		await telegram.sendMessage({
			chatId,
			// TODO CHANGE MESSAGE
			text:
				"Pronto! a partir de agora você não receberá mais notícias 🥹\n\n" +
				"Voce pode voltar a receber noticias à qualquer momento. Basta digitar /inscrever",
		});
	}

	async handleHelp(chatId: number) {
		await telegram.sendMessage({ chatId, text: messages.help });
	}
}
