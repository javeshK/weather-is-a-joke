import { ForecastDay } from '../types';
import { getWeatherCondition } from '../services/weatherService';
import WeatherIcon, { Calendar, Umbrella, Thermometer, Wind } from './WeatherIcon';

interface WeeklyForecastTabProps {
  forecast: ForecastDay[];
  cityName: string;
}

export default function WeeklyForecastTab({ forecast, cityName }: WeeklyForecastTabProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8 lg:px-12 bg-white dark:bg-[#1e1e1e] text-neutral-800 dark:text-neutral-200 transition-colors duration-300">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Page Header in Chirpy Archive style */}
        <header className="border-b border-dashed border-neutral-200 dark:border-neutral-800 pb-5">
          <span className="text-[10px] uppercase font-bold text-orange-500 font-mono tracking-wider">Met-Station Report</span>
          <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white mt-1">7-Day Meteorological Horizon</h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-450 mt-1.5 font-mono">
            Tropospheric predictive models aligned for {cityName}
          </p>
        </header>

        {/* Detailed Week Horizon Grid */}
        <div className="space-y-4">
          {forecast.map((day, index) => {
            const config = getWeatherCondition(day.weatherCode);
            const dateObj = new Date(day.date);
            const formattedDay = dateObj.toLocaleDateString(undefined, { weekday: 'long' });
            const formattedDate = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
            const isToday = index === 0;

            return (
              <div 
                key={day.date}
                id={`forecast-day-${index}`}
                className={`border rounded-2xl p-5 bg-neutral-50/50 dark:bg-[#222325]/20 flex flex-col md:flex-row md:items-center justify-between gap-4 transition hover:shadow-sm ${
                  isToday ? 'border-orange-500/50 ring-1 ring-orange-500/10' : 'border-neutral-200 dark:border-neutral-800'
                }`}
              >
                {/* Date & Condition description */}
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#222325] border border-neutral-200 dark:border-neutral-800 text-orange-500">
                    {/* Render icon based on name inside service config */}
                    <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      {config.icon === 'Sun' && <circle cx="12" cy="12" r="5" stroke="currentColor"/>}
                      {config.icon === 'Sun' && <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor"/>}
                      {config.icon !== 'Sun' && <path d="M18 10a5 5 0 0 0-9.5-2.08 4 4 0 0 0-4.5 3.93 4.5 4.5 0 0 0 5 4.5h9a4.5 4.5 0 0 0 0-9z" stroke="currentColor"/>}
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-neutral-900 dark:text-white">{formattedDay}</h4>
                      {isToday && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400 rounded-sm font-semibold uppercase">
                          Today
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">{formattedDate}</p>
                    <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mt-1 capitalize">{config.desc}</p>
                  </div>
                </div>

                {/* Range stats and precipitation tags */}
                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-neutral-100 dark:border-neutral-850 pt-3 md:pt-0">
                  {day.rainProbability > 0 && (
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500 font-mono">
                      <Umbrella className="w-3.5 h-3.5 text-cyan-500" />
                      <span>{day.rainProbability}% Probability</span>
                    </div>
                  )}

                  <div className="text-right">
                    <p className="text-xs text-neutral-400 dark:text-neutral-505 font-mono">Target Temperatures</p>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-lg font-bold text-neutral-900 dark:text-white font-mono">{Math.round(day.tempMax)}°C</span>
                      <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">max</span>
                      <span className="text-neutral-300 dark:text-neutral-700">/</span>
                      <span className="text-md font-bold text-neutral-500 dark:text-neutral-400 font-mono">{Math.round(day.tempMin)}°C</span>
                      <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">min</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Data API Attribution Footer */}
        <footer id="forecast-attribution-footer" className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-center sm:text-left">
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
    </div>
  );
}
