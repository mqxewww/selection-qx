import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "sqlite",
  schema: "./src/db/schema",
  dbCredentials: {
    url: process.env.DB_FILE_NAME,
  },
});
