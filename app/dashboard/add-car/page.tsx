"use client"

import { useState } from "react"
import { Upload, Sparkles, X, Tag, Loader2 } from "lucide-react"
import toast from "react-hot-toast"
import { Button } from "@/app/components/ui/Button"
import { Input } from "@/app/components/ui/Input"

const CATEGORIES = ["SUV", "Sedan", "Coupe", "Convertible", "Wagon", "Hatchback", "Truck", "Van", "Hybrid", "Electric"]

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

interface CarFormData {
  title: string
  shortDescription: string
  fullDescription: string
  price: string
  category: string
  images: string[]
  aiTags: string[]
}

const INITIAL_FORM: CarFormData = {
  title: "",
  shortDescription: "",
  fullDescription: "",
  price: "",
  category: "",
  images: [],
  aiTags: [],
}

const MOCK_AI_TAGS = ["#FuelEfficient", "#Sedan", "#Hybrid", "#Luxury", "#TechPackage"]

export default function AddCarPage() {
  const [form, setForm] = useState<CarFormData>(INITIAL_FORM)
  const [rawDescription, setRawDescription] = useState("")
  const [generatedTags, setGeneratedTags] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)

  const update = <K extends keyof CarFormData>(key: K, value: CarFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleGenerateTags = () => {
    if (!rawDescription.trim()) {
      toast.error("Enter a raw description first.")
      return
    }
    setGeneratedTags(MOCK_AI_TAGS)
    toast.success("AI tags generated successfully!")
  }

  const removeImage = (index: number) =>
    update("images", form.images.filter((_, i) => i !== index))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const trimmed: CarFormData = {
      ...form,
      title: form.title.trim(),
      shortDescription: form.shortDescription.trim(),
      fullDescription: form.fullDescription.trim(),
    }

    if (!trimmed.title) { toast.error("Title is required."); return }
    if (!trimmed.shortDescription) { toast.error("Short description is required."); return }
    if (!trimmed.fullDescription) { toast.error("Full description is required."); return }
    if (!trimmed.price || isNaN(Number(trimmed.price)) || Number(trimmed.price) <= 0) {
      toast.error("Price must be a positive number."); return
    }
    if (!trimmed.category) { toast.error("Please select a category."); return }

    const payload = {
      title: trimmed.title,
      shortDescription: trimmed.shortDescription,
      fullDescription: trimmed.fullDescription,
      price: Number(trimmed.price),
      category: trimmed.category,
      images: trimmed.images.length > 0 ? trimmed.images : ["/placeholder.svg"],
      aiTags: generatedTags.length > 0 ? generatedTags : [],
    }

    setSubmitting(true)
    const loadingToast = toast.loading("Uploading...")

    try {
      const res = await fetch(`${API_BASE}/api/cars`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      toast.dismiss(loadingToast)
      setSubmitting(false)

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error || `Server responded with ${res.status}`)
      }

      toast.success("Car listed successfully!")
      setForm(INITIAL_FORM)
      setGeneratedTags([])
      setRawDescription("")
    } catch (err) {
      toast.dismiss(loadingToast)
      setSubmitting(false)
      const message = err instanceof Error ? err.message : "Something went wrong."
      toast.error(message)
    }
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">Add New Car</h1>
        <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-500">List a new vehicle on the marketplace.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-5">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Title</label>
              <Input
                placeholder="e.g. 2024 Tesla Model S Plaid"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                className="h-11 rounded-lg"
                required
              />
            </div>

            {/* Short Description */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Short Description</label>
              <Input
                placeholder="Brief overview of the car"
                value={form.shortDescription}
                onChange={(e) => update("shortDescription", e.target.value)}
                className="h-11 rounded-lg"
                required
              />
            </div>

            {/* Full Description */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Full Description</label>
              <textarea
                rows={4}
                placeholder="Detailed description of the vehicle..."
                value={form.fullDescription}
                onChange={(e) => update("fullDescription", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition-colors resize-none dark:bg-white/5 light:bg-gray-100 light:border-gray-200 light:text-gray-900"
                required
              />
            </div>

            {/* Price & Category */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Price ($)</label>
                <Input
                  type="number"
                  placeholder="89990"
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  className="h-11 rounded-lg"
                  min={1}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                  className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition-colors dark:bg-white/5 light:bg-gray-100 light:border-gray-200 light:text-gray-900"
                  required
                >
                  <option value="" className="dark:bg-[#0B1120] light:bg-white">Select category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="dark:bg-[#0B1120] light:bg-white">{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image URLs */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Image URLs</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Paste image URL and press Add"
                  className="h-11 rounded-lg flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      const input = e.currentTarget
                      const url = input.value.trim()
                      if (url && form.images.length < 5) {
                        update("images", [...form.images, url])
                        input.value = ""
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-11 shrink-0"
                  onClick={() => {
                    const input = document.querySelector<HTMLInputElement>("input[placeholder='Paste image URL and press Add']")
                    if (input) {
                      const url = input.value.trim()
                      if (url && form.images.length < 5) {
                        update("images", [...form.images, url])
                        input.value = ""
                      }
                    }
                  }}
                >
                  Add
                </Button>
              </div>
              {form.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.images.map((url, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-300">
                      <Upload className="h-3 w-3" />
                      Image {i + 1}
                      <button type="button" onClick={() => removeImage(i)} className="text-gray-500 hover:text-red-400 ml-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <p className="text-[10px] text-gray-600">Add up to 5 image URLs.</p>
            </div>
          </div>

          {/* Right Column - AI Tagging + Submit */}
          <div className="space-y-5">
            <div className="rounded-xl border border-[#00D2FF]/10 bg-[#00D2FF]/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#00D2FF]" />
                <span className="text-sm font-semibold text-[#00D2FF]">AI Auto-Classification</span>
              </div>
              <p className="mb-3 text-xs text-gray-500">
                Paste a raw description and let AI generate tags automatically.
              </p>
              <textarea
                rows={4}
                placeholder="e.g. This is a 2024 luxury sedan with a hybrid engine..."
                value={rawDescription}
                onChange={(e) => setRawDescription(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-[#0B1120] px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition-colors resize-none"
              />
              <Button
                type="button"
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

            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-[#00D2FF] to-[#0055FF] text-white font-semibold shadow-lg shadow-[#00D2FF]/20 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Uploading...
                </span>
              ) : (
                "Publish Listing"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
