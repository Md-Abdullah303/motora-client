"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Receipt, ShoppingCart, Loader2 } from "lucide-react"
import { Button } from "@/app/components/ui/Button"
import { authClient } from "@/app/lib/auth-client"
import { getJwt } from "@/app/actions/getJwt"

interface Payment {
  _id: string
  stripeSessionId: string
  amount: number
  currency: string
  carId: string
  status: string
  createdAt: string
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const { data: session } = authClient.useSession()

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = await getJwt()
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/users/me/payments`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        const data = await res.json()
        if (data.success) {
          setPayments(data.data || [])
        }
      } catch (err) {
        console.error("Failed to fetch payments:", err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPayments()
  }, [session])

  const totalSpent = payments.reduce((sum, p) => sum + (p.amount || 0), 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Payment History</h1>
        <p className="text-sm text-gray-400">Track your purchases and checkout records.</p>
      </div>

      <div className="flex gap-1 rounded-xl border border-white/5 bg-[#1E293B] p-1 w-fit">
        <button className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all bg-[#00D2FF] text-[#0B1120] shadow-sm">
          <ShoppingCart className="h-4 w-4" /> Purchases
        </button>
      </div>

      <div className="rounded-xl border border-white/5 bg-[#1E293B] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Date", "Session ID", "Amount", "Status", "Receipt"].map((h) => (
                  <th key={h} className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#00D2FF]" />
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">
                    You haven't made any purchases yet.
                  </td>
                </tr>
              ) : (
                payments.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-[#00D2FF]">
                        {item.stripeSessionId.substring(0, 15)}...
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-white">
                      ${item.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 uppercase tracking-widest">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5 text-xs text-[#00D2FF] hover:text-[#00D2FF]/80"
                      >
                        <Receipt className="h-3.5 w-3.5" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/5 bg-[#1E293B] p-5">
          <p className="text-sm text-gray-400">Total Spent on Purchases</p>
          <p className="mt-1 text-2xl font-bold text-white">
            ${totalSpent.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}
