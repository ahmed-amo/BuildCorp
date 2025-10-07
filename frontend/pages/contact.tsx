import { Card, CardContent, CardHeader, CardTitle } from "../src/components/ui/card"
import { Button } from "../src/components/ui/button"
import { Input } from "../src/components/ui/input"
import { Textarea } from "../src/components/ui/textarea"
import { Label } from "../src/components/ui/label"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import React from "react"

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to start your next construction project? Get in touch with our team of experts. We're here to help
            bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Get a Free Quote</CardTitle>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="(555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectType">Project Type</Label>
                <select className="w-full p-2 border border-input rounded-md bg-background text-foreground">
                  <option value="">Select a project type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="renovation">Renovation</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Project Details</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project, timeline, and any specific requirements..."
                  className="min-h-[120px]"
                />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      123 Construction Ave
                      <br />
                      Building City, BC 12345
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <p className="text-muted-foreground">
                      Main: (555) 123-4567
                      <br />
                      Emergency: (555) 987-6543
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      info@buildcorp.com
                      <br />
                      quotes@buildcorp.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 7:00 AM - 6:00 PM
                      <br />
                      Saturday: 8:00 AM - 4:00 PM
                      <br />
                      Sunday: Emergency calls only
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-xl">24/7 Emergency Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Need immediate assistance? Our emergency response team is available around the clock for urgent
                  construction issues.
                </p>
                <Button variant="secondary" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Emergency Line
                </Button>
              </CardContent>
            </Card>

            {/* Service Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Service Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">We proudly serve the following areas:</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Building City & Surrounding Areas</li>
                  <li>• Construction County</li>
                  <li>• Metro Building Region</li>
                  <li>• Within 50 miles of our headquarters</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

    </div>
  )
}
