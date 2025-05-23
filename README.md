﻿# 🌦️ Weather App

## Overview
The Weather App is a full-stack application that provides real-time and forecasted weather information for any location using the OpenWeatherMap API. It is developed using a decoupled architecture, with the frontend built using **Next.js (TypeScript)** and styled using **RippleUI with Tailwind CSS**, and the backend developed with **Laravel 11 (API-only)**. The application is visually appealing, responsive, and offers accurate weather data with an intuitive user interface.

---

## 🚀 Features

### ✅ Current Weather
- Displays current temperature, weather condition, icon, humidity, wind speed, and pressure.
- Date and time formatting with day suffixes (e.g., 22<sup>nd</sup> April 2025).

### 📅 Forecast (Next 3 Days)
- Shows weather forecast for the upcoming 3 days.
- Each day includes:
  - Formatted date (e.g., 23<sup>rd</sup> April)
  - Weather icon
  - Description
  - Temperature
- Visually separated using styled borders and layout grids.

### 🌐 Search by City
- Users can search for weather by entering a city name.
- Utilizes OpenWeatherMap's geolocation API to fetch relevant data.

### 📱 Responsive UI
- Fully responsive layout for mobile, tablet, and desktop.
- Clean, modern design using RippleUI components.

---

## 🏗️ Tech Stack
| Layer     | Technology                                 |
|-----------|---------------------------------------------|
| Frontend  | Next.js (TypeScript), Tailwind CSS, RippleUI |
| Backend   | Laravel 11 (API only)                       |
| API       | OpenWeatherMap API                          |

---

## 📁 Project Structure
```
weather-app/
├── weather-app-backend/        # Laravel backend
│   └── routes/api.php
│   └── app/Http/Controllers/WeatherController.php
│   └── .env                    # Contains OPENWEATHER_API_KEY
├── weather-app-frontend/       # Next.js frontend
│   └── pages/index.tsx
│   └── components/WeatherCard.tsx
│   └── styles/
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

### 2. Backend (Laravel)
```bash
cd weather-app-backend
cp .env.example .env
composer install
php artisan key:generate
php artisan serve
```

> ✅ Make sure your `.env` has this line:
> `OPENWEATHER_API_KEY=your_key_here`

### Fix SSL Certificate (Windows Only)
If you get a cURL error related to SSL:
1. Download `cacert.pem` from https://curl.se/ca/cacert.pem
2. Save it locally (e.g., `C:\xampp\php\extras\ssl\cacert.pem`)
3. In `php.ini`, update:
```ini
curl.cainfo = "C:\\path\\to\\cacert.pem"
```

### 3. Frontend (Next.js)
```bash
cd ../weather-app-frontend
npm install
npm run dev
```
By default, it runs at: [http://localhost:3000](http://localhost:3000)

---

## 📡 API Usage

### Endpoints
- `/api/weather?city={city}` – Fetches current weather data
- `/api/forecast?city={city}` – Fetches 3-day forecast

### Example
```bash
GET http://localhost:8000/api/weather/Nairobi
```

### Sample Response
```json
{
  "message": "Weather data fetched successfully",
  "city": "Nairobi",
  "temperature": 16.62,
  "description": "broken clouds",
  "icon": "04n",
  "humidity": 100,
  "wind_speed": 2.57,
  "sunrise": 1745292526,
  "sunset": 1745336001
}
```

---

## 🧩 Frontend Details
- **Framework**: Next.js with TypeScript
- **Styling**: RippleUI + Tailwind CSS
- **Image Optimization**: With `next/image` and `next.config.js` for OpenWeather icons
- **State Management**: `useState`, `useEffect`
- **Date Formatting Example**:
```ts
const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const daySuffix =
    day % 10 === 1 && day !== 11 ? "st" :
    day % 10 === 2 && day !== 12 ? "nd" :
    day % 10 === 3 && day !== 13 ? "rd" : "th";
  const month = date.toLocaleDateString("en-GB", { month: "long" });
  return (<>{day}<sup>{daySuffix}</sup> {month}</>);
};
```

---

## 🔧 Backend Details
- **Framework**: Laravel 11
- **Security**:
  - Rate-limiting for requests
  - Input sanitization
- **Data Source**: OpenWeatherMap API

---

## 📌 GitHub & Versioning
### Repository Structure:
```
weather-app/
├── weather-app-backend/     # Laravel backend
├── weather-app-frontend/    # Next.js frontend
```

### Sample Commit Messages:
- `feat: add 3-day weather forecast section`
- `fix: image blur issue with openweathermap icons`
- `chore: add API route for city-based search`
- `style: improve responsiveness on small screens`

---

## 🛠️ Future Improvements
- 🌍 Location-based weather detection using browser geolocation
- 🌒 Day/Night UI modes based on weather conditions
- 🔔 Notification for extreme weather alerts
- 📈 Add graph visualization for temperature trends

---

## 👨‍💻 Author
**Philemon V. Odera**  
[GitHub: PhilTech-Hub](https://github.com/PhilTech-Hub)  
Software Developer & Engineer – Full Stack & API-first Development  
Kenya 🇰🇪

---

## 📜 License
MIT License

Feel free to fork and improve this project. Contributions are welcome!

