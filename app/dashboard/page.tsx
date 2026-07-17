"use client"

import { useState } from "react"
import { Car, DollarSign, TrendingUp, Sparkles, Camera } from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts"
import {
  MOCK_CHART_DATA, AI_RECOMMENDED_CARS,
} from "@/app/lib/mock-data"
import { Button } from "@/app/components/ui/Button"

export default function DashboardHome() {
  const [profile, setProfile] = useState({ name: "Alex Johnson", phone: "+1 (555) 123-4567", email: "alex@motora.com" })

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">Overview & Profile</h1>
        <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-500">Welcome back! Here&apos;s your dashboard summary.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Cars Listed", value: "12", icon: Car, color: "from-cyan-500 to-blue-500" },
          { label: "Total Spent", value: "$249,980", icon: DollarSign, color: "from-purple-500 to-pink-500" },
          { label: "Total Earned", value: "$234,980", icon: TrendingUp, color: "from-emerald-500 to-teal-500" },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="rounded-xl border border-white/5 bg-[#1E293B] dark:bg-[#1E293B] light:bg-white light:border-gray-200 p-5 transition-colors">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-500">{stat.label}</p>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-white dark:text-white light:text-gray-900">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Chart + Profile Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart */}
        <div className="rounded-xl border border-white/5 bg-[#1E293B] dark:bg-[#1E293B] light:bg-white light:border-gray-200 p-5 lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-white dark:text-white light:text-gray-900">Revenue Overview</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CHART_DATA}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D2FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00D2FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expensesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0055FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0055FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "#1E293B",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "8px",
                    color: "#f8fafc",
                    fontSize: "12px",
                  }}
                />
                <Area type="monotone" dataKey="sales" stroke="#00D2FF" fill="url(#salesGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="expenses" stroke="#0055FF" fill="url(#expensesGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profile */}
        <div className="rounded-xl border border-white/5 bg-[#1E293B] dark:bg-[#1E293B] light:bg-white light:border-gray-200 p-5">
          <h3 className="mb-4 text-sm font-semibold text-white dark:text-white light:text-gray-900">Profile Details</h3>
          <div className="flex flex-col items-center mb-5">
            <div className="relative mb-3">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#00D2FF] to-[#0055FF] text-2xl font-bold text-white">
                {profile.name.charAt(0)}
              </div>
              <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-[#1E293B] text-gray-400 hover:text-white transition-colors">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: "Name", value: profile.name },
              { label: "Email", value: profile.email },
              { label: "Phone", value: profile.phone },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">{f.label}</label>
                <div className="mt-1 flex h-10 items-center rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white dark:text-white light:text-gray-900 light:bg-gray-100 light:border-gray-200">
                  {f.value}
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="mt-4 w-full">
            Edit Profile
          </Button>
        </div>
      </div>

      {/* AI Recommendations */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#00D2FF]" />
          <h2 className="text-lg font-bold text-white dark:text-white light:text-gray-900">AI Smart Recommendations</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AI_RECOMMENDED_CARS.map((car) => (
            <div key={car.id} className="group rounded-xl border border-white/5 bg-[#1E293B] dark:bg-[#1E293B] light:bg-white light:border-gray-200 overflow-hidden transition-all hover:border-[#00D2FF]/30">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-700 dark:from-gray-800 dark:to-gray-700 light:from-gray-200 light:to-gray-100 relative">
                <span className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-[#00D2FF]/20 px-2.5 py-0.5 text-[10px] font-semibold text-[#00D2FF] border border-[#00D2FF]/30">
                  <Sparkles className="h-3 w-3" /> {car.badge}
                </span>
              </div>
              <div className="p-4">
                <p className="text-[11px] uppercase tracking-widest text-gray-500">{car.category}</p>
                <h3 className="mt-1 font-semibold text-white dark:text-white light:text-gray-900">{car.title}</h3>
                <p className="mt-1 text-xs text-gray-500">{car.reason}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-[#00D2FF]">${car.price.toLocaleString()}</span>
                  <Button variant="ghost" size="sm" className="text-xs">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
