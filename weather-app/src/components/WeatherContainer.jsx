import { useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Box,
    Grid,
    List,
    ListItem,
    ListItemText,
    Link,
} from "@mui/material";
import WeatherCard from "./WeatherCard";
import ForecastCard from "./ForecastCard";

export default function WeatherContainer() {
    const [currentWeatherData, setCurrentWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);

    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");

    const [newsData, setNewsData] = useState("");

    const getNewsData = async () => {
        try {
            const apiKey = import.meta.env.VITE_NYT_API_KEY;
            const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setNewsData(data.results);
        } catch (error) {
            console.error("Error occured: ", error);
        }
    };

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

            if (!newsData) {
                getNewsData();
            }
        } catch (error) {
            console.error("Error occured: ", error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center">
                Weather App
            </Typography>

            <Card sx={{ mb: 4, p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Enter Location
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="e.g., New York"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="e.g., NY"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="e.g., US"
                        />
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={getWeatherData}
                        fullWidth
                    >
                        Get Weather Data
                    </Button>
                </Box>
            </Card>

            {currentWeatherData && (
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h5" component="h3" gutterBottom>
                            Current Weather
                        </Typography>
                        <WeatherCard weatherData={currentWeatherData} />
                        <Typography
                            variant="h5"
                            component="h3"
                            gutterBottom
                            sx={{ mt: 3 }}
                        >
                            5-Day Forecast
                        </Typography>
                        <ForecastCard forecastData={forecastData} />
                    </CardContent>
                </Card>
            )}

            {newsData && (
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h3" gutterBottom>
                            Top News Today
                        </Typography>
                        <List>
                            {newsData.slice(0, 5).map((article, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemText
                                        primary={
                                            <Link
                                                href={article.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                underline="hover"
                                            >
                                                {article.title}
                                            </Link>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
}
