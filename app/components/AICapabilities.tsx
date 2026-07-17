"use client"

import { Brain, Tag, Sparkles, BarChart3, ShieldCheck, ScanLine } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import { Badge } from "./ui/Badge"

const capabilities = [
  {
    icon: Brain,
    title: "AI Auto Classification",
    description:
      "Our AI automatically categorizes and tags vehicles with high accuracy, making搜索 effortless.",
    badge: "Core",
  },
  {
    icon: ScanLine,
    title: "Visual Recognition",
    description:
      "Upload any car photo and our AI identifies the make, model, year, and trim level instantly.",
    badge: "Vision",
  },
  {
    icon: Sparkles,
    title: "Smart Recommendation Engine",
    description:
      "Get personalized suggestions based on your driving habits, budget, and style preferences.",
    badge: "ML",
  },
  {
    icon: BarChart3,
    title: "Price Prediction",
    description:
      "AI-driven market analysis predicts fair pricing and future value depreciation trends.",
    badge: "Analytics",
  },
  {
    icon: ShieldCheck,
    title: "Fraud Detection",
    description:
      "Advanced algorithms detect suspicious listings and protect buyers from scams.",
    badge: "Security",
  },
  {
    icon: Tag,
    title: "Auto-Tagging System",
    description:
      "Automatic generation of relevant tags and keywords for every listing to boost discoverability.",
    badge: "NLP",
  },
]

export default function AICapabilities() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-[#0055FF]/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <Badge variant="secondary" className="mb-4">
            Powered by Agentic AI
          </Badge>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            AI Capabilities
          </h2>
          <p className="mt-3 text-gray-400">
            Cutting-edge artificial intelligence that transforms how you
            discover, evaluate, and purchase vehicles.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
            <Card
              className="group border-white/5 transition-all duration-300 hover:border-[#0055FF]/20 hover:shadow-lg hover:shadow-[#0055FF]/5"
            >
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0055FF]/10 text-[#0055FF] transition-colors group-hover:bg-[#0055FF]/20">
                  <cap.icon className="h-6 w-6" />
                </div>
                <Badge variant="secondary">{cap.badge}</Badge>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg text-white">
                  {cap.title}
                </CardTitle>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {cap.description}
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
