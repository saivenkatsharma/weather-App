"use client"

import { useState, useEffect } from "react"
import { Cloud, CloudRain, CloudSnow, Sun, CloudLightning, CloudFog } from "lucide-react"

interface WeatherCursorProps {
  weatherCode?: number
}

export default function WeatherCursor({ weatherCode = 800 }: WeatherCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none"

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener("mousemove", updatePosition)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      // Restore default cursor
      document.body.style.cursor = "auto"
      window.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [])

  // Determine cursor icon based on weather code
  const getCursorIcon = () => {
    if (weatherCode >= 200 && weatherCode < 300) {
      return <CloudLightning className="h-8 w-8 text-yellow-400 drop-shadow-lg" />
    } else if (weatherCode >= 300 && weatherCode < 600) {
      return <CloudRain className="h-8 w-8 text-blue-400 drop-shadow-lg" />
    } else if (weatherCode >= 600 && weatherCode < 700) {
      return <CloudSnow className="h-8 w-8 text-blue-100 drop-shadow-lg" />
    } else if (weatherCode >= 700 && weatherCode < 800) {
      return <CloudFog className="h-8 w-8 text-gray-400 drop-shadow-lg" />
    } else if (weatherCode === 800) {
      return <Sun className="h-8 w-8 text-yellow-400 drop-shadow-lg" />
    } else if (weatherCode > 800) {
      return <Cloud className="h-8 w-8 text-gray-400 drop-shadow-lg" />
    }

    return <Sun className="h-8 w-8 text-yellow-400 drop-shadow-lg" />
  }

  if (!isVisible) return null

  return (
    <div
      className="fixed pointer-events-none z-50 flex items-center justify-center"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {getCursorIcon()}
      <div className="absolute w-1 h-1 bg-white rounded-full" />
    </div>
  )
}

