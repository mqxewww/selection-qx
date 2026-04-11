import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { config } from "~server/config";
import * as schema from "~server/db/schema";

const sqlite = new Database(config.DB_FILE_NAME);
const db = drizzle({ client: sqlite, schema });

migrate(db, { migrationsFolder: "./drizzle" });
