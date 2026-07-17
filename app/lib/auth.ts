import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { MongoClient } from "mongodb"

let authInstance: Awaited<ReturnType<typeof createAuth>> | null = null

async function createAuth() {
  const client = await new MongoClient(process.env.MONGODB_URI!).connect()
  const db = client.db()

  return betterAuth({
    database: mongodbAdapter(db, {
      client,
    }),
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }
    }
  })
}

export async function getAuth() {
  if (!authInstance) {
    authInstance = await createAuth()
  }
  return authInstance
}
