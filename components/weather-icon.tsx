import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, CloudSun } from "lucide-react"

interface WeatherIconProps {
  weatherCode: number
  className?: string
}

export default function WeatherIcon({ weatherCode, className }: WeatherIconProps) {
  // Map weather codes to appropriate icons
  // Based on OpenWeatherMap API weather condition codes
  // https://openweathermap.org/weather-conditions

  if (weatherCode >= 200 && weatherCode < 300) {
    return <CloudLightning className={className} /> // Thunderstorm
  } else if (weatherCode >= 300 && weatherCode < 400) {
    return <CloudDrizzle className={className} /> // Drizzle
  } else if (weatherCode >= 500 && weatherCode < 600) {
    return <CloudRain className={className} /> // Rain
  } else if (weatherCode >= 600 && weatherCode < 700) {
    return <CloudSnow className={className} /> // Snow
  } else if (weatherCode >= 700 && weatherCode < 800) {
    return <CloudFog className={className} /> // Atmosphere (fog, mist, etc.)
  } else if (weatherCode === 800) {
    return <Sun className={className} /> // Clear sky
  } else if (weatherCode === 801) {
    return <CloudSun className={className} /> // Few clouds
  } else if (weatherCode > 801 && weatherCode < 900) {
    return <Cloud className={className} /> // Clouds
  } else {
    return <Sun className={className} /> // Default
  }
}

