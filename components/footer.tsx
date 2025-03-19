"use client"

import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"

interface FooterProps {
  setCursorVariant: (variant: string) => void
}

export default function Footer({ setCursorVariant }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 relative overflow-hidden">
      {/* Pozadie s efektom */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-8 mb-8">
          <motion.div
            className="text-2xl font-bold tracking-wider mb-6 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            HAZE<span className="text-[#FF3A3A]">DESIGN</span>
          </motion.div>

          <motion.button
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#FF3A3A]/10 hover:border-[#FF3A3A]/30 hover:text-[#FF3A3A] transition-colors"
            onClick={scrollToTop}
            onMouseEnter={() => setCursorVariant("button")}
            onMouseLeave={() => setCursorVariant("default")}
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        </div>

        <div className="flex justify-center items-center">
          <motion.div
            className="text-white/50 text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            &copy; {currentYear} HAZEDesign. Všetky práva vyhradené.
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

