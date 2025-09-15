import { z } from "zod";

export const botSchema = z.object({
	start: z.string().nonempty("Missing /start command"),
	inscrever: z.string().nonempty("Missing /inscrever command"),
	parar: z.string().nonempty("Missing /parar command"),
	ajuda: z.string().nonempty("Missing /ajuda command"),
});
