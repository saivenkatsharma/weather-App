import { Card, CardContent } from "@/components/ui/card"
import WeatherIcon from "@/components/weather-icon"
import { Cloud, Droplets, Wind } from "lucide-react"

interface ForecastProps {
  forecast: {
    date: string
    temp: {
      min: number
      max: number
    }
    weather: {
      id: number
      main: string
      description: string
    }
    wind: {
      speed: number
      deg: number
      gust?: number
    }
    precipitation: number
    humidity: number
    pressure: number
    visibility: number
    clouds: number
  }
}

export default function ForecastCard({ forecast }: ForecastProps) {
  const date = new Date(forecast.date)
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
  const monthDay = date.toLocaleDateString("en-US", { month: "short", day: "numeric" })

  return (
    <Card className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-lg hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 transform hover:scale-105">
      <CardContent className="p-4 flex flex-col items-center">
        <p className="font-medium text-gray-800 dark:text-white">{dayName}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{monthDay}</p>

        <div className="my-3">
          <WeatherIcon weatherCode={forecast.weather.id} className="h-10 w-10 text-blue-500" />
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">{forecast.weather.description}</p>

        <div className="flex gap-2 mt-2">
          <span className="font-semibold text-gray-800 dark:text-white">{Math.round(forecast.temp.max)}°</span>
          <span className="text-gray-500 dark:text-gray-400">{Math.round(forecast.temp.min)}°</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3 w-full text-xs text-gray-500 dark:text-gray-400">
          <div className="flex flex-col items-center">
            <Wind className="h-4 w-4 text-blue-500" />
            <span>{Math.round(forecast.wind.speed * 3.6)} km/h</span>
          </div>
          <div className="flex flex-col items-center">
            <Droplets className="h-4 w-4 text-blue-500" />
            <span>{forecast.humidity}%</span>
          </div>
          <div className="flex flex-col items-center">
            <Cloud className="h-4 w-4 text-blue-500" />
            <span>{forecast.clouds}%</span>
          </div>
        </div>

        <div className="w-full mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-center text-gray-500 dark:text-gray-400">
            <p>Precipitation: {forecast.precipitation}%</p>
            <p>Pressure: {forecast.pressure} hPa</p>
            <p>Visibility: {Math.round(forecast.visibility / 1000)}km</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
