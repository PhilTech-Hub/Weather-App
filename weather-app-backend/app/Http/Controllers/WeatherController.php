<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    public function getWeather(Request $request)
    {
        $city = $request->query('city', 'Nairobi');

        // Fetch the key from the environment correctly
        $apiKey = config('services.openweathermap.key');

        

        if (!$apiKey) {
            return response()->json([
                'message' => 'API key not found in environment!',
            ], 500);
        }

        $response = Http::get('http://api.openweathermap.org/data/2.5/weather', [
            'q' => $city,
            'appid' => $apiKey,
            'units' => 'metric',
        ]);

        if ($response->successful()) {
            return response()->json([
                'message' => 'Weather data fetched successfully',
                'city' => $city,
                'weather' => $response->json(),
            ]);
        }

        return response()->json([
            'message' => 'Error fetching weather data',
            'error' => $response->body(),
        ], $response->status());
    }
}
