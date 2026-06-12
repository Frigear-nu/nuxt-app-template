CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`frigearId` integer,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text,
	`role` text DEFAULT 'user' NOT NULL,
	`avatar` text,
	`lastLoginAt` integer,
	`createdAt` integer,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_frigearId_unique` ON `users` (`frigearId`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);