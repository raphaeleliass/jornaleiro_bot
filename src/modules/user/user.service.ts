import { HTTPException } from "hono/http-exception";
import type { UserRepository } from "./user.repository";
import type { UserTypes } from "./user.types";

export class UserService {
	userRepository: UserRepository;

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;

		this.createUser = this.createUser.bind(this);
		this.findUser = this.findUser.bind(this);
		this.unsubscribeUser = this.unsubscribeUser.bind(this);
		this.subscribeUser = this.subscribeUser.bind(this);
	}

	async createUser(user: UserTypes) {
		if (!user)
			throw new HTTPException(400, {
				message: `Missing one or more user fields`,
			});

		const createdUser = await this.userRepository.createUser(user);

		return createdUser;
	}

	async findUser(chatId: number) {
		if (!chatId)
			throw new HTTPException(400, { message: "Missing chatId field" });

		const user = await this.userRepository.findUser(chatId);

		return user;
	}

	async unsubscribeUser(chatId: number) {
		if (!chatId)
			throw new HTTPException(400, { message: "Missing chatId field" });

		const user = await this.userRepository.unsubscribeUser(chatId);

		return user;
	}

	async subscribeUser(chatId: number) {
		if (!chatId)
			throw new HTTPException(400, { message: "Missing chatId field" });

		const user = await this.userRepository.subscribeUser(chatId);

		return user;
	}
}
