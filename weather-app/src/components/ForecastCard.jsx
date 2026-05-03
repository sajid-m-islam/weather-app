import { Box, Card, CardContent, Typography, Grid } from "@mui/material";

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
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                <Card sx={{ textAlign: "center", height: "100%" }}>
                    <CardContent>
                        <Typography variant="h6" component="h3" gutterBottom>
                            {dayName}
                        </Typography>
                        <Box sx={{ mb: 1 }}>
                            <img
                                src={`https://openweathermap.org/img/wn/${icon}.png`}
                                alt="weather icon"
                                style={{ width: 60, height: 60 }}
                            />
                        </Box>
                        <Typography variant="h5" component="p">
                            {Math.round(temp)}°
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    });

    return (
        <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                {forecastCards}
            </Grid>
        </Box>
    );
}
