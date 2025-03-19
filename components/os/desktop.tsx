"use client"

import { useState } from "react"
import { useAppContext } from "./app-context"
import Window from "./window"
import DesktopIcon from "./desktop-icon"

export default function Desktop() {
  const { apps, openApp } = useAppContext()
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)

  const handleIconClick = (id: string) => {
    setSelectedIcon(id)
  }

  const handleIconDoubleClick = (id: string) => {
    openApp(id)
  }

  const handleDesktopClick = () => {
    setSelectedIcon(null)
  }

  return (
    <div className="flex-1 relative overflow-hidden" onClick={handleDesktopClick}>
      {/* Pozadie pracovnej plochy - čierno-červené */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Efekt hviezdnej oblohy s červenými akcentmi */}
        <div className="absolute inset-0">
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full ${i % 5 === 0 ? "bg-red-500" : "bg-white"}`}
              style={{
                width: Math.random() * 2 + 1 + "px",
                height: Math.random() * 2 + 1 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                opacity: Math.random() * 0.7 + 0.3,
                animation: `twinkle ${Math.random() * 5 + 3}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Jemný mriežkový vzor */}
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      </div>

      {/* Ikony na ploche - usporiadané v stĺpci */}
      <div className="absolute top-4 left-4 grid grid-cols-1 gap-4">
        {apps.map((app) => (
          <DesktopIcon
            key={app.id}
            id={app.id}
            title={app.title}
            description={app.description}
            icon={app.icon}
            isSelected={selectedIcon === app.id}
            onClick={() => handleIconClick(app.id)}
            onDoubleClick={() => handleIconDoubleClick(app.id)}
          />
        ))}
      </div>

      {/* Okná aplikácií - optimalizované renderovanie */}
      {apps
        .filter((app) => app.isOpen)
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((app) => (
          <Window key={app.id} app={app} />
        ))}
    </div>
  )
}

