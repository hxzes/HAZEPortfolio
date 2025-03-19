"use client"

import { motion } from "framer-motion"

interface BootScreenProps {
  progress: number
}

export default function BootScreen({ progress }: BootScreenProps) {
  return (
    <motion.div
      className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mb-8"
      >
        <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-black rounded-3xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10"
          >
            <path d="M40 8L8 24V56L40 72L72 56V24L40 8Z" fill="black" stroke="#ff0000" strokeWidth="2" />
            <path d="M40 20L20 30V50L40 60L60 50V30L40 20Z" fill="#ff0000" stroke="black" strokeWidth="1" />
            <path d="M40 32L32 36V44L40 48L48 44V36L40 32Z" fill="black" />
          </svg>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-3xl font-bold mb-8 tracking-wider"
      >
        HAZEDesign
      </motion.div>

      <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-red-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="mt-4 text-sm text-white/70"
      >
        Načítavam systém...
      </motion.div>
    </motion.div>
  )
}

