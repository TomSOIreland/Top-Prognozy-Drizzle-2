import { defineConfig } from "drizzle-kit";
import { env } from "@/data/env/server"


console.log({
  DB_PASSWORD: env.DB_PASSWORD,
  DB_USER: env.DB_USER,
  DB_NAME: env.DB_NAME,
  DB_HOST: env.DB_HOST,
  DB_PORT: env.DB_PORT,
});

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  strict: true,
  verbose: true,
  dbCredentials: {
    password: env.DB_PASSWORD,
    user: env.DB_USER,
    database: env.DB_NAME,
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    ssl: false,
  },
});
