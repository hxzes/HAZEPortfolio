"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type CursorVariant = "default" | "button" | "link" | "text" | "project"

interface CursorProps {
  variant: CursorVariant
}

export default function Cursor({ variant }: CursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [isVisible])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(255, 58, 58, 0.1)",
      border: "1px solid rgba(255, 58, 58, 0.3)",
      mixBlendMode: "normal" as const,
    },
    button: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(255, 58, 58, 0.15)",
      border: "1px solid rgba(255, 58, 58, 0.5)",
      mixBlendMode: "normal" as const,
    },
    link: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      height: 40,
      width: 40,
      backgroundColor: "rgba(255, 58, 58, 0.15)",
      border: "1px solid rgba(255, 58, 58, 0.5)",
      mixBlendMode: "normal" as const,
    },
    text: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      height: 24,
      width: 24,
      backgroundColor: "rgba(255, 58, 58, 0.1)",
      border: "1px solid rgba(255, 58, 58, 0.3)",
      mixBlendMode: "normal" as const,
    },
    project: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "rgba(255, 58, 58, 0.1)",
      border: "1px solid rgba(255, 58, 58, 0.3)",
      mixBlendMode: "normal" as const,
    },
  }

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
      variants={variants}
      animate={variant}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      style={{ opacity: isVisible ? 1 : 0 }}
    />
  )
}

