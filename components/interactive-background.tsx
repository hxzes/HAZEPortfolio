"use client"

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react"

type InteractiveBackgroundProps = {}

interface InteractiveBackgroundRef {
  handleMouseMove: (x: number, y: number) => void
}

const InteractiveBackground = forwardRef<InteractiveBackgroundRef, InteractiveBackgroundProps>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>(0)

  class Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    color: string

    constructor(x: number, y: number) {
      this.x = x
      this.y = y
      this.size = Math.random() * 2 + 0.5
      this.speedX = Math.random() * 0.5 - 0.25
      this.speedY = Math.random() * 0.5 - 0.25
      this.color = `rgba(37, 99, 235, ${Math.random() * 0.3 + 0.1})`
    }

    update() {
      if (contextRef.current) {
        // Add mouse influence
        const dx = this.x - mouseRef.current.x
        const dy = this.y - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          this.speedX += dx * force * 0.01
          this.speedY += dy * force * 0.01
        }

        // Apply speed limits
        this.speedX = Math.max(-1, Math.min(1, this.speedX))
        this.speedY = Math.max(-1, Math.min(1, this.speedY))

        // Update position
        this.x += this.speedX
        this.y += this.speedY

        // Boundary check
        if (this.x < 0 || this.x > window.innerWidth) this.speedX *= -1
        if (this.y < 0 || this.y > window.innerHeight) this.speedY *= -1

        // Apply friction
        this.speedX *= 0.98
        this.speedY *= 0.98
      }
    }

    draw() {
      if (contextRef.current) {
        contextRef.current.fillStyle = this.color
        contextRef.current.beginPath()
        contextRef.current.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        contextRef.current.closePath()
        contextRef.current.fill()
      }
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

    for (let i = 0; i < numberOfParticles; i++) {
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight
      particlesRef.current.push(new Particle(x, y))
    }
  }

  const animate = () => {
    if (contextRef.current) {
      contextRef.current.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Draw connections
      contextRef.current.strokeStyle = "rgba(37, 99, 235, 0.03)"
      contextRef.current.lineWidth = 0.5

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x
          const dy = particlesRef.current[i].y - particlesRef.current[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            contextRef.current.beginPath()
            contextRef.current.moveTo(particlesRef.current[i].x, particlesRef.current[i].y)
            contextRef.current.lineTo(particlesRef.current[j].x, particlesRef.current[j].y)
            contextRef.current.stroke()
          }
        }
      }

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.update()
        particle.draw()
      })
    }

    animationFrameRef.current = requestAnimationFrame(animate)
  }

  useImperativeHandle(ref, () => ({
    handleMouseMove: (x: number, y: number) => {
      mouseRef.current = {
        x: ((x + 1) * window.innerWidth) / 2,
        y: ((-y + 1) * window.innerHeight) / 2,
      }
    },
  }))

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

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full bg-[#f8f8f8]" />
})

InteractiveBackground.displayName = "InteractiveBackground"

export default InteractiveBackground

