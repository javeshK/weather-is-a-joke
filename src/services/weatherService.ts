import { CityInfo, WeatherData, ForecastDay } from '../types';

// Map WMO Weather Codes to beautiful readable conditions
export function getWeatherCondition(code: number): { desc: string; icon: string; tags: string[] } {
  if (code === 0) return { desc: "Clear Sky", icon: "Sun", tags: ["#clear", "#sunny", "#calm"] };
  if (code === 1) return { desc: "Mainly Clear", icon: "SunDim", tags: ["#breezy", "#mostly-clear"] };
  if (code === 2) return { desc: "Partly Cloudy", icon: "CloudSun", tags: ["#partly-cloudy", "#pleasant"] };
  if (code === 3) return { desc: "Overcast", icon: "Cloud", tags: ["#cloudy", "#cool", "#shadowy"] };
  if (code === 45 || code === 48) return { desc: "Foggy", icon: "CloudFog", tags: ["#foggy", "#mist", "#low-visibility"] };
  if (code === 51 || code === 53 || code === 55) return { desc: "Light Drizzle", icon: "CloudDrizzle", tags: ["#drizzle", "#misty", "#gloomy"] };
  if (code === 56 || code === 57 || code === 66 || code === 67) return { desc: "Freezing Rain", icon: "CloudSnow", tags: ["#icy", "#chilly", "#hazard"] };
  if (code === 61 || code === 63 || code === 65) return { desc: "Rainy", icon: "CloudRain", tags: ["#wet", "#rainy", "#indoor-day"] };
  if (code === 71 || code === 73 || code === 75 || code === 77) return { desc: "Snowfall", icon: "Snowflake", tags: ["#snowy", "#freezing", "#winter"] };
  if (code === 80 || code === 81 || code === 82) return { desc: "Rain Showers", icon: "CloudLightning", tags: ["#showers", "#sudden-rain", "#humid"] };
  if (code === 85 || code === 86) return { desc: "Snow Showers", icon: "CloudSnow", tags: ["#snow-showers", "#winter-flurries"] };
  if (code === 95 || code === 96 || code === 99) return { desc: "Thunderstorm", icon: "Zap", tags: ["#stormy", "#thunder", "#lightning"] };
  return { desc: "Unknown Atmosphere", icon: "HelpCircle", tags: ["#stable", "#microclimate"] };
}

// Fetch list of cities that match input query from open-meteo Geocoding API
export async function searchCities(query: string): Promise<CityInfo[]> {
  if (!query || query.trim().length < 2) return [];
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=10&language=en&format=json`;
    const response = await fetch(url);
    if (!response.ok) return [];
    const data = await response.json();
    if (!data.results) return [];

    return data.results.map((item: any) => ({
      name: item.name,
      country: item.country || "Unknown",
      latitude: item.latitude,
      longitude: item.longitude,
      state: item.admin1 || "",
      timezone: item.timezone || "UTC",
    }));
  } catch (error) {
    console.error("Geocoding error:", error);
    return [];
  }
}

// Fetch complete current and daily forecast weather
export async function fetchWeatherDetails(city: CityInfo): Promise<{ current: WeatherData; daily: ForecastDay[] }> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,is_day,weather_code,wind_speed_10m,pressure_msl,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&timezone=auto`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch weather data for ${city.name}`);
  }

  const data = await response.json();
  const curr = data.current;
  const days = data.daily;

  const current: WeatherData = {
    temp: curr.temperature_2m ?? 20,
    apparentTemp: curr.apparent_temperature ?? 20,
    humidity: curr.relative_humidity_2m ?? 50,
    windSpeed: curr.wind_speed_10m ?? 10,
    precipitation: curr.precipitation ?? 0,
    weatherCode: curr.weather_code ?? 0,
    weatherDesc: getWeatherCondition(curr.weather_code ?? 0).desc,
    isDay: curr.is_day === 1,
    rainProbability: days.precipitation_probability_max?.[0] ?? 0,
    pressure: Math.round(curr.pressure_msl ?? 1013),
    windDirection: curr.wind_direction_10m ?? 0,
  };

  const daily: ForecastDay[] = [];
  if (days && days.time) {
    for (let i = 0; i < days.time.length; i++) {
      daily.push({
        date: days.time[i],
        tempMax: days.temperature_2m_max[i] ?? 25,
        tempMin: days.temperature_2m_min[i] ?? 15,
        weatherCode: days.weather_code[i] ?? 0,
        weatherDesc: getWeatherCondition(days.weather_code[i] ?? 0).desc,
        rainProbability: days.precipitation_probability_max[i] ?? 0,
      });
    }
  }

  return { current, daily };
}
