"use client"

import { useState, useRef, useEffect, memo } from "react"
import { motion } from "framer-motion"
import { useAppContext, type AppType } from "./app-context"

interface WindowProps {
  app: AppType
}

// Použitie memo pre optimalizáciu renderingu
const Window = memo(function Window({ app }: WindowProps) {
  const { closeApp, minimizeApp, focusApp, updateAppPosition, updateAppSize } = useAppContext()
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [prevSize, setPrevSize] = useState(app.size)
  const [prevPosition, setPrevPosition] = useState(app.position)

  const windowRef = useRef<HTMLDivElement>(null)
  const dragHandleRef = useRef<HTMLDivElement>(null)

  const handleDragStart = () => {
    setIsDragging(true)
    focusApp(app.id)
  }

  const handleDragEnd = (info: any) => {
    setIsDragging(false)
    updateAppPosition(app.id, { x: info.point.x, y: info.point.y })
  }

  const handleResizeStart = () => {
    setIsResizing(true)
    focusApp(app.id)
  }

  const handleResizeEnd = () => {
    setIsResizing(false)
  }

  const handleResize = (e: MouseEvent) => {
    if (isResizing && windowRef.current) {
      const width = Math.max(300, e.clientX - windowRef.current.getBoundingClientRect().left)
      const height = Math.max(200, e.clientY - windowRef.current.getBoundingClientRect().top)
      updateAppSize(app.id, { width, height })
    }
  }

  const handleMaximize = () => {
    if (isMaximized) {
      // Obnovenie predchádzajúcej veľkosti a pozície
      updateAppSize(app.id, prevSize)
      updateAppPosition(app.id, prevPosition)
    } else {
      // Uloženie aktuálnej veľkosti a pozície
      setPrevSize(app.size)
      setPrevPosition(app.position)

      // Maximalizácia okna
      updateAppSize(app.id, { width: window.innerWidth, height: window.innerHeight - 56 })
      updateAppPosition(app.id, { x: 0, y: 0 })
    }
    setIsMaximized(!isMaximized)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) {
        handleResize(e)
      }
    }

    const handleMouseUp = () => {
      if (isResizing) {
        handleResizeEnd()
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing, app.id])

  return (
    <motion.div
      ref={windowRef}
      className={`absolute macos-window overflow-hidden shadow-xl bg-black/80 backdrop-blur-md border border-white/10 flex flex-col ${
        isMaximized ? "inset-0 m-0 rounded-none" : ""
      }`}
      style={{
        width: app.size.width,
        height: app.size.height,
        zIndex: app.zIndex,
        x: app.position.x,
        y: app.position.y,
      }}
      drag={!isMaximized}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{ left: 0, top: 0, right: window.innerWidth - 100, bottom: window.innerHeight - 100 }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      dragListener={!isMaximized}
      dragControls={undefined}
      onClick={() => focusApp(app.id)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      {/* Záhlavie okna v štýle macOS */}
      <div ref={dragHandleRef} className="macos-titlebar cursor-move">
        <div className="flex items-center space-x-2">
          <button className="macos-button macos-close" onClick={() => closeApp(app.id)} title="Zavrieť" />
          <button className="macos-button macos-minimize" onClick={() => minimizeApp(app.id)} title="Minimalizovať" />
          <button className="macos-button macos-maximize" onClick={handleMaximize} title="Maximalizovať" />
          <div className="text-sm font-medium ml-4 text-white/80">{app.title}</div>
        </div>
      </div>

      {/* Obsah okna - optimalizovaný */}
      <div className="flex-1 overflow-auto bg-black/50">{app.component}</div>

      {/* Úchyt na zmenu veľkosti */}
      {!isMaximized && (
        <div className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize" onMouseDown={handleResizeStart}>
          <svg width="10" height="10" viewBox="0 0 10 10" className="absolute bottom-1 right-1 text-white/50">
            <path d="M0 10L10 0M0 5L5 0M5 10L10 5" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      )}
    </motion.div>
  )
})

export default Window

