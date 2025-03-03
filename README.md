# Weather Dashboard

A modern, responsive weather dashboard built with Next.js and Tailwind CSS that provides real-time weather information and forecasts using the OpenWeather API.

## Features

- **Real-time Weather Data**: Get current weather conditions for any city worldwide
- **5-Day Forecast**: View detailed weather forecasts for the next 5 days
- **Dynamic Weather Backgrounds**: Background changes based on current weather conditions
- **Animated Weather Effects**: Beautiful particle animations for different weather types
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Automatic theme switching based on system preferences

## Weather Information Displayed

### Current Weather
- Temperature (current, feels like, min/max)
- Weather conditions with icons
- Wind speed and direction
- Humidity levels
- Cloud coverage
- Visibility
- Atmospheric pressure
- Precipitation (rain/snow when present)
- Sunrise and sunset times

### Forecast Data
- Daily temperature range
- Weather conditions
- Wind speed
- Humidity percentage
- Cloud coverage
- Precipitation probability
- Pressure
- Visibility

## Technologies Used

- **Frontend Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion
- **Weather Data**: OpenWeather API
- **Icons**: Lucide React
- **Background Images**: Unsplash API

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd weather-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your OpenWeather API key:
   ```env
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

- `NEXT_PUBLIC_OPENWEATHER_API_KEY`: Your OpenWeather API key (required)

## Project Structure

```
weather-dashboard/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main weather dashboard page
├── components/            # React components
│   ├── animated-background.tsx
│   ├── forecast-card.tsx
│   ├── weather-background.tsx
│   ├── weather-cursor.tsx
│   └── weather-icon.tsx
├── public/                # Static assets
└── styles/               # Global styles
```

## API Integration

The dashboard uses the following OpenWeather API endpoints:
- Current weather data: `/data/2.5/weather`
- 5-day forecast: `/data/2.5/forecast`

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
