"use client"

import React, { useEffect, useMemo, useState } from "react"
import axios from "axios"
import { Card } from "../src/components/ui/card"
import { Button } from "../src/components/ui/button"
import { Input } from "../src/components/ui/input"
import { Badge } from "../src/components/ui/badge"
import { Search, Filter } from "lucide-react"

// Type (remove if using plain JS)
interface Service {
  id: number | string
  title: string
  category?: string
  description?: string
  image?: string | null
  slug?: string
}

const categories = ["all", "specialty", "civil", "corporate", "residential"]

export default function ServicesPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    axios
      .get("http://127.0.0.1:8000/api/services")
      .then((res) => {
        if (!mounted) return

        // Normalize response shape: support both plain array and { data: [...] } shapes
        const payload = Array.isArray(res.data) ? res.data : res.data?.data ?? res.data

        // Map & normalize fields so your UI is safe
        const normalized: Service[] = (payload || []).map((s: any, idx: number) => ({
          id: s.id ?? s.slug ?? idx,
          title: s.title ?? "Untitled Service",
          category: s.category ?? s.slug ?? "uncategorized",
          description: s.description ?? "",
          image: s.image ?? null,
          slug: s.slug ?? undefined,
        }))

        setServices(normalized)
        setError(null)
      })
      .catch((err) => {
        console.error("Error fetching services:", err)
        setError(err?.message ?? "Failed to load services")
      })
      .finally(() => setLoading(false))

    return () => {
      mounted = false
    }
  }, [])

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const title = (service.title || "").toLowerCase()
      const desc = (service.description || "").toLowerCase()
      const q = searchTerm.toLowerCase()

      const matchesSearch = title.includes(q) || desc.includes(q)
      const matchesCategory = selectedCategory === "all" || service.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [services, searchTerm, selectedCategory])

  // Helper to build image src (handles stored path vs full URL)
  const imageSrc = (img?: string | null) => {
    if (!img) return "/placeholder.svg?height=256&width=400&query=construction"
    if (img.startsWith("http")) return img
    // adjust backend URL if different
    return `http://127.0.0.1:8000/storage/${img}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Our Construction Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
            Delivering excellence across all construction sectors with decades of experience and commitment to quality craftsmanship.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card border-border focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="text-muted-foreground h-4 w-4" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className={`cursor-pointer transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground hover:bg-primary/80"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* status */}
        <div className="mb-6">
          {loading ? (
            <p className="text-muted-foreground">Loading services…</p>
          ) : error ? (
            <p className="text-destructive">Error: {error}</p>
          ) : (
            <p className="text-muted-foreground">
              Showing {filteredServices.length} of {services.length} services
            </p>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              className="group relative overflow-hidden bg-card border-border hover:shadow-xl transition-all duration-500 ease-out cursor-pointer"
              onMouseEnter={() => setHoveredCard(String(service.id))}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={imageSrc(service.image)}
                  alt={`${service.title} construction services`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                </div>

                <div
                  className={`absolute inset-0 bg-primary/95 backdrop-blur-sm transition-all duration-500 flex flex-col justify-center p-6 ${
                    hoveredCard === String(service.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
                  }`}
                >
                  <h3 className="text-2xl font-bold text-primary-foreground mb-4">{service.title}</h3>
                  <p className="text-primary-foreground/90 text-sm leading-relaxed mb-6">{service.description}</p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="self-start bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No results */}
        {!loading && filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">No services found matching your criteria</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
