"use client"

import React from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { XCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/app/components/ui/Button"

export default function PaymentCancelPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col bg-[#0B1120]">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center pt-24 pb-16 px-4">
        <div className="max-w-md w-full bg-[#1E293B] border border-white/10 rounded-2xl p-8 shadow-2xl text-center">
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">Payment Cancelled</h2>
            
            <p className="text-gray-400 text-sm mb-8">
              Your payment process was cancelled and no charges were made. You can try again whenever you're ready.
            </p>
            
            <Button 
              onClick={() => router.push("/cars")}
              className="w-full bg-white text-[#0B1120] hover:bg-gray-200 flex items-center justify-center gap-2 font-bold mb-3"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Browsing
            </Button>
            
            <Button 
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="w-full text-gray-400 border-white/10 hover:text-white"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
