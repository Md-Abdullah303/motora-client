"use client"

import { useState } from "react"
import { Upload, Sparkles, X, Tag } from "lucide-react"
import { Button } from "@/app/components/ui/Button"

const categories = ["SUV", "Sedan", "Coupe", "Convertible", "Wagon", "Hatchback", "Truck", "Van"]

const mockTags = ["#FuelEfficient", "#Sedan", "#Hybrid", "#Luxury", "#TechPackage"]

export default function AddCarPage() {
  const [images, setImages] = useState<string[]>([])
  const [rawDescription, setRawDescription] = useState("")
  const [generatedTags, setGeneratedTags] = useState<string[]>([])

  const handleGenerateTags = () => {
    if (!rawDescription.trim()) return
    setGeneratedTags(mockTags)
  }

  const handleAddImage = () => {
    setImages((prev) => [...prev, URL.createObjectURL(new Blob())].slice(0, 5))
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">Add New Car</h1>
        <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-500">List a new vehicle on the marketplace.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Title</label>
            <input
              type="text"
              placeholder="e.g. 2024 Tesla Model S Plaid"
              className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-gray-600 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition-colors dark:bg-white/5 light:bg-gray-100 light:border-gray-200 light:text-gray-900"
            />
          </div>

          {/* Short Description */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Short Description</label>
            <input
              type="text"
              placeholder="Brief overview of the car"
              className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-gray-600 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition-colors dark:bg-white/5 light:bg-gray-100 light:border-gray-200 light:text-gray-900"
            />
          </div>

          {/* Full Description */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Full Description</label>
            <textarea
              rows={4}
              placeholder="Detailed description of the vehicle..."
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition-colors resize-none dark:bg-white/5 light:bg-gray-100 light:border-gray-200 light:text-gray-900"
            />
          </div>

          {/* Price & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Price ($)</label>
              <input
                type="number"
                placeholder="89990"
                className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-gray-600 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition-colors dark:bg-white/5 light:bg-gray-100 light:border-gray-200 light:text-gray-900"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Category</label>
              <select className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition-colors dark:bg-white/5 light:bg-gray-100 light:border-gray-200 light:text-gray-900">
                <option value="" className="dark:bg-[#0B1120] light:bg-white">Select category</option>
                {categories.map((c) => (
                  <option key={c} value={c} className="dark:bg-[#0B1120] light:bg-white">{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Images</label>
            <div className="grid grid-cols-5 gap-2">
              {images.map((img, i) => (
                <div key={i} className="aspect-square rounded-lg border border-white/10 bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center relative">
                  <button className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors">
                    <X className="h-3 w-3" />
                  </button>
                  <Upload className="h-4 w-4 text-gray-500" />
                </div>
              ))}
              {images.length < 5 && (
                <button
                  onClick={handleAddImage}
                  className="aspect-square rounded-lg border border-dashed border-white/10 hover:border-[#00D2FF]/50 bg-white/5 flex items-center justify-center transition-colors group"
                >
                  <Upload className="h-5 w-5 text-gray-600 group-hover:text-[#00D2FF] transition-colors" />
                </button>
              )}
            </div>
            <p className="text-[10px] text-gray-600">Upload up to 5 images (placeholder)</p>
          </div>
        </div>

        {/* Right Column - AI Tagging */}
        <div className="space-y-5">
          <div className="rounded-xl border border-[#00D2FF]/10 bg-[#00D2FF]/5 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#00D2FF]" />
              <span className="text-sm font-semibold text-[#00D2FF]">AI Auto-Classification</span>
            </div>
            <p className="mb-3 text-xs text-gray-500">
              Paste a raw description of the car and let AI generate tags automatically.
            </p>
            <textarea
              rows={4}
              placeholder="e.g. This is a 2024 luxury sedan with a hybrid engine, fuel efficient, comes with premium tech package..."
              value={rawDescription}
              onChange={(e) => setRawDescription(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#0B1120] px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition-colors resize-none"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateTags}
              className="mt-3 gap-2 border-[#00D2FF]/30 text-[#00D2FF] hover:bg-[#00D2FF]/10"
            >
              <Sparkles className="h-3.5 w-3.5" />
              AI Auto-Classify
            </Button>

            {generatedTags.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="h-3.5 w-3.5 text-[#00D2FF]" />
                  <span className="text-xs font-medium text-gray-400">Generated Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {generatedTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#00D2FF]/20 bg-[#00D2FF]/10 px-3 py-1 text-xs font-medium text-[#00D2FF]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-white/5 bg-[#1E293B] p-5 space-y-3">
            <h3 className="text-sm font-semibold text-white">Listing Preview</h3>
            <div className="rounded-lg border border-white/5 bg-[#0B1120] p-4">
              <div className="aspect-video rounded-md bg-gradient-to-br from-gray-800 to-gray-700 mb-3" />
              <div className="h-4 w-3/4 rounded bg-white/5 animate-pulse" />
              <div className="mt-2 h-3 w-1/2 rounded bg-white/5 animate-pulse" />
              <div className="mt-3 flex items-center justify-between">
                <div className="h-5 w-20 rounded bg-white/5 animate-pulse" />
                <div className="h-8 w-24 rounded bg-white/5 animate-pulse" />
              </div>
            </div>
          </div>

          <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-[#00D2FF] to-[#0055FF] text-white font-semibold shadow-lg shadow-[#00D2FF]/20">
            Publish Listing
          </Button>
        </div>
      </div>
    </div>
  )
}
