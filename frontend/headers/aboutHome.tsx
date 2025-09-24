import React from "react";


export default function AboutSection() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image on the left */}
          <div className="relative">
            <img
              src="/images/about.jpg"
              alt="Professional construction workers on site with safety equipment and urban construction project"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover w-full h-[400px]"
            />
          </div>

          {/* Text content on the right */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">About Our Company</h2>
              <div className="w-16 h-1 bg-primary mb-6"></div>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                With over two decades of experience in the construction industry, we are a trusted partner for
                residential and commercial building projects across the region.
              </p>

              <p>
                Our team of skilled professionals combines traditional craftsmanship with modern techniques and safety
                standards to deliver exceptional results. From foundation to finish, we handle every aspect of your
                construction project with meticulous attention to detail.
              </p>

              <p>
                We pride ourselves on transparent communication, timely project completion, and building lasting
                relationships with our clients. Your vision becomes our mission, and we work tirelessly to exceed your
                expectations.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">20+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
