"use client"

import { useEffect, useState, useCallback } from "react"
import { authClient } from "@/app/lib/auth-client"
import { useRouter } from "next/navigation"
import { Loader2, Upload, X, CheckCircle2, ArrowLeft } from "lucide-react"
import toast from "react-hot-toast"
import Link from "next/link"
import { getJwt } from "@/app/actions/getJwt"

const IMGBB_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || ""
const GENDERS = ["Male", "Female", "Non-binary", "Prefer not to say"]

export default function EditProfilePage() {
  const { data: session } = authClient.useSession()
  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    gender: "",
  })
  const [avatar, setAvatar] = useState<string>("")
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>("")
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loadingProfile, setLoadingProfile] = useState(true)

  // Load existing profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.id) return
      try {
        const token = await getJwt()
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (data.success && data.data) {
          const p = data.data
          setForm({
            name: p.name || session.user.name || "",
            phone: p.phone || "",
            location: p.location || "",
            gender: p.gender || "",
          })
          setAvatar(p.avatar || "")
          setAvatarPreview(p.avatar || "")
        } else {
          setForm(f => ({ ...f, name: session.user?.name || "" }))
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err)
      } finally {
        setLoadingProfile(false)
      }
    }
    fetchProfile()
  }, [session])

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.")
      return
    }
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [])

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const onDragLeave = () => setIsDragging(false)

  const uploadToImgBB = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("image", file)
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
      method: "POST",
      body: formData,
    })
    const data = await res.json()
    if (!data.success) throw new Error("Image upload failed")
    return data.data.url
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user?.id) return

    setSaving(true)
    const loadingToast = toast.loading("Saving profile...")

    try {
      let finalAvatar = avatar

      // Upload image to ImgBB if a new file was selected
      if (avatarFile) {
        setUploading(true)
        finalAvatar = await uploadToImgBB(avatarFile)
        setUploading(false)
      }

      const token = await getJwt()
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...form, avatar: finalAvatar }),
      })

      const data = await res.json()
      if (data.success) {
        toast.success("Profile updated successfully!", { id: loadingToast })
        router.push("/dashboard/profile")
      } else {
        throw new Error(data.error || "Update failed")
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong", { id: loadingToast })
    } finally {
      setSaving(false)
    }
  }

  if (loadingProfile) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#00D2FF]" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/profile" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
          <p className="text-sm text-gray-400">Update your personal information.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Drag & Drop */}
        <div className="rounded-2xl border border-white/5 bg-[#1E293B] p-6">
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
            Profile Photo
          </label>
          <div className="flex items-center gap-6">
            {/* Preview */}
            <div className="relative flex-shrink-0">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="w-20 h-20 rounded-full border-2 border-[#00D2FF]/50 object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00D2FF] to-[#0055FF] flex items-center justify-center text-2xl font-bold text-white border-2 border-[#00D2FF]/30">
                  {(form.name || "U").charAt(0).toUpperCase()}
                </div>
              )}
              {avatarPreview && (
                <button
                  type="button"
                  onClick={() => { setAvatarPreview(""); setAvatarFile(null); setAvatar("") }}
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Drop Zone */}
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onClick={() => document.getElementById("avatar-input")?.click()}
              className={`flex-1 rounded-xl border-2 border-dashed p-5 text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-[#00D2FF] bg-[#00D2FF]/5"
                  : "border-white/10 hover:border-[#00D2FF]/50 hover:bg-white/5"
              }`}
            >
              <Upload className="w-6 h-6 text-gray-500 mx-auto mb-2" />
              <p className="text-sm text-gray-400">
                Drag & drop or <span className="text-[#00D2FF] font-medium">browse</span>
              </p>
              <p className="text-xs text-gray-600 mt-1">PNG, JPG, WEBP up to 5MB</p>
              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }}
              />
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="rounded-2xl border border-white/5 bg-[#1E293B] p-6 space-y-5">
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">
            Personal Details
          </label>

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your full name"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00D2FF] transition-colors"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00D2FF] transition-colors"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
              Location
            </label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="City, Country"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00D2FF] transition-colors"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
              Gender
            </label>
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00D2FF] transition-colors"
            >
              <option value="">Select gender</option>
              {GENDERS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-[#00D2FF] text-[#0B1120] font-bold px-6 py-3 hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
            {uploading ? "Uploading image..." : saving ? "Saving..." : "Save Changes"}
          </button>
          <Link
            href="/dashboard/profile"
            className="rounded-xl border border-white/10 text-gray-400 hover:text-white px-6 py-3 text-sm font-medium transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
