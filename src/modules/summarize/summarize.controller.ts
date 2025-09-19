import type { Context } from "hono";
import type { SummarizeService } from "./summarize.service";

export class SummarizeController {
	summarizeService: SummarizeService;

	constructor(summarizeService: SummarizeService) {
		this.summarizeService = summarizeService;
	}

	handler = async (c: Context) => {
		await this.summarizeService.saveNews();
		console.log(c.req);
		return c.json("ok");
	};
}
