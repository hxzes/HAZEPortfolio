"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Moon, Sun, Wifi, Battery, Volume2 } from "lucide-react"

export default function MenuBar() {
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)

    const updateDateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")
      setCurrentTime(`${hours}:${minutes}`)

      const options: Intl.DateTimeFormatOptions = { weekday: "short", day: "numeric", month: "short" }
      setCurrentDate(now.toLocaleDateString("sk-SK", options))
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 60000)

    return () => clearInterval(interval)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) return null

  return (
    <motion.div
      className="h-8 bg-black/80 backdrop-blur-md border-b border-white/10 flex justify-between items-center px-4 text-sm text-white"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
    >
      <div className="flex items-center space-x-4">
        <div className="font-semibold">
          <span className="text-red-500">HAZE</span>Design
        </div>
        <div className="hover:bg-white/10 px-2 py-1 rounded cursor-pointer">Súbor</div>
        <div className="hover:bg-white/10 px-2 py-1 rounded cursor-pointer">Upraviť</div>
        <div className="hover:bg-white/10 px-2 py-1 rounded cursor-pointer">Zobraziť</div>
        <div className="hover:bg-white/10 px-2 py-1 rounded cursor-pointer">Okno</div>
        <div className="hover:bg-white/10 px-2 py-1 rounded cursor-pointer">Pomoc</div>
      </div>
      <div className="flex items-center space-x-4">
        <Wifi className="h-4 w-4 text-white/70" />
        <Volume2 className="h-4 w-4 text-white/70" />
        <Battery className="h-4 w-4 text-white/70" />
        <button onClick={toggleTheme} className="hover:bg-white/10 p-1 rounded">
          {theme === "dark" ? <Moon className="h-4 w-4 text-white/70" /> : <Sun className="h-4 w-4 text-white/70" />}
        </button>
        <div className="text-white/70">{currentDate}</div>
        <div className="text-white/70">{currentTime}</div>
      </div>
    </motion.div>
  )
}

