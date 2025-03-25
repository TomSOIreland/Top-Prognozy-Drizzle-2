import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    DB_PASSWORD: z.string().min(1).nonempty(),
    DB_USER: z.string().min(1).nonempty(),
    DB_NAME: z.string().min(1).nonempty(),
    DB_HOST: z.string().min(1).nonempty(),
    DB_PORT: z.string().min(1).nonempty(),
    CLERK_SECRET_KEY: z.string().min(1).nonempty(),
    SIGNING_SECRET: z.string().min(1).nonempty()},
experimental__runtimeEnv: process.env,
})
