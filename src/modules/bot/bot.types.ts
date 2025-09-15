import type z from "zod";
import type { botSchema } from "./bot.shema";

export type BotTypes = z.infer<typeof botSchema>;
