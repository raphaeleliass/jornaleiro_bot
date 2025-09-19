import axios from "axios";
import * as cheerio from "cheerio";
import { telegram } from "../../lib/utils/telegram";
import type { UserRepository } from "../user/user.repository";

export class SummarizeService {
	userRepository: UserRepository;

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	saveNews = async () => {
		const categories = ["mundo", "tecnologia", "politica", "economia"];

		const currDate = new Date().toLocaleDateString("pt-br", {
			day: "2-digit",
			month: "2-digit",
			year: "2-digit",
		});

		const sleep = (ms: number) =>
			new Promise((resolve) => setTimeout(resolve, ms));

		const users = await this.userRepository.getAllSubscribedUsers();

		for (const category of categories) {
			const { data } = await axios.get(
				`https://g1.globo.com/rss/g1/${category}`,
			);
			const $ = cheerio.load(data, { xml: true });

			const news: {
				img: string;
				title: string;
				description: string;
				source: string;
			}[] = [];

			$("item")
				.slice(0, 3)
				.each((_, el) => {
					const img = $(el).find("media\\:content").attr("url") || "";
					const title = $(el).find("title").text();
					const description = $(el).find("atom\\:subtitle").text();
					const source = $(el).find("link").text();

					news.push({ img, title, description, source });
				});

			const message =
				`📢 Notícias de hoje: ${currDate}\n` +
				`Categoria: ${category}\n\n` +
				news
					.map(
						(n, i) =>
							`📰 ${i + 1}. ${n.title}\n${n.description}\n🔗 ${n.source}\n`,
					)
					.join("\n");

			for (let i = 0; i < users.length; i += 20) {
				const batch = users.slice(i, i + 20);

				await Promise.all(
					batch.map((user) => {
						const sendedMessage = telegram.sendMessage({
							chatId: user.chatId,
							text: message,
						});

						return sendedMessage;
					}),
				);

				if (i + 20 < users.length) {
					await sleep(1000);
				}
			}
		}
	};
}
