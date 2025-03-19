"use client"

import { motion } from "framer-motion"
import { useAppContext } from "./app-context"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"

export default function Dock() {
  const { apps, openApp, restoreApp } = useAppContext()

  const handleAppClick = (id: string) => {
    const app = apps.find((app) => app.id === id)
    if (app) {
      if (app.isOpen && app.isMinimized) {
        restoreApp(id)
      } else if (!app.isOpen) {
        openApp(id)
      }
    }
  }

  return (
    <div className="h-20 flex justify-center items-end pb-2">
      <motion.div
        className="bg-black/30 backdrop-blur-xl rounded-2xl p-2 flex space-x-1 border border-white/10 shadow-lg"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <TooltipProvider>
          {apps.map((app) => (
            <Tooltip key={app.id}>
              <TooltipTrigger asChild>
                <motion.button
                  className={`relative p-1 rounded-xl transition-all dock-item ${app.isOpen ? "bg-white/10" : ""}`}
                  whileHover={{
                    scale: 1.2,
                    y: -5,
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAppClick(app.id)}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-red-500 to-black rounded-xl text-white">
                    {app.icon}
                  </div>
                  {app.isOpen && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-red-500" />
                  )}
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{app.title}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </motion.div>
    </div>
  )
}

