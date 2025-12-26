CREATE TABLE `note` (
	`gid` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`cid` integer NOT NULL,
	`title` text NOT NULL,
	`content` text,
	`is_pinned` integer DEFAULT false NOT NULL,
	`owner` integer NOT NULL,
	`status` text DEFAULT 'default' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `note_tag` (
	`note` integer,
	`tag` integer,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	PRIMARY KEY(`note`, `tag`),
	FOREIGN KEY (`note`) REFERENCES `note`(`cid`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag`) REFERENCES `tag`(`cid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tag` (
	`gid` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`cid` integer NOT NULL,
	`title` text NOT NULL,
	`owner` integer NOT NULL,
	`status` text DEFAULT 'default' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
