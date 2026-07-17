"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LayoutDashboard, PlusCircle, ListOrdered, CreditCard, X } from "lucide-react"
import { cn } from "@/app/lib/utils"

const sidebarLinks = [
  { label: "Overview & Profile", href: "/dashboard", icon: LayoutDashboard },
  { label: "Add New Car", href: "/dashboard/add-car", icon: PlusCircle },
  { label: "Manage My Listings", href: "/dashboard/listings", icon: ListOrdered },
  { label: "Payment History", href: "/dashboard/payments", icon: CreditCard },
]

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-full w-64 flex-col border-r border-white/5 bg-[#0B1120] transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/5 px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src="/MOTORA.png" alt="MOTORA" width={110} height={32} className="object-contain" />
          </Link>
          <button onClick={onClose} className="text-gray-400 hover:text-white lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-6">
          {sidebarLinks.map((link) => {
            const Icon = link.icon
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-[#00D2FF]/10 text-[#00D2FF]"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="border-t border-white/5 px-6 py-4">
          <p className="text-xs text-gray-600">MOTORA v1.0</p>
        </div>
      </aside>
    </>
  )
}
