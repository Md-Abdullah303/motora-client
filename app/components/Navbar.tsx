"use client"

import { useState } from "react"
import { Menu, X, Car, LogIn } from "lucide-react"
import { Button } from "./ui/Button"
import { cn } from "@/app/lib/utils"

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Browse Cars", href: "#cars" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0B1120]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          <Car className="h-6 w-6 text-[#00D2FF]" />
          <span className="text-xl font-bold tracking-widest text-white">
            MOTO<span className="text-[#00D2FF]">RA</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <Button variant="outline" size="sm" className="gap-2">
            <LogIn className="h-4 w-4" />
            Login
          </Button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center p-2 text-gray-300 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-white/5 bg-[#0B1120] transition-all duration-300 md:hidden",
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col gap-2 px-4 py-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <Button variant="outline" size="sm" className="mt-2 w-full gap-2">
            <LogIn className="h-4 w-4" />
            Login
          </Button>
        </div>
      </div>
    </nav>
  )
}
