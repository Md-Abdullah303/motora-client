'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react"
import toast from "react-hot-toast"
import { authClient } from "@/app/lib/auth-client"

function getPasswordStrength(password: string): {
  label: string
  color: string
  width: string
} {
  if (!password) return { label: "", color: "", width: "0%" }
  const hasUpper = /[A-Z]/.test(password)
  const hasLower = /[a-z]/.test(password)
  const hasDigit = /\d/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)
  const score = [hasUpper, hasLower, hasDigit, hasSpecial].filter(Boolean).length
  if (password.length < 6) return { label: "Weak", color: "bg-red-500", width: "25%" }
  if (score <= 2) return { label: "Fair", color: "bg-orange-400", width: "50%" }
  if (score <= 3) return { label: "Good", color: "bg-yellow-400", width: "75%" }
  return { label: "Strong", color: "bg-emerald-400", width: "100%" }
}

export default function SignUpPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      const msg = "Passwords do not match."
      setError(msg)
      toast.error(msg)
      return
    }

    if (!formData.agreeTerms) {
      const msg = "You must agree to the Terms of Service and Privacy Policy."
      setError(msg)
      toast.error(msg)
      return
    }

    setIsLoading(true)
    const loadingToast = toast.loading("Creating your account...")

    const { error: authError } = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
    })

    toast.dismiss(loadingToast)
    setIsLoading(false)

    if (authError) {
      const message = authError.message || "Something went wrong. Please try again."
      setError(message)
      toast.error(message)
      return
    }

    toast.success("Account created successfully! Welcome aboard.")
    router.push("/")
  }

  const strength = getPasswordStrength(formData.password)

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A111E] px-4 py-12">
      <div className="relative w-full max-w-[440px]">
        {/* Card with top gradient border */}
        <div className="relative rounded-2xl bg-[#121D2F] p-8 pt-12 sm:p-10 sm:pt-14">
          {/* Top neon gradient border accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-[#00D2FF] to-[#0055FF]" />

          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#00D2FF] to-[#0055FF]">
                <span className="text-xs font-bold text-white">M</span>
              </div>
              <span
                className="text-lg font-bold text-white"
                style={{ fontFamily: "var(--font-serif-display)" }}
              >
                Motora
              </span>
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1
              className="text-3xl font-bold text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-serif-display)" }}
            >
              Join the Future
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Create your account and start exploring the platform.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Error Message */}
            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 pointer-events-none" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="h-11 w-full rounded-md border border-gray-700/60 bg-[#121D2F] pl-10 pr-3 text-sm text-white placeholder:text-gray-700 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition-colors"
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 pointer-events-none" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-11 w-full rounded-md border border-gray-700/60 bg-[#121D2F] pl-10 pr-3 text-sm text-white placeholder:text-gray-700 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition-colors"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 pointer-events-none" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-11 w-full rounded-md border border-gray-700/60 bg-[#121D2F] pl-10 pr-11 text-sm text-white placeholder:text-gray-700 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition-colors"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {/* Password Strength */}
              {formData.password && (
                <div className="pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase tracking-widest text-gray-600">
                      Password Strength
                    </span>
                    <span
                      className={`text-[10px] font-medium ${
                        strength.label === "Strong"
                          ? "text-emerald-400"
                          : strength.label === "Good"
                            ? "text-yellow-400"
                            : strength.label === "Fair"
                              ? "text-orange-400"
                              : "text-red-500"
                      }`}
                    >
                      {strength.label}
                    </span>
                  </div>
                  <div className="h-[2px] w-full bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${strength.color} rounded-full transition-all duration-300`}
                      style={{ width: strength.width }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                Confirm Password
              </label>
              <div className="relative">
                <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 pointer-events-none" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="h-11 w-full rounded-md border border-gray-700/60 bg-[#121D2F] pl-10 pr-11 text-sm text-white placeholder:text-gray-700 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition-colors"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                  tabIndex={-1}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-700 bg-[#121D2F] text-[#00D2FF] focus:ring-[#00D2FF] focus:ring-offset-0 accent-[#00D2FF]"
                required
              />
              <label className="text-sm leading-relaxed text-gray-400 cursor-pointer select-none">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-[#00D2FF] hover:text-[#00D2FF]/80 transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#00D2FF] hover:text-[#00D2FF]/80 transition-colors"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full h-12 rounded-full bg-gradient-to-r from-[#00D2FF] to-[#0055FF] text-[#0A111E] text-sm font-bold tracking-widest uppercase shadow-lg shadow-[#00D2FF]/30 hover:shadow-[#00D2FF]/50 hover:from-[#00D2FF]/90 hover:to-[#0055FF]/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden group"
              style={{ fontFamily: "var(--font-serif-display)" }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </span>
              {/* Shine overlay on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </button>
          </form>

          {/* Secure Encryption Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#121D2F] px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">
                Secure Encryption
              </span>
            </div>
          </div>

          {/* Bottom Link */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#00D2FF] hover:text-[#00D2FF]/80 font-medium transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
