"use client"

import { useState } from "react"
import { Card } from "../src/components/ui/card"
import { Badge } from "../src/components/ui/badge"
import React from "react"

const projects = [
  {
    id: "manhattan-tower",
    title: "Manhattan Business Tower",
    city: "New York",
    category: "Corporate",
    description:
      "45-story commercial complex featuring sustainable design and modern office spaces in the heart of Manhattan.",
    image: "/modern-skyscraper-manhattan.jpg",
    year: "2024",
  },
  {
    id: "chicago-residential",
    title: "Lakefront Residences",
    city: "Chicago",
    category: "Residential",
    description: "Luxury waterfront residential development with 200 units overlooking Lake Michigan.",
    image: "/luxury-residential-building-chicago-lakefront.jpg",
    year: "2023",
  },
  {
    id: "miami-bridge",
    title: "Biscayne Bay Bridge",
    city: "Miami",
    category: "Civil",
    description: "State-of-the-art cable-stayed bridge connecting downtown Miami with enhanced pedestrian walkways.",
    image: "/modern-cable-bridge-miami-bay.jpg",
    year: "2024",
  },
  {
    id: "seattle-hospital",
    title: "Pacific Medical Center",
    city: "Seattle",
    category: "Specialty",
    description: "Advanced healthcare facility with specialized surgical suites and patient-centered design.",
    image: "/modern-hospital-building-seattle.jpg",
    year: "2023",
  },
  {
    id: "denver-stadium",
    title: "Rocky Mountain Arena",
    city: "Denver",
    category: "Specialty",
    description: "Multi-purpose sports and entertainment venue with retractable roof and sustainable features.",
    image: "/modern-stadium-denver-mountains.jpg",
    year: "2024",
  },
  {
    id: "austin-tech-campus",
    title: "Innovation Tech Campus",
    city: "Austin",
    category: "Corporate",
    description: "Collaborative workspace campus for tech companies with flexible office configurations.",
    image: "/modern-tech-campus-austin-texas.jpg",
    year: "2023",
  },
]

const categoryColors = {
  Corporate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Residential: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Civil: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  Specialty: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
}

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Showcasing our expertise across major cities with innovative construction solutions that define skylines and
            communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group relative overflow-hidden bg-card border-border cursor-pointer transition-all duration-700 ease-out hover:shadow-2xl"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                transform: hoveredProject === project.id ? "scale(1.05) rotateY(5deg)" : "scale(1) rotateY(0deg)",
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={`${project.title} in ${project.city}`}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <Badge className={categoryColors[project.category as keyof typeof categoryColors]}>
                    {project.category}
                  </Badge>
                </div>

                {/* Year badge */}
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-background/80 text-foreground">
                    {project.year}
                  </Badge>
                </div>

                {/* Project info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-white/80 text-sm mb-3">{project.city}</p>

                  {/* Description appears on hover */}
                  <div
                    className={`transition-all duration-500 ${
                      hoveredProject === project.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    <p className="text-white/90 text-sm leading-relaxed">{project.description}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
