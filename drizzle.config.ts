import "dotenv/config";
import type { Config } from "drizzle-kit";
export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  // driver: "pg",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
