export default function ForecastCard({ forecastData }) {
    if (!forecastData) return <p>Loading forecast...</p>;

    const { list } = forecastData;

    const dailyData = list.filter((block) => block.dt_txt.includes("18:00:00"));

    const forecastCards = dailyData.map((day, index) => {
        const { dt_txt, main, weather } = day;
        const { temp } = main;
        const { icon } = weather[0];

        const date = new Date(dt_txt);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

        return (
            <div key={index} className="daily-card">
                <h3 className="daily-day">{dayName}</h3>
                <img
                    className="daily-icon"
                    src={`https://openweathermap.org/img/wn/${icon}.png`}
                    alt="weather icon"
                />
                <p className="daily-temp">{Math.round(temp)}°</p>
            </div>
        );
    });

    return <div className="forecast-container">{forecastCards}</div>;
}
