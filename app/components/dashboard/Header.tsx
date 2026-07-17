"use client"

import { useEffect, useState } from "react"
import { Menu, Moon, Sun, LogOut, User } from "lucide-react"
import { useTheme } from "@/app/components/theme-provider"
import { authClient } from "@/app/lib/auth-client"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { getJwt } from "@/app/actions/getJwt"
import Image from "next/image"

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
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

  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.id) return
      try {
        const token = await getJwt()
        const res = await fetch("http://localhost:4000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        if (data.success) {
          setProfile(data.data)
        }
      } catch (err) {
        console.error("Failed to fetch profile header", err)
      }
    }
    fetchProfile()
  }, [session])

  // Fallback to session data if profile hasn't loaded or doesn't have it
  const displayName = profile?.name || session?.user?.name || "User"
  const displayEmail = profile?.email || session?.user?.email || "user@motora.com"
  const displayImage = profile?.avatar || session?.user?.image || null

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/5 bg-[#0B1120]/80 backdrop-blur-xl px-4 sm:px-6">
      <button onClick={onMenuClick} className="text-gray-400 hover:text-white lg:hidden">
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex-1" />



      <div className="flex items-center gap-3 border-l border-white/5 pl-4">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-white">{displayName}</p>
          <p className="text-xs text-gray-500">{displayEmail}</p>
        </div>
        {displayImage ? (
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/10">
            <Image src={displayImage} alt={displayName} fill className="object-cover" />
          </div>
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#00D2FF] to-[#0055FF] text-xs font-bold text-white">
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}
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
