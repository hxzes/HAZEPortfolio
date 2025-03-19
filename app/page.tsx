"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Cursor from "@/components/cursor"
import Loader from "@/components/loader"
import { useMediaQuery } from "@/hooks/use-mobile"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("home")
  const [cursorVariant, setCursorVariant] = useState("default")
  const isMobile = useMediaQuery("(max-width: 768px)")
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    // Simulácia načítania stránky
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      // Find the section closest to the current scroll position
      let currentSection = "home"
      let minDistance = Number.POSITIVE_INFINITY

      Object.entries(sectionsRef.current).forEach(([section, ref]) => {
        if (!ref) return

        const { offsetTop, offsetHeight } = ref
        const sectionMiddle = offsetTop + offsetHeight / 2
        const distance = Math.abs(scrollPosition - sectionMiddle)

        if (distance < minDistance) {
          minDistance = distance
          currentSection = section
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)

    // Initial check on mount
    setTimeout(() => {
      handleScroll()
      // Force a second check after a bit longer to ensure everything is loaded
      setTimeout(handleScroll, 500)
    }, 100)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const registerSection = (id: string, ref: HTMLElement | null) => {
    if (ref) {
      sectionsRef.current[id] = ref
      console.log(`Registered section: ${id}`, ref)
    }
  }

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">
      <AnimatePresence>
        {loading ? (
          <Loader key="loader" />
        ) : (
          <>
            {!isMobile && <Cursor variant={cursorVariant} />}
            <Navbar
              activeSection={activeSection}
              setCursorVariant={setCursorVariant}
              setActiveSection={setActiveSection}
            />

            <Hero registerSection={(ref) => registerSection("home", ref)} setCursorVariant={setCursorVariant} />

            <About registerSection={(ref) => registerSection("about", ref)} setCursorVariant={setCursorVariant} />

            <Projects registerSection={(ref) => registerSection("projects", ref)} setCursorVariant={setCursorVariant} />

            <Skills registerSection={(ref) => registerSection("skills", ref)} setCursorVariant={setCursorVariant} />

            <Contact registerSection={(ref) => registerSection("contact", ref)} setCursorVariant={setCursorVariant} />

            <Footer setCursorVariant={setCursorVariant} />
          </>
        )}
      </AnimatePresence>
    </main>
  )
}

