"use client"

import { useEffect, useState } from "react"
import { Card } from "../src/components/ui/card"
import { Button } from "../src/components/ui/button"
import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"

interface Service {
  id: number | string;
  title: string;
  category?: string;
  description?: string;
  image_small?: string | null; // Backend field
  image_large?: string | null; // Backend field
  slug?: string; // For links
  status?: string; // For filtering 'active'
  image?: string; // Optional: For your static compatibility (we'll map to this)
}


export default function ConstructionServices() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  // ✅ New: Dynamic states
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
// ✅ Fetch function
const fetchServices = async () => {
  try {
    setLoading(true);
    setError(null);
    
    const response = await axios.get('http://127.0.0.1:8000/api/services'); // Your API endpoint
    
    // ✅ Map and filter: Only active, first 4, transform fields
    const dynamicServices: Service[] = response.data.data
      .filter((service: any) => service.status === 'active') // ✅ Filter active
      .slice(0, 4) // ✅ Limit to 4
      .map((service: any) => ({
        ...service,
        image: service.image_small 
          ? `http://127.0.0.1:8000/storage/${service.image_small}` // ✅ Full URL for <img>
          : '/placeholder.svg', // Fallback
      }));

    setServices(dynamicServices);
  } catch (err: any) {
    console.error('Failed to fetch services:', err);
    setError('Failed to load services. Please try again later.');
  } finally {
    setLoading(false);
  }
};

// ✅ Fetch on mount
useEffect(() => {
  fetchServices();
}, []);

return (
  <section className="py-16 px-4 bg-background">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Our Construction Services</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Delivering excellence across all construction sectors with decades of experience and commitment to quality
          craftsmanship.
        </p>
      </div>

      {/* ✅ Loading/Error States */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2 text-muted-foreground">Loading services...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-destructive">
          <p>{error}</p>
          <Button onClick={fetchServices} className="mt-2">Retry</Button>
        </div>
      ) : (
        <>
          {/* ✅ Dynamic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card
                key={service.id}
                className="group relative overflow-hidden bg-card border-border hover:shadow-xl transition-all duration-500 ease-out cursor-pointer"
                onMouseEnter={() => setHoveredCard(service.id as string)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Link to={`/services/${service.slug}`}> {/* ✅ Link to individual page */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={`${service.title} construction services`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Title overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                    </div>

                    {/* Hover content overlay */}
                    <div
                      className={`absolute inset-0 bg-primary/95 backdrop-blur-sm transition-all duration-500 flex flex-col justify-center p-6 ${
                        hoveredCard === service.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
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
                </Link>
              </Card>
            ))}
          </div>

          {/* ✅ New: View All Button */}
          {services.length > 0 && (
            <div className="text-center mt-12">
              <Link to="/services">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  View All Services
                </Button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  </section>
);
}
