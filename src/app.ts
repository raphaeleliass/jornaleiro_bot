import { Hono } from "hono";
import { logger } from "./lib/utils/logger";
import { router } from "./routes/router";

export const app = new Hono();

app.onError((err, c) => {
	return c.json(err);
});

app.use(logger);

app.get("/", (c) => {
	return c.text("Hello, Jornaleiro_bot!");
});
app.route("/api", router.botRoute);
