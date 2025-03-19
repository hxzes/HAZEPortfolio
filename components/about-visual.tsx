"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function AboutVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const animationFrameRef = useRef<number>(0)
  const timeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const context = canvas.getContext("2d")
    if (!context) return

    contextRef.current = context

    const animate = (timestamp: number) => {
      if (!contextRef.current) return

      const elapsed = timestamp - timeRef.current
      timeRef.current = timestamp

      contextRef.current.clearRect(0, 0, canvas.width, canvas.height)

      // Draw abstract shapes
      drawAbstractVisual(contextRef.current, canvas.width, canvas.height, timestamp)

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    timeRef.current = performance.now()
    animationFrameRef.current = requestAnimationFrame(animate)

    const handleResize = () => {
      if (canvas) {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const drawAbstractVisual = (ctx: CanvasRenderingContext2D, width: number, height: number, timestamp: number) => {
    // Set gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, "rgba(240, 249, 255, 1)")
    gradient.addColorStop(1, "rgba(219, 234, 254, 1)")

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Draw flowing lines
    const time = timestamp * 0.001
    const numLines = 5

    for (let i = 0; i < numLines; i++) {
      ctx.beginPath()
      ctx.strokeStyle = `rgba(37, 99, 235, ${0.1 + i * 0.05})`
      ctx.lineWidth = 1 + i * 0.5

      const amplitude = 50 + i * 10
      const frequency = 0.002 - i * 0.0001
      const phase = time * (0.1 + i * 0.05)

      ctx.moveTo(0, height / 2 + Math.sin(phase) * amplitude)

      for (let x = 0; x < width; x += 5) {
        const y = height / 2 + Math.sin(x * frequency + phase) * amplitude
        ctx.lineTo(x, y)
      }

      ctx.stroke()
    }

    // Draw floating particles
    const numParticles = 30

    for (let i = 0; i < numParticles; i++) {
      const x = width * 0.5 + Math.cos(time * (0.2 + i * 0.01)) * (width * 0.4)
      const y = height * 0.5 + Math.sin(time * (0.3 + i * 0.01)) * (height * 0.4)
      const size = 2 + Math.sin(time * (0.1 + i * 0.05)) * 2

      ctx.beginPath()
      ctx.fillStyle = `rgba(37, 99, 235, ${0.2 + Math.sin(time + i) * 0.1})`
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  return (
    <motion.div
      className="w-full h-full rounded-xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}

