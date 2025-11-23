import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_CONNECTION_URI,
});

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
