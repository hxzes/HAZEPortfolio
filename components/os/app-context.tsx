"use client"

import type React from "react"
import { createContext, useState, useContext, type ReactNode, useMemo } from "react"
import {
  User,
  Palette,
  Code,
  MessageSquare,
  Phone,
  Globe,
  Layers,
  ImageIcon,
  FileText,
  Briefcase,
  Monitor,
  Laptop,
} from "lucide-react"

export type AppType = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  component: React.ReactNode
  isOpen: boolean
  isMinimized: boolean
  zIndex: number
  position: { x: number; y: number }
  size: { width: number; height: number }
}

interface AppContextType {
  apps: AppType[]
  openApp: (id: string) => void
  closeApp: (id: string) => void
  minimizeApp: (id: string) => void
  restoreApp: (id: string) => void
  focusApp: (id: string) => void
  updateAppPosition: (id: string, position: { x: number; y: number }) => void
  updateAppSize: (id: string, size: { width: number; height: number }) => void
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined)

// Export the hook to use the context
export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext musí byť použitý v rámci AppProvider")
  }
  return context
}

// Export the provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [apps, setApps] = useState<AppType[]>([
    {
      id: "omne",
      title: "O mne",
      description: "Informácie o mne a mojich skúsenostiach",
      icon: <User className="h-6 w-6" />,
      component: (
        <div className="p-6 h-full overflow-y-auto text-white">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-1/3">
              <div className="aspect-square bg-gradient-to-br from-red-500 to-black rounded-xl overflow-hidden">
                <img
                  src="/placeholder.svg?height=300&width=300&text=Profilová fotka"
                  alt="Profilová fotka"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h1 className="text-3xl font-bold mb-2">Ján Novák</h1>
              <h2 className="text-xl text-red-400 mb-4">Web Dizajnér & UI/UX Špecialista</h2>
              <p className="mb-4">
                Som kreatívny web dizajnér s vášňou pre vytváranie moderných a používateľsky prívetivých webových
                stránok. Mám 5 rokov skúseností s navrhovaním a vývojom webov pre rôzne odvetvia.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Kontakt</h3>
                  <ul className="space-y-1">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      jan.novak@example.com
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      +421 900 123 456
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Bratislava, Slovensko
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Zručnosti</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">UI/UX Dizajn</span>
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">Figma</span>
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">HTML/CSS</span>
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">JavaScript</span>
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">React</span>
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">Tailwind CSS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-2">Skúsenosti</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <h3 className="text-lg font-semibold">Senior Web Dizajnér</h3>
                  <span className="text-red-400">2021 - Súčasnosť</span>
                </div>
                <div className="text-sm text-white/70 mb-2">DigitalStudio, s.r.o.</div>
                <p>
                  Navrhujem a vyvíjam moderné webové stránky a aplikácie pre klientov z rôznych odvetví. Vediem tím
                  dizajnérov a spolupracujem s vývojármi na implementácii dizajnov.
                </p>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <h3 className="text-lg font-semibold">UI/UX Dizajnér</h3>
                  <span className="text-red-400">2018 - 2021</span>
                </div>
                <div className="text-sm text-white/70 mb-2">WebCreative, s.r.o.</div>
                <p>
                  Vytváral som používateľské rozhrania a zlepšoval používateľskú skúsenosť pre webové a mobilné
                  aplikácie. Spolupracoval som s produktovým tímom na definovaní požiadaviek a riešení.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-2">Vzdelanie</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <h3 className="text-lg font-semibold">Magister v odbore Dizajn digitálnych médií</h3>
                  <span className="text-red-400">2016 - 2018</span>
                </div>
                <div className="text-sm text-white/70">Univerzita Komenského v Bratislave</div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <h3 className="text-lg font-semibold">Bakalár v odbore Grafický dizajn</h3>
                  <span className="text-red-400">2013 - 2016</span>
                </div>
                <div className="text-sm text-white/70">Vysoká škola výtvarných umení v Bratislave</div>
              </div>
            </div>
          </div>
        </div>
      ),
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      position: { x: 100, y: 100 },
      size: { width: 700, height: 600 },
    },
    {
      id: "projekty",
      title: "Projekty",
      description: "Prehliadka mojich dizajnových projektov",
      icon: <Briefcase className="h-6 w-6" />,
      component: (
        <div className="p-6 h-full overflow-y-auto text-white">
          <h1 className="text-3xl font-bold mb-6">Moje projekty</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "E-commerce Redesign",
                category: "Web Dizajn",
                image: "/placeholder.svg?height=300&width=500&text=E-commerce",
                description: "Kompletný redesign e-shopu s oblečením s dôrazom na používateľskú skúsenosť a konverzie.",
              },
              {
                title: "Finančná Aplikácia",
                category: "UI/UX Dizajn",
                image: "/placeholder.svg?height=300&width=500&text=Finančná Aplikácia",
                description: "Dizajn mobilnej aplikácie pre správu osobných financií s intuitívnym rozhraním.",
              },
              {
                title: "Cestovateľský Blog",
                category: "Web Dizajn",
                image: "/placeholder.svg?height=300&width=500&text=Cestovateľský Blog",
                description: "Moderný a responzívny dizajn blogu o cestovaní s dôrazom na vizuálny obsah.",
              },
              {
                title: "Firemný Web",
                category: "Web Dizajn",
                image: "/placeholder.svg?height=300&width=500&text=Firemný Web",
                description: "Korporátna webová stránka pre IT spoločnosť s moderným a profesionálnym vzhľadom.",
              },
              {
                title: "Fitness Aplikácia",
                category: "UI/UX Dizajn",
                image: "/placeholder.svg?height=300&width=500&text=Fitness Aplikácia",
                description: "Dizajn aplikácie pre sledovanie fitness aktivít a zdravého životného štýlu.",
              },
              {
                title: "Reštauračný Web",
                category: "Web Dizajn",
                image: "/placeholder.svg?height=300&width=500&text=Reštauračný Web",
                description: "Webová stránka pre luxusnú reštauráciu s online rezervačným systémom.",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="bg-black/40 rounded-xl overflow-hidden hover:bg-black/60 transition-colors cursor-pointer group border border-red-500/20"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 w-full">
                      <div className="text-xs text-red-400 mb-1">{project.category}</div>
                      <div className="text-lg font-bold">{project.title}</div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                  <div className="text-xs text-red-400 mb-2">{project.category}</div>
                  <p className="text-sm text-white/70">{project.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <button className="text-sm text-red-400 hover:text-red-300 transition-colors">
                      Zobraziť detail
                    </button>
                    <button className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 rounded-full transition-colors">
                      Demo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      position: { x: 150, y: 150 },
      size: { width: 900, height: 600 },
    },
    {
      id: "sluzby",
      title: "Služby",
      description: "Služby, ktoré ponúkam klientom",
      icon: <Layers className="h-6 w-6" />,
      component: (
        <div className="p-6 h-full overflow-y-auto text-white">
          <h1 className="text-3xl font-bold mb-6">Moje služby</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Web Dizajn",
                icon: <Palette className="h-10 w-10" />,
                description:
                  "Navrhujem moderné, responzívne a používateľsky prívetivé webové stránky, ktoré zaujmú vašich návštevníkov a premenia ich na zákazníkov.",
              },
              {
                title: "UI/UX Dizajn",
                icon: <Layers className="h-10 w-10" />,
                description:
                  "Vytváram intuitívne používateľské rozhrania a zážitky, ktoré zlepšujú spokojnosť používateľov a zvyšujú konverzie.",
              },
              {
                title: "Frontend Vývoj",
                icon: <Code className="h-10 w-10" />,
                description:
                  "Implementujem dizajny pomocou moderných technológií ako HTML5, CSS3, JavaScript a React pre vytvorenie interaktívnych webových stránok.",
              },
              {
                title: "Responzívny Dizajn",
                icon: <Laptop className="h-10 w-10" />,
                description:
                  "Zabezpečujem, aby vaše webové stránky vyzerali a fungovali perfektne na všetkých zariadeniach - od mobilov až po veľké monitory.",
              },
              {
                title: "Redesign Webu",
                icon: <Monitor className="h-10 w-10" />,
                description:
                  "Aktualizujem a vylepšujem existujúce webové stránky, aby zodpovedali moderným trendom a požiadavkám používateľov.",
              },
              {
                title: "Konzultácie",
                icon: <MessageSquare className="h-10 w-10" />,
                description:
                  "Poskytujem odborné poradenstvo v oblasti web dizajnu, používateľskej skúsenosti a digitálnej stratégie.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-black/40 rounded-xl p-6 hover:bg-black/60 transition-colors border border-red-500/20"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-black rounded-xl flex items-center justify-center mb-4 text-red-400">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-white/70">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-red-500/20 to-black rounded-xl p-6 border border-red-500/20">
            <h2 className="text-2xl font-bold mb-4">Potrebujete pomoc s vaším projektom?</h2>
            <p className="mb-6">
              Som pripravený pomôcť vám s vaším ďalším digitálnym projektom. Kontaktujte ma a prediskutujeme vaše
              požiadavky.
            </p>
            <button className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors">
              Kontaktujte ma
            </button>
          </div>
        </div>
      ),
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      position: { x: 200, y: 200 },
      size: { width: 800, height: 600 },
    },
    {
      id: "portfolio",
      title: "Portfolio",
      description: "Ukážky mojich najlepších prác",
      icon: <ImageIcon className="h-6 w-6" />,
      component: (
        <div className="p-0 h-full overflow-hidden flex flex-col text-white">
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40">
            <h1 className="text-xl font-bold">Portfolio ukážky</h1>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-black/40 rounded hover:bg-black/60 text-sm">Všetky</button>
              <button className="px-3 py-1 bg-black/40 rounded hover:bg-black/60 text-sm">Web</button>
              <button className="px-3 py-1 bg-black/40 rounded hover:bg-black/60 text-sm">Mobilné</button>
              <button className="px-3 py-1 bg-black/40 rounded hover:bg-black/60 text-sm">Grafika</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-black/20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="group relative aspect-square bg-black/40 rounded-lg overflow-hidden cursor-pointer border border-red-500/10"
                >
                  <img
                    src={`/placeholder.svg?height=300&width=300&text=Projekt ${index + 1}`}
                    alt={`Projekt ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <h3 className="text-lg font-bold">Projekt {index + 1}</h3>
                    <p className="text-sm text-white/70">Web Dizajn</p>
                    <div className="mt-2 flex space-x-2">
                      <button className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-full text-xs transition-colors">
                        Detail
                      </button>
                      <button className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-xs transition-colors">
                        Demo
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      position: { x: 250, y: 250 },
      size: { width: 900, height: 600 },
    },
    {
      id: "demo",
      title: "Demo Ukážky",
      description: "Živé ukážky mojich webových projektov",
      icon: <Monitor className="h-6 w-6" />,
      component: (
        <div className="p-0 h-full flex flex-col">
          <div className="flex items-center p-2 bg-black/60 border-b border-white/10">
            <div className="flex items-center bg-black/40 rounded-md w-full p-1">
              <div className="flex space-x-1 mx-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 bg-black/30 rounded px-2 py-1 text-sm text-center text-white/80">
                https://moje-portfolio.sk/demo/e-commerce
              </div>
            </div>
          </div>
          <div className="flex-1 bg-white p-4 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <header className="flex justify-between items-center py-6 border-b border-gray-200 mb-8">
                <div className="text-2xl font-bold text-black">ModernShop</div>
                <nav className="hidden md:flex space-x-6 text-gray-600">
                  <a href="#" className="hover:text-red-600">
                    Domov
                  </a>
                  <a href="#" className="hover:text-red-600">
                    Obchod
                  </a>
                  <a href="#" className="hover:text-red-600">
                    Kolekcie
                  </a>
                  <a href="#" className="hover:text-red-600">
                    O nás
                  </a>
                  <a href="#" className="hover:text-red-600">
                    Kontakt
                  </a>
                </nav>
                <div className="flex items-center space-x-4">
                  <button className="text-gray-600 hover:text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                  <button className="text-gray-600 hover:text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </button>
                  <button className="text-gray-600 hover:text-red-600 relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      3
                    </span>
                  </button>
                </div>
              </header>

              <section className="mb-12">
                <div className="relative rounded-xl overflow-hidden h-[400px] mb-8">
                  <img
                    src="/placeholder.svg?height=400&width=1200&text=Banner"
                    alt="Banner"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                    <div className="p-8 max-w-md">
                      <h1 className="text-4xl font-bold text-white mb-4">Nová letná kolekcia</h1>
                      <p className="text-white/80 mb-6">
                        Objavte našu novú kolekciu letného oblečenia pre rok 2025. Štýlové kúsky pre každú príležitosť.
                      </p>
                      <button className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
                        Nakupovať teraz
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="bg-gray-100 p-6 rounded-xl">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Bezplatné doručenie</h3>
                    <p className="text-gray-600">Pri objednávke nad 50€ máte doručenie zadarmo.</p>
                  </div>
                  <div className="bg-gray-100 p-6 rounded-xl">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Bezpečná platba</h3>
                    <p className="text-gray-600">Všetky platby sú šifrované a bezpečné.</p>
                  </div>
                  <div className="bg-gray-100 p-6 rounded-xl">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Jednoduchý výmena</h3>
                    <p className="text-gray-600">Nespokojní? Vráťte tovar do 30 dní.</p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Populárne produkty</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-square bg-gray-100 relative">
                        <img
                          src={`/placeholder.svg?height=300&width=300&text=Produkt ${index + 1}`}
                          alt={`Produkt ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-red-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="text-sm text-gray-500 mb-1">Kategória</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Produkt {index + 1}</h3>
                        <div className="flex justify-between items-center">
                          <div className="text-red-600 font-bold">29,99 €</div>
                          <button className="px-3 py-1 bg-red-600 text-white rounded-full text-sm hover:bg-red-700">
                            Pridať do košíka
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      ),
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      position: { x: 300, y: 150 },
      size: { width: 900, height: 600 },
    },
    {
      id: "kontakt",
      title: "Kontakt",
      description: "Kontaktné informácie a formulár",
      icon: <Phone className="h-6 w-6" />,
      component: (
        <div className="p-6 h-full overflow-y-auto text-white">
          <h1 className="text-3xl font-bold mb-6">Kontaktujte ma</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="bg-black/40 rounded-xl p-6 mb-6 border border-red-500/20">
                <h2 className="text-xl font-bold mb-4">Kontaktné informácie</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mr-4 text-red-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-white/50 mb-1">Email</div>
                      <div>jan.novak@example.com</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mr-4 text-red-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-white/50 mb-1">Telefón</div>
                      <div>+421 900 123 456</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mr-4 text-red-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-white/50 mb-1">Adresa</div>
                      <div>Hlavná 123, 811 01 Bratislava, Slovensko</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 rounded-xl p-6 border border-red-500/20">
                <h2 className="text-xl font-bold mb-4">Sociálne siete</h2>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-xl p-6 border border-red-500/20">
              <h2 className="text-xl font-bold mb-4">Napíšte mi</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/70 mb-1">Meno</label>
                    <input
                      type="text"
                      className="w-full bg-black/30 border border-red-500/20 rounded-lg p-2 focus:outline-none focus:border-red-500 text-white"
                      placeholder="Vaše meno"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full bg-black/30 border border-red-500/20 rounded-lg p-2 focus:outline-none focus:border-red-500 text-white"
                      placeholder="Váš email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-1">Predmet</label>
                  <input
                    type="text"
                    className="w-full bg-black/30 border border-red-500/20 rounded-lg p-2 focus:outline-none focus:border-red-500 text-white"
                    placeholder="Predmet správy"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-1">Správa</label>
                  <textarea
                    className="w-full bg-black/30 border border-red-500/20 rounded-lg p-2 h-32 focus:outline-none focus:border-red-500 text-white"
                    placeholder="Vaša správa..."
                  ></textarea>
                </div>
                <button className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors">
                  Odoslať správu
                </button>
              </form>
            </div>
          </div>
        </div>
      ),
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      position: { x: 350, y: 200 },
      size: { width: 800, height: 600 },
    },
    {
      id: "blog",
      title: "Blog",
      description: "Články o dizajne a technológiách",
      icon: <FileText className="h-6 w-6" />,
      component: (
        <div className="p-6 h-full overflow-y-auto text-white">
          <h1 className="text-3xl font-bold mb-6">Blog</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-black/40 rounded-xl overflow-hidden border border-red-500/20">
              <div className="aspect-video bg-gradient-to-br from-red-500/20 to-black">
                <img
                  src="/placeholder.svg?height=300&width=600&text=Hlavný článok"
                  alt="Hlavný článok"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-white/50 mb-2">
                  <span>15. marec 2025</span>
                  <span className="mx-2">•</span>
                  <span>UI/UX Dizajn</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">Trendy v dizajne pre rok 2025</h2>
                <p className="text-white/70 mb-4">
                  Preskúmajte najnovšie trendy v oblasti web dizajnu a UI/UX, ktoré budú dominovať v roku 2025. Od
                  neomorfizmu po glassmorfizmus.
                </p>
                <button className="text-red-400 hover:text-red-300 transition-colors">Čítať viac →</button>
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Ako vytvoriť efektívny user flow",
                  category: "UX Dizajn",
                  date: "10. marec 2025",
                  image: "/placeholder.svg?height=100&width=100&text=UX",
                },
                {
                  title: "Psychológia farieb vo web dizajne",
                  category: "Web Dizajn",
                  date: "5. marec 2025",
                  image: "/placeholder.svg?height=100&width=100&text=Farby",
                },
                {
                  title: "Responzívny dizajn v roku 2025",
                  category: "Responzívny Dizajn",
                  date: "28. február 2025",
                  image: "/placeholder.svg?height=100&width=100&text=Responzívny",
                },
              ].map((article, index) => (
                <div
                  key={index}
                  className="flex bg-black/40 rounded-xl overflow-hidden hover:bg-black/60 transition-colors cursor-pointer border border-red-500/20"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-black">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <div className="flex items-center text-xs text-white/50 mb-1">
                      <span>{article.date}</span>
                      <span className="mx-2">•</span>
                      <span>{article.category}</span>
                    </div>
                    <h3 className="text-lg font-bold">{article.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Ako optimalizovať rýchlosť načítania webu",
                category: "Výkon",
                date: "25. február 2025",
                image: "/placeholder.svg?height=200&width=400&text=Rýchlosť",
              },
              {
                title: "Prístupnosť webu: Dizajn pre všetkých",
                category: "Prístupnosť",
                date: "20. február 2025",
                image: "/placeholder.svg?height=200&width=400&text=Prístupnosť",
              },
              {
                title: "Moderné animácie v UI dizajne",
                category: "UI Dizajn",
                date: "15. február 2025",
                image: "/placeholder.svg?height=200&width=400&text=Animácie",
              },
              {
                title: "Ako vytvoriť efektívny dizajn systém",
                category: "Dizajn Systémy",
                date: "10. február 2025",
                image: "/placeholder.svg?height=200&width=400&text=Dizajn Systém",
              },
              {
                title: "Typografia vo web dizajne",
                category: "Typografia",
                date: "5. február 2025",
                image: "/placeholder.svg?height=200&width=400&text=Typografia",
              },
              {
                title: "Ako prezentovať dizajn klientom",
                category: "Biznis",
                date: "1. február 2025",
                image: "/placeholder.svg?height=200&width=400&text=Prezentácia",
              },
            ].map((article, index) => (
              <div
                key={index}
                className="bg-black/40 rounded-xl overflow-hidden hover:bg-black/60 transition-colors cursor-pointer border border-red-500/20"
              >
                <div className="aspect-video bg-gradient-to-br from-red-500/20 to-black">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center text-xs text-white/50 mb-1">
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <span>{article.category}</span>
                  </div>
                  <h3 className="text-lg font-bold">{article.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      position: { x: 400, y: 250 },
      size: { width: 800, height: 600 },
    },
    {
      id: "prehliadac",
      title: "Prehliadač",
      description: "Prehliadajte internet a moje webové stránky",
      icon: <Globe className="h-6 w-6" />,
      component: (
        <div className="flex flex-col h-full">
          <div className="flex items-center p-2 bg-black/60 border-b border-white/10">
            <div className="flex items-center bg-black/40 rounded-md w-full p-1">
              <div className="flex space-x-1 mx-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 bg-black/30 rounded px-2 py-1 text-sm text-center text-white/80">
                https://jan-novak-portfolio.sk
              </div>
            </div>
          </div>
          <div className="flex-1 bg-white p-0 overflow-auto">
            <div className="bg-gradient-to-r from-red-600 to-black text-white">
              <div className="max-w-6xl mx-auto px-6 py-20">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="md:w-1/2 mb-10 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Ján Novák</h1>
                    <h2 className="text-xl md:text-2xl mb-6">Web Dizajnér & UI/UX Špecialista</h2>
                    <p className="text-white/80 mb-8 text-lg">
                      Vytváram moderné a používateľsky prívetivé webové stránky, ktoré pomáhajú firmám rásť a
                      prosperovať v digitálnom svete.
                    </p>
                    <div className="flex space-x-4">
                      <button className="px-6 py-3 bg-white text-red-600 rounded-full font-medium hover:bg-white/90 transition-colors">
                        Moje projekty
                      </button>
                      <button className="px-6 py-3 bg-transparent border border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors">
                        Kontaktujte ma
                      </button>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-center">
                    <div className="w-64 h-64 rounded-full bg-white/20 p-2">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <img
                          src="/placeholder.svg?height=300&width=300&text=Ján Novák"
                          alt="Ján Novák"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-20">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Moje služby</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Poskytujem komplexné služby v oblasti web dizajnu a vývoja, ktoré pomáhajú firmám uspieť v digitálnom
                  svete.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4">
                    <Palette className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Web Dizajn</h3>
                  <p className="text-gray-600">
                    Navrhujem moderné, responzívne a používateľsky prívetivé webové stránky, ktoré zaujmú vašich
                    návštevníkov.
                  </p>
                </div>
                <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4">
                    <Layers className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">UI/UX Dizajn</h3>
                  <p className="text-gray-600">
                    Vytváram intuitívne používateľské rozhrania a zážitky, ktoré zlepšujú spokojnosť používateľov.
                  </p>
                </div>
                <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4">
                    <Code className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Frontend Vývoj</h3>
                  <p className="text-gray-600">
                    Implementujem dizajny pomocou moderných technológií pre vytvorenie interaktívnych webových stránok.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 py-20">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Moje projekty</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Pozrite si niektoré z mojich najnovších projektov, na ktorých som pracoval.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <div
                      key={num}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-video bg-gray-200">
                        <img
                          src={`/placeholder.svg?height=200&width=400&text=Projekt ${num}`}
                          alt={`Projekt ${num}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Projekt {num}</h3>
                        <p className="text-gray-600 mb-4">Krátky popis projektu a použitých technológií.</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-red-600">Web Dizajn</span>
                          <button className="px-4 py-2 bg-red-600 text-white rounded-full text-sm hover:bg-red-700 transition-colors">
                            Zobraziť
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-20">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Kontaktujte ma</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Máte záujem o spoluprácu? Neváhajte ma kontaktovať a prediskutujeme váš projekt.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white shadow-md rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Kontaktné informácie</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Email</div>
                        <div className="text-gray-900">jan.novak@example.com</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Telefón</div>
                        <div className="text-gray-900">+421 900 123 456</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow-md rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Napíšte mi</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Meno"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    <div>
                      <textarea
                        className="w-full border border-gray-300 rounded-lg p-2 h-32 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Správa"
                      ></textarea>
                    </div>
                    <button className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
                      Odoslať
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <footer className="bg-black text-white py-12">
              <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-6 md:mb-0">
                    <div className="text-2xl font-bold mb-2">
                      <span className="text-red-500">HAZE</span>Design
                    </div>
                    <div className="text-gray-400">Web Dizajnér & UI/UX Špecialista</div>
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-sm">
                  © 2025 HAZEDesign. Všetky práva vyhradené.
                </div>
              </div>
            </footer>
          </div>
        </div>
      ),
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      position: { x: 150, y: 100 },
      size: { width: 900, height: 600 },
    },
  ])

  // Optimalizácia - použitie useMemo pre výpočtovo náročné operácie
  const getHighestZIndex = useMemo(() => {
    return () => apps.reduce((highest, app) => Math.max(highest, app.zIndex), 0)
  }, [apps])

  const openApp = (id: string) => {
    setApps((prevApps) =>
      prevApps.map((app) =>
        app.id === id
          ? {
              ...app,
              isOpen: true,
              isMinimized: false,
              zIndex: getHighestZIndex() + 1,
            }
          : app,
      ),
    )
  }

  const closeApp = (id: string) => {
    setApps((prevApps) => prevApps.map((app) => (app.id === id ? { ...app, isOpen: false } : app)))
  }

  const minimizeApp = (id: string) => {
    setApps((prevApps) => prevApps.map((app) => (app.id === id ? { ...app, isMinimized: true } : app)))
  }

  const restoreApp = (id: string) => {
    setApps((prevApps) =>
      prevApps.map((app) =>
        app.id === id
          ? {
              ...app,
              isMinimized: false,
              zIndex: getHighestZIndex() + 1,
            }
          : app,
      ),
    )
  }

  const focusApp = (id: string) => {
    setApps((prevApps) => prevApps.map((app) => (app.id === id ? { ...app, zIndex: getHighestZIndex() + 1 } : app)))
  }

  const updateAppPosition = (id: string, position: { x: number; y: number }) => {
    setApps((prevApps) => prevApps.map((app) => (app.id === id ? { ...app, position } : app)))
  }

  const updateAppSize = (id: string, size: { width: number; height: number }) => {
    setApps((prevApps) => prevApps.map((app) => (app.id === id ? { ...app, size } : app)))
  }

  return (
    <AppContext.Provider
      value={{
        apps,
        openApp,
        closeApp,
        minimizeApp,
        restoreApp,
        focusApp,
        updateAppPosition,
        updateAppSize,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

