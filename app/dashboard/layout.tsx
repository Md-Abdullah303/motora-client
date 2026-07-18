"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/app/lib/auth-client"
import { ThemeProvider } from "@/app/components/theme-provider"
import Sidebar from "@/app/components/dashboard/Sidebar"
import Header from "@/app/components/dashboard/Header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { data: session, isPending } = authClient.useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login?callbackUrl=/dashboard")
    }
  }, [session, isPending, router])

  if (isPending) {
    return <div className="flex min-h-screen items-center justify-center bg-[#0B1120] text-white">Loading...</div>
  }

  if (!session?.user) {
    return null; // Prevents flashing before redirect
  }

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-[#0B1120] dark:bg-[#0B1120] light:bg-[#F8FAFC]">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex flex-1 flex-col min-w-0">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  )
}
