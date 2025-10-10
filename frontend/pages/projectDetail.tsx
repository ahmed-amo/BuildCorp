"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card } from "../src/components/ui/card";

interface Project {
  id: string | number;
  title: string;
  city: string;
  slug: string;
  category: string;
  description?: string;
  year?: string | number;
  image_large?: string | null;
  image_small?: string | null;
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://127.0.0.1:8000/api/projects/${slug}`)
      .then((res) => {
        const payload = res.data?.data ?? res.data;

        if (payload) {
          setProject({
            id: payload.id ?? payload.slug ?? Math.random(),
            title: payload.title ?? "Untitled Project",
            description: payload.description ?? "",
            city: payload.city ?? "Unknown",
            category: payload.category ?? "Uncategorized",
            year: payload.year ?? "",
            image_small: payload.image_small ?? null,
            image_large: payload.image_large ?? null,
            slug: payload.slug ?? "",
          });
          setError(null);
        } else {
          setError("Project not found");
        }
      })
      .catch((err) => {
        console.error("Error fetching project:", err);
        setError(err?.message ?? "Failed to load project");
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const imageSrc = (img?: string | null) => {
    if (!img) return "/placeholder.svg?height=600&width=1200&query=construction";
    if (img.startsWith("http")) return img;
    return `http://127.0.0.1:8000/storage/${img}`;
  };

  if (loading)
    return <p className="text-center py-12">Loading project…</p>;
  if (error)
    return <p className="text-center py-12 text-destructive">Error: {error}</p>;
  if (!project)
    return <p className="text-center py-12">Project not found</p>;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="bg-card border-border overflow-hidden">
          {/* Project Image */}
          <div className="relative h-[400px] overflow-hidden">
            <img
              src={imageSrc(project.image_large)}
              alt={`${project.title} project image`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Project Details */}
          <div className="p-6 space-y-4">
            <h1 className="text-3xl font-bold text-foreground">{project.title}</h1>
            <div className="flex flex-wrap gap-4 text-muted-foreground text-sm">
              <span>📍 {project.city}</span>
              <span>🏷️ {project.category}</span>
              {project.year && <span>📅 {project.year}</span>}
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {project.description || "No description available."}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
