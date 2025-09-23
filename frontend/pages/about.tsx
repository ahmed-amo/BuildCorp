
import { Card, CardContent } from "../src/components/ui/card"
import { Badge } from "../src/components/ui/badge"
import { Users, Award, Clock, Shield } from "lucide-react"
import React from "react"
export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">About BuildCorp Construction</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            With over 25 years of experience in the construction industry, we've built our reputation on quality
            craftsmanship, reliability, and exceptional customer service.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center p-6 bg-primary text-primary-foreground">
            <CardContent className="p-0">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-sm">Projects Completed</div>
            </CardContent>
          </Card>
          <Card className="text-center p-6 bg-secondary text-secondary-foreground">
            <CardContent className="p-0">
              <div className="text-3xl font-bold mb-2">25+</div>
              <div className="text-sm">Years Experience</div>
            </CardContent>
          </Card>
          <Card className="text-center p-6 bg-primary text-primary-foreground">
            <CardContent className="p-0">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-sm">Team Members</div>
            </CardContent>
          </Card>
          <Card className="text-center p-6 bg-secondary text-secondary-foreground">
            <CardContent className="p-0">
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-sm">Client Satisfaction</div>
            </CardContent>
          </Card>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Founded in 1998, BuildCorp Construction started as a small family business with a simple mission: to
              deliver exceptional construction services that exceed our clients' expectations. What began as a
              two-person operation has grown into one of the region's most trusted construction companies.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our commitment to quality, safety, and innovation has earned us recognition throughout the industry. We
              take pride in every project, whether it's a residential renovation or a large commercial development.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Licensed & Insured</Badge>
              <Badge variant="secondary">OSHA Certified</Badge>
              <Badge variant="secondary">Green Building</Badge>
              <Badge variant="secondary">Award Winning</Badge>
            </div>
          </div>
          <div className="bg-muted rounded-lg p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              To provide superior construction services that create lasting value for our clients, while maintaining the
              highest standards of safety, quality, and environmental responsibility.
            </p>
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Values</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Safety First
              </li>
              <li className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                Quality Craftsmanship
              </li>
              <li className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Client Partnership
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                On-Time Delivery
              </li>
            </ul>
          </div>
        </div>

        {/* Services Overview */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Residential</h3>
                <p className="text-muted-foreground">Custom homes, renovations, and residential improvements</p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Commercial</h3>
                <p className="text-muted-foreground">Office buildings, retail spaces, and commercial developments</p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Industrial</h3>
                <p className="text-muted-foreground">Manufacturing facilities, warehouses, and industrial projects</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

    </div>
  )
}
