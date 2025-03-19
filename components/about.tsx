"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, Briefcase, CheckCircle } from "lucide-react"
import Image from "next/image"

interface AboutProps {
  registerSection: (ref: HTMLElement | null) => void
  setCursorVariant: (variant: string) => void
}

export default function About({ registerSection, setCursorVariant }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  useEffect(() => {
    registerSection(sectionRef.current)
  }, [registerSection])

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.7,
        ease: "easeOut",
      },
    }),
  }

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden scroll-mt-20">
      {/* Pozadie s efektom */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0a0a0a]"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('/placeholder.svg?height=1080&width=1920&text=Grid')] bg-repeat opacity-5"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-[#FF3A3A] filter blur-[120px] opacity-10"></div>
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
            <span className="text-[#FF3A3A] font-medium">Kto som</span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            O mne
          </motion.h2>
          <motion.p
            className="text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Som profesionál špecializujúci sa na tvorbu firemných webov a digitálnych riešení
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Profile Image */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-[#FF3A3A]/20 shadow-lg shadow-[#FF3A3A]/10">
              <Image
                src="/images/billiards.png"
                alt="Profile Photo"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 256px"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="md:col-span-2 space-y-8">
            <motion.div
              custom={0}
              variants={fadeInUpVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-center md:text-left"
            >
              <h3 className="text-2xl font-bold mb-4">HAZE Design</h3>
              <p className="text-white/70 mb-6">
                Som 19-ročný študent strednej školy SSOŠ Polytechnická DSA v Nitre so záľubou v tvorbe webových stránok.
                Web dizajn je pre mňa viac než len koníček - je to vášeň, ku ktorej mám prirodzený cit. Napriek mladému
                veku sa mi podarilo vytvoriť niekoľko úspešných projektov pre lokálne firmy.
              </p>
            </motion.div>

            <motion.div
              custom={1}
              variants={fadeInUpVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#FF3A3A]/10 flex items-center justify-center mr-3">
                  <Briefcase className="h-5 w-5 text-[#FF3A3A]" />
                </div>
                <div>
                  <div className="text-sm text-white/50">Vek</div>
                  <div>19 rokov</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#FF3A3A]/10 flex items-center justify-center mr-3">
                  <Mail className="h-5 w-5 text-[#FF3A3A]" />
                </div>
                <div>
                  <div className="text-sm text-white/50">Email</div>
                  <div>hello@haze.sk</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#FF3A3A]/10 flex items-center justify-center mr-3">
                  <Phone className="h-5 w-5 text-[#FF3A3A]" />
                </div>
                <div>
                  <div className="text-sm text-white/50">Telefón</div>
                  <div>+421 904 668 622</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#FF3A3A]/10 flex items-center justify-center mr-3">
                  <MapPin className="h-5 w-5 text-[#FF3A3A]" />
                </div>
                <div>
                  <div className="text-sm text-white/50">Lokalita</div>
                  <div>Šaľa, Slovensko</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              custom={2}
              variants={fadeInUpVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-4"
            >
              <h4 className="text-xl font-semibold">Prečo si vybrať moje služby</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[#FF3A3A]/10 flex items-center justify-center mr-3 shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-[#FF3A3A]" />
                  </div>
                  <div>
                    <div className="font-medium">Moderný dizajn</div>
                    <div className="text-sm text-white/70">
                      Vytváram moderné a atraktívne webové stránky, ktoré zaujmú na prvý pohľad.
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[#FF3A3A]/10 flex items-center justify-center mr-3 shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-[#FF3A3A]" />
                  </div>
                  <div>
                    <div className="font-medium">Responzívne riešenia</div>
                    <div className="text-sm text-white/70">
                      Všetky moje weby sú optimalizované pre všetky zariadenia - mobily, tablety aj počítače.
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[#FF3A3A]/10 flex items-center justify-center mr-3 shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-[#FF3A3A]" />
                  </div>
                  <div>
                    <div className="font-medium">Študentský prístup</div>
                    <div className="text-sm text-white/70">
                      Prinášam čerstvý pohľad a najnovšie trendy, ktoré kombinujem s prirodzeným citom pre dizajn.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              custom={3}
              variants={fadeInUpVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="pt-6 flex md:justify-start justify-center"
            >
              <motion.button
                className="px-6 py-2 bg-[#FF3A3A] text-white rounded-full font-medium hover:bg-[#FF3A3A]/90 transition-colors"
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "mailto:hello@haze.sk")}
              >
                Kontaktujte ma
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

