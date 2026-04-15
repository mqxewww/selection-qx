import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { db } from "~server/db/index";

migrate(db, { migrationsFolder: "./drizzle" });
