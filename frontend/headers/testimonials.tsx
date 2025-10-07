"use client"

import { Card } from "../src/components/ui/card"
import { Star } from "lucide-react"
import React from "react"
const testimonials = [
  {
    id: "metro-development",
    name: "Sarah Johnson",
    company: "Metro Development Corp",
    role: "Project Director",
    rating: 5,
    testimonial:
      "Outstanding craftsmanship and attention to detail. The team delivered our commercial complex ahead of schedule while maintaining the highest quality standards. Their expertise in sustainable construction practices exceeded our expectations.",
    image: "/professional-woman-headshot.png",
  },
  {
    id: "citywide-infrastructure",
    name: "Michael Chen",
    company: "Citywide Infrastructure",
    role: "Chief Engineer",
    rating: 5,
    testimonial:
      "Working with this construction team on our bridge project was exceptional. Their technical expertise and problem-solving abilities helped us overcome complex engineering challenges while staying within budget.",
    image: "/professional-man-engineer-headshot.jpg",
  },
  {
    id: "residential-partners",
    name: "Emily Rodriguez",
    company: "Residential Partners LLC",
    role: "Development Manager",
    rating: 5,
    testimonial:
      "From initial planning to final walkthrough, the professionalism and quality of work was remarkable. Our residential development project was completed with precision and care that our clients absolutely love.",
    image: "/professional-woman-manager-headshot.png",
  },
]

export default function  TestimonialsSection() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Client Testimonials</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Hear from our valued clients about their experience working with our construction team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="group relative bg-card border-border hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-2"
            >
              {/* Left border accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary transition-all duration-300 group-hover:w-2" />

              <div className="p-6 pl-8">
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial text */}
                <blockquote className="text-muted-foreground leading-relaxed mb-6 text-pretty">
                  "{testimonial.testimonial}"
                </blockquote>

                {/* Client info */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={`${testimonial.name} from ${testimonial.company}`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-border"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm font-medium text-primary">{testimonial.company}</p>
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
