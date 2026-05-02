import { useState } from "react";

export default function WeatherContainer() {
    const getWeatherData = async () => {
        try {
            const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
            const city = "Charlottesville";
            const state = "VA";
            const country = "US";
            const geoUrl = new URL(
                "http://api.openweathermap.org/geo/1.0/direct",
            );
            const query = `${city},${state},${country}`;
            geoUrl.searchParams.append("q", query);
            geoUrl.searchParams.append("limit", "1");
            geoUrl.searchParams.append("appid", apiKey);

            const geoResponse = await fetch(geoUrl);
            const geoData = await response.json();

            const location = geoData[0];
            const latitude = location.lat;
            const longitude = location.lon;

            const weatherUrl = new URL(
                "https://api.openweathermap.org/data/3.0/onecall",
            );
            weatherUrl.searchParams.append("lat", latitude);
            weatherUrl.searchParams.append("lon", longitude);
            weatherUrl.searchParams.append("appid", apiKey);

            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await response.json;
        } catch (error) {
            console.error("Error occured: ", error);
        }
    };

    return (
        <>
            <h1>Hello World</h1>
        </>
    );
}
