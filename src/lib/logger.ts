import { createMiddleware } from "hono/factory";

export const logger = createMiddleware(async (c, next) => {
	const currDate = new Date().toLocaleTimeString();
	const path = c.req.path.replace(/handler\/[^/]+/, "handler/*****");
	console.log(`<-- ${currDate} ${c.req.method} ${path}`);
	return next();
});
