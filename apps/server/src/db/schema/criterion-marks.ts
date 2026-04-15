import { relations, sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { criteriaTable } from "~server/db/schema/criteria";

export const criterionMarksTable = sqliteTable(
  "criterion_marks",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    label: text().notNull(),
    mark: integer().notNull(),
    createdAt: text("created_at")
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))`)
      .notNull(),
    deletedAt: text("deleted_at"),
    criterionId: integer("criterion_id")
      .notNull()
      .references(() => criteriaTable.id),
  },
  (t) => [uniqueIndex("criterion_marks_index_0").on(t.criterionId, t.mark)],
);

export const criterionMarksRelations = relations(
  criterionMarksTable,
  ({ one }) => ({
    criterion: one(criteriaTable, {
      fields: [criterionMarksTable.criterionId],
      references: [criteriaTable.id],
    }),
  }),
);
