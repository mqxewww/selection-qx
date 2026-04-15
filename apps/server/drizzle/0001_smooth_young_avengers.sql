PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_courses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`capacity` integer NOT NULL,
	`period_start` text NOT NULL,
	`period_end` text NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`deleted_at` text,
	`bgImagePath` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_courses`("id", "title", "description", "capacity", "period_start", "period_end", "created_at", "deleted_at", "bgImagePath") SELECT "id", "title", "description", "capacity", "period_start", "period_end", "created_at", "deleted_at", COALESCE("bgImagePath", '/uploads/default.jpeg') FROM `courses`;--> statement-breakpoint
DROP TABLE `courses`;--> statement-breakpoint
ALTER TABLE `__new_courses` RENAME TO `courses`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_criteria` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`deleted_at` text,
	`course_id` integer NOT NULL,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_criteria`("id", "title", "created_at", "deleted_at", "course_id") SELECT "id", "title", "created_at", "deleted_at", "course_id" FROM `criteria`;--> statement-breakpoint
DROP TABLE `criteria`;--> statement-breakpoint
ALTER TABLE `__new_criteria` RENAME TO `criteria`;--> statement-breakpoint
CREATE TABLE `__new_criterion_marks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`label` text NOT NULL,
	`mark` integer NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`deleted_at` text,
	`criterion_id` integer NOT NULL,
	FOREIGN KEY (`criterion_id`) REFERENCES `criteria`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_criterion_marks`("id", "label", "mark", "created_at", "deleted_at", "criterion_id") SELECT "id", "label", "mark", "created_at", "deleted_at", "criterion_id" FROM `criterion_marks`;--> statement-breakpoint
DROP TABLE `criterion_marks`;--> statement-breakpoint
ALTER TABLE `__new_criterion_marks` RENAME TO `criterion_marks`;--> statement-breakpoint
CREATE UNIQUE INDEX `criterion_marks_index_0` ON `criterion_marks` (`criterion_id`,`mark`);

--> statement-breakpoint
UPDATE `courses`
SET `created_at` = strftime('%Y-%m-%dT%H:%M:%SZ', CAST(`created_at` AS INTEGER), 'unixepoch')
WHERE `created_at` NOT LIKE '%T%';

--> statement-breakpoint
UPDATE `courses`
SET `deleted_at` = strftime('%Y-%m-%dT%H:%M:%SZ', CAST(`deleted_at` AS INTEGER), 'unixepoch')
WHERE `deleted_at` IS NOT NULL AND `deleted_at` NOT LIKE '%T%';

--> statement-breakpoint
UPDATE `criteria`
SET `created_at` = strftime('%Y-%m-%dT%H:%M:%SZ', CAST(`created_at` AS INTEGER), 'unixepoch')
WHERE `created_at` NOT LIKE '%T%';

--> statement-breakpoint
UPDATE `criteria`
SET `deleted_at` = strftime('%Y-%m-%dT%H:%M:%SZ', CAST(`deleted_at` AS INTEGER), 'unixepoch')
WHERE `deleted_at` IS NOT NULL AND `deleted_at` NOT LIKE '%T%';

--> statement-breakpoint
UPDATE `criterion_marks`
SET `created_at` = strftime('%Y-%m-%dT%H:%M:%SZ', CAST(`created_at` AS INTEGER), 'unixepoch')
WHERE `created_at` NOT LIKE '%T%';

--> statement-breakpoint
UPDATE `criterion_marks`
SET `deleted_at` = strftime('%Y-%m-%dT%H:%M:%SZ', CAST(`deleted_at` AS INTEGER), 'unixepoch')
WHERE `deleted_at` IS NOT NULL AND `deleted_at` NOT LIKE '%T%';