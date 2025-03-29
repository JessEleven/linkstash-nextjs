import { db } from '../db/drizzle'
import { schema } from '../db/schema'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
    schema
  }),
  emailAndPassword: {
    enabled: true,
    // After creating the account redirect, e.g. '/dashboard'
    autoSignIn: true
  },
  plugins: [nextCookies()]
})
