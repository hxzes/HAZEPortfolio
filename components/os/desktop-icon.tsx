"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DesktopIconProps {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  isSelected: boolean
  onClick: () => void
  onDoubleClick: () => void
}

export default function DesktopIcon({
  id,
  title,
  description,
  icon,
  isSelected,
  onClick,
  onDoubleClick,
}: DesktopIconProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className={`w-20 flex flex-col items-center p-2 rounded ${
              isSelected ? "bg-red-500/30" : "hover:bg-white/10"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
          >
            <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-red-500 to-black rounded-xl mb-1 shadow-lg">
              {icon}
            </div>
            <div className="text-xs text-center text-white font-medium">{title}</div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

