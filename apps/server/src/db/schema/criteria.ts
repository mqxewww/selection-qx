import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { coursesTable } from "~server/db/schema/courses";
import { criterionMarksTable } from "~server/db/schema/criterion-marks";

export const criteriaTable = sqliteTable("criteria", {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  createdAt: text("created_at")
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))`)
    .notNull(),
  deletedAt: text("deleted_at"),
  courseId: integer("course_id")
    .notNull()
    .references(() => coursesTable.id),
});

export const criteriaRelations = relations(criteriaTable, ({ one, many }) => ({
  course: one(coursesTable, {
    fields: [criteriaTable.courseId],
    references: [coursesTable.id],
  }),
  marks: many(criterionMarksTable),
}));
