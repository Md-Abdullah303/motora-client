"use client"

import { Edit3, Trash2, Eye } from "lucide-react"
import { MOCK_CARS } from "@/app/lib/mock-data"
import { Button } from "@/app/components/ui/Button"

export default function ListingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">Manage My Listings</h1>
        <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-500">View and manage all cars you have listed.</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/5 bg-[#1E293B] dark:bg-[#1E293B] light:bg-white light:border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 light:border-gray-200">
                {["Image", "Title", "Category", "Price", "Year", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_CARS.map((car) => (
                <tr key={car.id} className="border-b border-white/5 light:border-gray-200 last:border-0 hover:bg-white/5 light:hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="h-10 w-14 rounded-md bg-gradient-to-br from-gray-800 to-gray-700" />
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-white dark:text-white light:text-gray-900">{car.title}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 dark:text-gray-400 light:text-gray-500">{car.category}</td>
                  <td className="px-4 py-3 font-medium text-white dark:text-white light:text-gray-900">${car.price.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-400 dark:text-gray-400 light:text-gray-500">{car.year}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        car.status === "Available"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {car.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:text-[#00D2FF] hover:bg-[#00D2FF]/10 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:text-yellow-400 hover:bg-yellow-400/10 transition-colors">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-white/5 bg-[#1E293B] dark:bg-[#1E293B] light:bg-white light:border-gray-200 px-5 py-3">
        <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-500">
          Showing {MOCK_CARS.length} of {MOCK_CARS.length} listings
        </p>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" disabled>
            Previous
          </Button>
          <Button variant="ghost" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
