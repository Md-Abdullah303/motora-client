"use client"

import { useEffect, useState } from "react"
import { authClient } from "@/app/lib/auth-client"
import { useRouter } from "next/navigation"
import { User, Phone, MapPin, Mail, UserCircle2, Edit, Loader2 } from "lucide-react"
import Link from "next/link"
import { getJwt } from "@/app/actions/getJwt"

interface UserProfile {
  name?: string
  email?: string
  phone?: string
  location?: string
  gender?: string
  avatar?: string
}

export default function ProfilePage() {
  const { data: session } = authClient.useSession()
  const [profile, setProfile] = useState<UserProfile>({})
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.id) return
      try {
        const token = await getJwt()
        const res = await fetch(\`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/users/me\`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (data.success) {
          setProfile(data.data)
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [session])

  const displayName = profile.name || session?.user?.name || "None"
  const displayEmail = profile.email || session?.user?.email || "None"
  const displayAvatar = profile.avatar || null
  const initials = displayName.charAt(0).toUpperCase()

  const fields = [
    { icon: User, label: "Full Name", value: displayName },
    { icon: Mail, label: "Email", value: displayEmail },
    { icon: Phone, label: "Phone", value: profile.phone || "None" },
    { icon: MapPin, label: "Location", value: profile.location || "None" },
    { icon: UserCircle2, label: "Gender", value: profile.gender || "None" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
          <p className="text-sm text-gray-400 mt-1">View and manage your personal information.</p>
        </div>
        <Link href="/dashboard/profile/edit">
          <button className="flex items-center gap-2 rounded-xl bg-[#00D2FF]/10 border border-[#00D2FF]/30 text-[#00D2FF] hover:bg-[#00D2FF] hover:text-[#0B1120] font-bold uppercase tracking-wider text-xs px-5 py-2.5 transition-all">
            <Edit className="w-4 h-4" /> Edit Profile
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#00D2FF]" />
        </div>
      ) : (
        <div className="rounded-2xl border border-white/5 bg-[#1E293B] overflow-hidden">
          {/* Hero Banner */}
          <div className="h-28 bg-gradient-to-r from-[#00D2FF]/20 via-[#0055FF]/20 to-[#00D2FF]/10 relative">
            <div className="absolute -bottom-12 left-8">
              {displayAvatar ? (
                <img
                  src={displayAvatar}
                  alt={displayName}
                  className="w-24 h-24 rounded-full border-4 border-[#1E293B] object-cover shadow-xl"
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-[#1E293B] bg-gradient-to-br from-[#00D2FF] to-[#0055FF] flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                  {initials}
                </div>
              )}
            </div>
          </div>

          {/* Name & Email below avatar */}
          <div className="pt-16 px-8 pb-2">
            <h2 className="text-xl font-bold text-white">{displayName}</h2>
            <p className="text-sm text-gray-400">{displayEmail}</p>
          </div>

          {/* Fields */}
          <div className="px-8 py-6 grid gap-4 sm:grid-cols-2">
            {fields.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-xl border border-white/5 bg-white/5 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-3.5 h-3.5 text-[#00D2FF]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</span>
                </div>
                <p className={`text-sm font-medium ${value === "None" ? "text-gray-600 italic" : "text-white"}`}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
