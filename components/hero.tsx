"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowDown, ExternalLink, Code, Palette, Zap } from "lucide-react"

interface HeroProps {
  registerSection: (ref: HTMLElement | null) => void
  setCursorVariant: (variant: string) => void
}

export default function Hero({ registerSection, setCursorVariant }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    registerSection(sectionRef.current)
  }, [registerSection])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      })
    }
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20 scroll-mt-20"
    >
      {/* Pozadie s efektom */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-[#0a0a0a]"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=1080&width=1920&text=Grid')] bg-repeat opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#FF3A3A] filter blur-[150px] opacity-20"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-[#FF3A3A] filter blur-[120px] opacity-10"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 flex flex-col items-center">
        <motion.div
          className="text-center max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-[#FF3A3A] font-medium">Tvorba firemných webov a digitálnych riešení</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Mladý talent v <span className="text-[#FF3A3A]">digitálnom</span> svete
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white/70 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Som 19-ročný študent so záľubou v tvorbe webových stránok. Vytváram moderné a atraktívne weby, ktoré
            pomáhajú firmám zviditeľniť sa v online priestore.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              className="px-8 py-3 bg-[#FF3A3A] text-white rounded-full font-medium hover:bg-[#FF3A3A]/90 transition-colors flex items-center justify-center"
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("about")}
            >
              Moje služby
            </motion.button>

            <motion.button
              className="px-8 py-3 bg-transparent border border-white/20 text-white rounded-full font-medium hover:bg-white/5 transition-colors flex items-center justify-center"
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("projects")}
            >
              Moje projekty <ExternalLink className="ml-2 h-4 w-4" />
            </motion.button>
          </motion.div>

          {/* Prominent Projects button */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              className="px-6 py-2 bg-[#FF3A3A]/20 border-2 border-[#FF3A3A]/50 text-white rounded-xl font-medium hover:bg-[#FF3A3A]/30 transition-colors flex items-center justify-center mx-auto"
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("projects")}
            >
              Prejsť priamo na Projekty
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Výhody */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[#FF3A3A]/30 transition-all"
            whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
          >
            <div className="w-12 h-12 rounded-full bg-[#FF3A3A]/10 flex items-center justify-center mb-4">
              <Code className="h-5 w-5 text-[#FF3A3A]" />
            </div>
            <h3 className="text-lg font-bold mb-2">Moderné technológie</h3>
            <p className="text-white/70 text-sm">
              Využívam najnovšie technológie pre rýchle, bezpečné a spoľahlivé webové riešenia.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[#FF3A3A]/30 transition-all"
            whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
          >
            <div className="w-12 h-12 rounded-full bg-[#FF3A3A]/10 flex items-center justify-center mb-4">
              <Palette className="h-5 w-5 text-[#FF3A3A]" />
            </div>
            <h3 className="text-lg font-bold mb-2">Unikátny dizajn</h3>
            <p className="text-white/70 text-sm">
              Vytváram originálne a atraktívne dizajny, ktoré odrážajú identitu vašej značky.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[#FF3A3A]/30 transition-all"
            whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
          >
            <div className="w-12 h-12 rounded-full bg-[#FF3A3A]/10 flex items-center justify-center mb-4">
              <Zap className="h-5 w-5 text-[#FF3A3A]" />
            </div>
            <h3 className="text-lg font-bold mb-2">Optimalizácia</h3>
            <p className="text-white/70 text-sm">
              Zabezpečujem rýchle načítanie, SEO optimalizáciu a konverzie návštevníkov na zákazníkov.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            className="flex flex-col items-center text-white/50 hover:text-white transition-colors"
            onClick={() => scrollToSection("about")}
            onMouseEnter={() => setCursorVariant("button")}
            onMouseLeave={() => setCursorVariant("default")}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <span className="text-sm mb-2">Posunúť nadol</span>
            <ArrowDown className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

