"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/app/lib/auth-client"

export default function PaymentLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login")
    }
  }, [session, isPending, router])

  if (isPending) {
    return <div className="flex min-h-screen items-center justify-center bg-[#0B1120] text-white">Loading...</div>
  }

  if (!session?.user) {
    return null;
  }

  return <>{children}</>
}
