"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Droplets, Wind, Sunrise, Sunset, Thermometer, Cloud } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import WeatherIcon from "@/components/weather-icon"
import ForecastCard from "@/components/forecast-card"
import AnimatedBackground from "@/components/animated-background"
import WeatherCursor from "@/components/weather-cursor"
import WeatherBackground from "@/components/weather-background"

interface WeatherData {
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  visibility: number;
  rain?: {
    "1h"?: number;
  };
  snow?: {
    "1h"?: number;
  };
}

interface ForecastData {
  date: string;
  temp: {
    min: number;
    max: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  precipitation: number;
  humidity: number;
  pressure: number;
  visibility: number;
  clouds: number;
}

export default function WeatherDashboard() {
  const [city, setCity] = useState("London")
  const [searchQuery, setSearchQuery] = useState("")
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastData[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const API_KEY = "f58ca6155bfeb64a4698ec99debb1d01"

  useEffect(() => {
    fetchWeatherData(city)
  }, [city])

  const fetchWeatherData = async (cityName: string) => {
    setLoading(true)
    setError(null)

    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`,
      )

      if (!weatherResponse.ok) {
        throw new Error("City not found")
      }

      const weatherData = await weatherResponse.json()

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`,
      )

      if (!forecastResponse.ok) {
        throw new Error("Forecast data not available")
      }

      const forecastData = await forecastResponse.json()

      // Process forecast data to get daily forecasts
      const dailyForecasts = processForecastData(forecastData.list)

      setWeather(weatherData)
      setForecast(dailyForecasts)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const processForecastData = (forecastList: any[]): ForecastData[] => {
    const dailyData: { [key: string]: ForecastData } = {}

    // Group forecast data by day
    forecastList.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString()

      if (!dailyData[date]) {
        dailyData[date] = {
          date,
          temp: { min: item.main.temp_min, max: item.main.temp_max },
          weather: item.weather[0],
          wind: {
            speed: item.wind.speed,
            deg: item.wind.deg,
            gust: item.wind.gust
          },
          precipitation: item.pop * 100, // Probability of precipitation as percentage
          humidity: item.main.humidity,
          pressure: item.main.pressure,
          visibility: item.visibility,
          clouds: item.clouds.all
        }
      } else {
        // Update min/max temperatures
        if (item.main.temp_min < dailyData[date].temp.min) {
          dailyData[date].temp.min = item.main.temp_min
        }
        if (item.main.temp_max > dailyData[date].temp.max) {
          dailyData[date].temp.max = item.main.temp_max
        }
      }
    })

    // Convert to array and take first 5 days
    return Object.values(dailyData).slice(0, 5)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setCity(searchQuery)
      setSearchQuery("")
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-8 relative">
      <WeatherBackground weatherCode={weather?.weather[0]?.id} />
      <AnimatedBackground weatherCode={weather?.weather[0]?.id} />
      <WeatherCursor weatherCode={weather?.weather[0]?.id} />
      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Weather Dashboard</h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-8 max-w-md mx-auto">
          <Input
            placeholder="Search for a city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white dark:bg-gray-800"
          />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>

        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg mb-8 max-w-md mx-auto text-center">
            {error}
          </div>
        )}

        {/* Current Weather */}
        <Card className="mb-8 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-lg">
          <CardContent className="p-6">
            {loading ? (
              <div className="flex flex-col gap-4">
                <Skeleton className="h-8 w-48 mx-auto" />
                <div className="flex justify-center">
                  <Skeleton className="h-24 w-24 rounded-full" />
                </div>
                <Skeleton className="h-12 w-36 mx-auto" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ) : (
              weather && (
                <>
                  <div className="flex items-center justify-center mb-4">
                    <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {weather.name}, {weather.sys.country}
                    </h2>
                  </div>

                  <div className="flex flex-col items-center mb-6">
                    <div className="flex items-center justify-center mb-2">
                      <WeatherIcon weatherCode={weather.weather[0].id} className="h-24 w-24 text-blue-500" />
                    </div>
                    <p className="text-4xl font-bold text-gray-800 dark:text-white">
                      {Math.round(weather.main.temp)}°C
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 capitalize">{weather.weather[0].description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Feels like {Math.round(weather.main.feels_like)}°C
                    </p> 
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-4 rounded-lg flex flex-col items-center border border-white/20 dark:border-gray-700/30 shadow">
                      <Thermometer className="h-6 w-6 text-blue-500 mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">Min/Max</p>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {Math.round(weather.main.temp_min)}°/{Math.round(weather.main.temp_max)}°
                      </p>
                    </div>

                    <div className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-4 rounded-lg flex flex-col items-center border border-white/20 dark:border-gray-700/30 shadow">
                      <Droplets className="h-6 w-6 text-blue-500 mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
                      <p className="font-semibold text-gray-800 dark:text-white">{weather.main.humidity}%</p>
                    </div>

                    <div className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-4 rounded-lg flex flex-col items-center border border-white/20 dark:border-gray-700/30 shadow">
                      <Wind className="h-6 w-6 text-blue-500 mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">Wind</p>
                      <div className="text-center">
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {Math.round(weather.wind.speed * 3.6)} km/h
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {weather.wind.gust && `Gust: ${Math.round(weather.wind.gust * 3.6)} km/h`}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-4 rounded-lg flex flex-col items-center border border-white/20 dark:border-gray-700/30 shadow">
                      <Cloud className="h-6 w-6 text-blue-500 mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">Conditions</p>
                      <div className="text-center">
                        <p className="font-semibold text-gray-800 dark:text-white">{weather.clouds.all}% clouds</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Vis: {Math.round(weather.visibility / 1000)}km
                        </p>
                        {weather.rain && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Rain: {weather.rain["1h"]}mm
                          </p>
                        )}
                        {weather.snow && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Snow: {weather.snow["1h"]}mm
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-2 md:col-span-4 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-4 rounded-lg flex flex-col items-center border border-white/20 dark:border-gray-700/30 shadow">
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="text-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Pressure</p>
                          <p className="font-semibold text-gray-800 dark:text-white">{weather.main.pressure} hPa</p>
                          {weather.main.sea_level && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Sea Level: {weather.main.sea_level} hPa
                            </p>
                          )}
                          {weather.main.grnd_level && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Ground Level: {weather.main.grnd_level} hPa
                            </p>
                          )}
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Wind Direction</p>
                          <p className="font-semibold text-gray-800 dark:text-white">{weather.wind.deg}°</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-6 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                      <Sunrise className="h-5 w-5 mr-1 text-orange-400" />
                      <span>Sunrise: {formatTime(weather.sys.sunrise)}</span>
                    </div>
                    <div className="flex items-center">
                      <Sunset className="h-5 w-5 mr-1 text-orange-500" />
                      <span>Sunset: {formatTime(weather.sys.sunset)}</span>
                    </div>
                  </div>
                </>
              )
            )}
          </CardContent>
        </Card>

        {/* 5-Day Forecast */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">5-Day Forecast</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {loading
            ? Array(5)
              .fill(0)
              .map((_, index) => <Skeleton key={index} className="h-40 w-full" />)
            : forecast && forecast.map((day, index) => <ForecastCard key={index} forecast={day} />)}
        </div>
      </div>
    </div>
  )
}
