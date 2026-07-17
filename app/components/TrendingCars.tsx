"use client"

import { useState, useEffect } from "react"
import { MapPin, Fuel, Gauge, Loader2 } from "lucide-react"
import { Badge } from "./ui/Badge"
import { Button } from "./ui/Button"
import { Card, CardContent } from "./ui/Card"
import Image from "next/image"

interface TrendingCar {
  _id: string
  title: string
  price: number
  year?: number
  mileage?: string
  fuel?: string
  images: string[]
  category: string
}

export default function TrendingCars() {
  const [cars, setCars] = useState<TrendingCar[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/cars/trending")
        const data = await res.json()
        if (data.success) {
          setCars(data.data)
        }
      } catch (err) {
        console.error("Failed to fetch trending cars:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchTrending()
  }, [])

  return (
    <section id="cars" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Trending{" "}
              <span className="text-[#00D2FF]">Vehicles</span>
            </h2>
            <p className="mt-2 text-gray-400">
              Most sought-after cars on the Motora marketplace
            </p>
          </div>
          <Button variant="outline" className="gap-2 text-[#00D2FF] border-[#00D2FF]/30 hover:bg-[#00D2FF] hover:text-[#0B1120]">
            View All
          </Button>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#00D2FF]" />
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cars.map((car) => (
              <Card
                key={car._id}
                className="group overflow-hidden border-white/5 bg-[#0e1629] transition-all duration-300 hover:border-[#00D2FF]/20 hover:shadow-lg hover:shadow-[#00D2FF]/5"
              >
                <div className="relative h-48 w-full overflow-hidden bg-black/40">
                  {car.images && car.images[0] ? (
                    <img 
                      src={car.images[0]} 
                      alt={car.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-600">No Image</div>
                  )}
                  <div className="absolute top-3 left-3">
                    <Badge variant="default" className="bg-[#00D2FF] text-[#0B1120] hover:bg-[#00D2FF]">Trending</Badge>
                  </div>
                </div>
                <CardContent className="p-4 border-t border-white/5">
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="font-semibold text-white line-clamp-1">{car.title}</h3>
                  </div>
                  <div className="mb-3">
                    <span className="text-lg font-black text-[#00D2FF]">
                      ${car.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-3 text-center text-xs">
                    <div>
                      <p className="text-gray-500">Year</p>
                      <p className="font-medium text-white">{car.year || "2024"}</p>
                    </div>
                    <div>
                      <p className="flex items-center justify-center gap-1 text-gray-500">
                        <Fuel className="h-3 w-3" />
                      </p>
                      <p className="text-[11px] font-medium text-white">
                        {car.fuel || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="flex items-center justify-center gap-1 text-gray-500">
                        <Gauge className="h-3 w-3" />
                      </p>
                      <p className="text-[11px] font-medium text-white">
                        {car.mileage || "0 mi"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
