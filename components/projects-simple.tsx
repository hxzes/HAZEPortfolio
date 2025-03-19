"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"

interface ProjectsProps {
  registerSection: (ref: HTMLElement | null) => void
  setCursorVariant: (variant: string) => void
}

export default function Projects({ registerSection, setCursorVariant }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  useEffect(() => {
    registerSection(sectionRef.current)
  }, [registerSection])

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-block mb-4 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="text-[#FF3A3A] font-medium">Moja práca</span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Moje projekty
          </motion.h2>
          <motion.p
            className="text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Pozrite si niektoré z mojich najnovších projektov, na ktorých som pracoval
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.4 + index * 0.1 }}
              onMouseEnter={() => setCursorVariant("project")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <div className="aspect-video bg-gray-800 flex items-center justify-center">
                <div className="text-2xl font-bold text-white/50">Projekt {index}</div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">Projekt {index}</h3>
                <p className="text-white/70 mb-4">
                  Krátky popis projektu a použitých technológií. Tento projekt bol vytvorený pomocou moderných webových
                  technológií.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-2 py-1 bg-white/10 rounded-full">Web Dizajn</span>
                  <span className="text-xs px-2 py-1 bg-white/10 rounded-full">React</span>
                  <span className="text-xs px-2 py-1 bg-white/10 rounded-full">Tailwind CSS</span>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center text-[#FF3A3A] hover:underline"
                  onMouseEnter={() => setCursorVariant("link")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  Zobraziť detail
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

