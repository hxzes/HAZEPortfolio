"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Moon, Apple, Heart, Dumbbell, BarChart, ChevronLeft, ChevronRight } from "lucide-react"

export default function OmniaProjectDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const screenshots = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hj66pKjgsaLahYNyen5zdSQGGkTFFA.png",
      alt: "Omnia App Dashboard",
      title: "Dashboard",
      description: "Prehľadný dashboard zobrazujúci denné štatistiky a pokrok používateľa.",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sDefKGXnfpupwssiazzOdCnleis5Rz.png",
      alt: "Omnia App Menu",
      title: "Hlavné menu",
      description: "Intuitívne menu s prístupom ku všetkým funkciám aplikácie.",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6q1P7F1VhFfRVRbVWd5EPQuN352P0H.png",
      alt: "Omnia App Training",
      title: "Tréningový plán",
      description: "Detailný prehľad tréningového plánu s možnosťou úpravy cvikov.",
    },
  ]

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1))
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Omnia Fitness App</h2>
          <p className="text-white/70 mb-6">
            Komplexná fitness aplikácia navrhnutá pre sledovanie všetkých aspektov zdravého životného štýlu. Aplikácia
            umožňuje používateľom sledovať tréningy, spánok, výživu a vitálne funkcie v jednom intuitívnom rozhraní.
          </p>

          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold">Hlavné funkcie</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[#FF3A3A]/10 flex items-center justify-center mr-3 shrink-0 mt-1">
                  <Dumbbell className="h-5 w-5 text-[#FF3A3A]" />
                </div>
                <div>
                  <div className="font-medium">Exercise Log</div>
                  <div className="text-sm text-white/70">
                    Sledovanie tréningov, cvikov a pokroku s detailnými štatistikami
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[#FF3A3A]/10 flex items-center justify-center mr-3 shrink-0 mt-1">
                  <Moon className="h-5 w-5 text-[#FF3A3A]" />
                </div>
                <div>
                  <div className="font-medium">Sleep Tracker</div>
                  <div className="text-sm text-white/70">Analýza spánkových cyklov a kvality odpočinku</div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[#FF3A3A]/10 flex items-center justify-center mr-3 shrink-0 mt-1">
                  <Apple className="h-5 w-5 text-[#FF3A3A]" />
                </div>
                <div>
                  <div className="font-medium">Nutrition</div>
                  <div className="text-sm text-white/70">Sledovanie príjmu kalórií a makroživín s plánovaním jedál</div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[#FF3A3A]/10 flex items-center justify-center mr-3 shrink-0 mt-1">
                  <Heart className="h-5 w-5 text-[#FF3A3A]" />
                </div>
                <div>
                  <div className="font-medium">Vitals</div>
                  <div className="text-sm text-white/70">
                    Monitorovanie vitálnych funkcií a zdravotných ukazovateľov
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-xs px-3 py-1 bg-white/10 rounded-full">React Native</span>
            <span className="text-xs px-3 py-1 bg-white/10 rounded-full">TypeScript</span>
            <span className="text-xs px-3 py-1 bg-white/10 rounded-full">Firebase</span>
            <span className="text-xs px-3 py-1 bg-white/10 rounded-full">Health API</span>
            <span className="text-xs px-3 py-1 bg-white/10 rounded-full">UI/UX Design</span>
          </div>
        </div>

        <div className="relative">
          {/* Screenshot Gallery */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/30 h-[600px] flex items-center justify-center">
            {/* Current Screenshot */}
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative h-full flex flex-col items-center justify-center p-4"
              >
                <div className="relative w-[300px] h-[600px] overflow-hidden">
                  <Image
                    src={screenshots[currentImageIndex].src || "/placeholder.svg"}
                    alt={screenshots[currentImageIndex].alt}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div className="absolute bottom-4 left-0 right-0 bg-black/70 p-3 mx-4 rounded-lg">
                  <h4 className="text-lg font-bold">{screenshots[currentImageIndex].title}</h4>
                  <p className="text-sm text-white/70">{screenshots[currentImageIndex].description}</p>
                </div>
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-[#FF3A3A]/70 transition-colors z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-[#FF3A3A]/70 transition-colors z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center mt-4 space-x-2">
            {screenshots.map((screenshot, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentImageIndex === index ? "bg-[#FF3A3A]" : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`View screenshot ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8">
        <h3 className="text-lg font-semibold mb-4">Technické detaily</h3>
        <p className="text-white/70 mb-6">
          Aplikácia bola vyvinutá pomocou React Native s TypeScript pre zabezpečenie typovej bezpečnosti. Backend je
          postavený na Firebase pre autentifikáciu, databázu a cloudové funkcie. Aplikácia sa integruje s Health API pre
          získavanie údajov zo zdravotných senzorov a nositeľných zariadení.
        </p>

        <div className="bg-white/5 rounded-xl p-6 mb-8">
          <h4 className="font-medium mb-3 flex items-center">
            <BarChart className="h-5 w-5 mr-2 text-[#FF3A3A]" /> Kľúčové metriky
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FF3A3A]">85%</div>
              <div className="text-sm text-white/70">Presnosť sledovania</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FF3A3A]">12k+</div>
              <div className="text-sm text-white/70">Aktívnych používateľov</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FF3A3A]">4.8</div>
              <div className="text-sm text-white/70">Hodnotenie v App Store</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FF3A3A]">98%</div>
              <div className="text-sm text-white/70">Spokojnosť používateľov</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <motion.button
            className="px-6 py-3 bg-[#FF3A3A] text-white rounded-full font-medium hover:bg-[#FF3A3A]/90 transition-colors inline-flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Stiahnuť aplikáciu
          </motion.button>
        </div>
      </div>
    </div>
  )
}

