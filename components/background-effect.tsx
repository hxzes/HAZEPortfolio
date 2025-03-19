"use client"

import { useEffect, useRef, forwardRef } from "react"
import { useTheme } from "next-themes"

type BackgroundEffectProps = {}

type BackgroundEffectRef = {}

const BackgroundEffect = forwardRef<BackgroundEffectRef, BackgroundEffectProps>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>(0)
  const { theme } = useTheme()

  class Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    color: string

    constructor(x: number, y: number, isDark: boolean) {
      this.x = x
      this.y = y
      this.size = Math.random() * 2 + 0.5
      this.speedX = Math.random() * 0.5 - 0.25
      this.speedY = Math.random() * 0.5 - 0.25
      this.color = isDark
        ? `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.05})`
        : `rgba(37, 99, 235, ${Math.random() * 0.2 + 0.05})`
    }

    update(isDark: boolean) {
      this.x += this.speedX
      this.y += this.speedY

      // Update color based on theme
      this.color = isDark
        ? `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.05})`
        : `rgba(37, 99, 235, ${Math.random() * 0.2 + 0.05})`

      // Boundary check
      if (this.x < 0 || this.x > window.innerWidth) this.speedX *= -1
      if (this.y < 0 || this.y > window.innerHeight) this.speedY *= -1
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fill()
    }
  }

  const initCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const context = canvas.getContext("2d")
      if (context) {
        contextRef.current = context
        createParticles()
      }
    }
  }

  const createParticles = () => {
    particlesRef.current = []
    const numberOfParticles = Math.min(window.innerWidth, window.innerHeight) * 0.05
    const isDark = theme === "dark"

    for (let i = 0; i < numberOfParticles; i++) {
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight
      particlesRef.current.push(new Particle(x, y, isDark))
    }
  }

  const animate = () => {
    if (contextRef.current) {
      contextRef.current.clearRect(0, 0, window.innerWidth, window.innerHeight)

      const isDark = theme === "dark"

      // Draw connections
      contextRef.current.strokeStyle = isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(37, 99, 235, 0.03)"
      contextRef.current.lineWidth = 0.5

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x
          const dy = particlesRef.current[i].y - particlesRef.current[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            contextRef.current.beginPath()
            contextRef.current.moveTo(particlesRef.current[i].x, particlesRef.current[i].y)
            contextRef.current.lineTo(particlesRef.current[j].x, particlesRef.current[j].y)
            contextRef.current.stroke()
          }
        }
      }

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.update(isDark)
        particle.draw(contextRef.current!)
      })
    }

    animationFrameRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    initCanvas()
    animate()

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
        createParticles()
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
})

BackgroundEffect.displayName = "BackgroundEffect"

export default BackgroundEffect

