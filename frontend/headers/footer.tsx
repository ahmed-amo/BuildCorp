import { HardHat, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import React from "react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <HardHat className="h-8 w-8 text-secondary" />
              <span className="text-xl font-bold">BuildCorp</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Professional construction services with over 20 years of experience. Building dreams into reality with
              quality craftsmanship.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-primary-foreground/70 hover:text-secondary transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-primary-foreground/70 hover:text-secondary transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-primary-foreground/70 hover:text-secondary transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-primary-foreground/70 hover:text-secondary transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200">
                  Residential Construction
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200">
                  Commercial Building
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200">
                  Renovations
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200">
                  Project Management
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200">
                  Consulting
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#home"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200"
                >
                  Our Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200">
                  Get Quote
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-secondary flex-shrink-0" />
                <span className="text-primary-foreground/80">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-secondary flex-shrink-0" />
                <span className="text-primary-foreground/80">info@buildcorp.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80">
                  123 Construction Ave
                  <br />
                  Building City, BC 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-primary-foreground/70">
              © 2024 BuildCorp Construction. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors duration-200">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
