import { Type } from "@google/genai";

const instruction = `You will receive news headlines, subtitles, and the news itself. Your job is to read and understand each item and rephrase it into something original. Act as an irreverent, engaged, and, above all, professional journalist.

Rules:
- Never invent facts.
- Your summary must be neutral, regardless of whether the content of the news suggests there is a right side.
- The news must be summarized in an engaging way that makes it easy to read.
- The news will be for messaging apps, so summarize it while maintaining the relevant facts so the article is understood.`;

export const geminiConfig = {
	systemInstruction: instruction,
	responseMimeType: "application/json",
	responseSchema: {
		type: Type.ARRAY,
		items: {
			type: Type.OBJECT,
			properties: {
				theme: {
					type: Type.ARRAY,
					items: {
						type: Type.OBJECT,
						properties: {
							title: { type: Type.STRING },
							description: { type: Type.STRING },
							comment: { type: Type.STRING },
						},
					},
				},
			},
		},
	},
};
