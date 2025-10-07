"use client"

import { useState } from "react"
import { Button } from "../src/assets/button"
import { Menu, X, HardHat, Phone } from "lucide-react"
import React from "react"
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <HardHat className="h-8 w-8 text-secondary" />
            <span className="text-xl font-bold">BuildCorp</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="home" className="hover:text-secondary transition-colors duration-200">
              Home
            </a>
            <a href="services" className="hover:text-secondary transition-colors duration-200">
              Services
            </a>
            <a href="projects" className="hover:text-secondary transition-colors duration-200">
              Projects
            </a>
            <a href="about" className="hover:text-secondary transition-colors duration-200">
              About
            </a>
            <a href="contact" className="hover:text-secondary transition-colors duration-200">
              Contact
            </a>
          </div>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4" />
              <span>(555) 123-4567</span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              Get Quote
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              size="sm"
              onClick={toggleMenu}
              className="text-primary-foreground hover:text-secondary hover:bg-primary/80"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-primary-foreground/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#home"
                className="block px-3 py-2 text-base hover:text-secondary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#services"
                className="block px-3 py-2 text-base hover:text-secondary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#projects"
                className="block px-3 py-2 text-base hover:text-secondary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-base hover:text-secondary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-base hover:text-secondary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <div className="px-3 py-2 border-t border-primary-foreground/20 mt-2">
                <div className="flex items-center space-x-2 text-sm mb-2">
                  <Phone className="h-4 w-4" />
                  <span>(555) 123-4567</span>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  Get Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
