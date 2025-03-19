"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type CursorVariant = "default" | "button" | "link" | "text"

interface CustomCursorProps {
  variant: CursorVariant
}

export default function CustomCursor({ variant }: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(37, 99, 235, 0.1)",
      border: "1px solid rgba(37, 99, 235, 0.3)",
      mixBlendMode: "normal" as const,
    },
    button: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(37, 99, 235, 0.15)",
      border: "1px solid rgba(37, 99, 235, 0.5)",
      mixBlendMode: "normal" as const,
    },
    link: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      height: 40,
      width: 40,
      backgroundColor: "rgba(37, 99, 235, 0.15)",
      border: "1px solid rgba(37, 99, 235, 0.5)",
      mixBlendMode: "normal" as const,
    },
    text: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      height: 24,
      width: 24,
      backgroundColor: "rgba(37, 99, 235, 0.1)",
      border: "1px solid rgba(37, 99, 235, 0.3)",
      mixBlendMode: "normal" as const,
    },
  }

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
      variants={variants}
      animate={variant}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  )
}

