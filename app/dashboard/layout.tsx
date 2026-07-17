"use client"

import { useState } from "react"
import { ThemeProvider } from "@/app/components/theme-provider"
import Sidebar from "@/app/components/dashboard/Sidebar"
import Header from "@/app/components/dashboard/Header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-[#0B1120] dark:bg-[#0B1120] light:bg-[#F8FAFC]">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex flex-1 flex-col">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  )
}
