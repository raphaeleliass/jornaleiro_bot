import { z } from "zod";

export const summarizeSchema = z.object({
	id: z.int("Field id must be a integer").optional(),
	title: z
		.string("Field  must be a string")
		.nonempty("Field title cannot be empty"),
	description: z
		.string("Field  must be a string")
		.nonempty("Field description cannot be empty"),
	comment: z
		.string("Field comment must be a string")
		.nonempty("Field comment cannot be empty"),
	imagePath: z
		.string("Field imagePath must be a string")
		.nonempty("Field imagePath cannot be empty"),
	newsUrl: z
		.string("Field newsUrl must be a string")
		.nonempty("Field newsUrl cannot be empty"),
	createdAt: z.int("Field createdAt must be a integer").nonoptional(),
	updatedAt: z.int("Field updatedAt must be a integer").nonoptional(),
});
