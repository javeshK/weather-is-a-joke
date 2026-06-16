import { useState, useEffect } from 'react';
import { CityInfo, WeatherData, ForecastDay, WeatherLog } from './types';
import { fetchWeatherDetails } from './services/weatherService';
import Sidebar from './components/Sidebar';
import WeatherDashboard from './components/WeatherDashboard';
import TrendingCities from './components/TrendingCities';
import WeeklyForecastTab from './components/WeeklyForecastTab';
import WeatherLogsTab from './components/WeatherLogsTab';
import AboutTab from './components/AboutTab';

// Chandigarh coordinates (matching user's preferred native station)
const DEFAULT_CITY: CityInfo = {
  name: "Chandigarh",
  country: "India",
  latitude: 30.7333,
  longitude: 76.7794,
  state: "Punjab/Haryana",
  timezone: "Asia/Kolkata"
};

// Default historical mock logs to avoid empty pages initially
const PRE_POPULATED_LOGS: WeatherLog[] = [
  {
    id: "hist-node-1",
    timestamp: new Date(Date.now() - 24 * 3600000).toISOString(), // 1 day ago
    cityName: "Chandigarh",
    country: "India",
    temp: 24,
    weatherDesc: "Partly Cloudy",
    humidity: 62,
    windSpeed: 10,
    note: "Sensors report perfect celestial visibility. Calm and mild atmospheric pressure."
  },
  {
    id: "hist-node-2",
    timestamp: new Date(Date.now() - 48 * 3600000).toISOString(), // 2 days ago
    cityName: "Oslo",
    country: "Norway",
    temp: 14,
    weatherDesc: "Light Drizzle",
    humidity: 88,
    windSpeed: 18,
    note: "Light jacket required. Commencing routine barometer diagnostics."
  }
];

export default function App() {
  const [activeCity, setActiveCity] = useState<CityInfo>(DEFAULT_CITY);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<string>('today');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Read local preference or default to dark
    const stored = localStorage.getItem('endurance-theme');
    if (stored) return stored === 'dark';
    return true; // default dark mode for cosmic/chirpy feel
  });

  // State for user-logged snapshots
  const [logs, setLogs] = useState<WeatherLog[]>(() => {
    const saved = localStorage.getItem('meteorological-logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return PRE_POPULATED_LOGS;
      }
    }
    return PRE_POPULATED_LOGS;
  });

  // Apply dark mode theme class to document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('endurance-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('endurance-theme', 'light');
    }
  }, [darkMode]);

  // Synchronize logs to localstorage
  useEffect(() => {
    localStorage.setItem('meteorological-logs', JSON.stringify(logs));
  }, [logs]);

  // Load weather when activeCity updates
  useEffect(() => {
    let active = true;
    const loadWeather = async () => {
      setLoading(true);
      try {
        const details = await fetchWeatherDetails(activeCity);
        if (active) {
          setWeather(details.current);
          setForecast(details.daily);
        }
      } catch (err) {
        console.error("Error aligning weather signals:", err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadWeather();
    return () => {
      active = false;
    };
  }, [activeCity]);

  // Handler to delete a log snapshot
  const deleteLog = (id: string) => {
    setLogs(prev => prev.filter(l => l.id !== id));
  };

  // Handler to create a new log snapshot
  const saveLogEntry = (note: string) => {
    if (!weather) return;
    const newLog: WeatherLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      cityName: activeCity.name,
      country: activeCity.country,
      temp: weather.temp,
      weatherDesc: weather.weatherDesc,
      humidity: weather.humidity,
      windSpeed: weather.windSpeed,
      note
    };
    setLogs(prev => [newLog, ...prev]);
  };

  return (
    <div id="app-root-container" className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-[#1b1c1e] text-neutral-800 dark:text-neutral-200 transition-colors duration-300 antialiased font-sans">
      
      {/* 1. Left Sidebar Navigation */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        savedLogsCount={logs.length}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* 2. Main content router */}
      <main className="flex-1 flex flex-col lg:flex-row min-w-0">
        {currentTab === 'today' && (
          <WeatherDashboard 
            activeCity={activeCity}
            setActiveCity={setActiveCity}
            weather={weather}
            forecast={forecast}
            loading={loading}
            saveLogEntry={saveLogEntry}
          />
        )}

        {currentTab === 'forecast' && (
          <WeeklyForecastTab 
            forecast={forecast}
            cityName={activeCity.name}
          />
        )}

        {currentTab === 'logs' && (
          <WeatherLogsTab 
            logs={logs}
            deleteLog={deleteLog}
          />
        )}

        {currentTab === 'about' && (
          <AboutTab />
        )}

        {/* 3. Right Sidebar - Trending / Quick City panel */}
        <TrendingCities 
          activeCity={activeCity} 
          setActiveCity={setActiveCity}
          weather={weather}
        />
      </main>

    </div>
  );
}
