import { CityInfo, WeatherData } from '../types';
import { MapPin, Info, ArrowUpRight, ShieldAlert, Sparkles } from 'lucide-react';

interface TrendingCitiesProps {
  activeCity: CityInfo;
  setActiveCity: (city: CityInfo) => void;
  weather: WeatherData | null;
}

const PRESET_CITIES: CityInfo[] = [
  { name: "Chandigarh", country: "India", latitude: 30.7333, longitude: 76.7794, state: "Punjab/Haryana", timezone: "Asia/Kolkata" },
  { name: "Oslo", country: "Norway", latitude: 59.9139, longitude: 10.7522, state: "Oslo", timezone: "Europe/Oslo" },
  { name: "Svalbard", country: "Svalbard and Jan Mayen", latitude: 78.2232, longitude: 15.6469, state: "Longyearbyen", timezone: "Europe/Oslo" },
  { name: "New York", country: "United States", latitude: 40.7128, longitude: -74.0060, state: "New York", timezone: "America/New-York" },
  { name: "Tokyo", country: "Japan", latitude: 35.6762, longitude: 139.6503, state: "Tokyo", timezone: "Asia/Tokyo" },
  { name: "Sydney", country: "Australia", latitude: -33.8688, longitude: 151.2093, state: "New South Wales", timezone: "Australia/Sydney" }
];

export default function TrendingCities({ activeCity, setActiveCity, weather }: TrendingCitiesProps) {
  
  // Dynamically generate fun, humanized, and witty guidelines based on local weather parameters
  const getVibeCheck = (): { title: string; desc: string; type: 'info' | 'alert' | 'success' } => {
    if (!weather) return { title: "Station Warmup", desc: "Coaxing the thermal wires. Give us a brief second to tune the weather dials.", type: "info" };
    
    if (weather.precipitation > 2) {
      return { 
        title: "Sky Leak Alert", 
        desc: "Clouds are doing a heavy rinse of the streets. Pop open that canopy umbrella or prepare to explain to your colleagues why you look like a pool toy.",
        type: "alert" 
      };
    }
    if (weather.temp > 32) {
      return { 
        title: "Human Crème Brûlée Warning", 
        desc: "It is basically a convection oven. Drink your entire weight in ice water and stay under the shade before you evaporate.",
        type: "alert" 
      };
    }
    if (weather.temp < 10) {
      return { 
        title: "Thermal Armor Required", 
        desc: "Outer layers mandatory! Dress like a fluffy, oversized marshmallow, or at least prepare your dramatic cold-weather sighs.",
        type: "info" 
      };
    }
    if (weather.windSpeed > 30) {
      return { 
        title: "Toupee and Umbrella Threat", 
        desc: "Heavy gusts are rushing! Secure your hats, umbrellas, and any light pets. Gravity is having a windy field day.",
        type: "alert" 
      };
    }
    return { 
      title: "Perfect Human Weather", 
      desc: "Perfect air balance achieved! Staying inside today counts as a minor moral offense. Touch some grass or stroll with friends.",
      type: "success" 
    };
  };

  const advisory = getVibeCheck();

  return (
    <aside id="trending-cities-panel" className="hidden xl:flex w-80 shrink-0 flex-col gap-8 p-8 border-l border-neutral-200 dark:border-neutral-800 bg-neutral-50/20 dark:bg-[#1b1c1e]/40 text-neutral-800 dark:text-neutral-200 transition-colors duration-300">
      
      {/* Predefined Quick locations (representing Trending Tags in Chirpy) */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-mono mb-4 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          Active Stations
        </h3>
        <ul className="space-y-2">
          {PRESET_CITIES.map((city) => {
            const isSelected = activeCity.name.toLowerCase() === city.name.toLowerCase();
            return (
              <li key={city.name}>
                <button
                  id={`preset-city-${city.name.toLowerCase()}`}
                  onClick={() => setActiveCity(city)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm transition font-mono ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/10 text-orange-600 dark:text-orange-400 font-semibold'
                      : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-[#222325]'
                  }`}
                >
                  <span className="truncate">{city.name}</span>
                  <div className="flex items-center gap-1.5 shrink-0 text-xs">
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500">{city.country === "United States" ? "USA" : city.country}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Advisory System (representing Chirpy Toc / Recommended Section) */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-550 font-mono mb-4 flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5" />
          Weather Vibe Check
        </h3>
        <div className={`p-4 rounded-xl border leading-relaxed ${
          advisory.type === 'alert'
            ? 'border-orange-200 dark:border-orange-950/40 bg-orange-50/20 dark:bg-orange-950/5'
            : advisory.type === 'success'
            ? 'border-emerald-200 dark:border-emerald-950/40 bg-emerald-50/20 dark:bg-emerald-950/5'
            : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#222325]/40'
        }`}>
          <h4 className={`text-xs font-bold font-mono uppercase tracking-wide flex items-center gap-1.5 ${
            advisory.type === 'alert' ? 'text-orange-600 dark:text-orange-400' :
            advisory.type === 'success' ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-800 dark:text-white'
          }`}>
            <Sparkles className="w-3.5 h-3.5 shrink-0 animate-pulse" />
            {advisory.title}
          </h4>
          <p className="text-xs text-neutral-500 dark:text-neutral-450 mt-2">
            {advisory.desc}
          </p>
        </div>
      </div>

      {/* Meteorological Station Coordinate Metadata (Chirpy widgets) */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 mt-auto">
        <div className="flex items-center gap-2.5 text-neutral-400 dark:text-neutral-550">
          <Info className="w-3.5 h-3.5 grayscale" />
          <span className="text-[10px] font-mono uppercase tracking-wider">Station Details</span>
        </div>
        <div className="mt-3.5 space-y-2 text-[10px] font-mono text-neutral-500 dark:text-neutral-500">
          <div className="flex justify-between">
            <span>Latitude:</span>
            <span>{activeCity.latitude.toFixed(4)}°N</span>
          </div>
          <div className="flex justify-between">
            <span>Longitude:</span>
            <span>{activeCity.longitude.toFixed(4)}°E</span>
          </div>
          <div className="flex justify-between">
            <span>Local Time:</span>
            <span>
              {new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}
            </span>
          </div>
        </div>
      </div>

    </aside>
  );
}
