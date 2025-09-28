"use client"

import { useState, useMemo } from "react"
import { Card } from "../src/components/ui/card"
import { Badge } from "../src/components/ui/badge"
import { Input } from "../src/components/ui/input"
import { Button } from "../src/components/ui/button"
import { Search, Filter, X } from "lucide-react"
import React from "react"

const projects = [
  {
    id: "manhattan-tower",
    title: "Manhattan Business Tower",
    city: "New York",
    category: "Corporate",
    description:
      "45-story commercial complex featuring sustainable design and modern office spaces in the heart of Manhattan.",
    image: "/modern-skyscraper-manhattan-business-tower.jpg",
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

const categories = ["All", "Corporate", "Residential", "Civil", "Specialty"]

const categoryColors = {
  Corporate: "bg-primary/10 text-primary border-primary/20",
  Residential: "bg-secondary/20 text-secondary-foreground border-secondary/30",
  Civil: "bg-accent/20 text-accent-foreground border-accent/30",
  Specialty: "bg-muted text-muted-foreground border-muted-foreground/20",
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.city.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("All")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Our Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Showcasing our expertise across major cities with innovative construction solutions that define skylines and
            communities.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card border-border focus:border-primary"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-card hover:bg-primary/10 border-border"
                }`}
              >
                <Filter className="h-3 w-3 mr-1" />
                {category}
              </Button>
            ))}
          </div>

          {/* Results Count and Clear Filters */}
          <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
            <span>
              {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found
            </span>
            {(searchTerm || selectedCategory !== "All") && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-primary hover:text-primary/80">
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
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
        ) : (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No projects found</h3>
              <p className="text-sm">Try adjusting your search terms or filters</p>
            </div>
            <Button onClick={clearFilters} variant="outline">
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
