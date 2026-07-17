"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import toast from "react-hot-toast"
import { Button } from "./ui/Button"
import { cn } from "@/app/lib/utils"
import { authClient } from "@/app/lib/auth-client"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Cars", href: "/cars" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Dashboard", href: "/dashboard" },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { data: session, isPending } = authClient.useSession()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    const loadingToast = toast.loading("Logging out...")
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.dismiss(loadingToast)
          toast.success("Logged out successfully. See you soon!")
          setLoggingOut(false)
          setOpen(false)
          router.push("/")
          router.refresh()
        },
        onError: () => {
          toast.dismiss(loadingToast)
          toast.error("Something went wrong during logout.")
          setLoggingOut(false)
        },
      },
    })
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    if (href.startsWith("/#")) return false // Don't highlight anchor links generally
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0B1120]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image src="/MOTORA.png" alt="MOTORA" width={44} height={44} className="rounded-full object-cover shadow-lg" priority />
          <span className="text-xl font-bold tracking-widest text-white">
            MOTO<span className="text-[#00D2FF] italic">RA</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks
            .filter((link) => link.href !== "/dashboard" || session)
            .map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors relative py-1",
                isActive(link.href)
                  ? "text-[#00D2FF] font-bold after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[3px] after:bg-[#00D2FF] after:rounded-full after:shadow-[0_0_8px_#00D2FF]"
                  : "text-gray-400 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div className="h-5 w-20 rounded-full bg-white/5 animate-pulse" />
          ) : session ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              disabled={loggingOut}
              className="border border-white/10 text-gray-300 hover:text-white hover:border-white/20"
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </Button>
          ) : (
            <>
              <Link
                href="/signup"
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                Register
              </Link>
              <Link href="/login">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-[#00D2FF] text-[#0B1120] hover:bg-[#00D2FF]/90 font-semibold shadow-lg shadow-[#00D2FF]/20"
                >
                  Login
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center p-2 text-gray-300 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-white/5 bg-[#0B1120]/95 backdrop-blur-xl transition-all duration-300 md:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {navLinks
            .filter((link) => link.href !== "/dashboard" || session)
            .map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "text-[#00D2FF] font-bold bg-[#00D2FF]/10 border-l-4 border-[#00D2FF]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 border-t border-white/5 pt-3">
            {session ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                disabled={loggingOut}
                className="w-full justify-center border border-white/10 text-gray-300"
              >
                {loggingOut ? "Logging out..." : "Logout"}
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full justify-center bg-[#00D2FF] text-[#0B1120] font-semibold"
                  >
                    Login
                  </Button>
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="text-center text-sm font-medium text-gray-400 hover:text-white transition-colors py-2"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
