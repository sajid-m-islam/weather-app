export default function ForecastCard({ forecastData }) {
    if (!forecastData) return <p>Loading forecast...</p>;

    const { list } = forecastData;

    // Filter for 18:00:00 UTC (which is 2:00 PM EDT / 1:00 PM EST)
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
                <p className="daily-temp">{Math.round(temp)}°</p>
            </div>
        );
    });

    return <div className="forecast-container">{forecastCards}</div>;
}
