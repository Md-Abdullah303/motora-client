"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, SlidersHorizontal, ArrowRight } from "lucide-react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import Link from "next/link"
import { motion } from "framer-motion"

const categories = ["All Categories", "Hypercar", "Supercar", "Sports Car", "Luxury"]

export default function HeroSection() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All Categories")
  const [priceRange, setPriceRange] = useState("Any Price")

  const handleSearch = () => {
    let maxPrice = "1000000"
    if (priceRange === "$20k - $40k") maxPrice = "40000"
    if (priceRange === "$40k - $60k") maxPrice = "60000"
    if (priceRange === "$60k - $100k") maxPrice = "100000"
    if (priceRange === "$100k+") maxPrice = "1000000"

    router.push(`/cars?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}&maxPrice=${maxPrice}`)
  }
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[#00D2FF]/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-[#0055FF]/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00D2FF]/20 bg-[#00D2FF]/5 px-4 py-1.5 text-xs font-medium text-[#00D2FF]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D2FF] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00D2FF]" />
          </span>
          Powered by Agentic AI
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Find Your Perfect{" "}
          <span className="bg-gradient-to-r from-[#00D2FF] to-[#0055FF] bg-clip-text text-transparent">
            Drive
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 max-w-2xl text-base text-gray-400 sm:text-lg"
        >
          An AI-powered marketplace that learns your preferences and finds the
          ideal car. Smart search, instant matches, zero hassle.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link href="/cars">
            <Button size="lg" className="gap-2">
              Browse Cars
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="lg">
            How It Works
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 w-full max-w-3xl rounded-2xl border border-white/10 bg-[#0F1729]/60 p-4 backdrop-blur-xl sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-2">
              <label className="text-xs font-medium text-gray-400">
                Search
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="e.g. Tesla Model 3"
                  className="pl-10 text-white placeholder:text-gray-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-xs font-medium text-gray-400">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex h-11 w-full rounded-md border border-white/10 bg-[#0B1120] px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF]"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-[#0B1120]">
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-xs font-medium text-gray-400">
                Price Range
              </label>
              <select 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="flex h-11 w-full rounded-md border border-white/10 bg-[#0B1120] px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF]"
              >
                <option className="bg-[#0B1120]">Any Price</option>
                <option className="bg-[#0B1120]">$20k - $40k</option>
                <option className="bg-[#0B1120]">$40k - $60k</option>
                <option className="bg-[#0B1120]">$60k - $100k</option>
                <option className="bg-[#0B1120]">$100k+</option>
              </select>
            </div>
            <Button onClick={handleSearch} className="gap-2 sm:mb-0">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex items-center gap-6 text-sm text-gray-500"
        >
          <span className="flex items-center gap-1">
            <span className="text-[#00D2FF]">&#9679;</span> 12,000+ Listings
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#0055FF]">&#9679;</span> 99% Satisfaction
          </span>
          <span className="flex items-center gap-1">
            <SlidersHorizontal className="h-3.5 w-3.5 text-gray-500" /> AI
            Matched
          </span>
        </motion.div>
      </div>
    </section>
  )
}
