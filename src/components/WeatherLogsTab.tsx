import { useState } from 'react';
import { WeatherLog } from '../types';
import { Archive, Trash2, Calendar, MessageSquare, MapPin, Search } from 'lucide-react';

interface WeatherLogsTabProps {
  logs: WeatherLog[];
  deleteLog: (id: string) => void;
}

export default function WeatherLogsTab({ logs, deleteLog }: WeatherLogsTabProps) {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredLogs = logs.filter(log => 
    log.cityName.toLowerCase().includes(filterQuery.toLowerCase()) || 
    log.note.toLowerCase().includes(filterQuery.toLowerCase()) ||
    log.weatherDesc.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8 lg:px-12 bg-white dark:bg-[#1e1e1e] text-neutral-800 dark:text-neutral-200 transition-colors duration-300">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header section in Chirpy style */}
        <header className="border-b border-dashed border-neutral-200 dark:border-neutral-800 pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-orange-500 font-mono tracking-wider">Meteorology Chronicle</span>
            <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white mt-1">Station Logs & Indexes</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-450 mt-1.5 font-mono">
              Archived historical atmospheric captures
            </p>
          </div>
          
          {/* Micro Search widget in right top */}
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              id="logs-search"
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter archives..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#222325] text-neutral-800 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-orange-500 text-xs font-mono"
            />
          </div>
        </header>

        {filteredLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl bg-neutral-50/20 dark:bg-[#222325]/10">
            <Archive className="w-10 h-10 text-neutral-300 dark:text-neutral-700 stroke-1" />
            <h3 className="font-bold text-neutral-700 dark:text-neutral-300 mt-4">Archive Empty</h3>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-2 max-w-sm">
              Use the 'Log Snapshot' capability inside today's forecasts to capture meteorological readings.
            </p>
          </div>
        ) : (
          <div className="relative border-l border-neutral-200 dark:border-neutral-800 pl-4 sm:pl-6 space-y-8 py-2">
            {filteredLogs.map((log) => (
              <div key={log.id} id={`log-item-${log.id}`} className="relative group">
                
                {/* Timeline Circle Node */}
                <div className="absolute -left-[21px] sm:-left-[29px] top-1.5 w-3.5 h-3.5 rounded-full bg-neutral-200 dark:bg-neutral-800 border-2 border-white dark:border-[#1e1e1e] group-hover:bg-orange-500 transitionduration-300"></div>

                {/* Log card */}
                <div className="border border-neutral-250 dark:border-neutral-800 p-5 rounded-2xl bg-neutral-50/30 dark:bg-[#222325]/10 hover:border-neutral-350 dark:hover:border-neutral-700 transition duration-200">
                  
                  {/* Inner row containing header and details */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      {/* DateTime Stamp - Post meta style */}
                      <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 dark:text-neutral-500">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(log.timestamp).toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      
                      <h4 className="text-md font-extrabold text-neutral-950 dark:text-white mt-1.5 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                        {log.cityName}, <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono italic">{log.country}</span>
                      </h4>
                    </div>

                    {/* Delete trigger */}
                    <button
                      id={`delete-log-${log.id}`}
                      onClick={() => deleteLog(log.id)}
                      className="p-1 px-2 rounded-lg hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30 text-neutral-400 dark:text-neutral-500 transition duration-200"
                      title="Decommission archive node"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Temperature metrics line */}
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono py-2 border-y border-dashed border-neutral-200 dark:border-neutral-800">
                    <span className="font-bold text-neutral-800 dark:text-neutral-200">{Math.round(log.temp)}°C</span>
                    <span className="text-neutral-300 dark:text-neutral-700">|</span>
                    <span className="capitalize">{log.weatherDesc}</span>
                    <span className="text-neutral-300 dark:text-neutral-700">|</span>
                    <span>Humidity: {log.humidity}%</span>
                    <span className="text-neutral-300 dark:text-neutral-700">|</span>
                    <span>Wind: {log.windSpeed} km/h</span>
                  </div>

                  {/* Notebook Note block */}
                  <div className="mt-3.5 flex gap-2 items-start text-xs text-neutral-600 dark:text-neutral-400 italic">
                    <MessageSquare className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">"{log.note}"</p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
