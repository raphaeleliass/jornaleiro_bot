import z from "zod";

export const userSchema = z.object({
	id: z.int("Field 'id' must be a int").optional(),
	name: z
		.string("Field 'name' must be a string")
		.nonempty("Field 'name' field cannot be empty"),
	chatId: z
		.int("Field 'chatId' must be a int")
		.nonoptional("Field 'chatId' cannot be empty"),
	isBot: z
		.boolean("Field 'isBot' must be a boolean")
		.nonoptional("Field 'isBot' cannot be empty"),
	languageCode: z
		.string("Field 'languageCode' must be a string")
		.nonempty("Field 'languageCode' field cannot be empty"),
	subscribed: z
		.boolean("Field 'subscribed' must be a boolean")
		.nonoptional("Field 'subscribed' cannot be empty"),
});
