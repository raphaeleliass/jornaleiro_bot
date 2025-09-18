import { desc } from "drizzle-orm";
import { newsTable } from "../../db/schema";
import type { DrizzleDB } from "../../lib/db";
import type { SummarizeTypes } from "./summarize.types";

export class summarizeRepository {
	db: DrizzleDB;

	constructor(db: DrizzleDB) {
		this.db = db;
	}

	addNews = async (newsData: SummarizeTypes) => {
		const news = this.db
			.insert(newsTable)
			.values({
				title: newsData.title,
				description: newsData.description,
				comment: newsData.description,
				imagePath: newsData.imagePath,
				newsUrl: newsData.newsUrl,
			})
			.returning()
			.get();

		return news;
	};

	getLastNews = async () => {
		const [lastNews] = await this.db
			.select()
			.from(newsTable)
			.orderBy(desc(newsTable.id))
			.limit(1);

		return lastNews;
	};
}
