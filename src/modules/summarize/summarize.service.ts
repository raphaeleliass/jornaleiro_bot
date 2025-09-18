import { Cheerio } from "cheerio";
import { cheerioData } from "../../lib/utils/cheerio";
import type { UserRepository } from "../user/user.repository";
import type { summarizeRepository } from "./summarize.repository";

export class SummarizeService {
	summarizeRepository: summarizeRepository;
	userRepository: UserRepository;

	constructor(
		summarizeRepository: summarizeRepository,
		userRepository: UserRepository,
	) {
		this.summarizeRepository = summarizeRepository;
		this.userRepository = userRepository;
	}

	getWorldNews = (async) => {
		const html = cheerioData({ category: "economia" });
	};
}
