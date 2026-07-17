"use client"

import { Zap, Shield, Cpu, Sparkles, Gauge, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import { motion } from "framer-motion"

const features = [
  {
    icon: Cpu,
    title: "AI-Powered Matching",
    description:
      "Our intelligent algorithms analyze your preferences to find the perfect vehicle match instantly.",
  },
  {
    icon: Zap,
    title: "Lightning Fast Search",
    description:
      "Search through thousands of listings in milliseconds with our optimized AI search engine.",
  },
  {
    icon: Shield,
    title: "Verified Listings",
    description:
      "Every car is authenticated and verified through our multi-layer AI validation system.",
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    description:
      "Get personalized vehicle suggestions that improve over time as you interact with the platform.",
  },
  {
    icon: Gauge,
    title: "Performance Analytics",
    description:
      "Compare vehicles side-by-side with detailed AI-generated performance insights and data.",
  },
  {
    icon: Globe,
    title: "Global Marketplace",
    description:
      "Access listings from around the world with real-time currency conversion and shipping estimates.",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Why Choose{" "}
            <span className="text-[#00D2FF]">Motora</span>
          </h2>
          <p className="mt-3 text-gray-400">
            Experience the future of car buying with our AI-driven platform
            designed to save you time and money.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
            <Card
              className="group border-white/5 transition-all duration-300 hover:border-[#00D2FF]/20 hover:shadow-lg hover:shadow-[#00D2FF]/5"
            >
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#00D2FF]/10 text-[#00D2FF] transition-colors group-hover:bg-[#00D2FF]/20">
                  <feature.icon className="h-6 w-6" />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg text-white">
                  {feature.title}
                </CardTitle>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
