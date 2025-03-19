"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  image: string
  link: string
}

interface ProjectCardProps {
  project: Project
  index: number
  setCursorVariant: (variant: string) => void
}

export default function ProjectCard({ project, index, setCursorVariant }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-white shadow-sm"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseEnter={() => {
        setIsHovered(true)
        setCursorVariant("button")
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setCursorVariant("default")
      }}
    >
      <div className="relative w-full h-[240px]">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-700 ease-out"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />

        <motion.div
          className="absolute inset-0 bg-[#2563eb]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.2 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-[#666] mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <span key={i} className="text-xs px-3 py-1 rounded-full bg-[#f1f5f9] text-[#333]">
              {tag}
            </span>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-fit rounded-full border-[#e5e7eb] hover:border-[#2563eb] hover:text-[#2563eb] transition-all duration-300"
        >
          View Project <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

