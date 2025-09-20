CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`chat_id` integer NOT NULL,
	`is_bot` integer NOT NULL,
	`language_code` text NOT NULL,
	`subscribed` integer DEFAULT true NOT NULL,
	`accept_terms` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer DEFAULT (unixepoch())
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_chat_id_unique` ON `users` (`chat_id`);