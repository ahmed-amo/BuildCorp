"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Card } from "../src/components/ui/card"
import { Badge } from "../src/components/ui/badge"
import React from "react"
import { Link } from "react-router-dom"
import { Button } from "../src/components/ui/button"

interface Project {
  id: string | number
  title: string
  city: string
  slug: string
  category: string
  description?: string
  year?: string | number
  image_small?: string | null
  image_large?: string | null
  image?: string // Added for compatibility with ConstructionServices
}

const categoryColors: Record<string, string> = {
  Corporate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Residential: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Civil: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  Specialty: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Uncategorized: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
}

const BASE_URL = "http://127.0.0.1:8000/storage/"

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await axios.get("http://127.0.0.1:8000/api/projects")
      console.log("Projects API Response:", response.data) // Log to inspect

      // Map response to Project interface, assuming similar structure to services
      const dynamicProjects: Project[] = (Array.isArray(response.data) ? response.data : response.data?.data ?? [])
        .map((project: any) => ({
          id: project.id ?? Math.random(),
          title: project.title ?? "Untitled Project",
          city: project.city ?? "Unknown",
          slug: project.slug ?? `project-${project.id ?? Math.random()}`, // Fallback if slug is missing
          category: project.category ?? "Uncategorized",
          description: project.description ?? "",
          year: project.year ?? "",
          image_small: project.image_small ?? null,
          image_large: project.image_large ?? null,
          image: project.image_large || project.image_small
            ? `${BASE_URL}${project.image_large ?? project.image_small}`
            : "/placeholder.svg",
        }))

      setProjects(dynamicProjects)
    } catch (err: any) {
      console.error("Failed to fetch projects:", err)
      setError("Failed to load projects. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing our expertise across major cities with innovative construction solutions that define skylines and
            communities.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-2 text-muted-foreground">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-destructive">
            <p>{error}</p>
            <Button onClick={fetchProjects} className="mt-2">Retry</Button>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-muted-foreground">No projects found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="group relative overflow-hidden bg-card border-border cursor-pointer transition-all duration-700 ease-out hover:shadow-2xl"
                onMouseEnter={() => setHoveredProject(String(project.id))}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  transform:
                    hoveredProject === String(project.id) ? "scale(1.05) rotateY(5deg)" : "scale(1) rotateY(0deg)",
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                <Link to={`/projects/${project.slug}`}>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={`${project.title} in ${project.city}`}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
                      onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute top-4 left-4">
                      <Badge className={categoryColors[project.category] || categoryColors["Uncategorized"]}>
                        {project.category}
                      </Badge>
                    </div>

                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-background/80 text-foreground">
                        {project.year}
                      </Badge>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                      <p className="text-white/80 text-sm mb-3">{project.city}</p>

                      <div
                        className={`transition-all duration-500 ${
                          hoveredProject === String(project.id)
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }`}
                      >
                        <p className="text-white/90 text-sm leading-relaxed">{project.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
      {projects.length > 0 && (
        <div className="text-center mt-12">
          <Link to="/projects">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              View All Projects
            </Button>
          </Link>
        </div>
      )}
    </section>
  )
}