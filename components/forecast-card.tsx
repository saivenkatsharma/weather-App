import { Card, CardContent } from "@/components/ui/card"
import WeatherIcon from "@/components/weather-icon"

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
      </CardContent>
    </Card>
  )
}

