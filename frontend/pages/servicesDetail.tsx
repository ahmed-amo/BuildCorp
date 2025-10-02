"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card } from "../src/components/ui/card";

interface Service {
  id: number | string;
  title: string;
  description?: string;
  image_small?: string | null;
  image_large?: string | null;
  slug?: string;
}

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/api/services/${slug}`)
      .then((res) => {
        const payload = res.data?.data ?? res.data;
        if (payload) {
          setService({
            id: payload.id ?? payload.slug ?? Math.random(),
            title: payload.title ?? "Untitled Service",
            description: payload.description ?? "",
            image_small: payload.image_small ?? null,
            image_large: payload.image_large ?? null,
            slug: payload.slug ?? undefined,
          });
          setError(null);
        } else {
          setError("Service not found");
        }
      })
      .catch((err) => {
        console.error("Error fetching service:", err);
        setError(err?.message ?? "Failed to load service");
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const imageSrc = (img?: string | null) => {
    if (!img) return "/placeholder.svg?height=600&width=1200&query=construction";
    if (img.startsWith("http")) return img;
    return `http://127.0.0.1:8000/storage/${img}`;
  };

  if (loading) return <p className="text-center py-12">Loading service…</p>;
  if (error) return <p className="text-center py-12 text-destructive">Error: {error}</p>;
  if (!service) return <p className="text-center py-12">Service not found</p>;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="bg-card border-border">
          <div className="relative h-[400px] overflow-hidden">
            <img
              src={imageSrc(service.image_large)} // Use image_large
              alt={`${service.title} construction service`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground mb-4">{service.title}</h1>
            <p className="text-lg text-muted-foreground">{service.description}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}