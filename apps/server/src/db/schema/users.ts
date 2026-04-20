import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: integer().primaryKey({ autoIncrement: true }),
  firstname: text().notNull(),
  lastname: text().notNull(),
  login: text().notNull().unique(),
  password: text().notNull(),
  role: text({ enum: ["ADMIN", "EDITOR"] }).notNull(),
  createdAt: text("created_at")
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))`)
    .notNull(),
  deletedAt: text("deleted_at"),
});
