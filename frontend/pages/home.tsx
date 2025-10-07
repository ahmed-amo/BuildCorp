
import React from "react"
import Hero from "../headers/hero"
import About from "../headers/aboutHome"
import Services from "../headers/servicesHome"
import Projects from "../headers/projectsHome"
import Testimonials from "../headers/testimonials"
export default function Home() {
  return (
  <div>
    <Hero/>
    <About/>
    <Services/>
    <Projects/>
    <Testimonials/>
  </div>
  )
}
