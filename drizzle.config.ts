import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/api/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "./src/api/db/database.db",
  },
});
