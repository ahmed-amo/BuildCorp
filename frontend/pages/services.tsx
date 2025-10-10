"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Card } from "../src/components/ui/card";
import { Button } from "../src/components/ui/button";
import { Input } from "../src/components/ui/input";
import { Search } from "lucide-react"; // Removed Filter icon (no categories)
import { Link } from "react-router-dom"; // For routing

interface Service {
  id: number | string;
  title: string;
  description?: string;
  image_small?: string | null;
  image_large?: string | null; 
  slug?: string;
}

export default function ServicesPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/services")
      .then((res) => {
        if (!mounted) return;

        const payload = Array.isArray(res.data) ? res.data : res.data?.data ?? res.data;
        
        // ✅ Filter active FIRST, then normalize
        const activeServices = (payload || []).filter((s: any) => s.status === "active");
        const normalized: Service[] = activeServices.map((s: any, idx: number) => ({
          id: s.id ?? s.slug ?? idx,
          title: s.title ?? "Untitled Service",
          description: s.description ?? "",
          image_small: s.image_small ?? null, // Use image_small
          image_large: s.image_large ?? null, // Use image_large
          slug: s.slug ?? undefined,
        }));

        setServices(normalized); // ✅ Now services = only active ones
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
        setError(err?.message ?? "Failed to load services");
      })
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const title = (service.title || "").toLowerCase();
      const desc = (service.description || "").toLowerCase();
      const q = searchTerm.toLowerCase();

      const matchesSearch = title.includes(q) || desc.includes(q);
      // ✅ Removed category check

      return matchesSearch;
    });
  }, [services, searchTerm]);

  const imageSrc = (img?: string | null) => {
    if (!img) return "/placeholder.svg?height=256&width=400&query=construction";
    if (img.startsWith("http")) return img;
    return `http://127.0.0.1:8000/storage/${img}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
            Our Construction Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
            Delivering excellence across all construction sectors with decades of experience and
            commitment to quality craftsmanship.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Only (No Filters) */}
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
        </div>

        {/* Status */}
        <div className="mb-6">
          {loading ? (
            <p className="text-muted-foreground">Loading services…</p>
          ) : error ? (
            <p className="text-destructive">Error: {error}</p>
          ) : (
            <p className="text-muted-foreground">
              Showing {filteredServices.length} of {services.length} active services
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
                  src={imageSrc(service.image_small)} // Use image_small for cards
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
                  <p className="text-primary-foreground/90 text-sm leading-relaxed mb-6 line-clamp-3">
                    {service.description}
                  </p>
                  <Link to={`/services/${service.slug}`}>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="self-start bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    >
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No results */}
        {!loading && filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">No services found matching your search</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm(""); // ✅ Only clear search now
              }}
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}