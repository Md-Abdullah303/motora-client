"use client"

import React, { useState, useEffect } from "react"
import { Edit3, Trash2, Eye, Car, Loader2, ChevronLeft, ChevronRight, X, AlertTriangle } from "lucide-react"
import { Button } from "@/app/components/ui/Button"
import { authClient } from "@/app/lib/auth-client"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

interface UserCar {
  _id: string
  title: string
  price: number
  category: string
  images: string[]
  year?: number
  mileage?: string
  fuel?: string
  shortDescription?: string
  description?: string
  status?: string
}

const CATEGORIES = ["Hypercar", "Supercar", "Sports Car", "Luxury"]
const FUELS = ["Petrol", "Diesel", "Electric", "Hybrid"]

export default function ListingsPage() {
  const [cars, setCars] = useState<UserCar[]>([])
  const [loading, setLoading] = useState(true)
  const { data: session } = authClient.useSession()
  const router = useRouter()

  // Pagination
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCars, setTotalCars] = useState(0)
  const limit = 8

  // Edit Modal
  const [editCar, setEditCar] = useState<UserCar | null>(null)
  const [editForm, setEditForm] = useState<Partial<UserCar>>({})
  const [isSaving, setIsSaving] = useState(false)

  // Delete Confirmation
  const [deleteCar, setDeleteCar] = useState<UserCar | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchMyCars = async (currentPage: number) => {
    setLoading(true)
    try {
      const token = session?.user?.id ? `user_${session.user.id}` : "anon"
      const query = new URLSearchParams({ page: currentPage.toString(), limit: limit.toString() })
      const res = await fetch(`http://localhost:4000/api/users/me/cars?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
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

  // Open edit modal
  const openEdit = (car: UserCar) => {
    setEditCar(car)
    setEditForm({
      title: car.title,
      price: car.price,
      category: car.category,
      year: car.year,
      mileage: car.mileage || "",
      fuel: car.fuel || "",
      shortDescription: car.shortDescription || "",
    })
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editCar || !session?.user?.id) return

    setIsSaving(true)
    try {
      const token = `user_${session.user.id}`
      const res = await fetch(`http://localhost:4000/api/cars/${editCar._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editForm),
      })
      const data = await res.json()
      if (data.success) {
        toast.success("Car updated successfully!")
        setEditCar(null)
        fetchMyCars(page)
      } else {
        throw new Error(data.error || "Update failed")
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteCar || !session?.user?.id) return

    setIsDeleting(true)
    try {
      const token = `user_${session.user.id}`
      const res = await fetch(`http://localhost:4000/api/cars/${deleteCar._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data.success) {
        toast.success("Car deleted successfully!")
        setDeleteCar(null)
        fetchMyCars(page)
      } else {
        throw new Error(data.error || "Delete failed")
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong")
    } finally {
      setIsDeleting(false)
    }
  }

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
                      <div className="h-10 w-14 rounded-md bg-gradient-to-br from-gray-800 to-gray-700 overflow-hidden">
                        {car.images?.[0] && (
                          <img src={car.images[0]} alt={car.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-white line-clamp-1">{car.title}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{car.category}</td>
                    <td className="px-4 py-3 font-medium text-white">${car.price.toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-400">{car.year || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        car.status === "Sold" ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"
                      }`}>
                        {car.status || "Available"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link href={`/cars/${car._id}`}>
                          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:text-[#00D2FF] hover:bg-[#00D2FF]/10 transition-colors" title="View">
                            <Eye className="h-4 w-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => openEdit(car)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:text-yellow-400 hover:bg-yellow-400/10 transition-colors" title="Edit"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteCar(car)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors" title="Delete"
                        >
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

      {/* Pagination */}
      <div className="flex items-center justify-between rounded-xl border border-white/5 bg-[#1E293B] px-5 py-3">
        <p className="text-sm text-gray-400">
          Showing {totalCars > 0 ? (page - 1) * limit + 1 : 0}–
          {Math.min(page * limit, totalCars)} of {totalCars} listings
        </p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="flex items-center gap-1 text-xs">
            <ChevronLeft className="w-4 h-4" /> Prev
          </Button>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`flex h-7 w-7 items-center justify-center rounded border transition-colors text-xs ${
                  page === p ? "border-[#00D2FF] bg-[#00D2FF]/10 text-[#00D2FF] font-bold" : "border-white/5 bg-transparent text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <Button variant="ghost" size="sm" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages || totalPages === 0} className="flex items-center gap-1 text-xs">
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* ── Edit Dialog ── */}
      {editCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#1E293B] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <h2 className="text-lg font-bold text-white">Edit Car Listing</h2>
              <button onClick={() => setEditCar(null)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
              {[
                { label: "Title", key: "title", type: "text", placeholder: "Car title" },
                { label: "Price (USD)", key: "price", type: "number", placeholder: "e.g. 85000" },
                { label: "Year", key: "year", type: "number", placeholder: "e.g. 2023" },
                { label: "Mileage", key: "mileage", type: "text", placeholder: "e.g. 5,000 km" },
                { label: "Short Description", key: "shortDescription", type: "text", placeholder: "One-line summary" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{label}</label>
                  <input
                    type={type}
                    value={(editForm as any)[key] || ""}
                    onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00D2FF] transition-colors"
                  />
                </div>
              ))}
              {/* Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Category</label>
                <select
                  value={editForm.category || ""}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D2FF] transition-colors"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              {/* Fuel */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Fuel Type</label>
                <select
                  value={editForm.fuel || ""}
                  onChange={(e) => setEditForm({ ...editForm, fuel: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D2FF] transition-colors"
                >
                  <option value="">Select fuel type</option>
                  {FUELS.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </form>
            <div className="flex gap-3 border-t border-white/5 px-6 py-4">
              <button
                onClick={handleEditSubmit}
                disabled={isSaving}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#00D2FF] text-[#0B1120] font-bold py-2.5 hover:bg-white transition-all disabled:opacity-50"
              >
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => setEditCar(null)}
                className="flex-1 rounded-xl border border-white/10 text-gray-400 hover:text-white font-medium py-2.5 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete AlertDialog ── */}
      {deleteCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#1E293B] shadow-2xl">
            <div className="px-6 py-6 text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-lg font-bold text-white mb-2">Delete Listing?</h2>
              <p className="text-sm text-gray-400">
                Are you sure you want to permanently delete <span className="text-white font-medium">"{deleteCar.title}"</span>? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 border-t border-white/5 px-6 py-4">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-500 text-white font-bold py-2.5 hover:bg-red-600 transition-all disabled:opacity-50"
              >
                {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setDeleteCar(null)}
                className="flex-1 rounded-xl border border-white/10 text-gray-400 hover:text-white font-medium py-2.5 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
