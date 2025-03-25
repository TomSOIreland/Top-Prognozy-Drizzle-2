import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { env } from "@/data/env/server"

export const db = drizzle({
  schema,
  connection: {
    prepare: false,
    password: env.DB_PASSWORD,
    user: env.DB_USER,
    database: env.DB_NAME,
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
  },
});
