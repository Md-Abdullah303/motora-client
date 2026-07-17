"use server"

import { getAuth } from "@/app/lib/auth"
import { headers } from "next/headers"
import * as jose from "jose"

export async function getJwt() {
  const auth = await getAuth();
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList })
  
  if (!session?.user) return null;
  
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-super-secret-key-change-in-production")
  
  const jwt = await new jose.SignJWT({ sub: session.user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret)
    
  return jwt;
}
