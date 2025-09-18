import { app } from "./app";

Bun.serve({
	fetch: app.fetch,
	idleTimeout: 100,
});

export default app;
