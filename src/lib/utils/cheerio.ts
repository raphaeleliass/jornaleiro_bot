import axios from "axios";
import * as cheerio from "cheerio";

export async function cheerioData({
	category,
}: {
	category: "mundo" | "economia" | "politica" | "tecnologia";
}) {
	const { data } = await axios.get(`https://g1.globo.com/rss/g1/${category}`);

	const $ = cheerio.load(data, { xml: true });

	return $;
}
