"use client"

import React, { useState, useEffect } from "react"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { Search, Filter, ChevronLeft, ChevronRight, Fuel, Gauge, Calendar, Loader2 } from "lucide-react"

interface Car {
  _id: string
  title: string
  price: number
  category: string
  images: string[]
  year?: number
  mileage?: string
  fuel?: string
  createdAt?: string
}

export default function BrowseCarsPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  
  // Filter & Pagination State
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All Categories")
  const [maxPrice, setMaxPrice] = useState("500000")
  const [sort, setSort] = useState("newest")
  const [page, setPage] = useState(1)
  
  const [totalPages, setTotalPages] = useState(1)
  const [totalCars, setTotalCars] = useState(0)

  const fetchCars = async () => {
    setLoading(true)
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: "8",
        sort
      })
      if (search) query.append("search", search)
      if (category !== "All Categories") query.append("category", category)
      if (maxPrice) query.append("maxPrice", maxPrice)

      const res = await fetch(`http://localhost:4000/api/cars?${query.toString()}`)
      const data = await res.json()
      
      if (data.success) {
        setCars(data.data.cars)
        setTotalPages(data.data.pagination.totalPages)
        setTotalCars(data.data.pagination.totalCars)
      }
    } catch (err) {
      console.error("Failed to fetch cars:", err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch when filters or page change
  useEffect(() => {
    fetchCars()
  }, [page, sort]) // Re-fetch automatically on page/sort change

  const handleApplyFilters = () => {
    setPage(1) // Reset to first page when filtering
    fetchCars()
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0B1120]">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-4xl font-black text-white md:text-5xl">Browse <span className="text-[#00D2FF]">Inventory</span></h1>
            <p className="mt-4 text-gray-400 max-w-2xl">
              Explore our curated selection of high-performance and luxury vehicles. Use the filters to find the perfect match for your lifestyle.
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-72 shrink-0">
              <div className="rounded-xl border border-white/5 bg-[#0e1629] p-6 sticky top-28">
                <div className="flex items-center gap-2 mb-6 text-white font-bold uppercase tracking-wider text-sm border-b border-white/5 pb-4">
                  <Filter className="w-4 h-4 text-[#00D2FF]" />
                  Filters
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input 
                        type="text" 
                        placeholder="Search models..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
                        className="w-full bg-[#050914] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D2FF] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-[#050914] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D2FF] transition-colors appearance-none"
                    >
                      <option value="All Categories">All Categories</option>
                      <option value="Supercar">Supercar</option>
                      <option value="Hypercar">Hypercar</option>
                      <option value="Sports Car">Sports Car</option>
                      <option value="SUV">SUV</option>
                      <option value="Sedan">Sedan</option>
                      <option value="Electric">Electric</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Max Price: ${parseInt(maxPrice).toLocaleString()}
                    </label>
                    <input 
                      type="range" 
                      min="10000" 
                      max="1000000" 
                      step="10000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full accent-[#00D2FF]"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                      <span>$10k</span>
                      <span>$1M+</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleApplyFilters}
                    className="w-full bg-[#00D2FF]/10 text-[#00D2FF] border border-[#00D2FF]/30 rounded-lg py-2.5 font-bold hover:bg-[#00D2FF] hover:text-[#0B1120] transition-all"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </aside>

            {/* Grid */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <span className="text-sm text-gray-400">
                  Showing {totalCars > 0 ? (page - 1) * 8 + 1 : 0}-
                  {Math.min(page * 8, totalCars)} of <strong className="text-white">{totalCars}</strong> cars
                </span>
                <select 
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-transparent text-sm text-gray-400 focus:outline-none cursor-pointer hover:text-white"
                >
                  <option value="newest">Sort by: Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              {loading ? (
                <div className="flex h-64 items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-[#00D2FF]" />
                </div>
              ) : cars.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-white/5 bg-[#0e1629] text-center">
                  <Search className="mb-4 h-12 w-12 text-gray-600" />
                  <h3 className="text-lg font-bold text-white">No cars found</h3>
                  <p className="text-sm text-gray-400">Try adjusting your filters or search terms.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {cars.map((car) => (
                      <div key={car._id} className="group flex flex-col rounded-xl border border-white/5 bg-[#0e1629] overflow-hidden hover:border-[#00D2FF]/30 transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,210,255,0.05)]">
                        <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                          {car.images && car.images[0] ? (
                            <img 
                              src={car.images[0]} 
                              alt={car.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-gray-600">No Image</div>
                          )}
                          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                            {car.category}
                          </div>
                        </div>
                        
                        <div className="flex flex-col flex-1 p-5">
                          <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{car.title}</h3>
                          <div className="text-[#00D2FF] font-black text-xl mb-4">
                            ${car.price.toLocaleString()}
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-400 mt-auto pt-4 border-t border-white/5">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" /> {car.year || new Date(car.createdAt || Date.now()).getFullYear()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Gauge className="w-3.5 h-3.5" /> {car.mileage || "N/A"}
                            </div>
                            <div className="flex items-center gap-1">
                              <Fuel className="w-3.5 h-3.5" /> {car.fuel || "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex justify-center items-center gap-2">
                      <button 
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/5 bg-[#0e1629] text-gray-400 hover:bg-white/5 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button 
                          key={p}
                          onClick={() => setPage(p)}
                          className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
                            page === p 
                              ? "border-[#00D2FF] bg-[#00D2FF]/10 text-[#00D2FF] font-bold" 
                              : "border-white/5 bg-[#0e1629] text-gray-400 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {p}
                        </button>
                      ))}

                      <button 
                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/5 bg-[#0e1629] text-gray-400 hover:bg-white/5 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  )
}
