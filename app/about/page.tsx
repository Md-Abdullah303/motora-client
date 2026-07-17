import Navbar from "@/app/components/Navbar"
import Image from "next/image"
import Footer from "@/app/components/Footer"
import { Shield, Zap, Users, Target, Award, Globe } from "lucide-react"

const VALUES = [
  { icon: Shield, title: "Trust & Transparency", desc: "Every listing is verified. We maintain a zero-tolerance policy for fraud, ensuring your transactions are always safe." },
  { icon: Zap, title: "AI-Powered Insights", desc: "Our AI engine analyzes market trends and vehicle data to give you recommendations that are ahead of the curve." },
  { icon: Users, title: "Community First", desc: "MOTORA was built by car enthusiasts for car enthusiasts. Your passion drives our platform." },
  { icon: Target, title: "Precision Matching", desc: "We connect the right buyer with the right seller using smart filters and intelligent search algorithms." },
  { icon: Award, title: "Premium Quality", desc: "We curate only the finest inventory — from hypercars to luxury sedans — meeting the highest standards." },
  { icon: Globe, title: "Global Reach", desc: "Access listings from around the world with multi-currency support and international buyer protection." },
]

const TEAM = [
  { name: "Alex Mercer", role: "CEO & Co-Founder", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Sarah Chen", role: "CTO & AI Lead", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Marcus Reid", role: "Head of Product", avatar: "https://randomuser.me/api/portraits/men/46.jpg" },
  { name: "Priya Sharma", role: "Lead Designer", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
]

const STATS = [
  { value: "12,000+", label: "Cars Listed" },
  { value: "8,500+", label: "Happy Buyers" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "45+", label: "Countries Served" },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0B1120]">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden py-24 px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00D2FF]/10 via-transparent to-[#0055FF]/10" />
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-[#00D2FF]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-[#0055FF]/5 rounded-full blur-3xl" />
          <div className="relative mx-auto max-w-4xl text-center">
            <span className="inline-block rounded-full border border-[#00D2FF]/30 bg-[#00D2FF]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#00D2FF] mb-6">
              Our Story
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Redefining How the World{" "}
              <span className="bg-gradient-to-r from-[#00D2FF] to-[#0055FF] bg-clip-text text-transparent">
                Buys & Sells Cars
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              MOTORA was founded on the belief that buying or selling a premium vehicle should be as exciting as the car itself — seamless, intelligent, and utterly premium.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 px-4 border-y border-white/5">
          <div className="mx-auto max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-[#00D2FF] to-[#0055FF] bg-clip-text text-transparent">{s.value}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 px-4">
          <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <span className="inline-block rounded-full border border-[#00D2FF]/30 bg-[#00D2FF]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#00D2FF] mb-4">
                Our Mission
              </span>
              <h2 className="text-3xl font-bold text-white mb-5">
                Technology Meets Automotive Passion
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We started MOTORA because we were frustrated with outdated car marketplaces that treated luxury vehicles like used furniture. Every Hypercar, Supercar, and high-end Luxury vehicle deserves to be showcased with the respect and intelligence it commands.
              </p>
              <p className="text-gray-400 leading-relaxed">
                By integrating cutting-edge AI into every touchpoint — from smart search to personalized recommendations — we've created a marketplace that doesn't just list cars, it understands them.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {VALUES.slice(0, 4).map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-2xl border border-white/5 bg-[#1E293B] p-5 hover:border-[#00D2FF]/20 transition-colors">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00D2FF]/20 to-[#0055FF]/20 mb-3">
                    <Icon className="h-5 w-5 text-[#00D2FF]" />
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4 bg-[#1E293B]/30">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <span className="inline-block rounded-full border border-[#00D2FF]/30 bg-[#00D2FF]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#00D2FF] mb-4">Our Values</span>
              <h2 className="text-3xl font-bold text-white">What We Stand For</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {VALUES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-2xl border border-white/5 bg-[#1E293B] p-6 hover:border-[#00D2FF]/20 transition-all hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00D2FF]/20 to-[#0055FF]/20 mb-4">
                    <Icon className="h-6 w-6 text-[#00D2FF]" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 px-4">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-block rounded-full border border-[#00D2FF]/30 bg-[#00D2FF]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#00D2FF] mb-4">The Team</span>
            <h2 className="text-3xl font-bold text-white mb-12">Built by Car People, for Car People</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {TEAM.map((member) => (
                <div key={member.name} className="rounded-2xl border border-white/5 bg-[#1E293B] p-6 text-center hover:border-[#00D2FF]/20 transition-colors">
                  <div className="relative w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-2 border-white/10 hover:border-[#00D2FF]/50 transition-colors">
                    <Image src={member.avatar} alt={member.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">{member.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
