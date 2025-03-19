"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-mobile"

interface NavbarProps {
  activeSection: string
  setCursorVariant: (variant: string) => void
  setActiveSection: (section: string) => void
}

export default function Navbar({ activeSection, setCursorVariant, setActiveSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Navigation items
  const navItems = [
    { id: "home", label: "Domov" },
    { id: "about", label: "O mne" },
    { id: "projects", label: "Projekty" },
    { id: "skills", label: "Služby" },
    { id: "contact", label: "Kontakt" },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      console.log(`Scrolling to section: ${id}`, element.offsetTop)

      // Use a timeout to ensure the scroll happens after any state updates
      setTimeout(() => {
        window.scrollTo({
          top: element.offsetTop - 100,
          behavior: "smooth",
        })

        // Force active section update
        setTimeout(() => {
          setActiveSection(id)
        }, 100)
      }, 10)
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Backdrop blur effect */}
        <div
          className={`absolute inset-0 backdrop-blur-md transition-all duration-300 ${
            scrolled ? "bg-[#0a0a0a]/80" : "bg-transparent"
          }`}
        />

        {/* Red line animation */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-[#FF3A3A]"
          initial={{ width: "0%" }}
          animate={{ width: scrolled ? "100%" : "0%" }}
          transition={{ duration: 0.5 }}
        />

        <div className="container mx-auto px-6 flex justify-between items-center relative z-10">
          <motion.div
            className="text-2xl font-bold tracking-wider"
            onMouseEnter={() => setCursorVariant("link")}
            onMouseLeave={() => setCursorVariant("default")}
            onClick={() => scrollToSection("home")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative">
              HAZE<span className="text-[#FF3A3A]">DESIGN</span>
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#FF3A3A]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </span>
          </motion.div>

          {isMobile ? (
            <motion.button
              className="relative z-20 text-white p-2 bg-[#FF3A3A]/10 rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu size={24} />
            </motion.button>
          ) : (
            <div className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
              {/* Creative navigation menu */}
              <div
                className="relative flex space-x-1 bg-[#0a0a0a]/50 backdrop-blur-md p-1 rounded-full border border-white/10"
                ref={menuRef}
              >
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id

                  return (
                    <motion.button
                      key={item.id}
                      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors z-10 ${
                        isActive ? "text-white" : "text-white/70"
                      }`}
                      onClick={() => scrollToSection(item.id)}
                      onMouseEnter={() => {
                        setCursorVariant("link")
                        setHoverIndex(index)
                      }}
                      onMouseLeave={() => {
                        setCursorVariant("default")
                        setHoverIndex(null)
                      }}
                      whileHover={{ y: -2 }}
                    >
                      {item.label}

                      {/* Hover indicator */}
                      {hoverIndex === index && !isActive && (
                        <motion.span
                          className="absolute bottom-0 left-0 right-0 mx-auto w-1 h-1 bg-[#FF3A3A] rounded-full"
                          layoutId="hoverDot"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  )
                })}

                {/* Active indicator */}
                <motion.div
                  className="absolute inset-y-1 rounded-full bg-[#FF3A3A]/20 border border-[#FF3A3A]/30 z-0"
                  layoutId="activeNav"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{
                    width:
                      menuRef.current && activeSection
                        ? (menuRef.current.querySelector(`button[key="${activeSection}"]`) as HTMLElement)
                            ?.offsetWidth || 0
                        : 0,
                    left:
                      menuRef.current && activeSection
                        ? (menuRef.current.querySelector(`button[key="${activeSection}"]`) as HTMLElement)
                            ?.offsetLeft || 0
                        : 0,
                  }}
                />
              </div>
            </div>
          )}

          {!isMobile && (
            <motion.button
              className="px-4 py-2 bg-[#FF3A3A] text-white rounded-full text-sm font-medium hover:bg-[#FF3A3A]/90 transition-colors flex items-center"
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("contact")}
            >
              Bezplatná konzultácia
            </motion.button>
          )}
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-[#0a0a0a] z-50 flex flex-col"
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center p-6">
              <div className="text-2xl font-bold tracking-wider">
                HAZE<span className="text-[#FF3A3A]">DESIGN</span>
              </div>
              <button className="text-white p-2 bg-[#FF3A3A]/10 rounded-full" onClick={() => setMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 space-y-8">
              {/* Special prominent Projects button */}
              <motion.button
                className="px-6 py-3 bg-[#FF3A3A]/20 border border-[#FF3A3A]/50 text-white rounded-xl text-lg font-medium mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => scrollToSection("projects")}
                whileTap={{ scale: 0.95 }}
              >
                Zobraziť Projekty
              </motion.button>

              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="relative"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.button
                    className={`text-3xl font-medium ${activeSection === item.id ? "text-[#FF3A3A]" : "text-white/70"}`}
                    onClick={() => scrollToSection(item.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.button>
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 mx-auto w-12 h-1 bg-[#FF3A3A] rounded-full"
                      layoutId="activeMobileIndicator"
                    />
                  )}
                </motion.div>
              ))}

              <motion.button
                className="mt-8 px-6 py-3 bg-[#FF3A3A] text-white rounded-full text-lg font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contact")}
              >
                Bezplatná konzultácia
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

