import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { criteriaTable } from "~server/db/schema/criteria";

export const coursesTable = sqliteTable("courses", {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: text().notNull(),
  capacity: integer().notNull(),
  periodStart: text("period_start").notNull(),
  periodEnd: text("period_end").notNull(),
  createdAt: text("created_at")
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))`)
    .notNull(),
  deletedAt: text("deleted_at"),
  bgImagePath: text().notNull(),
});

export const coursesRelations = relations(coursesTable, ({ many }) => ({
  criteria: many(criteriaTable),
}));
