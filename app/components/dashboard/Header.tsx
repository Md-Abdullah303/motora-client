"use client"

import { Menu, Moon, Sun, LogOut, User } from "lucide-react"
import { useTheme } from "@/app/components/theme-provider"
import { authClient } from "@/app/lib/auth-client"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const { data: session } = authClient.useSession()

  const handleLogout = async () => {
    const loading = toast.loading("Logging out...")
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.dismiss(loading)
          toast.success("Logged out successfully.")
          router.push("/")
        },
        onError: () => {
          toast.dismiss(loading)
          toast.error("Logout failed.")
        },
      },
    })
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/5 bg-[#0B1120]/80 backdrop-blur-xl px-4 sm:px-6">
      <button onClick={onMenuClick} className="text-gray-400 hover:text-white lg:hidden">
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex-1" />

      <button
        onClick={toggleTheme}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      <div className="flex items-center gap-3 border-l border-white/5 pl-4">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-white">{session?.user?.name || "User"}</p>
          <p className="text-xs text-gray-500">{session?.user?.email || "user@motora.com"}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#00D2FF] to-[#0055FF] text-xs font-bold text-white">
          {(session?.user?.name || "U").charAt(0).toUpperCase()}
        </div>
        <button
          onClick={handleLogout}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-400/30 transition-colors"
          aria-label="Logout"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}
