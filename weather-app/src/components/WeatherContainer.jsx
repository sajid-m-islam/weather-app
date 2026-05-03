import { useState } from "react";
import WeatherCard from "./WeatherCard";
import ForecastCard from "./ForecastCard";

export default function WeatherContainer() {
    const [currentWeatherData, setCurrentWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);
    const [country, setCountry] = useState(null);

    const getWeatherData = async () => {
        try {
            const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
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

            const currentWeatherUrl = new URL(
                "https://api.openweathermap.org/data/2.5/weather",
            );
            currentWeatherUrl.searchParams.append("lat", latitude);
            currentWeatherUrl.searchParams.append("lon", longitude);
            currentWeatherUrl.searchParams.append("appid", apiKey);
            currentWeatherUrl.searchParams.append("units", "imperial");

            const currentWeatherResponse = await fetch(currentWeatherUrl);
            const currentWeatherAPIData = await currentWeatherResponse.json();
            setCurrentWeatherData(currentWeatherAPIData);

            const forecastUrl = new URL(
                "https://api.openweathermap.org/data/2.5/forecast",
            );
            forecastUrl.searchParams.append("lat", latitude);
            forecastUrl.searchParams.append("lon", longitude);
            forecastUrl.searchParams.append("appid", apiKey);
            forecastUrl.searchParams.append("units", "imperial");

            const forecastResponse = await fetch(forecastUrl);
            const forecastData = await forecastResponse.json();
            console.log(forecastData);
            setForecastData(forecastData);
        } catch (error) {
            console.error("Error occured: ", error);
        }
    };
    return (
        <>
            <div>
                <h1>Weather Search</h1>
                <div>
                    <h3>Enter a city: </h3>
                    <input
                        type="text"
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                    ></input>

                    <h3>Enter a state: </h3>
                    <input
                        type="text"
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State (abbreviation)"
                    ></input>

                    <h3>Enter a country: </h3>
                    <input
                        type="text"
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Country (abbreviation)"
                    ></input>
                </div>

                <button onClick={getWeatherData}>Get Weather Data</button>

                {currentWeatherData && (
                    <div
                        style={{
                            marginTop: "20px",
                            padding: "10px",
                            border: "1px solid green",
                        }}
                    >
                        <p>Current weather</p>
                        <WeatherCard weatherData={currentWeatherData} />
                        <p>5-day forecast</p>
                        <ForecastCard forecastData={forecastData} />
                    </div>
                )}
            </div>
        </>
    );
}
