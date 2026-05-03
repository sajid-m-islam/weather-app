import { useState } from "react";

export default function WeatherCard({ weatherData }) {
    const { name, main, weather, wind, sys } = weatherData;

    const { temp, feels_like, humidity, temp_min, temp_max } = main;
    const { speed } = wind;
    const { country } = sys;

    const { main: conditions, description, icon } = weather[0];

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    return (
        <>
            <div className="weather-card">
                <h2 className="weather-location">
                    {name}, {country}
                </h2>

                <p className="weather-description">{description}</p>
                <img
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={description}
                    className="weather-icon"
                />

                <div className="weather-temp">{Math.round(temp)}°</div>

                <p className="weather-feels-like">
                    Feels like {Math.round(feels_like)}°
                </p>

                <div className="weather-details">
                    <div className="details-left">
                        <p>
                            <strong>H:</strong> {Math.round(temp_max)}°
                        </p>
                        <p>
                            <strong>L:</strong> {Math.round(temp_min)}°
                        </p>
                    </div>
                    <div className="details-right">
                        <p>
                            <strong>Humidity:</strong> {humidity}%
                        </p>
                        <p>
                            <strong>Wind:</strong> {Math.round(speed)} mph
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
