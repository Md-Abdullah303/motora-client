"use client"

import { useState } from "react"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Loader2, CheckCircle2 } from "lucide-react"
import toast from "react-hot-toast"

const CONTACT_INFO = [
  {
    icon: Mail,
    title: "Email Us",
    value: "support@motora.ai",
    desc: "We'll respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+1 (800) MOTORA-1",
    desc: "Mon–Fri, 9am–6pm EST",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "123 Innovation Drive, San Francisco, CA 94105",
    desc: "By appointment only",
  },
  {
    icon: Clock,
    title: "Support Hours",
    value: "24/7 AI Chat Available",
    desc: "Human agents: Mon–Fri 9am–6pm",
  },
]

const FAQS = [
  { q: "How do I list a car on MOTORA?", a: "Create an account, navigate to Dashboard → Add New Car, fill in the details and upload photos. Your listing goes live instantly." },
  { q: "Is there a fee for listing my car?", a: "Basic listings are free. Premium spotlight placements are available for sellers who want maximum visibility." },
  { q: "How does the AI recommendation engine work?", a: "Our AI analyzes your browsing history, saved preferences, and budget to surface the most relevant vehicles just for you." },
  { q: "Is my payment information secure?", a: "Absolutely. All payments are processed through Stripe, a PCI-DSS Level 1 certified payment processor." },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.")
      return
    }
    setSending(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500))
    setSending(false)
    setSent(true)
    toast.success("Message sent! We'll get back to you soon.")
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0B1120]">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00D2FF]/10 via-transparent to-[#0055FF]/10" />
          <div className="relative mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-[#00D2FF]/30 bg-[#00D2FF]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#00D2FF] mb-6">
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              We'd Love to{" "}
              <span className="bg-gradient-to-r from-[#00D2FF] to-[#0055FF] bg-clip-text text-transparent">
                Hear From You
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Whether you have a question, a partnership inquiry, or just want to say hello — our team is ready to help.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 px-4">
          <div className="mx-auto max-w-5xl grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_INFO.map(({ icon: Icon, title, value, desc }) => (
              <div key={title} className="rounded-2xl border border-white/5 bg-[#1E293B] p-5 hover:border-[#00D2FF]/20 transition-colors">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#00D2FF]/20 to-[#0055FF]/20 mb-4">
                  <Icon className="h-5 w-5 text-[#00D2FF]" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{title}</h3>
                <p className="text-[#00D2FF] text-sm font-medium mb-1">{value}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Form + FAQ */}
        <section className="py-12 px-4 pb-24">
          <div className="mx-auto max-w-5xl grid gap-10 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="rounded-2xl border border-white/5 bg-[#1E293B] p-7">
              <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="w-5 h-5 text-[#00D2FF]" />
                <h2 className="text-lg font-bold text-white">Send a Message</h2>
              </div>

              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400 text-sm">Thank you for reaching out. We'll reply within 24 hours.</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }) }}
                    className="mt-6 text-sm text-[#00D2FF] hover:text-white transition-colors"
                  >
                    Send another message →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00D2FF] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00D2FF] transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="How can we help?"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00D2FF] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Message *</label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us more..."
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00D2FF] transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00D2FF] to-[#0055FF] text-white font-bold py-3 hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-lg font-bold text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {FAQS.map((faq) => (
                  <div key={faq.q} className="rounded-2xl border border-white/5 bg-[#1E293B] p-5 hover:border-[#00D2FF]/20 transition-colors">
                    <h3 className="font-semibold text-white text-sm mb-2">{faq.q}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
