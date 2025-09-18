import { Hono } from "hono";
import { logger } from "./lib/utils/logger";
import { router } from "./routes/router";

export const app = new Hono();

app.use(logger);

app.route("/api", router.botRoute);
