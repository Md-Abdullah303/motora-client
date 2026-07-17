"use client"

import { Mail, ArrowRight } from "lucide-react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { motion } from "framer-motion"

export default function NewsletterSection() {
  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-96 w-96 rounded-full bg-[#00D2FF]/[0.03] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0F1729] to-[#0B1120] px-6 py-14 sm:px-14 sm:py-20"
        >
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#00D2FF]/10 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#0055FF]/10 blur-[80px]" />

          <div className="relative mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00D2FF]/10">
              <Mail className="h-6 w-6 text-[#00D2FF]" />
            </div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Stay Ahead of the{" "}
              <span className="text-[#00D2FF]">Curve</span>
            </h2>
            <p className="mt-3 text-gray-400">
              Get weekly AI-curated car listings, market insights, and exclusive
              deals delivered straight to your inbox.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button type="submit" className="gap-2">
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <p className="mt-4 text-xs text-gray-600">
              No spam. Unsubscribe anytime. 10,000+ subscribers.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
