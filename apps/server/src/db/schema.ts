import { relations, sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const coursesTable = sqliteTable("courses", {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: text().notNull(),
  capacity: integer().notNull(),
  periodStart: text("period_start").notNull(),
  periodEnd: text("period_end").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

export const criteriaTable = sqliteTable("criteria", {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
  courseId: integer("course_id")
    .notNull()
    .references(() => coursesTable.id),
});

export const criterionMarksTable = sqliteTable(
  "criterion_marks",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    label: text().notNull(),
    mark: integer().notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
    deletedAt: integer("deleted_at", { mode: "timestamp" }),
    criterionId: integer("criterion_id")
      .notNull()
      .references(() => criteriaTable.id),
  },
  (t) => ({
    uniqueMarkPerCriterion: uniqueIndex("criterion_marks_index_0").on(
      t.criterionId,
      t.mark,
    ),
  }),
);

export const coursesRelations = relations(coursesTable, ({ many }) => ({
  criteria: many(criteriaTable),
}));

export const criteriaRelations = relations(criteriaTable, ({ one, many }) => ({
  course: one(coursesTable, {
    fields: [criteriaTable.courseId],
    references: [coursesTable.id],
  }),
  marks: many(criterionMarksTable),
}));

export const criterionMarksRelations = relations(
  criterionMarksTable,
  ({ one }) => ({
    criterion: one(criteriaTable, {
      fields: [criterionMarksTable.criterionId],
      references: [criteriaTable.id],
    }),
  }),
);
