import { GoogleGenAI } from "@google/genai";
import { geminiApiKey } from "../../constants";
import { geminiConfig } from "./gemini.config";

export async function gemini(content: string) {
	const stringContent = JSON.stringify(content);

	const ai = new GoogleGenAI({ apiKey: geminiApiKey });
	const response = await ai.models.generateContent({
		model: "gemini-2.5-flash",
		contents: stringContent,
		config: geminiConfig,
	});

	const parsedResponse = JSON.parse(String(response.text));

	return parsedResponse;
}
