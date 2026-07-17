"use client"

import { useState } from "react"
import { ExternalLink, Receipt, TrendingUp, ShoppingCart } from "lucide-react"
import { MOCK_PURCHASES, MOCK_SALES } from "@/app/lib/mock-data"
import { Button } from "@/app/components/ui/Button"
import { cn } from "@/app/lib/utils"

const tabs = [
  { id: "purchases", label: "Purchases", icon: ShoppingCart },
  { id: "sales", label: "Sales", icon: TrendingUp },
]

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("purchases")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">Payment History</h1>
        <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-500">Track your purchases and sales records.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-white/5 bg-[#1E293B] dark:bg-[#1E293B] light:bg-white light:border-gray-200 p-1 w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const active = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                active
                  ? "bg-[#00D2FF] text-[#0B1120] shadow-sm"
                  : "text-gray-400 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="rounded-xl border border-white/5 bg-[#1E293B] dark:bg-[#1E293B] light:bg-white light:border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 light:border-gray-200">
                {["Transaction ID", "Car", "Amount", "Date", "Receipt"].map((h) => (
                  <th key={h} className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(activeTab === "purchases" ? MOCK_PURCHASES : MOCK_SALES).map(
                (item: any) => (
                  <tr
                    key={item.id}
                    className="border-b border-white/5 light:border-gray-200 last:border-0 hover:bg-white/5 light:hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-[#00D2FF]">{item.id}</span>
                    </td>
                    <td className="px-4 py-3 font-medium text-white dark:text-white light:text-gray-900">
                      {item.carTitle}
                    </td>
                    <td className="px-4 py-3 text-white dark:text-white light:text-gray-900">
                      ${item.amount?.toLocaleString() || item.payout?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-gray-400">{item.date}</td>
                    <td className="px-4 py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5 text-xs text-[#00D2FF] hover:text-[#00D2FF]/80"
                      >
                        <Receipt className="h-3.5 w-3.5" />
                        View Receipt
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                )
              )}
              {activeTab === "sales" && MOCK_SALES.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">
                    No sales yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2">
        {activeTab === "purchases" ? (
          <div className="rounded-xl border border-white/5 bg-[#1E293B] dark:bg-[#1E293B] light:bg-white light:border-gray-200 p-5">
            <p className="text-sm text-gray-400">Total Spent on Purchases</p>
            <p className="mt-1 text-2xl font-bold text-white dark:text-white light:text-gray-900">$249,980</p>
          </div>
        ) : (
          <div className="rounded-xl border border-white/5 bg-[#1E293B] dark:bg-[#1E293B] light:bg-white light:border-gray-200 p-5">
            <p className="text-sm text-gray-400">Total Earned from Sales</p>
            <p className="mt-1 text-2xl font-bold text-white dark:text-white light:text-gray-900">$234,980</p>
          </div>
        )}
        <div className="rounded-xl border border-white/5 bg-[#1E293B] dark:bg-[#1E293B] light:bg-white light:border-gray-200 p-5">
          <p className="text-sm text-gray-400">Pending Payouts</p>
          <p className="mt-1 text-2xl font-bold text-yellow-400">$0.00</p>
        </div>
      </div>
    </div>
  )
}
