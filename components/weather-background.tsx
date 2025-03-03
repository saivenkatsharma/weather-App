"use client"

import { useEffect, useState } from "react"

interface WeatherBackgroundProps {
  weatherCode?: number;
}

const weatherImages = {
  thunderstorm: [
    "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28",
    "https://images.unsplash.com/photo-1594156596782-656c93e4d504",
    "https://images.unsplash.com/photo-1461511669078-d46bf351cd6e",
    "https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0",
  ],
  rain: [
    "https://images.unsplash.com/photo-1519692933481-e162a57d6721",
    "https://images.unsplash.com/photo-1428592953211-077101b2021b",
    "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0",
    "https://images.unsplash.com/photo-1501691223387-dd0500403074",
  ],
  snow: [
    "https://images.unsplash.com/photo-1491002052546-bf38f186af56",
    "https://images.unsplash.com/photo-1516431883744-8ea66f1053f1",
    "https://images.unsplash.com/photo-1478265409131-1f65c88f965c",
    "https://images.unsplash.com/photo-1551582045-6ec9c11d8697",
  ],
  mist: [
    "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227",
    "https://images.unsplash.com/photo-1543968996-ee822b8176ba",
    "https://images.unsplash.com/photo-1482841628122-9080d44bb807",
    "https://images.unsplash.com/photo-1492273840898-6102ad35701e",
  ],
  clear: [
    "https://images.unsplash.com/photo-1601297183305-6df142704ea2",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    "https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  ],
  cloudy: [
    "https://images.unsplash.com/photo-1534088568595-a066f410bcda",
    "https://images.unsplash.com/photo-1499956827185-0d63ee78a910",
    "https://images.unsplash.com/photo-1594156596782-656c93e4d504",
    "https://images.unsplash.com/photo-1505533321630-975218a5f66f",
  ],
};

export default function WeatherBackground({ weatherCode = 800 }: WeatherBackgroundProps) {
  const [currentImage, setCurrentImage] = useState<string>("");

  // Determine weather type based on weather code
  const getWeatherType = () => {
    if (weatherCode >= 200 && weatherCode < 300) return "thunderstorm";
    if (weatherCode >= 300 && weatherCode < 600) return "rain";
    if (weatherCode >= 600 && weatherCode < 700) return "snow";
    if (weatherCode >= 700 && weatherCode < 800) return "mist";
    if (weatherCode === 800) return "clear";
    if (weatherCode > 800) return "cloudy";
    return "clear";
  };

  useEffect(() => {
    const weatherType = getWeatherType();
    const images = weatherImages[weatherType as keyof typeof weatherImages];
    const randomIndex = Math.floor(Math.random() * images.length);
    // Add Unsplash parameters for optimization
    setCurrentImage(`${images[randomIndex]}?auto=format,compress&q=70&w=1920`);
  }, [weatherCode]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: currentImage ? `url(${currentImage})` : undefined,
        }}
      >
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>
    </div>
  );
}
