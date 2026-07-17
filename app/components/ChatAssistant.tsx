"use client"

import React, { useState, useRef, useEffect } from "react"
import { MessageSquare, X, Send, Loader2, Sparkles } from "lucide-react"

interface Message {
  role: "user" | "model"
  parts: { text: string }[]
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      parts: [{ text: "Hello! I am MOTORA AI. I can help you find the perfect luxury car, explain features, or assist with your account. How can I help you today?" }]
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMsg: Message = { role: "user", parts: [{ text: input.trim() }] }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      })

      const data = await response.json()
      
      if (data.success) {
        setMessages(prev => [...prev, { role: "model", parts: [{ text: data.data.response }] }])
      } else {
        setMessages(prev => [...prev, { role: "model", parts: [{ text: "Sorry, I am having trouble connecting to my AI brain right now." }] }])
      }
    } catch (error) {
      console.error("Chat error:", error)
      setMessages(prev => [...prev, { role: "model", parts: [{ text: "Network error. Please try again later." }] }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#00D2FF] to-[#0055FF] text-[#0B1120] shadow-lg shadow-[#00D2FF]/20 transition-all hover:scale-110 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Sparkles className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 flex h-[500px] w-[350px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120]/95 backdrop-blur-xl shadow-2xl transition-all duration-300 ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 bg-gradient-to-r from-[#00D2FF]/10 to-[#0055FF]/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#00D2FF] to-[#0055FF]">
              <Sparkles className="h-4 w-4 text-[#0B1120]" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">MOTORA AI</h3>
              <p className="text-[10px] text-[#00D2FF]">Online • Ready to help</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.role === "user"
                    ? 'bg-gradient-to-r from-[#00D2FF] to-[#0055FF] text-[#0B1120] rounded-tr-sm font-medium'
                    : 'bg-[#1E293B] text-gray-200 border border-white/5 rounded-tl-sm'
                }`}
              >
                {msg.parts[0].text.split('\n').map((line, j) => (
                  <React.Fragment key={j}>
                    {line}
                    {j < msg.parts[0].text.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#1E293B] border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-[#00D2FF] animate-bounce [animation-delay:-0.3s]" />
                <div className="h-1.5 w-1.5 rounded-full bg-[#00D2FF] animate-bounce [animation-delay:-0.15s]" />
                <div className="h-1.5 w-1.5 rounded-full bg-[#00D2FF] animate-bounce" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/5 p-3">
          <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 rounded-xl border border-white/10 bg-[#1E293B] pl-4 pr-12 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-gradient-to-r from-[#00D2FF] to-[#0055FF] p-1.5 text-[#0B1120] disabled:opacity-50 transition-all hover:scale-105"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
