"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, Send, Instagram, Github, ArrowRight, MessageSquare, Clock } from "lucide-react"

interface ContactProps {
  registerSection: (ref: HTMLElement | null) => void
  setCursorVariant: (variant: string) => void
}

export default function Contact({ registerSection, setCursorVariant }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  useEffect(() => {
    registerSection(sectionRef.current)
  }, [registerSection])

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden scroll-mt-20">
      {/* Pozadie s efektom */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0a0a0a]"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=1080&width=1920&text=Grid')] bg-repeat opacity-5"></div>
          <div className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full bg-[#FF3A3A] filter blur-[150px] opacity-10"></div>
        </div>
      </div>

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
            <span className="text-[#FF3A3A] font-medium">Spojme sa</span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Kontaktujte ma
          </motion.h2>
          <motion.p
            className="text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Máte otázky alebo záujem o spoluprácu? Neváhajte ma kontaktovať
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kontaktné informácie */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
          >
            <h3 className="text-xl font-bold mb-8">Kontaktné informácie</h3>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#FF3A3A]/10 flex items-center justify-center mr-4 shrink-0">
                  <Mail className="h-5 w-5 text-[#FF3A3A]" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <a
                    href="mailto:hello@haze.sk"
                    className="text-white/70 hover:text-white transition-colors"
                    onMouseEnter={() => setCursorVariant("link")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    hello@haze.sk
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#FF3A3A]/10 flex items-center justify-center mr-4 shrink-0">
                  <Phone className="h-5 w-5 text-[#FF3A3A]" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Telefón</h4>
                  <a
                    href="tel:+421904668622"
                    className="text-white/70 hover:text-white transition-colors"
                    onMouseEnter={() => setCursorVariant("link")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    +421 904 668 622
                  </a>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-6">Sociálne siete</h3>

            <div className="flex space-x-4 mb-8">
              <motion.a
                href="https://instagram.com/sbstnhaze"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#FF3A3A]/10 hover:border-[#FF3A3A]/30 hover:text-[#FF3A3A] transition-colors"
                whileHover={{ y: -5 }}
                onMouseEnter={() => setCursorVariant("link")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://github.com/hxzes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#FF3A3A]/10 hover:border-[#FF3A3A]/30 hover:text-[#FF3A3A] transition-colors"
                whileHover={{ y: -5 }}
                onMouseEnter={() => setCursorVariant("link")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <Github className="h-5 w-5" />
              </motion.a>
            </div>

            <motion.button
              className="w-full px-6 py-3 bg-[#FF3A3A] text-white rounded-full font-medium hover:bg-[#FF3A3A]/90 transition-colors flex items-center justify-center"
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => (window.location.href = "mailto:hello@haze.sk")}
            >
              Napíšte mi email <ArrowRight className="ml-2 h-4 w-4" />
            </motion.button>
          </motion.div>

          {/* Informačné karty */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-[#FF3A3A]/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-5 w-5 text-[#FF3A3A]" />
              </div>
              <h3 className="text-lg font-bold mb-2">Rýchla odpoveď</h3>
              <p className="text-white/70">
                Na všetky správy odpovedám do 24 hodín. Snažím sa poskytovať rýchle a kvalitné odpovede na všetky
                otázky.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-[#FF3A3A]/10 flex items-center justify-center mb-4">
                <Clock className="h-5 w-5 text-[#FF3A3A]" />
              </div>
              <h3 className="text-lg font-bold mb-2">Dostupnosť</h3>
              <p className="text-white/70">
                Som k dispozícii pre konzultácie a spoluprácu počas pracovných dní od 9:00 do 18:00.
              </p>
            </div>

            <div className="bg-gradient-to-r from-[#FF3A3A]/20 to-black/40 backdrop-blur-sm border border-[#FF3A3A]/20 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">Začnime spoluprácu</h3>
              <p className="text-white/70 mb-4">
                Máte projekt, na ktorom by ste chceli spolupracovať? Kontaktujte ma a prediskutujme možnosti.
              </p>
              <motion.button
                className="px-5 py-2 bg-[#FF3A3A] text-white rounded-full text-sm font-medium hover:bg-[#FF3A3A]/90 transition-colors inline-flex items-center"
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "mailto:hello@haze.sk")}
              >
                Kontaktovať <Send className="ml-2 h-3 w-3" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

