import { api } from "../api";

export const telegram = {
	sendMessage: sendMessage,
	sendPhoto: sendPhoto,
};

async function sendMessage({ chatId, text }: { chatId: number; text: string }) {
	const { data } = await api.post("/sendMessage", {
		chat_id: chatId,
		text: text,
	});

	return data;
}

async function sendPhoto({
	chatId,
	photo,
	caption,
}: {
	chatId: number;
	photo: string;
	caption: string;
}) {
	const { data } = await api.post("/sendPhoto", {
		chat_id: chatId,
		photo: photo,
		caption: caption,
	});

	return data;
}
