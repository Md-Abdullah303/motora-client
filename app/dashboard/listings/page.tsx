"use client"

import React, { useState, useEffect } from "react"
import { Edit3, Trash2, Eye, Car, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/app/components/ui/Button"
import { authClient } from "@/app/lib/auth-client"
import Link from "next/link"

interface UserCar {
  _id: string
  title: string
  price: number
  category: string
  images: string[]
  year?: number
  mileage?: string
  fuel?: string
  status?: string
}

export default function ListingsPage() {
  const [cars, setCars] = useState<UserCar[]>([])
  const [loading, setLoading] = useState(true)
  const { data: session } = authClient.useSession()
  
  // Pagination
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCars, setTotalCars] = useState(0)
  const limit = 8

  const fetchMyCars = async (currentPage: number) => {
    setLoading(true)
    try {
      const token = session?.user?.id ? `user_${session.user.id}` : 'anon'
      const query = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString()
      })
      
      const res = await fetch(`http://localhost:4000/api/users/me/cars?${query.toString()}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await res.json()
      
      if (data.success) {
        setCars(data.data.cars || [])
        setTotalPages(data.data.pagination.totalPages)
        setTotalCars(data.data.pagination.totalCars)
      }
    } catch (err) {
      console.error("Failed to fetch my cars:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMyCars(page)
  }, [page, session])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Car className="text-[#00D2FF]" /> Manage My Listings
          </h1>
          <p className="text-sm text-gray-400 mt-1">View and manage all cars you have listed.</p>
        </div>
        <Link href="/dashboard/add-car">
          <Button className="bg-[#00D2FF]/10 text-[#00D2FF] hover:bg-[#00D2FF] hover:text-[#0B1120] border border-[#00D2FF]/30 font-bold uppercase tracking-wider text-xs">
            + Add New Car
          </Button>
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/5 bg-[#1E293B]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Image", "Title", "Category", "Price", "Year", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-[#00D2FF] mx-auto" />
                  </td>
                </tr>
              ) : cars.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                    You haven't listed any cars yet.
                  </td>
                </tr>
              ) : (
                cars.map((car) => (
                  <tr key={car._id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <div className="h-10 w-14 rounded-md bg-gradient-to-br from-gray-800 to-gray-700 overflow-hidden relative">
                        {car.images && car.images[0] && (
                          <img src={car.images[0]} alt={car.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-white line-clamp-1">{car.title}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{car.category}</td>
                    <td className="px-4 py-3 font-medium text-white">${car.price.toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-400">{car.year || "2024"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          car.status === "Available" || !car.status
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {car.status || "Available"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:text-[#00D2FF] hover:bg-[#00D2FF]/10 transition-colors" title="View">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:text-yellow-400 hover:bg-yellow-400/10 transition-colors" title="Edit">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-white/5 bg-[#1E293B] px-5 py-3">
        <p className="text-sm text-gray-400">
          Showing {totalCars > 0 ? (page - 1) * limit + 1 : 0}-
          {Math.min(page * limit, totalCars)} of {totalCars} listings
        </p>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 text-xs"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </Button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button 
                key={p}
                onClick={() => setPage(p)}
                className={`flex h-7 w-7 items-center justify-center rounded border transition-colors text-xs ${
                  page === p 
                    ? "border-[#00D2FF] bg-[#00D2FF]/10 text-[#00D2FF] font-bold" 
                    : "border-white/5 bg-transparent text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages || totalPages === 0}
            className="flex items-center gap-1 text-xs"
          >
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
