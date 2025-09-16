import axios from "axios";
import { telegramToken } from "../constants";

export const api = axios.create({
	baseURL: `https://api.telegram.org/bot${telegramToken}`,
});

export async function sendMessage(chatId: number, text: string) {
	const { data } = await api.post("/sendMessage", {
		chat_id: chatId,
		text: text,
	});

	return data;
}
