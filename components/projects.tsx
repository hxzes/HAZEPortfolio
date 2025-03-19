"use client"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Code, Palette, Smartphone, Globe, ChevronRight, ChevronLeft, Search, Filter } from "lucide-react"

interface ProjectsProps {
  registerSection: (ref: HTMLElement | null) => void
  setCursorVariant: (variant: string) => void
}

// Define project types for better organization
type ProjectCategory = "all" | "web" | "mobile"

interface Project {
  id: string
  title: string
  description: string
  category: ProjectCategory
  tags: string[]
  imageUrl: string
  demoUrl?: string
  featured?: boolean
  color?: string
}

// Add this CSS animation to the component
const fadeInAnimation = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-item {
    will-change: transform, opacity;
  }
`

export default function Projects({ registerSection, setCursorVariant }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isInView, setIsInView] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const projectsPerPage = 6

  // Register the section with the parent component
  useEffect(() => {
    registerSection(sectionRef.current)

    // Set up intersection observer to detect when section is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [registerSection])

  // Project data
  const projects: Project[] = [
    {
      id: "stavebniny-agaty",
      title: "Stavebniny u Agáty",
      description: "Kompletný web pre stavebniny s katalógom produktov a objednávkovým systémom.",
      category: "web",
      tags: ["Web Dizajn", "E-commerce", "Katalóg"],
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2j7I8z0OteuL1EW52SMeIhGdw8JKYi.png",
      demoUrl: "https://stavebninyuagaty.sk",
      featured: true,
      color: "#E57373",
    },
    {
      id: "auto-skalicky",
      title: "Auto Skalický",
      description: "Webová stránka pre predajcu prémiových vozidiel s dôrazom na bezpečnosť a kvalitu.",
      category: "web",
      tags: ["Web Dizajn", "Automotive", "Responzívny dizajn"],
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-h7QyS5e0KFnF9Y7ldGLQH15sfajDn4.png",
      demoUrl: "https://autoskalicky.sk",
      featured: true,
      color: "#64B5F6",
    },
    {
      id: "don-galvan",
      title: "Don Galvan",
      description: "Elegantná webová stránka pre reštauráciu v Šali s tradičnou a modernou kuchyňou.",
      category: "web",
      tags: ["Web Dizajn", "Gastronómia", "Rezervácie"],
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JrjAbBZGqMPQCpCLjorgczSK1ldouQ.png",
      demoUrl: "https://dongalvan.sk",
      color: "#FFB74D",
    },
    {
      id: "keep-sustain",
      title: "Keep Sustain",
      description: "Profesionálna webová stránka zameraná na ESG reporting a udržateľné riešenia pre firmy.",
      category: "web",
      tags: ["Web Dizajn", "Udržateľnosť", "ESG"],
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RFMr6LWBzlwZ7hbqTxnQwhhNKsHojC.png",
      demoUrl: "https://keepsustain.sk",
      color: "#1A4971",
    },
    {
      id: "vaultify",
      title: "Vaultify",
      description: "Rozpočtová aplikácia implementujúca pravidlo 70/20/10 pre efektívne hospodárenie s financiami.",
      category: "mobile",
      tags: ["Mobile App", "Finančný manažment", "UI/UX"],
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9vTXqTXGoGjQrXPurzFZT3oXgTHGIg.png",
      featured: true,
      color: "#1DB954",
    },
    {
      id: "pod-borovicami",
      title: "Pod Borovicami",
      description: "Webová stránka pre rezidenčný projekt 'Bývanie Pod Borovicami' v blízkosti Nitry.",
      category: "web",
      tags: ["Web Dizajn", "Reality", "Responzívny dizajn"],
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yva9O0mhYoHAnjsZ1epyI1uOxiDGXo.png",
      demoUrl: "https://podborovicami.sk",
      featured: true,
      color: "#A1887F",
    },
    {
      id: "upsys",
      title: "UpSys",
      description: "Profesionálna webová stránka pre firmu špecializujúca sa na výškové práce.",
      category: "web",
      tags: ["Web Dizajn", "Priemysel", "Služby"],
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-03MMJjHWGgJqYnyiRxjKKiefZ55Bc6.png",
      demoUrl: "https://upsys.sk",
      featured: true,
      color: "#7986CB",
    },
    {
      id: "omnia-app",
      title: "Omnia Fitness App",
      description: "Komplexná fitness aplikácia pre sledovanie tréningov, výživy a zdravotných ukazovateľov.",
      category: "mobile",
      tags: ["Mobile App", "Fitness", "UI/UX"],
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hj66pKjgsaLahYNyen5zdSQGGkTFFA.png",
      featured: true,
      color: "#3B82F6",
    },
    {
      id: "haze-branding",
      title: "HAZE Design Branding",
      description: "Kompletný branding pre moju vlastnú značku vrátane loga, farebnej schémy a vizuálnej identity.",
      category: "web",
      tags: ["Branding", "Logo Design", "Vizuálna identita"],
      imageUrl: "/images/haze-logo.png",
      featured: true,
      color: "#FF3A3A",
    },
    {
      id: "portfolio-website",
      title: "Portfolio Website",
      description: "Môj osobný portfolio web vytvorený pomocou Next.js, Tailwind CSS a Framer Motion.",
      category: "web",
      tags: ["Web Dizajn", "Next.js", "Tailwind CSS"],
      imageUrl: "/images/portfolio.png",
      featured: true,
      color: "#FF3A3A",
    },
  ]

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  // Get featured projects
  const featuredProjects = projects.filter((project) => project.featured)

  // Paginate projects
  const paginatedProjects = filteredProjects.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage)

  // Calculate total pages
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)

  // Category filters
  const categories = [
    { id: "all", label: "Všetky projekty" },
    { id: "web", label: "Webové stránky" },
    { id: "mobile", label: "Mobilné aplikácie" },
  ]

  // Handle category change
  const handleCategoryChange = (category: ProjectCategory) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of projects section
    if (sectionRef.current) {
      const yOffset = -100
      const y = sectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  // Handle project click
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
  }

  // Project card component with optimized animations
  const ProjectCard = ({ project }: { project: Project }) => {
    return (
      <div
        className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-[#FF3A3A]/30 transition-all duration-300"
        onClick={() => handleProjectClick(project)}
        onMouseEnter={() => setCursorVariant("project")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ y: -5 }}
          transition={{
            duration: 0.3,
            y: {
              type: "spring",
              stiffness: 200,
              damping: 25,
            },
          }}
          className="h-full"
        >
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={project.imageUrl || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(to top, ${project.color || "#FF3A3A"}80, transparent)`,
              }}
            />
          </div>

          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${project.color || "#FF3A3A"}20` }}
              >
                {project.category === "web" && (
                  <Globe className="h-4 w-4" style={{ color: project.color || "#FF3A3A" }} />
                )}
                {project.category === "mobile" && (
                  <Smartphone className="h-4 w-4" style={{ color: project.color || "#FF3A3A" }} />
                )}
                {project.category === "design" && (
                  <Palette className="h-4 w-4" style={{ color: project.color || "#FF3A3A" }} />
                )}
                {project.category === "branding" && (
                  <Code className="h-4 w-4" style={{ color: project.color || "#FF3A3A" }} />
                )}
              </div>
              <h3 className="text-lg font-bold">{project.title}</h3>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.map((tag, index) => (
                <span key={index} className="text-xs px-2 py-1 rounded-full bg-white/10">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-white/70 mb-4 line-clamp-2">{project.description}</p>

            <button
              className="inline-flex items-center text-[#FF3A3A] hover:underline"
              onClick={(e) => {
                e.stopPropagation()
                handleProjectClick(project)
              }}
            >
              Zobraziť detail <ChevronRight className="ml-1 h-3 w-3" />
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  // Featured project card component with optimized animations
  const FeaturedProjectCard = ({ project }: { project: Project }) => {
    return (
      <div
        className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-[#FF3A3A]/30 transition-all duration-300"
        onClick={() => handleProjectClick(project)}
        onMouseEnter={() => setCursorVariant("project")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ y: -5 }}
          transition={{
            duration: 0.3,
            y: {
              type: "spring",
              stiffness: 200,
              damping: 25,
            },
          }}
          className="h-full"
        >
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#FF3A3A] rounded-full text-xs font-medium">
            Featured
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="aspect-square md:aspect-auto relative overflow-hidden">
              <Image
                src={project.imageUrl || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(to right, ${project.color || "#FF3A3A"}80, transparent)`,
                }}
              />
            </div>

            <div className="p-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${project.color || "#FF3A3A"}20` }}
                >
                  {project.category === "web" && (
                    <Globe className="h-5 w-5" style={{ color: project.color || "#FF3A3A" }} />
                  )}
                  {project.category === "mobile" && (
                    <Smartphone className="h-5 w-5" style={{ color: project.color || "#FF3A3A" }} />
                  )}
                  {project.category === "design" && (
                    <Palette className="h-5 w-5" style={{ color: project.color || "#FF3A3A" }} />
                  )}
                  {project.category === "branding" && (
                    <Code className="h-5 w-5" style={{ color: project.color || "#FF3A3A" }} />
                  )}
                </div>
                <h3 className="text-xl font-bold">{project.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <span key={index} className="text-xs px-2 py-1 rounded-full bg-white/10">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-white/70 mb-6">{project.description}</p>

              <div className="mt-auto">
                <button
                  className="inline-flex items-center px-4 py-2 rounded-full bg-[#FF3A3A]/20 border border-[#FF3A3A]/30 text-white hover:bg-[#FF3A3A]/30 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleProjectClick(project)
                  }}
                >
                  Zobraziť detail <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  // Project detail modal
  const ProjectDetailModal = () => {
    if (!selectedProject) return null

    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-[#0a0a0a] rounded-xl border border-white/10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-[#FF3A3A]/70 transition-colors"
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>

            <div className="relative aspect-video w-full">
              <Image
                src={selectedProject.imageUrl || "/placeholder.svg"}
                alt={selectedProject.title}
                fill
                className="object-cover"
                unoptimized
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, #0a0a0a, transparent 50%)`,
                }}
              />
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${selectedProject.color || "#FF3A3A"}20` }}
                >
                  {selectedProject.category === "web" && (
                    <Globe className="h-6 w-6" style={{ color: selectedProject.color || "#FF3A3A" }} />
                  )}
                  {selectedProject.category === "mobile" && (
                    <Smartphone className="h-6 w-6" style={{ color: selectedProject.color || "#FF3A3A" }} />
                  )}
                  {selectedProject.category === "design" && (
                    <Palette className="h-6 w-6" style={{ color: selectedProject.color || "#FF3A3A" }} />
                  )}
                  {selectedProject.category === "branding" && (
                    <Code className="h-6 w-6" style={{ color: selectedProject.color || "#FF3A3A" }} />
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">{selectedProject.title}</h2>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag, index) => (
                  <span key={index} className="text-xs px-3 py-1 rounded-full bg-white/10">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-white/70 mb-8 text-lg">{selectedProject.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Technológie</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#FF3A3A] mr-3"></div>
                      <span>Next.js / React</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#FF3A3A] mr-3"></div>
                      <span>Tailwind CSS</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#FF3A3A] mr-3"></div>
                      <span>Framer Motion</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#FF3A3A] mr-3"></div>
                      <span>Responzívny dizajn</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Môj prínos</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#FF3A3A] mr-3"></div>
                      <span>UI/UX Dizajn</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#FF3A3A] mr-3"></div>
                      <span>Frontend Development</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#FF3A3A] mr-3"></div>
                      <span>Responzívna implementácia</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#FF3A3A] mr-3"></div>
                      <span>SEO Optimalizácia</span>
                    </li>
                  </ul>
                </div>
              </div>

              {selectedProject.demoUrl && (
                <div className="flex justify-center">
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-[#FF3A3A] text-white hover:bg-[#FF3A3A]/90 transition-colors"
                  >
                    Navštíviť stránku <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  // Add this right before the return statement
  useEffect(() => {
    // Inject the CSS animation
    const style = document.createElement("style")
    style.textContent = fadeInAnimation
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-28 relative overflow-hidden scroll-mt-24">
      {/* Background effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0a0a0a]"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=1080&width=1920&text=Grid')] bg-repeat opacity-5"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-[#FF3A3A] filter blur-[150px] opacity-10"></div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-block mb-4 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="text-[#FF3A3A] font-medium">Moja práca</span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Moje projekty
          </motion.h2>
          <motion.p
            className="text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Pozrite si niektoré z mojich najnovších projektov, na ktorých som pracoval
          </motion.p>
        </motion.div>

        {/* Featured projects */}
        {activeCategory === "all" && currentPage === 1 && (
          <div className="mb-20">
            <motion.h3
              className="text-xl font-bold mb-8 flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="w-1.5 h-6 bg-[#FF3A3A] rounded-full mr-3"></div>
              Vybrané projekty
            </motion.h3>

            <div className="space-y-8">
              {featuredProjects.slice(0, 3).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInView ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <FeaturedProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Category filters */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="flex flex-col items-center mb-6">
            <h3 className="text-xl font-bold flex items-center mb-6">
              <div className="w-1.5 h-6 bg-[#FF3A3A] rounded-full mr-3"></div>
              Všetky projekty
            </h3>

            <div className="relative">
              <div className="flex items-center space-x-2 bg-white/5 rounded-full p-1 border border-white/10">
                <Filter className="h-4 w-4 text-white/50 ml-3" />
                <span className="text-sm text-white/70 mr-2">Filter:</span>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      activeCategory === category.id
                        ? "bg-[#FF3A3A] text-white"
                        : "bg-transparent text-white/70 hover:bg-white/10"
                    }`}
                    onClick={() => handleCategoryChange(category.id as ProjectCategory)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects grid */}
        {paginatedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {paginatedProjects.map((project, index) => (
              <div
                key={project.id}
                style={{
                  opacity: 0,
                  animation: isInView ? `fadeIn 0.5s ease forwards ${0.1 * index}s` : "none",
                }}
                className="animate-item"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="text-center py-20 bg-white/5 rounded-xl border border-white/10"
            style={{
              opacity: 0,
              animation: isInView ? "fadeIn 0.7s ease forwards 0.7s" : "none",
            }}
          >
            <Search className="h-12 w-12 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Žiadne projekty</h3>
            <p className="text-white/50">V tejto kategórii zatiaľ nemám žiadne projekty.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <button
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentPage === 1
                    ? "bg-white/5 text-white/30 cursor-not-allowed"
                    : "bg-white/10 text-white hover:bg-white/20 transition-colors"
                }`}
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentPage === index + 1
                      ? "bg-[#FF3A3A] text-white"
                      : "bg-white/10 text-white hover:bg-white/20 transition-colors"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                  onMouseEnter={() => setCursorVariant("button")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentPage === totalPages
                    ? "bg-white/5 text-white/30 cursor-not-allowed"
                    : "bg-white/10 text-white hover:bg-white/20 transition-colors"
                }`}
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Project detail modal */}
      {selectedProject && <ProjectDetailModal />}
    </section>
  )
}

