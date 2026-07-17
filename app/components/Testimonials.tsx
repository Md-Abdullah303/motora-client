"use client"

import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "./ui/Card"

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Software Engineer",
    avatar: "SM",
    content:
      "Motora's AI found me the perfect Tesla Model 3 within hours. The recommendation engine understood exactly what I was looking for. Incredible experience!",
    rating: 5,
  },
  {
    name: "James Rodriguez",
    role: "Entrepreneur",
    avatar: "JR",
    content:
      "I've bought and sold over 10 cars on Motora. The AI pricing tool is spot-on and the fraud detection gives me peace of mind with every transaction.",
    rating: 5,
  },
  {
    name: "Emily Chang",
    role: "Designer",
    avatar: "EC",
    content:
      "The visual recognition feature is a game-changer. I took a photo of a car on the street and Motora instantly found similar listings. Absolutely amazing.",
    rating: 5,
  },
  {
    name: "Michael Thompson",
    role: "Marketing Director",
    avatar: "MT",
    content:
      "From browsing to purchase, Motora made everything seamless. The AI matched me with a certified pre-owned BMW that exceeded all my expectations.",
    rating: 4,
  },
]

export default function Testimonials() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Trusted by{" "}
            <span className="text-[#00D2FF]">Thousands</span>
          </h2>
          <p className="mt-3 text-gray-400">
            Hear from our community of car enthusiasts and buyers who found
            their perfect match with Motora.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
            <Card
              className="relative border-white/5 transition-all duration-300 hover:border-[#00D2FF]/20"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-[#00D2FF]/10" />
              <CardContent className="p-6">
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < t.rating
                          ? "fill-[#00D2FF] text-[#00D2FF]"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-gray-300">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#00D2FF] to-[#0055FF] text-xs font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
