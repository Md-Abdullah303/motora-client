"use client"

import { Car, Users, Award, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  { icon: Car, value: "12,000+", label: "Cars Listed", color: "#00D2FF" },
  { icon: Users, value: "50,000+", label: "Active Users", color: "#0055FF" },
  { icon: Award, value: "99.2%", label: "Satisfaction Rate", color: "#00D2FF" },
  { icon: TrendingUp, value: "$2.4B+", label: "Transaction Value", color: "#0055FF" },
]

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00D2FF]/[0.02] to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-xl border border-white/5 bg-[#0F1729]/40 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-[#00D2FF]/20 hover:shadow-lg hover:shadow-[#00D2FF]/5"
            >
              <div
                className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full transition-colors group-hover:opacity-90"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
              </div>
              <p
                className="text-3xl font-bold"
                style={{ color: stat.color }}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
