import { getAuth } from "@/app/lib/auth"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const auth = await getAuth()
  return auth.handler(request)
}

export async function GET(request: Request) {
  const auth = await getAuth()
  return auth.handler(request)
}
