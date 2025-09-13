import { Hono } from "hono";
import { logger } from "hono/logger";
import { router } from "./routes/router";

export const app = new Hono();

app.use(logger());

app.route("/messages", router.messagesRoutes);
