"use client"

import React, { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { Loader2, ArrowLeft, Calendar, Fuel, Gauge, Check, CreditCard, ShieldCheck, Sparkles, Star, MessageSquare, ChevronRight } from "lucide-react"
import { Button } from "@/app/components/ui/Button"
import { authClient } from "@/app/lib/auth-client"
import toast from "react-hot-toast"
import { getJwt } from "@/app/actions/getJwt"

interface Car {
  _id: string
  title: string
  price: number
  category: string
  images: string[]
  shortDescription: string
  fullDescription: string
  year?: number
  mileage?: string
  fuel?: string
  createdAt?: string
}

export default function CarDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  
  const [car, setCar] = useState<Car | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [relatedCars, setRelatedCars] = useState<Car[]>([])
  const { data: session } = authClient.useSession()

  // Static reviews — in production these would come from an API
  const REVIEWS = [
    { id: 1, name: "James Whitmore", avatar: "JW", rating: 5, date: "2 weeks ago", comment: "Absolutely stunning vehicle. The listing was accurate, seller was professional, and the transaction via MOTORA was seamless. 10/10 would buy again." },
    { id: 2, name: "Priya Nair", avatar: "PN", rating: 4, date: "1 month ago", comment: "Great experience overall. The car matched the description perfectly. Shipping took a little longer than expected but communication was excellent throughout." },
    { id: 3, name: "Marc Leblanc", avatar: "ML", rating: 5, date: "3 months ago", comment: "The AI recommendation pointed me to this listing and I couldn't be happier. The details page gave me everything I needed before making a decision." },
  ]

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/cars/${id}`)
        const data = await res.json()
        
        if (data.success) {
          setCar(data.data)
        } else {
          toast.error("Car not found")
        }
      } catch (err) {
        console.error("Failed to fetch car:", err)
        toast.error("Failed to load car details")
      } finally {
        setLoading(false)
      }
    }
    
    if (id) {
      fetchCar()
    }
  }, [id])

  // Fetch related cars based on same category
  useEffect(() => {
    const fetchRelated = async () => {
      if (!car?.category) return
      try {
        const res = await fetch(`http://localhost:4000/api/cars?category=${encodeURIComponent(car.category)}&limit=4`)
        const data = await res.json()
        if (data.success) {
          setRelatedCars(data.data.cars.filter((c: Car) => c._id !== car._id).slice(0, 3))
        }
      } catch (err) {
        console.error("Failed to fetch related cars:", err)
      }
    }
    fetchRelated()
  }, [car?.category, car?._id])

  const handleStripeCheckout = async () => {
    if (!session?.user?.id) {
      toast.error("Please login to purchase this vehicle")
      router.push("/auth")
      return
    }

    setIsProcessing(true)
    const loadingToast = toast.loading("Securely connecting to Stripe...")

    try {
      const token = `user_${session.user.id}`
      const res = await fetch("http://localhost:4000/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ carId: car?._id })
      })

      const data = await res.json()

      if (data.success && data.data.url) {
        toast.dismiss(loadingToast)
        window.location.href = data.data.url
      } else {
        throw new Error(data.error || "Failed to create checkout session")
      }
    } catch (err: any) {
      console.error(err)
      toast.error(err.message || "An error occurred", { id: loadingToast })
      setIsProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#0B1120]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#00D2FF]" />
        </div>
        <Footer />
      </div>
    )
  }

  if (!car) {
    return (
      <div className="flex min-h-screen flex-col bg-[#0B1120]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-white mb-4">Car Not Found</h1>
          <Button onClick={() => router.push("/cars")}>Back to Inventory</Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0B1120]">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <button 
            onClick={() => router.push("/cars")}
            className="flex items-center gap-2 text-gray-400 hover:text-[#00D2FF] transition-colors mb-8 text-sm font-semibold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Inventory
          </button>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: Images & Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/40 border border-white/5 relative group">
                  {car.images && car.images[activeImage] ? (
                    <img 
                      src={car.images[activeImage]} 
                      alt={car.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-600">No Image Available</div>
                  )}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-xs font-bold text-[#00D2FF] uppercase tracking-widest">
                    {car.category}
                  </div>
                </div>
                
                {car.images && car.images.length > 1 && (
                  <div className="grid grid-cols-5 gap-4">
                    {car.images.map((img, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-[#00D2FF] shadow-[0_0_15px_rgba(0,210,255,0.3)]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                      >
                        <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">{car.title}</h1>
                <p className="text-xl text-gray-300 font-medium mb-8 leading-relaxed border-l-4 border-[#00D2FF] pl-4">
                  {car.shortDescription}
                </p>
                
                <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#0055FF]" /> Engineering Specs
                </h3>
                <div className="bg-[#1E293B] rounded-xl p-6 border border-white/5 shadow-lg mb-8">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center justify-center p-4 bg-[#0B1120] rounded-lg border border-white/5">
                      <Calendar className="w-8 h-8 text-[#00D2FF] mb-2" />
                      <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Year</span>
                      <span className="text-lg font-bold text-white">{car.year || new Date(car.createdAt || Date.now()).getFullYear()}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-[#0B1120] rounded-lg border border-white/5">
                      <Gauge className="w-8 h-8 text-[#0055FF] mb-2" />
                      <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Mileage</span>
                      <span className="text-lg font-bold text-white">{car.mileage || "0 mi"}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-[#0B1120] rounded-lg border border-white/5">
                      <Fuel className="w-8 h-8 text-purple-500 mb-2" />
                      <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Fuel Type</span>
                      <span className="text-lg font-bold text-white">{car.fuel || "Electric"}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-4">Detailed Overview</h3>
                <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed whitespace-pre-wrap">
                  {car.fullDescription}
                </div>
              </div>
            </div>

            {/* Right: Pricing & Payment Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                
                {/* Price Card */}
                <div className="rounded-2xl bg-gradient-to-b from-[#1E293B] to-[#0B1120] p-1 border border-white/10 shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00D2FF]/10 to-[#0055FF]/10 opacity-50"></div>
                  <div className="bg-[#0B1120] rounded-xl p-6 relative z-10">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Buy Now Price</p>
                    <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] to-[#0055FF] mb-6">
                      ${car.price.toLocaleString()}
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {["MOTORA Certified Inspection", "Free Global Delivery", "1-Year Premium Warranty", "Secure Escrow Payment"].map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                          <Check className="w-5 h-5 text-emerald-400 shrink-0" /> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Stripe Payment Button */}
                <div className="rounded-2xl bg-[#1E293B] p-6 border border-white/5 shadow-xl">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#00D2FF]" /> Secure Checkout
                  </h3>
                  
                  <div className="pt-2">
                    <button 
                      onClick={handleStripeCheckout}
                      disabled={isProcessing}
                      className="w-full bg-[#635BFF] hover:bg-[#4E44E7] disabled:bg-gray-700 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(99,91,255,0.3)] hover:shadow-[0_0_30px_rgba(99,91,255,0.5)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                    >
                      {isProcessing ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <ShieldCheck className="w-5 h-5" />
                      )}
                      {isProcessing ? "Processing..." : "Pay with Stripe"}
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
                      Payments are processed securely by <span className="font-bold text-[#635BFF]">Stripe</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>

      {/* ── Reviews Section ── */}
      <section className="bg-[#0B1120] py-16 px-4 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="w-5 h-5 text-[#00D2FF]" />
            <h2 className="text-xl font-bold text-white">Customer Reviews</h2>
            <span className="rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/30 text-[#00D2FF] text-xs font-bold px-2.5 py-0.5">
              {REVIEWS.length}
            </span>
          </div>

          {/* Average Rating */}
          <div className="mb-8 flex items-center gap-6 rounded-2xl border border-white/5 bg-[#1E293B] p-6 w-fit">
            <div className="text-center">
              <p className="text-5xl font-bold text-white">4.8</p>
              <div className="flex gap-0.5 mt-1 justify-center">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-xs text-gray-500 mt-1">Based on {REVIEWS.length} reviews</p>
            </div>
            <div className="space-y-1.5 min-w-32">
              {[5,4,3].map(star => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 w-4">{star}</span>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                  <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: star === 5 ? "75%" : star === 4 ? "20%" : "5%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review Cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map(review => (
              <div key={review.id} className="rounded-2xl border border-white/5 bg-[#1E293B] p-5 hover:border-[#00D2FF]/20 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D2FF] to-[#0055FF] flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{review.name}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-700"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Cars Section ── */}
      {relatedCars.length > 0 && (
        <section className="bg-[#0B1120] py-16 px-4 border-t border-white/5">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#00D2FF]" />
                <h2 className="text-xl font-bold text-white">Related Vehicles</h2>
              </div>
              <a href="/cars" className="flex items-center gap-1 text-sm text-[#00D2FF] hover:text-white transition-colors">
                View all <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCars.map(relCar => (
                <a key={relCar._id} href={`/cars/${relCar._id}`} className="group rounded-2xl border border-white/5 bg-[#1E293B] overflow-hidden hover:border-[#00D2FF]/30 hover:-translate-y-1 transition-all">
                  <div className="aspect-[16/9] relative overflow-hidden bg-black/30">
                    {relCar.images?.[0] ? (
                      <img src={relCar.images[0]} alt={relCar.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-600 text-sm">No Image</div>
                    )}
                    <span className="absolute top-2 left-2 rounded-full bg-[#00D2FF]/20 border border-[#00D2FF]/30 px-2.5 py-0.5 text-[10px] font-bold text-[#00D2FF] uppercase tracking-wider backdrop-blur-sm">
                      {relCar.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white line-clamp-1">{relCar.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[#00D2FF] font-bold">${relCar.price.toLocaleString()}</span>
                      <span className="text-xs text-gray-500">{relCar.year || "—"}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
