"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedBackgroundProps {
  weatherCode?: number
}

export default function AnimatedBackground({ weatherCode = 800 }: AnimatedBackgroundProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number }>>(
    [],
  )

  // Determine background elements based on weather code
  const getWeatherType = () => {
    if (weatherCode >= 200 && weatherCode < 300) return "thunderstorm"
    if (weatherCode >= 300 && weatherCode < 600) return "rain"
    if (weatherCode >= 600 && weatherCode < 700) return "snow"
    if (weatherCode >= 700 && weatherCode < 800) return "mist"
    if (weatherCode === 800) return "clear"
    if (weatherCode > 800) return "cloudy"
    return "clear"
  }

  const weatherType = getWeatherType()

  useEffect(() => {
    // Generate particles based on weather type
    const particleCount = weatherType === "rain" ? 50 : weatherType === "snow" ? 40 : weatherType === "mist" ? 30 : 15

    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size:
        weatherType === "snow"
          ? Math.random() * 4 + 2
          : weatherType === "rain"
            ? Math.random() * 1 + 1
            : Math.random() * 5 + 3,
      speed:
        weatherType === "snow"
          ? Math.random() * 20 + 10
          : weatherType === "rain"
            ? Math.random() * 40 + 30
            : Math.random() * 15 + 5,
    }))

    setParticles(newParticles)
  }, [weatherType])

  // Generate clouds
  const clouds = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 20,
    size: Math.random() * 30 + 20,
    speed: Math.random() * 100 + 50,
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated gradient background */}
      <div
        className={`absolute inset-0 ${
          weatherType === "clear"
            ? "bg-gradient-to-b from-blue-300 to-blue-100"
            : weatherType === "cloudy"
              ? "bg-gradient-to-b from-gray-300 to-blue-100"
              : weatherType === "rain"
                ? "bg-gradient-to-b from-gray-400 to-gray-200"
                : weatherType === "snow"
                  ? "bg-gradient-to-b from-gray-100 to-blue-50"
                  : weatherType === "thunderstorm"
                    ? "bg-gradient-to-b from-gray-700 to-gray-500"
                    : "bg-gradient-to-b from-gray-200 to-gray-100"
        } dark:from-gray-900 dark:to-gray-800 transition-colors duration-1000`}
      />

      {/* Animated clouds */}
      {(weatherType === "cloudy" ||
        weatherType === "rain" ||
        weatherType === "snow" ||
        weatherType === "thunderstorm") && (
        <>
          {clouds.map((cloud) => (
            <motion.div
              key={`cloud-${cloud.id}`}
              className="absolute opacity-30 dark:opacity-10"
              style={{
                top: `${cloud.y}%`,
                left: `-20%`,
                width: `${cloud.size}%`,
                height: `${cloud.size / 2}%`,
              }}
              animate={{
                left: ["0%", "120%"],
              }}
              transition={{
                duration: cloud.speed,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: cloud.id * 5,
              }}
            >
              <div className="w-full h-full bg-white rounded-full filter blur-md" />
            </motion.div>
          ))}
        </>
      )}

      {/* Weather particles */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className={`absolute rounded-full ${
            weatherType === "rain"
              ? "bg-blue-400 dark:bg-blue-300"
              : weatherType === "snow"
                ? "bg-white"
                : weatherType === "mist"
                  ? "bg-gray-300 dark:bg-gray-400"
                  : weatherType === "clear"
                    ? "bg-yellow-200"
                    : "bg-white"
          }`}
          style={{
            left: `${particle.x}%`,
            top: weatherType === "rain" || weatherType === "snow" ? "-5%" : `${particle.y}%`,
            width: weatherType === "rain" ? `${particle.size / 5}px` : `${particle.size}px`,
            height: weatherType === "rain" ? `${particle.size * 3}px` : `${particle.size}px`,
            opacity: weatherType === "mist" ? 0.3 : 0.7,
          }}
          animate={{
            top:
              weatherType === "rain" || weatherType === "snow"
                ? ["0%", "105%"]
                : [`${particle.y}%`, `${particle.y + (Math.random() > 0.5 ? 10 : -10)}%`],
            left:
              weatherType === "snow"
                ? [`${particle.x}%`, `${particle.x + (Math.random() > 0.5 ? 10 : -10)}%`]
                : `${particle.x}%`,
          }}
          transition={{
            duration: particle.speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: weatherType === "rain" ? "linear" : "easeInOut",
            delay: particle.id * 0.2,
          }}
        />
      ))}

      {/* Sun rays for clear weather */}
      {weatherType === "clear" && (
        <motion.div
          className="absolute top-10 right-10 w-40 h-40 rounded-full bg-yellow-300 opacity-20 dark:opacity-10 filter blur-xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Lightning flash for thunderstorms */}
      {weatherType === "thunderstorm" && (
        <motion.div
          className="absolute inset-0 bg-white opacity-0"
          animate={{
            opacity: [0, 0, 0, 0.5, 0, 0, 0, 0.2, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
          }}
        />
      )}
    </div>
  )
}

