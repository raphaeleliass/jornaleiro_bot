import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { botSecret, cronSecret } from "../constants";
import { db } from "../lib/db";
import { BotController } from "../modules/bot/bot.controller";
import { BotService } from "../modules/bot/bot.service";
import { SummarizeController } from "../modules/summarize/summarize.controller";
import { SummarizeService } from "../modules/summarize/summarize.service";
import { UserRepository } from "../modules/user/user.repository";
import { UserService } from "../modules/user/user.service";

export const botRoute = new Hono();

const userRepository = new UserRepository(db);
const userService = new UserService(userRepository);
const botService = new BotService(userService);
const botController = new BotController(botService);

const summarizeService = new SummarizeService(userRepository);
const summarizeController = new SummarizeController(summarizeService);

botRoute.post(`/webhook/${botSecret}`, botController.handler);
botRoute.get(
	"/summarize",
	bearerAuth({ token: cronSecret }),
	summarizeController.handler,
);
