"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"

interface ThemeToggleProps {
  setCursorVariant: (variant: string) => void
}

export default function ThemeToggle({ setCursorVariant }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-[42px] h-[24px]" />
  }

  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={(checked) => {
        setTheme(checked ? "dark" : "light")
      }}
      className="data-[state=checked]:bg-[#2563eb] data-[state=unchecked]:bg-[#e5e7eb]"
      onMouseEnter={() => setCursorVariant("button")}
      onMouseLeave={() => setCursorVariant("default")}
    />
  )
}

