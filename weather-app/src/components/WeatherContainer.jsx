import { useState } from "react";
import WeatherCard from "./WeatherCard";

export default function WeatherContainer() {
    const [weatherData, setWeatherData] = useState(null);

    const getWeatherData = async () => {
        try {
            const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
            const city = "Charlottesville";
            const state = "VA";
            const country = "US";
            const geoUrl = new URL(
                "https://api.openweathermap.org/geo/1.0/direct",
            );
            const query = `${city},${state},${country}`;
            geoUrl.searchParams.append("q", query);
            geoUrl.searchParams.append("limit", "1");
            geoUrl.searchParams.append("appid", apiKey);

            const geoResponse = await fetch(geoUrl);
            const geoData = await geoResponse.json();

            const location = geoData[0];
            const latitude = location.lat;
            const longitude = location.lon;

            const weatherUrl = new URL(
                "https://api.openweathermap.org/data/2.5/weather",
            );
            weatherUrl.searchParams.append("lat", latitude);
            weatherUrl.searchParams.append("lon", longitude);
            weatherUrl.searchParams.append("appid", apiKey);
            weatherUrl.searchParams.append("units", "imperial");

            const weatherResponse = await fetch(weatherUrl);
            const weatherAPIData = await weatherResponse.json();
            console.log(weatherAPIData);
            setWeatherData(weatherAPIData);
        } catch (error) {
            console.error("Error occured: ", error);
        }
    };
    return (
        <>
            <div>
                <h1>Weather Search</h1>

                <button onClick={getWeatherData}>Test Fetch Weather</button>

                {weatherData && (
                    <div
                        style={{
                            marginTop: "20px",
                            padding: "10px",
                            border: "1px solid green",
                        }}
                    >
                        <p>✅ Data loaded successfully!</p>
                        <WeatherCard weatherData={weatherData} />
                    </div>
                )}
            </div>
        </>
    );
}
