"use client"

import { useState } from "react"
import { Card } from "../src/components/ui/card"
import { Button } from "../src/components/ui/button"
import React from "react"

interface Service {
  id: number | string;
  title: string;
  category?: string;
  description?: string;
  image_small?: string | null; // Match backend field
  image_large?: string | null; // Match backend field
  slug?: string;
}
const services = [
  {
    id: "specialty",
    title: "Specialty",
    description:
      "Expert craftsmanship in specialized construction projects including custom architectural features, restoration work, and unique structural solutions.",
    image: "/specialty-construction-work-with-custom-architectu.jpg",
  },
  {
    id: "civil",
    title: "Civil",
    description:
      "Comprehensive civil engineering and construction services for infrastructure projects, roads, bridges, and public works development.",
    image: "/civil-engineering-construction-with-infrastructure.jpg",
  },
  {
    id: "corporate",
    title: "Corporate",
    description:
      "Professional commercial construction services for office buildings, retail spaces, and corporate facilities with modern design standards.",
    image: "/modern-corporate-office-building-construction.jpg",
  },
  {
    id: "residential",
    title: "Residential",
    description:
      "Quality residential construction from custom homes to multi-family developments, focusing on comfort, durability, and energy efficiency.",
    image: "/residential-home-construction-with-modern-design.jpg",
  },
]

export default function ConstructionServices() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card
              key={service.id}
              className="group relative overflow-hidden bg-card border-border hover:shadow-xl transition-all duration-500 ease-out cursor-pointer"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
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
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
