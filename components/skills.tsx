"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { ShoppingCart, Search, BarChart, Globe } from "lucide-react"

interface SkillsProps {
  registerSection: (ref: HTMLElement | null) => void
  setCursorVariant: (variant: string) => void
}

interface Service {
  title: string
  description: string
  icon: React.ReactNode
  features: string[]
}

export default function Skills({ registerSection, setCursorVariant }: SkillsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  useEffect(() => {
    registerSection(sectionRef.current)
  }, [registerSection])

  const services: Service[] = [
    {
      title: "Firemné webové stránky",
      description: "Profesionálne webové stránky pre firmy, ktoré budujú dôveryhodnosť a priťahujú nových zákazníkov.",
      icon: <Globe className="h-6 w-6" />,
      features: [
        "Moderný responzívny dizajn",
        "Optimalizácia pre vyhľadávače (SEO)",
        "Rýchle načítanie stránok",
        "Kontaktné formuláre a CTA prvky",
        "Integrácia sociálnych sietí",
        "Analytické nástroje",
      ],
    },
    {
      title: "E-commerce riešenia",
      description: "Kompletné e-shopové riešenia, ktoré premieňajú návštevníkov na zákazníkov a zvyšujú vaše predaje.",
      icon: <ShoppingCart className="h-6 w-6" />,
      features: [
        "Používateľsky prívetivý dizajn",
        "Jednoduchý nákupný proces",
        "Bezpečné platobné brány",
        "Správa produktov a kategórií",
        "Integrácia s účtovnými systémami",
        "Mobilná optimalizácia",
      ],
    },
    {
      title: "SEO optimalizácia",
      description: "Zvýšte viditeľnosť vášho webu vo vyhľadávačoch a získajte viac organickej návštevnosti.",
      icon: <Search className="h-6 w-6" />,
      features: [
        "Analýza kľúčových slov",
        "On-page optimalizácia",
        "Technické SEO",
        "Linkbuilding",
        "Lokálne SEO",
        "Pravidelné reporty a analýzy",
      ],
    },
    {
      title: "Webová analytika",
      description: "Sledujte výkon vášho webu, analyzujte správanie používateľov a optimalizujte konverzie.",
      icon: <BarChart className="h-6 w-6" />,
      features: [
        "Implementácia Google Analytics",
        "Sledovanie konverzií",
        "Analýza používateľského správania",
        "Heatmapy a nahrávky návštev",
        "A/B testovanie",
        "Pravidelné reporty",
      ],
    },
  ]

  return (
    <section id="skills" ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden scroll-mt-20">
      {/* Pozadie s efektom */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0a0a0a]"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('/placeholder.svg?height=1080&width=1920&text=Grid')] bg-repeat opacity-5"></div>
          <div className="absolute top-1/4 right-1/3 w-64 h-64 rounded-full bg-[#FF3A3A] filter blur-[120px] opacity-10"></div>
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
            <span className="text-[#FF3A3A] font-medium">Moje služby</span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Komplexné digitálne riešenia
          </motion.h2>
          <motion.p
            className="text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Poskytujem komplexné služby v oblasti tvorby webových stránok a digitálneho marketingu
          </motion.p>
        </motion.div>

        {/* Služby */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-[#FF3A3A]/30 transition-all group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.4 + index * 0.1 }}
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
              whileHover={{ y: -5 }}
            >
              <div className="p-6 md:p-8">
                <div className="w-16 h-16 rounded-full bg-[#FF3A3A]/10 flex items-center justify-center mb-6 text-[#FF3A3A] group-hover:bg-[#FF3A3A]/20 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-white/70 mb-6">{service.description}</p>

                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-[#FF3A3A]/10 flex items-center justify-center mr-3 text-[#FF3A3A]">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA sekcia */}
        <motion.div
          className="bg-gradient-to-r from-[#FF3A3A]/20 to-black/40 backdrop-blur-sm border border-[#FF3A3A]/20 rounded-xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Pripravení posunúť váš biznis na ďalšiu úroveň?</h3>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Kontaktujte ma ešte dnes a získajte bezplatnú konzultáciu. Pomôžem vám vytvoriť digitálnu stratégiu, ktorá
            prinesie výsledky pre váš biznis.
          </p>
          <motion.button
            className="px-8 py-3 bg-[#FF3A3A] text-white rounded-full font-medium hover:bg-[#FF3A3A]/90 transition-colors inline-flex items-center"
            onMouseEnter={() => setCursorVariant("button")}
            onMouseLeave={() => setCursorVariant("default")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Získať bezplatnú konzultáciu
            <svg
              className="ml-2"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.33337 8H12.6667"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 3.33337L12.6667 8.00004L8 12.6667"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

