import { db } from '@/db/drizzle'
import { schema } from '@/db/schema'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
    schema: schema
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false
  },
  plugins: [nextCookies()]
})
