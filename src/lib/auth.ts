import { db } from "@/drizzle/db";
import {
  AccountTable,
  SessionTable,
  userRoles,
  UserTable,
  VerificationTable,
} from "@/drizzle/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: {
      user: UserTable,
      session: SessionTable,
      account: AccountTable,
      verification: VerificationTable,
    },
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: userRoles[0], // "user"
        //input: false, // don't allow user to set role
      },
    },
  },
  advanced: {
    generateId: false, // avoid uuid invalid error
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
