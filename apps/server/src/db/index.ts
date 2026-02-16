import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { config } from "~/config";
import * as schema from "./schema";

const sqlite = new Database(config.DB_FILE_NAME);

export const db = drizzle({ client: sqlite, schema });

export * from "~/db/schema";
