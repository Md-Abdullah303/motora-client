"use client"

import React, { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react"
import { Button } from "@/app/components/ui/Button"
import { authClient } from "@/app/lib/auth-client"

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get("session_id")
  const { data: session } = authClient.useSession()
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")

  useEffect(() => {
    if (!sessionId || !session?.user?.id) {
      if (!sessionId && session?.user?.id) setStatus("error")
      return
    }

    const verifyPayment = async () => {
      try {
        const token = `user_${session.user.id}`
        const res = await fetch(`http://localhost:4000/api/payments/verify?session_id=${sessionId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        const data = await res.json()
        
        if (data.success) {
          setStatus("success")
        } else {
          setStatus("error")
        }
      } catch (err) {
        console.error(err)
        setStatus("error")
      }
    }

    verifyPayment()
  }, [sessionId, session])

  return (
    <main className="flex-1 flex items-center justify-center pt-24 pb-16 px-4">
      <div className="max-w-md w-full bg-[#1E293B] border border-white/10 rounded-2xl p-8 shadow-2xl text-center">
        {status === "loading" && (
          <div className="flex flex-col items-center">
            <Loader2 className="w-16 h-16 text-[#00D2FF] animate-spin mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">Verifying Payment</h2>
            <p className="text-gray-400 text-sm">Please wait while we confirm your transaction securely with Stripe.</p>
          </div>
        )}
        
        {status === "success" && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
            <p className="text-gray-400 text-sm mb-8">
              Thank you for your purchase. Your payment has been securely processed and recorded in your account.
            </p>
            <Button 
              onClick={() => router.push("/dashboard/payments")}
              className="w-full bg-[#00D2FF] text-[#0B1120] hover:bg-white flex items-center justify-center gap-2 font-bold"
            >
              View Payment History <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Verification Failed</h2>
            <p className="text-gray-400 text-sm mb-8">
              We couldn't verify this payment session. If you were charged, please contact support immediately.
            </p>
            <Button 
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="w-full"
            >
              Return to Dashboard
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0B1120]">
      <Navbar />
      <Suspense fallback={<div className="flex-1 flex justify-center items-center"><Loader2 className="animate-spin text-[#00D2FF]" /></div>}>
        <SuccessContent />
      </Suspense>
      <Footer />
    </div>
  )
}
