"use client"

import Link from "next/link"
import { AlertCircle, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050914] px-4 text-center">
      <div className="relative mb-8 flex items-center justify-center">
        <div className="absolute h-32 w-32 animate-pulse rounded-full bg-[#00D2FF]/20 blur-2xl"></div>
        <AlertCircle className="relative h-20 w-20 text-[#00D2FF]" />
      </div>
      <h1 className="mb-4 text-6xl font-black tracking-tight text-white md:text-8xl">
        404
      </h1>
      <h2 className="mb-6 text-2xl font-bold tracking-wide text-gray-300 md:text-3xl">
        Page Not Found
      </h2>
      <p className="mb-10 max-w-md text-base leading-relaxed text-gray-500">
        It looks like the vehicle or page you are searching for has hit a dead end. 
        Let's get you back on the right track.
      </p>
      
      <Link 
        href="/"
        className="group flex items-center gap-3 rounded-full bg-[#00D2FF] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#050914] transition-all hover:bg-white hover:shadow-[0_0_20px_#00D2FF] hover:-translate-y-1"
      >
        <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
        Return to Home
      </Link>
    </div>
  )
}
