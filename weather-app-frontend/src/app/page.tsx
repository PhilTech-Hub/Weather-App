// Add this at the very top of your file to specify this as a client component
"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";

// Define types for weather data
interface WeatherData {
  name: string;
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  dt: number; // Date timestamp for current weather
  sys: {
    country: string;
  };
}

interface ForecastData {
  list: {
    dt: number;
    main: {
      temp: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
  }[];
}

export default function Home() {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [unit, setUnit] = useState<string>("metric"); // Default: Celsius
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const API_KEY = "18613f5eda90cb9a8ce5061503590873"; // Replace with your API key
  const GEOCODING_API_URL = "https://api.openweathermap.org/data/2.5/weather";

  const handleSearch = async () => {
    if (!city) return;

    setLoading(true);
    setError("");

    try {
      // Geocoding API call to get city coordinates
      const geocodeResponse = await axios.get(
        `${GEOCODING_API_URL}?q=${city}&appid=${API_KEY}`
      );
      const { lat, lon } = geocodeResponse.data.coord;

      // Fetch the weather data for the city
      const weatherResponse = await axios.get(
        `${GEOCODING_API_URL}?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      );
      setWeatherData(weatherResponse.data);

      // Fetch the 3-day forecast data
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&cnt=4&appid=${API_KEY}`
      );
      setForecastData(forecastResponse.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Unable to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);

    const day = date.getDate();
    const daySuffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
          ? "nd"
          : day % 10 === 3 && day !== 13
            ? "rd"
            : "th";

    const formattedDate = date.toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });

    const time = date.toLocaleTimeString("en-GB");

    return (
      <>
        {day}
        <sup>{daySuffix}</sup> {formattedDate}, at {time}
      </>
    );
  };



  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="overall flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        {/* Search Box */}
        <div className="right search flex gap-4 items-center">
          <input
            type="text"
            className="px-4 py-2 rounded-md border"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </div>

        {/* Toggle Temperature Unit */}
        <button
          onClick={toggleUnit}
          className="c-f mt-4 px-4 py-2 rounded-md bg-gray-200"
        >
          {unit === "metric" ? "Switch to °F" : "Switch to °C"}
        </button>

        {/* Error Handling */}
        {error && <div className="text-red-500 mt-4">{error}</div>}

        {/* Weather Display */}
        {loading ? (
          <div>Loading...</div>
        ) : weatherData ? (
          <div className="flex flex-col items-center mt-8">
            <div className="date-l">{formatDate(weatherData.dt)}</div>
            <div className="location text-2xl font-bold">
              {weatherData.name}, {weatherData.sys.country}
            </div>

            <div className=" left flex gap-4 items-center mt-4">
              <Image
                className="weather-img-l"
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                alt="Weather icon"
                width={200}
                height={200}
              />


              <div className="tem text-4xl">
                {weatherData.main.temp}°{unit === "metric" ? "C" : "F"}
              </div>
              <div className="desc-l text-xl">{weatherData.weather[0].description}</div>
            </div>
            <div className="right win-hum mt-4">
              <div className="win">Wind: {weatherData.wind.speed} m/s</div>
              <div className="hum">Humidity: {weatherData.main.humidity}%</div>
            </div>

            {/* Next 3 Days Weather */}
            {forecastData && (
              <div className="right n3d mt-8">
                <h3>Next 3 Days</h3>
                <div className="n3d-grid grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  {forecastData.list.slice(1,4).map((forecast) => (
                    <div key={forecast.dt} className="n3d-grid-child flex flex-col items-center">
                      <div>{formatDate(forecast.dt)}</div>
                      <Image
                        src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@4x.png`}
                        alt="Forecast icon"
                        width={100}
                        height={100}
                      />
                      <div className="">
                        {forecast.main.temp}°{unit === "metric" ? "C" : "F"}
                      </div>
                      <div>{forecast.weather[0].description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center mt-8">Please search for a city</div>
        )}
      </main>
    </div>
  );
}
