import { useState } from "react";

export default function Weather() {
    const getWeatherData = (async) => {
        try {
            const apiKey = import.meta.env.WEATHER - API - KEY;
            const cityName = "Charlottesville";
            const stateCode = "VA";
            const countryCode = "US";
            // const respone = await fetch("http://api.openweathermap.org/geo/1.0/direct?q={cityName},{state code},{country code}&limit={limit}&appid={API key})
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
