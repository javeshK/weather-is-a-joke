export interface CityInfo {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  state?: string;
  timezone?: string;
}

export interface WeatherData {
  temp: number;
  apparentTemp: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  weatherCode: number;
  weatherDesc: string;
  isDay: boolean;
  rainProbability: number;
  uvIndex?: number;
  pressure?: number;
  windDirection?: number;
}

export interface ForecastDay {
  date: string;
  tempMax: number;
  tempMin: number;
  weatherCode: number;
  weatherDesc: string;
  rainProbability: number;
}

export interface WeatherLog {
  id: string;
  timestamp: string;
  cityName: string;
  country: string;
  temp: number;
  weatherDesc: string;
  humidity: number;
  windSpeed: number;
  note: string;
}
