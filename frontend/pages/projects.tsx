"use client";

import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import { Card } from "../src/components/ui/card";
import { Badge } from "../src/components/ui/badge";
import { Input } from "../src/components/ui/input";
import { Button } from "../src/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import React from "react";

interface Project {
  city: string;
  id: number | string;
  title: string;
  description?: string;
  category: string;
  year: number;
  slug?: string;
  image_small?: string | null;
  image_large?: string | null;
  image_extra?: string | null;
}

const categoryColors: Record<string, string> = {
  Residential: "bg-blue-500 text-white",
  Commercial: "bg-green-500 text-white",
  Industrial: "bg-purple-500 text-white",
  Uncategorized: "bg-gray-400 text-white",
};

const BASE_URL = "http://127.0.0.1:8000/storage/"; // 👈 adjust if your Laravel storage URL is different

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<
    { name: string; count: number }[]
  >([]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    axios
      .get("http://127.0.0.1:8000/api/projects")
      .then((res) => {
        if (!mounted) return;

        const payload = Array.isArray(res.data)
          ? res.data
          : res.data?.data ?? res.data;

        const normalized: Project[] = (payload || []).map(
          (p: any, idx: number) => ({
            id: p.id ?? p.slug ?? idx,
            title: p.title ?? "Untitled Project",
            description: p.description ?? "",
            category: p.category ?? "Uncategorized",
            year: p.year ?? 0,
            city: p.city ?? "",
            image_small: p.image_small ?? null,
            image_large: p.image_large ?? null,
            image_extra: p.image_extra ?? null,
            slug: p.slug ?? undefined,
          })
        );

        setProjects(normalized);
        setError(null);

        // ✅ Build category counts dynamically
        const counts: Record<string, number> = {};
        normalized.forEach((p) => {
          const cat = p.category || "Uncategorized";
          counts[cat] = (counts[cat] || 0) + 1;
        });

        const categoryList = [
          { name: "All", count: normalized.length },
          ...Object.entries(counts).map(([name, count]) => ({ name, count })),
        ];

        setCategoryCounts(categoryList);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setError(err?.message ?? "Failed to load projects");
      })
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.city.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchTerm, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-muted-foreground">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Our Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing our expertise across major cities with innovative
            construction solutions that define skylines and communities.
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

          {/* ✅ Category Filters with Counts */}
          <div className="flex flex-wrap justify-center gap-2">
            {categoryCounts.map((cat) => (
              <Button
                key={cat.name}
                variant={selectedCategory === cat.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.name)}
                className={`transition-all duration-200 ${
                  selectedCategory === cat.name
                    ? "bg-primary text-primary-foreground"
                    : "bg-card hover:bg-primary/10 border-border"
                }`}
              >
                <Filter className="h-3 w-3 mr-1" />
                {cat.name} ({cat.count})
              </Button>
            ))}
          </div>

          {/* Results Count and Clear Filters */}
          <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
            <span>
              {filteredProjects.length} project
              {filteredProjects.length !== 1 ? "s" : ""} found
            </span>
            {(searchTerm || selectedCategory !== "All") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-primary hover:text-primary/80"
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              // ✅ Fix for images: add base URL if missing
              const imageSrc =
                project.image_large || project.image_small
                  ? project.image_large?.startsWith("http")
                    ? project.image_large
                    : `${BASE_URL}${project.image_large ?? project.image_small}`
                  : "/placeholder.svg";

              return (
                <Card
                  key={project.id}
                  className="group relative overflow-hidden bg-card border-border cursor-pointer transition-all duration-700 ease-out hover:shadow-2xl"
                  onMouseEnter={() => setHoveredProject(project.id.toString())}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{
                    transform:
                      hoveredProject === project.id.toString()
                        ? "scale(1.05) rotateY(5deg)"
                        : "scale(1) rotateY(0deg)",
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                  }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={imageSrc}
                      alt={`${project.title} in ${project.city}`}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <Badge
                        className={
                          categoryColors[project.category] ||
                          categoryColors["Uncategorized"]
                        }
                      >
                        {project.category}
                      </Badge>
                    </div>

                    {/* Year badge */}
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant="secondary"
                        className="bg-background/80 text-foreground"
                      >
                        {project.year}
                      </Badge>
                    </div>

                    {/* Project info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {project.title}
                      </h3>
                      <p className="text-white/80 text-sm mb-3">
                        {project.city}
                      </p>

                      <div
                        className={`transition-all duration-500 ${
                          hoveredProject === project.id.toString()
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }`}
                      >
                        <p className="text-white/90 text-sm leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No projects found</h3>
              <p className="text-sm">
                Try adjusting your search terms or filters
              </p>
            </div>
            <Button onClick={clearFilters} variant="outline">
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
