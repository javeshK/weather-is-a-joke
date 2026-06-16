import React, { useState, useEffect, useRef } from 'react';
import { CityInfo, WeatherData, ForecastDay } from '../types';
import { searchCities, getWeatherCondition } from '../services/weatherService';
import WeatherIcon, {
  Search,
  MapPin,
  Calendar,
  Wind,
  Droplets,
  Gauge,
  Thermometer,
  Compass,
  Umbrella,
  ChevronRight,
  Info
} from './WeatherIcon';
import { motion, AnimatePresence } from 'motion/react';

// Dynamic city-specific cultural themes with hand-drawn vector SVGs and narrative details
export interface CulturalTheme {
  bannerGradient: string;
  badgeBg: string;
  badgeTextColor: string;
  accentColor: string;
  narrative: string;
  landmarks: string[];
  illustration: React.ReactNode;
}

export const getCityCultureTheme = (cityName: string): CulturalTheme => {
  const name = cityName.toLowerCase();
  
  if (name.includes('chandigarh')) {
    return {
      bannerGradient: 'from-orange-500/10 via-amber-500/5 to-rose-500/10 dark:from-orange-950/25 dark:via-amber-950/10 dark:to-rose-950/25',
      badgeBg: 'bg-orange-100 dark:bg-orange-955/50',
      badgeTextColor: 'text-orange-700 dark:text-orange-300',
      accentColor: 'text-orange-600 dark:text-orange-400',
      narrative: 'Le Corbusier’s brutalist concrete grid, Nek Chand’s fantasy rock sculpture garden & warm Punjabi-Haryanvi hospitality.',
      landmarks: ['Rock Garden', 'Open Hand Monument', 'Rose Garden'],
      illustration: (
        <svg className="w-full h-full opacity-80 dark:opacity-90 max-w-[150px] max-h-[130px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Marigold Sun */}
          <circle cx="50" cy="40" r="18" fill="rgba(249, 115, 22, 0.2)" />
          <circle cx="50" cy="40" r="14" fill="rgba(245, 158, 11, 0.2)" />
          {/* Concrete Platform */}
          <rect x="25" y="70" width="50" height="6" rx="1.5" className="fill-neutral-400 dark:fill-neutral-600" />
          <path d="M40 70 L42 62 L58 62 L60 70 Z" className="fill-neutral-550 dark:fill-neutral-500" />
          {/* Open Hand Monument Symbol */}
          <path d="M43 62 L43 51 C43 51 38 52 37 47 C36 42 41 40 43 42 L43 35 L46 35 L46 25 L49 25 L49 33 L52 31 L54 36 L57 32 L59 38 C59 38 64 36 62 44 C61 50 56 51 53 52 L53 62 Z" className="fill-orange-500 dark:fill-orange-400" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
          {/* Abstract Marigold Petals */}
          <circle cx="20" cy="65" r="3" className="fill-amber-500/50" />
          <circle cx="78" cy="58" r="2.5" className="fill-rose-500/50" />
        </svg>
      )
    };
  }
  
  if (name.includes('tokyo')) {
    return {
      bannerGradient: 'from-rose-500/10 via-fuchsia-500/5 to-indigo-500/10 dark:from-rose-950/25 dark:via-fuchsia-950/10 dark:to-indigo-950/25',
      badgeBg: 'bg-rose-100 dark:bg-rose-955/50',
      badgeTextColor: 'text-rose-700 dark:text-rose-300',
      accentColor: 'text-rose-600 dark:text-rose-400',
      narrative: 'A neon-glowing futuristic skyline meeting Meguro river sakura petals, cedar shrines, and fresh Tokyo ramen.',
      landmarks: ['Shibuya Crossing', 'Meiji Torii Gate', 'Mount Fuji'],
      illustration: (
        <svg className="w-full h-full opacity-80 dark:opacity-90 max-w-[150px] max-h-[130px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Crimson Sun Backdrop */}
          <circle cx="50" cy="45" r="20" fill="rgba(244, 63, 94, 0.2)" />
          {/* Mt Fuji Silhouette */}
          <path d="M20 75 L42 42 L58 42 L80 75 Z" className="fill-neutral-300 dark:fill-neutral-700" />
          <path d="M42 42 L46 48 L50 44 L54 48 L58 42 L55 38 L45 38 Z" fill="white" />
          {/* Traditional Torii Gate */}
          <rect x="35" y="70" width="30" height="4" className="fill-red-500" />
          <rect x="41" y="55" width="4" height="15" className="fill-red-600" />
          <rect x="55" y="55" width="4" height="15" className="fill-red-600" />
          <rect x="37" y="52" width="26" height="4" className="fill-red-700" />
          <path d="M33 46 Q50 51 67 46 L67 50 Q50 54 33 50 Z" className="fill-red-800" />
          {/* Sakura Petals */}
          <path d="M15 30 Q17 31 16 33 Q14 32 15 30 Z" className="fill-rose-300/80" />
          <path d="M78 28 Q80 29 79 31 Q77 30 78 28 Z" className="fill-rose-300/80" />
          <path d="M85 45 Q87 47 85 49 Q83 48 85 45 Z" className="fill-rose-300/60" />
        </svg>
      )
    };
  }

  if (name.includes('oslo')) {
    return {
      bannerGradient: 'from-emerald-500/10 via-teal-500/5 to-cyan-500/10 dark:from-emerald-950/25 dark:via-teal-950/10 dark:to-cyan-950/25',
      badgeBg: 'bg-emerald-100 dark:bg-emerald-955/50',
      badgeTextColor: 'text-emerald-700 dark:text-emerald-300',
      accentColor: 'text-emerald-600 dark:text-emerald-400',
      narrative: 'Deep blue fjords and wooden ship builders meet active Nordic ski peaks and the calming wisdom of nature.',
      landmarks: ['Fjord Walkways', 'Fram Ship', 'Vigeland Park'],
      illustration: (
        <svg className="w-full h-full opacity-80 dark:opacity-90 max-w-[150px] max-h-[130px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Fjord Mountains */}
          <path d="M10 70 L35 45 L60 70 Z" className="fill-neutral-400/40 dark:fill-neutral-700/40" />
          <path d="M45 70 L70 38 L95 70 Z" className="fill-neutral-450/40 dark:fill-neutral-650/40" />
          {/* Fir Trees */}
          <polygon points="20,70 15,62 25,62" className="fill-emerald-800 dark:fill-emerald-900" />
          <polygon points="20,64 17,58 23,58" className="fill-emerald-700 dark:fill-emerald-800" />
          <polygon points="82,70 78,63 86,63" className="fill-emerald-800 dark:fill-emerald-900" />
          {/* Viking Longship */}
          <path d="M30 66 Q50 78 70 66 Q74 60 78 57 L72 61 Q50 68 28 61 L22 57 Q26 60 30 66 Z" className="fill-amber-800 dark:fill-amber-950" />
          {/* Ship Mast */}
          <line x1="50" y1="67" x2="50" y2="45" stroke="#78350f" strokeWidth="2" />
          {/* Ship Sail */}
          <path d="M40 47 Q50 44 60 47 L58 60 Q50 58 42 60 Z" className="fill-rose-600" />
          <path d="M44 47 Q50 44 56 47 L54 60 Q50 58 46 60 Z" fill="white" />
          {/* Rhythmic Sea waves */}
          <path d="M15 74 Q30 71 45 74 Q60 77 75 74 Q90 71 100 74" stroke="currentColor" className="text-cyan-500/60" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    };
  }

  if (name.includes('svalbard')) {
    return {
      bannerGradient: 'from-sky-500/10 via-blue-500/5 to-violet-500/10 dark:from-sky-955/25 dark:via-blue-955/10 dark:to-violet-955/25',
      badgeBg: 'bg-sky-100 dark:bg-sky-955/50',
      badgeTextColor: 'text-sky-700 dark:text-sky-300',
      accentColor: 'text-sky-600 dark:text-sky-400',
      narrative: 'High arctic wildlife of icecaps, glaciers, the warm comfort of northern lights & a proud free-roaming polar bear state.',
      landmarks: ['Global Seed Vault', 'Plancius Bay', 'Tempelfjorden'],
      illustration: (
        <svg className="w-full h-full opacity-80 dark:opacity-90 max-w-[150px] max-h-[130px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Northern Lights (Aurora gradients) */}
          <path d="M15 45 Q35 25 55 45 Q75 65 95 45" stroke="url(#aurora-grad-1)" strokeWidth="6" strokeLinecap="round" className="opacity-60" />
          <path d="M10 55 Q35 32 60 55 Q85 78 95 60" stroke="url(#aurora-grad-2)" strokeWidth="4" strokeLinecap="round" className="opacity-40" />
          
          <defs>
            <linearGradient id="aurora-grad-1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="aurora-grad-2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Glacier Peaks */}
          <path d="M5 75 L30 50 L50 75 Z" className="fill-sky-100/50 dark:fill-sky-950/40" />
          <path d="M40 75 L65 44 L85 75 Z" className="fill-sky-200/50 dark:fill-sky-900/40" />

          {/* Polar Bear Silhouette */}
          <path d="M60 72 C60 70 62 67 65 67 C68 67 69 69 71 67 C73 65 74 61 77 61 C79 61 80 62 82 63 C83 63 84 61 85 62 L87 64 C87 65 86 66 85 66 C85 67 86 68 85 69 L82 72 L80 72 L81 75 L78 75 L78 71 L75 71 L75 75 L72 75 L73 70 L64 70 L63 75 L60 75 Z" className="fill-slate-100 dark:fill-neutral-300 pointer-events-none" />
        </svg>
      )
    };
  }

  if (name.includes('new york')) {
    return {
      bannerGradient: 'from-amber-500/10 via-amber-400/5 to-slate-500/10 dark:from-amber-955/25 dark:via-amber-800/10 dark:to-slate-955/25',
      badgeBg: 'bg-amber-100 dark:bg-amber-955/50',
      badgeTextColor: 'text-amber-700 dark:text-amber-300',
      accentColor: 'text-amber-600 dark:text-amber-400',
      narrative: 'A high-speed rhythm of theatrical broadway lights, yellow taxicabs, historical brick cafes & the green pathways of Central Park.',
      landmarks: ['Statue of Liberty', 'Times Square', 'Central Park'],
      illustration: (
        <svg className="w-full h-full opacity-80 dark:opacity-90 max-w-[150px] max-h-[130px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Skyscrapers silhouettes */}
          <rect x="20" y="35" width="10" height="40" className="fill-neutral-300 dark:fill-neutral-750" />
          <rect x="32" y="22" width="14" height="53" className="fill-neutral-350 dark:fill-neutral-700" />
          <rect x="42" y="45" width="8" height="30" className="fill-neutral-300 dark:fill-neutral-750" />
          <rect x="52" y="30" width="12" height="45" className="fill-neutral-350 dark:fill-neutral-700" />
          
          {/* NYC Yellow Cab */}
          <path d="M60 74 C58 74 57 74 56 73 L56 71 C56 69 58 68 60 68 L74 68 C76 68 78 69 78 71 L78 73 C77 74 76 74 74 74 Z" className="fill-amber-400 dark:fill-amber-500" />
          {/* Cab Cabin */}
          <path d="M63 68 L65 64 L71 64 L73 68 Z" className="fill-neutral-800" />
          {/* Cab Wheels */}
          <circle cx="61.5" cy="74.5" r="2.5" className="fill-neutral-900" />
          <circle cx="72.5" cy="74.5" r="2.5" className="fill-neutral-900" />
          
          {/* Torch outline for Liberty */}
          <path d="M12 75 L12 55 L16 55 L17 50 L11 50 L12 45 Q14 42 16 45 L15 52 L15 75 Z" className="fill-neutral-400 dark:fill-neutral-600" />
          <circle cx="16" cy="42" r="3.5" className="fill-amber-500" />
        </svg>
      )
    };
  }

  if (name.includes('sydney')) {
    return {
      bannerGradient: 'from-blue-500/10 via-yellow-500/5 to-orange-500/10 dark:from-blue-955/25 dark:via-yellow-955/10 dark:to-orange-955/25',
      badgeBg: 'bg-cyan-100 dark:bg-cyan-955/50',
      badgeTextColor: 'text-cyan-700 dark:text-cyan-300',
      accentColor: 'text-cyan-600 dark:text-cyan-400',
      narrative: 'Dazzling blue Pacific surf tides meeting golden sandy coastlines, koala reserves, and iconic white sail architectures.',
      landmarks: ['Opera House Sails', 'Bondi Surf Zone', 'Harbour Bridge'],
      illustration: (
        <svg className="w-full h-full opacity-80 dark:opacity-90 max-w-[150px] max-h-[130px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Golden Sun rays */}
          <circle cx="80" cy="30" r="12" fill="rgba(251, 191, 36, 0.2)" />
          <line x1="80" y1="12" x2="80" y2="18" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" className="opacity-60" />
          <line x1="62" y1="30" x2="68" y2="30" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" className="opacity-60" />
          <line x1="67" y1="17" x2="72" y2="22" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" className="opacity-60" />

          {/* Opera sails (geometric white curves on top) */}
          <path d="M22 70 Q32 35 48 70 Z" className="fill-neutral-100 dark:fill-neutral-250" stroke="currentColor" strokeWidth="0.5" />
          <path d="M34 70 Q45 42 58 70 Z" className="fill-neutral-50 dark:fill-neutral-200" stroke="currentColor" strokeWidth="0.5" />
          <path d="M46 70 Q55 50 66 70 Z" className="fill-white" stroke="currentColor" strokeWidth="0.5" />

          {/* Ocean Waves */}
          <path d="M5 72 C12 69 18 75 25 72 C32 69 38 75 45 72 C52 69 58 75 65 72 C72 69 78 75 85 71 C92 67 100 73 100 73 L100 80 L0 80 Z" className="fill-cyan-500/25 dark:fill-cyan-900/15" />
          <path d="M0 76 Q15 72 30 76 Q45 80 60 76 Q75 72 90 76" stroke="currentColor" className="text-cyan-600/55" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    };
  }

  // Universal Fallback theme:
  return {
    bannerGradient: 'from-neutral-500/10 via-indigo-500/5 to-neutral-600/10 dark:from-neutral-955/25 dark:via-indigo-955/10 dark:to-neutral-905/25',
    badgeBg: 'bg-neutral-100 dark:bg-neutral-805/50',
    badgeTextColor: 'text-neutral-700 dark:text-neutral-300',
    accentColor: 'text-orange-600 dark:text-orange-400',
    narrative: 'Exploring universal climate environments. Connecting global weather parameters to our communal atmosphere.',
    landmarks: ['Science Nodes', 'Weather Grid', 'Atmosphere'],
    illustration: (
      <svg className="w-full h-full opacity-80 dark:opacity-90 max-w-[150px] max-h-[130px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Orbital Rings */}
        <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-orange-500/35 dark:text-orange-500/20" />
        <ellipse cx="50" cy="50" rx="35" ry="12" stroke="currentColor" strokeWidth="1.5" className="text-indigo-400/40 dark:text-indigo-500/25" transform="rotate(-15 50 50)" />
        <ellipse cx="50" cy="50" rx="12" ry="32" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400/45" transform="rotate(30 50 50)" />
        {/* Glowing Core */}
        <circle cx="50" cy="50" r="8" className="fill-orange-500/25 dark:fill-orange-500/15" />
        <circle cx="50" cy="50" r="4" className="fill-orange-500" />
        
        {/* Stars */}
        <circle cx="20" cy="20" r="0.7" fill="white" className="animate-pulse" />
        <circle cx="85" cy="25" r="1" fill="white" />
        <circle cx="75" cy="80" r="0.8" fill="white" className="animate-pulse" />
      </svg>
    )
  };
};

interface WeatherDashboardProps {
  activeCity: CityInfo;
  setActiveCity: (city: CityInfo) => void;
  weather: WeatherData | null;
  forecast: ForecastDay[];
  loading: boolean;
  saveLogEntry: (note: string) => void;
}

export default function WeatherDashboard({
  activeCity,
  setActiveCity,
  weather,
  forecast,
  loading,
  saveLogEntry
}: WeatherDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CityInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [showLogForm, setShowLogForm] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const cultureTheme = getCityCultureTheme(activeCity.name);

  // Handle outside click to close search dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchResults([]);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Search Input Change
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim().length >= 2) {
      setIsSearching(true);
      const results = await searchCities(value);
      setSearchResults(results);
      setIsSearching(false);
    } else {
      setSearchResults([]);
    }
  };

  const selectCity = (city: CityInfo) => {
    setActiveCity(city);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleCreateLog = (e: React.FormEvent) => {
    e.preventDefault();
    saveLogEntry(noteText || "Routine weather snapshot.");
    setNoteText('');
    setShowLogForm(false);
  };

  // Jekyll Chirpy weather categories and tags mapping
  const weatherTags = weather ? (
    weather.temp > 28 ? ['#warm', '#summer', '#solar'] :
    weather.temp < 15 ? ['#chilly', '#winter', '#thermal'] :
    ['#mild', '#pleasant', '#temperate']
  ) : ['#climate'];

  const windCardinal = (deg?: number) => {
    if (deg === undefined) return 'N';
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8 lg:px-12 bg-white dark:bg-[#1e1e1e] text-neutral-800 dark:text-neutral-200 transition-colors duration-300">
      
      {/* Top Search Component in Chirpy style */}
      <div ref={searchRef} className="max-w-2xl mx-auto relative mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400 pointer-events-none" />
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search city, coordinates, country..."
            className="w-full pl-11 pr-4 py-3 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#222325] text-neutral-800 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 text-sm transition font-mono"
          />
          {isSearching && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <svg className="animate-spin h-4 w-4 text-orange-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          )}
        </div>

        {/* Search Results Dropdown */}
        <AnimatePresence>
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 mt-2 z-50 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#222325] shadow-lg max-h-64 overflow-y-auto"
            >
              {searchResults.map((city, index) => (
                <button
                  key={`${city.name}-${city.latitude}-${index}`}
                  id={`search-result-${index}`}
                  onClick={() => selectCity(city)}
                  className="w-full text-left px-5 py-3.5 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 border-b border-neutral-100 last:border-b-0 dark:border-neutral-800 flex items-center justify-between text-sm transition"
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <div>
                      <span className="font-semibold text-neutral-900 dark:text-white">{city.name}</span>
                      {city.state && <span className="text-neutral-400 dark:text-neutral-500 text-xs ml-1">({city.state})</span>}
                      <span className="text-neutral-400 dark:text-neutral-500 text-xs ml-1.5 font-mono">{city.country}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
                    {city.latitude.toFixed(2)}°N, {city.longitude.toFixed(2)}°E
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-12 h-12 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-neutral-500 font-mono text-sm">Synchronizing orbital metrics...</p>
        </div>
      ) : weather ? (
        <div className="max-w-2xl mx-auto space-y-8">
               {/* Main Featured Weather Card (Styled like a main blog post with local cultural headers) */}
          <article className={`border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-neutral-50/50 dark:bg-[#222325]/30 overflow-hidden bg-gradient-to-br ${cultureTheme.bannerGradient} transition-all hover:shadow-sm focus-within:ring-2 focus-within:ring-orange-500/50`}>
            
            {/* Culture Banner Card Crown */}
            <div className="relative w-full h-36 sm:h-40 md:h-44 px-6 md:px-8 flex items-center justify-between overflow-hidden border-b border-neutral-200/50 dark:border-neutral-800/50 bg-neutral-100/40 dark:bg-black/10">
              {/* Vibe narrative */}
              <div className="z-10 max-w-[65%] sm:max-w-[70%]">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full ${cultureTheme.badgeBg} ${cultureTheme.badgeTextColor}`}>
                    {activeCity.name} Vibe Zone
                  </span>
                </div>
                <p className="text-xs font-serif italic text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-md line-clamp-3">
                  "{cultureTheme.narrative}"
                </p>
                <div className="hidden sm:flex flex-wrap gap-1.5 mt-2.5">
                  {cultureTheme.landmarks.map(landmark => (
                    <span key={landmark} className="text-[9px] font-mono bg-white/60 dark:bg-black/35 text-neutral-500 dark:text-neutral-400 px-1.5 py-0.5 rounded shadow-xs">
                      🏛️ {landmark}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Right Side Illustration */}
              <div className="absolute right-0 bottom-0 top-0 w-[40%] flex items-center justify-center p-2 select-none pointer-events-none">
                {cultureTheme.illustration}
              </div>
            </div>

            {/* Inner Content Padding */}
            <div className="p-6 md:p-8">
              <header className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-orange-500 dark:text-orange-500 font-bold font-mono">
                    Climate Bulletin
                  </span>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">
                    {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                  How is {activeCity.name} looking today?
                </h2>
                
                {/* Post Metadata Row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-neutral-400 dark:text-neutral-550 mt-3 font-mono border-b border-dashed border-neutral-200 dark:border-neutral-800 pb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" /> {activeCity.country}
                  </span>
                  <span>•</span>
                  <span>Category: Current Weather</span>
                  <span>•</span>
                  <span>Telemetry: Live</span>
                </div>
              </header>

              {/* Main Weather Metric Block */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 flex items-center gap-6">
                  {/* Big Weather Icon */}
                  <div className="p-4 bg-orange-100/50 dark:bg-orange-950/20 rounded-2xl text-orange-600 dark:text-orange-400 select-none">
                    <WeatherIcon name={getWeatherCondition(weather.weatherCode).icon} className="w-16 h-16" />
                  </div>
                  <div>
                    <div className="flex items-start">
                      <span className="text-5xl md:text-6xl font-bold tracking-tighter text-neutral-900 dark:text-white font-mono">
                        {Math.round(weather.temp)}
                      </span>
                      <span className="text-xl font-bold text-neutral-400 dark:text-neutral-550 font-mono">°C</span>
                    </div>
                    <p className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mt-1 capitalize">
                      {weather.weatherDesc}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-5 text-neutral-500 dark:text-neutral-400 text-xs md:text-sm border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-800 pt-4 md:pt-0 md:pl-6 leading-relaxed">
                  <p>
                    Today's maximum humidity of <span className="font-semibold text-neutral-800 dark:text-white">{weather.humidity}%</span> with a registered atmospheric wind velocity reaching <span className="font-semibold text-neutral-800 dark:text-white">{weather.windSpeed} km/h</span>. The surrounding troposphere reports {weather.precipitation > 0 ? `active rainfall of ${weather.precipitation}mm` : 'no active precipitation'}.
                  </p>
                </div>
              </div>

              {/* Tags footer - mimicking Chirpy's tag list */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                <div className="flex flex-wrap gap-2">
                  {weatherTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2.5 py-1 rounded font-mono hover:text-orange-500 transition duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2.5 py-1 rounded font-mono">
                    #WMO-{weather.weatherCode}
                  </span>
                </div>

                {/* Log Entry Action Button */}
                <button
                  id="show-log-form-btn"
                  onClick={() => setShowLogForm(!showLogForm)}
                  className="text-xs font-semibold text-orange-600 dark:text-orange-500 hover:underline flex items-center gap-1 font-mono"
                >
                  Log snapshot <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <AnimatePresence>
                {showLogForm && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleCreateLog}
                    className="mt-6 border-t border-dashed border-neutral-200 dark:border-neutral-800 pt-5 overflow-hidden"
                  >
                    <label htmlFor="log-note" className="block text-xs font-mono font-semibold text-neutral-500 mb-2">
                      Add a journal note about this observation:
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="log-note"
                        type="text"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="e.g., Pleasant breeze, clear autumn sky..."
                        className="flex-1 px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-800 rounded-lg bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:border-orange-500"
                        required
                      />
                      <button
                        id="save-log-btn"
                        type="submit"
                        className="px-4 py-2 text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
                      >
                        Save Log
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div> {/* Closing p-6 md:p-8 content wrapper */}
          </article>

          {/* Metric Sub-cards block */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border border-neutral-200 dark:border-neutral-800 p-4.5 rounded-xl bg-neutral-50/10 dark:bg-[#222325]/10 flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2 text-neutral-400 dark:text-neutral-550">
                <Thermometer className="w-4 h-4" />
                <span className="text-xs font-mono">Apparent</span>
              </div>
              <div>
                <p className="text-lg font-bold font-mono text-neutral-900 dark:text-white">
                  {Math.round(weather.apparentTemp)}°C
                </p>
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">Feels like temperature</p>
              </div>
            </div>

            <div className="border border-neutral-200 dark:border-neutral-800 p-4.5 rounded-xl bg-neutral-50/10 dark:bg-[#222325]/10 flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2 text-neutral-400 dark:text-neutral-550">
                <Droplets className="w-4 h-4" />
                <span className="text-xs font-mono">Humidity</span>
              </div>
              <div>
                <p className="text-lg font-bold font-mono text-neutral-900 dark:text-white">
                  {weather.humidity}%
                </p>
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">Relative humidity</p>
              </div>
            </div>

            <div className="border border-neutral-200 dark:border-neutral-800 p-4.5 rounded-xl bg-neutral-50/10 dark:bg-[#222325]/10 flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2 text-neutral-400 dark:text-neutral-550">
                <Gauge className="w-4 h-4" />
                <span className="text-xs font-mono">Pressure</span>
              </div>
              <div>
                <p className="text-lg font-bold font-mono text-neutral-900 dark:text-white">
                  {weather.pressure} hPa
                </p>
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">Sea level pressure</p>
              </div>
            </div>

            <div className="border border-neutral-200 dark:border-neutral-800 p-4.5 rounded-xl bg-neutral-50/10 dark:bg-[#222325]/10 flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2 text-neutral-400 dark:text-neutral-550">
                <Compass className="w-4 h-4" />
                <span className="text-xs font-mono">Wind</span>
              </div>
              <div>
                <p className="text-lg font-bold font-mono text-neutral-900 dark:text-white">
                  {weather.windSpeed} km/h
                </p>
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono capitalize">
                  Direction: {windCardinal(weather.windDirection)} ({weather.windDirection}°)
                </p>
              </div>
            </div>
          </section>

          {/* Quick Forecast Timeline (The 'Recent Posts' look) */}
          <section className="pt-4">
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3 mb-6">
              <h3 className="text-md font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
                <Calendar className="w-4.5 h-4.5 text-neutral-400" />
                Recent Observations (Weekly Forecast)
              </h3>
            </div>

            <div className="space-y-4">
              {forecast.slice(1, 6).map((day, ix) => {
                const config = getWeatherCondition(day.weatherCode);
                const dayName = new Date(day.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
                return (
                  <div
                    key={day.date}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50/20 dark:bg-[#252628]/10 hover:border-orange-500/40 transition duration-200"
                  >
                    <div className="flex items-center gap-3.5 mb-2 sm:mb-0">
                      <div className="p-2.5 bg-neutral-100 dark:bg-[#222325] text-neutral-600 dark:text-neutral-300 rounded-lg">
                        <WeatherIcon name={config.icon} className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-900 dark:text-white font-mono">{dayName}</h4>
                        <p className="text-xs text-neutral-400 dark:text-neutral-500">{config.desc}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-neutral-100 dark:border-neutral-800/60 pt-2.5 sm:pt-0">
                      {day.rainProbability > 0 && (
                        <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                          <Umbrella className="w-3 h-3 text-cyan-500" />
                          <span>{day.rainProbability}% rain</span>
                        </div>
                      )}
                      <div className="text-sm font-bold font-mono text-neutral-900 dark:text-white">
                        <span className="text-orange-500">{Math.round(day.tempMax)}°</span>
                        <span className="text-neutral-300 dark:text-neutral-600 mx-1.5 font-normal">/</span>
                        <span className="text-neutral-400 dark:text-neutral-500">{Math.round(day.tempMin)}°</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Data API Attribution Footer */}
          <footer id="dashboard-attribution-footer" className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Telemetry Node: Active Station</span>
              </div>
              <div className="text-center sm:text-right leading-relaxed">
                <span>Meteorological metrics retrieved from </span>
                <a 
                  href="https://open-meteo.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-orange-500 dark:text-orange-400 hover:underline font-semibold"
                >
                  Open-Meteo API
                </a>
                <span> (CC-BY 4.0) & Geocoding indexers.</span>
              </div>
            </div>
          </footer>

        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Info className="w-12 h-12 text-neutral-300 dark:text-neutral-700" />
          <p className="mt-4 text-neutral-400 font-mono text-sm">Failed to align telemetry sensors.</p>
        </div>
      )}
    </div>
  );
}
