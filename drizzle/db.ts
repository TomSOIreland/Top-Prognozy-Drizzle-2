import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";


export const db = drizzle({
  schema,
  connection: {
    prepare: false,
    url: process.env.DATABASE_URL,
  },
});