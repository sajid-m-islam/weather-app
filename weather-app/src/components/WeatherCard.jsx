import { Card, CardContent, Typography, Box, Grid } from "@mui/material";

export default function WeatherCard({ weatherData }) {
    const { name, main, weather, wind, sys } = weatherData;

    const { temp, feels_like, humidity, temp_min, temp_max } = main;
    const { speed } = wind;
    const { country } = sys;

    const { description, icon } = weather[0];

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    return (
        <Card sx={{ maxWidth: 400, mx: "auto", textAlign: "center" }}>
            <CardContent>
                <Typography variant="h4" component="h2" gutterBottom>
                    {name}, {country}
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    {description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                    <img
                        src={iconUrl}
                        alt={description}
                        style={{ width: 100, height: 100 }}
                    />
                </Box>

                <Typography variant="h3" component="div" sx={{ mb: 1 }}>
                    {Math.round(temp)}°
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Feels like {Math.round(feels_like)}°
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                High
                            </Typography>
                            <Typography variant="h6">
                                {Math.round(temp_max)}°
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                Low
                            </Typography>
                            <Typography variant="h6">
                                {Math.round(temp_min)}°
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                Humidity
                            </Typography>
                            <Typography variant="h6">{humidity}%</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                Wind
                            </Typography>
                            <Typography variant="h6">
                                {Math.round(speed)} mph
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
