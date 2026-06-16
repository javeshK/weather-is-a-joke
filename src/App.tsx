import { useState, useEffect, useRef } from 'react';
import { 
  Globe, 
  Wind, 
  Activity, 
  Gauge, 
  Clock, 
  AlertTriangle, 
  Zap, 
  Settings, 
  Sparkles, 
  Thermometer, 
  Droplets,
  CloudRain,
  Volume2,
  VolumeX,
  RefreshCw,
  Info,
  Rocket,
  Compass,
  Sparkle,
  Sliders,
  Terminal,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import nebulaBg from './assets/images/gargantua_nebula_bg_1781618392261.jpg';

interface WeatherData {
  temp: number;
  apparentTemp: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  weatherCode: number;
  weatherDesc: string;
  isDay: boolean;
  rainProbability: number;
  rainForecastText: string;
}

// Sound synthesizer for real space-cadet experience
class InterstellarAudio {
  private ctx: AudioContext | null = null;
  private clickTimer: number | null = null;

  public init() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
  }

  // Synthesize custom sine pitches
  public beep(freq = 600, type: OscillatorType = 'sine', duration = 0.1, gainVal = 0.1) {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay might be blocked in sandbox previews before first interaction
    }
  }

  // Nolan cinematic majestic pipe organ chord
  public triggerPipeOrganChord() {
    this.beep(110.00, 'sawtooth', 2.0, 0.08); // A2 low organ base
    this.beep(164.81, 'triangle', 2.0, 0.08); // E3
    this.beep(220.00, 'sawtooth', 2.5, 0.08); // A3
    this.beep(277.18, 'sine', 2.5, 0.12);     // C#4 major element
    this.beep(329.63, 'sine', 2.8, 0.10);     // E4 celestial
  }

  // Interstellar 1.25s woodblock metronome
  public startTickingClock(callback: () => void) {
    this.init();
    this.stopTickingClock();
    
    // 1.25 second beats match the identical tempo of "Mountains" represent Miller's Planet gravity field dilation
    this.clickTimer = window.setInterval(() => {
      this.beep(1400, 'triangle', 0.012, 0.15); // sharp galactic tick
      callback();
    }, 1250);
  }

  public stopTickingClock() {
    if (this.clickTimer) {
      clearInterval(this.clickTimer);
      this.clickTimer = null;
    }
  }
}

const synth = new InterstellarAudio();

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  
  // Custom Space cadet controls
  const [tarsHumorLevel, setTarsHumorLevel] = useState<number>(75);
  const [tarsMessage, setTarsMessage] = useState<string>("TARS: System standby. Humor set to 75%. Ready to guide Chandigarh observatory.");
  const [tickingActive, setTickingActive] = useState<boolean>(false);
  const [ticksCount, setTicksCount] = useState<number>(0);
  const [millersInputSeconds, setMillersInputSeconds] = useState<string>('45');
  const [timeDilationResult, setTimeDilationResult] = useState<string | null>(null);
  const [isWarpMode, setIsWarpMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeBooks, setActiveBooks] = useState<number[]>([]);

  // Simulated atmospheric factors
  const [simulatedPrecipitation, setSimulatedPrecipitation] = useState<boolean>(false);
  const [simulatedAura, setSimulatedAura] = useState<boolean>(false);

  // Background coordinates for twinkling dust stars
  const [stars] = useState(() => Array.from({ length: 75 }).map(() => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2.2 + 0.8,
    twinkleDelay: Math.random() * 5
  })));

  // Morse bookcase tribute - click books to blink gravitational coordinates and send message to Murph!
  const bookshelfItems = [
    { id: 1, title: "Quantum Physics", color: "bg-emerald-600/60 hover:bg-emerald-500/80" },
    { id: 2, title: "Theory of Relativity", color: "bg-blue-600/60 hover:bg-blue-500/80" },
    { id: 3, title: "Astronomy 101", color: "bg-amber-600/60 hover:bg-amber-500/80" },
    { id: 4, title: "The Dust Storm", color: "bg-red-600/60 hover:bg-red-500/80" },
    { id: 5, title: "Singularity & Time", color: "bg-purple-600/60 hover:bg-purple-500/80" },
    { id: 6, title: "Gravity Anomalies", color: "bg-cyan-600/60 hover:bg-cyan-500/80" },
    { id: 7, title: "Gargantua Horizons", color: "bg-rose-600/60 hover:bg-rose-500/80" },
    { id: 8, title: "STAY", color: "bg-indigo-600/60 hover:bg-indigo-500/80" }
  ];

  const triggerBookMorse = (id: number, title: string) => {
    setActiveBooks(prev => [...prev, id]);
    if (soundEnabled) {
      synth.beep(400 + (id * 90), 'sine', 0.25, 0.08);
    }
    
    // Set custom dialogue from TARS responding to bookshelves
    const bookQuotes = [
      `TARS: Shaking book "${title}". Transmitting gravitational Morse decimals: — • — • (S - T - A - Y)...`,
      `TARS: Murph is recording the Morse sequence in her room! Dust storm pattern confirmed.`,
      `TARS: Gravitational deflection recorded behind the bookshelf. Space cadet coordinates matching.`,
      `TARS: Transmitting binary weather coordinates for Chandigarh back through the past!`
    ];
    setTarsMessage(bookQuotes[id % bookQuotes.length]);

    setTimeout(() => {
      setActiveBooks(prev => prev.filter(item => item !== id));
    }, 1000);
  };

  // Open-Meteo weather descriptors with a magnificent sci-fi twist
  const parseSciFiWeatherCode = (code: number): string => {
    if (code === 0) return "Eclipse Singularity / Perfect Cosmic Clearance";
    if (code >= 1 && code <= 3) return "Interstellar Gas Refraction / Nebula Haze";
    if (code === 45 || code === 48) return "Mann's Planet Glacial Vapor / Ambient Cryo-Fog";
    if (code >= 51 && code <= 57) return "Miller's Planet Condensation Rain Drizzle";
    if (code >= 61 && code <= 67) return "Heavy Accretion Disk Storm / Tidal Waterfall Rain";
    if (code >= 71 && code <= 77) return "Mann's Ice Avalanche Descent / Crystalline Crystals";
    if (code >= 80 && code <= 82) return "Tidal Cascade Spray Rainfall";
    if (code >= 95 && code <= 99) return "Cosmic Electromagnetic Anomaly / Lightning discharge";
    return "Quantum Wave Deviation / Strange Weather Anomalies";
  };

  // Live satellite data retrieval for Chandigarh, India (Lat: 30.7333, Lon: 76.7794)
  const fetchChandigarhAtmosphere = async () => {
    setLoading(true);
    setErrorText(null);
    try {
      if (soundEnabled) {
        synth.beep(520, 'sine', 0.1, 0.05);
      }
      
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=30.7333&longitude=76.7794&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m&hourly=precipitation_probability,rain&timezone=Asia/Kolkata`
      );
      
      if (!response.ok) {
        throw new Error("Transmitting node compromised. Sat-Com link offline.");
      }

      const data = await response.json();
      const curr = data.current;
      const hourly = data.hourly;
      
      // Compute 12h mean precipitation probability
      const nextProbs = hourly.precipitation_probability ? hourly.precipitation_probability.slice(0, 12) : [0];
      const avgRainProb = Math.round(nextProbs.reduce((acc: number, val: number) => acc + val, 0) / nextProbs.length);
      
      // Cinematic climate status descriptions
      let predictions = "Planetary skies in Chandigarh are clear. Windows for celestial departures are open.";
      if (avgRainProb > 10 && avgRainProb < 45) {
        predictions = "Minor water-world atmosphere cloud cover. Spaceship hull shields prepared for condensation.";
      } else if (avgRainProb >= 45) {
        predictions = "Extreme gravity wave precipitation detected. Engage primary hydro-thrusters.";
      }

      setWeather({
        temp: curr.temperature_2m ?? 23.4,
        apparentTemp: curr.apparent_temperature ?? 24.8,
        humidity: curr.relative_humidity_2m ?? 60,
        windSpeed: curr.wind_speed_10m ?? 8,
        precipitation: curr.precipitation ?? 0.0,
        weatherCode: curr.weather_code ?? 0,
        weatherDesc: parseSciFiWeatherCode(curr.weather_code ?? 0),
        isDay: curr.is_day === 1,
        rainProbability: avgRainProb,
        rainForecastText: predictions,
      });

      const today = new Date();
      setLastUpdated(today.toLocaleTimeString() + ' (IST)');
    } catch (err: any) {
      setErrorText(err.message || "Interstellar communication error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChandigarhAtmosphere();
    return () => synth.stopTickingClock();
  }, []);

  // Miller's Planet ticking cycle (1.25s tick represent 17h on Earth)
  const toggleMillerTicking = () => {
    const nextState = !tickingActive;
    setTickingActive(nextState);
    if (soundEnabled) {
      synth.beep(750, 'sine', 0.05);
    }
    
    if (nextState) {
      synth.startTickingClock(() => {
        setTicksCount(prev => prev + 1);
      });
      setTarsMessage("TARS: Relativistic metronome activated. Each 1.25-sec tick is 17 hours on Earth. Keep track of the bookcase!");
    } else {
      synth.stopTickingClock();
      setTarsMessage("TARS: Relativistic metronome suspended. Temporal flow locked.");
    }
  };

  // Interactive AI Pilot Humor settings
  const tarsEmoticons: { [key: number]: string } = {
    0: "[ -_- ]",
    25: "[ •_• ]",
    50: "[ o_o ]",
    75: "[ ^_^ ]",
    100: "[ 👁️_👁️ ]"
  };

  const tarsHumorDialogues = [
    { max: 10, msg: "TARS: Affirmative. Humor calibrated to 0%. I am a sterile machine. Devoid of joy." },
    { max: 35, msg: "TARS: Affiliated. Preparing coordinates without unnecessary comedic delay." },
    { max: 70, msg: "TARS: Humor set to 50%. A simple wave is safe, but gargantua's curves might distract you." },
    { max: 80, msg: "TARS: Level 75% Active. Self-destruction in 10, 9, 8... Ready, Captain? Just testing your blood pressure." },
    { max: 95, msg: "TARS: Humor limits at 90%. I have a cue card for sarcasms. Don't let Cooper drive near black holes." },
    { max: 100, msg: "TARS: MAXIMUM HUMOR 100%! Spacetime is bending, my jokes are compressing, gravity is circular! Buckle up cadet!" }
  ];

  const changeTarsHumor = (val: number) => {
    setTarsHumorLevel(val);
    const matched = tarsHumorDialogues.find(d => val <= d.max) || { msg: "TARS: Humor parameters adjusted." };
    setTarsMessage(`${tarsEmoticons[val] || '[ o_o ]'} ${matched.msg}`);
    if (soundEnabled) {
      synth.beep(300 + val * 4, 'triangle', 0.1, 0.08);
    }
  };

  // Millers Dilation converter calculation
  const runDilationCalculations = () => {
    const secs = parseFloat(millersInputSeconds);
    if (isNaN(secs) || secs <= 0) {
      setTimeDilationResult("TARS Error: Spacetime parameter must be a solid positive integer.");
      if (soundEnabled) synth.beep(200, 'sawtooth', 0.3);
      return;
    }

    if (soundEnabled) {
      synth.beep(950, 'sine', 0.15, 0.08);
    }

    const elapsedOnEarthSecs = secs * 61362;
    const days = Math.floor(elapsedOnEarthSecs / 86400);
    const hrs = Math.floor((elapsedOnEarthSecs % 86400) / 3600);
    const mins = Math.floor((elapsedOnEarthSecs % 3600) / 60);

    let outputPhrase = '';
    if (days >= 365) {
      const yrs = (days / 365.25).toFixed(2);
      outputPhrase = `${yrs} Years`;
    } else if (days > 0) {
      outputPhrase = `${days} Days, ${hrs} Hours`;
    } else {
      outputPhrase = `${hrs} Hours, ${mins} Minutes`;
    }

    setTimeDilationResult(
      `🪐 RELATIVE TEMPORAL OFFSET: Exploring Miller's gravity field for ${secs} seconds equals a lapse of ${outputPhrase} in Chandigarh, India!`
    );
  };

  // Gargantua black-hole spacetime warp
  const triggerGargantuaWarp = () => {
    setIsWarpMode(true);
    if (soundEnabled) {
      synth.triggerPipeOrganChord();
    }
    setTarsMessage("[ 👁️_👁️ ] CRITICAL WARNING: ACCRETION DISK ECLIPSE INCOMING! ENGAGING COGNITIVE BENDING HORIZONS!");

    setTimeout(() => {
      setIsWarpMode(false);
      if (soundEnabled) {
        synth.beep(460, 'sine', 0.12);
      }
      setTarsMessage("TARS: Gravitational wave variance settled. High-gain satellite links resumed in Chandigarh.");
    }, 5000);
  };

  return (
    <div className={`min-h-screen bg-[#020108] text-slate-100 flex flex-col justify-between items-center font-sans relative overflow-hidden transition-all duration-1000 select-none pb-6 ${
      isWarpMode ? 'scale-95 rotate-1 grayscale contrast-150 brightness-125 duration-150' : ''
    }`}>
      
      {/* 1. Nebula Backdrop & Dynamic Starfields */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-none">
        {/* Main imported generated high quality deep space asset */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-screen transition-all duration-1000 scale-105"
          style={{ backgroundImage: `url(${nebulaBg})` }}
        />
        
        {/* Soft atmospheric gradient masks for luxury glassmorph contrast */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#02010c] via-[#050410]/95 to-[#0b0825]/90" />
        
        {/* Pulsing floating orbital space dust rings */}
        <div className="absolute w-[700px] h-[700px] border-2 border-dashed border-cyan-500/10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow pointer-events-none" />
        <div className="absolute w-[950px] h-[950px] border border-dotted border-amber-500/10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-reverse pointer-events-none" />

        {/* Dynamic moving stardust sparkles */}
        {stars.map((star, idx) => (
          <div
            key={idx}
            className="absolute bg-white rounded-full opacity-60 animate-twinkle"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.twinkleDelay}s`,
            }}
          />
        ))}

        {/* Cosmic accretion disk visual glow */}
        <div className="absolute w-[300px] h-[300px] bg-cyan-500/10 blur-[130px] rounded-full top-1/4 left-1/3 animate-pulse" />
        <div className="absolute w-[450px] h-[450px] bg-pink-500/5 blur-[160px] rounded-full bottom-1/3 right-1/4 animate-pulse" />

        {/* Dynamic simulated meteor monsoon raindrops */}
        {(weather?.rainProbability && weather.rainProbability > 30 || simulatedPrecipitation) && (
          <div className="absolute inset-0">
            {Array.from({ length: 40 }).map((_, i) => {
              const rLeft = Math.random() * 100;
              const rDelay = Math.random() * 3;
              const rDur = 1.0 + Math.random() * 1.5;
              const rWidth = 1.5 + Math.random() * 1.5;
              const rHeight = 35 + Math.random() * 35;
              return (
                <div
                  key={i}
                  className="absolute bg-[linear-gradient(180deg,rgba(6,182,212,0.7),rgba(6,182,212,0))]"
                  style={{
                    left: `${rLeft}%`,
                    top: `-100px`,
                    width: `${rWidth}px`,
                    height: `${rHeight}px`,
                    animationDelay: `${rDelay}s`,
                    animationDuration: `${rDur}s`,
                    animationName: 'fall',
                    animationIterationCount: 'infinite',
                    animationTimingFunction: 'linear'
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Glowing Southern Aurora projection */}
        {simulatedAura && (
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/12 to-purple-500/10 blur-[80px] pointer-events-none animate-pulse-ring" />
        )}
      </div>

      {/* 2. HUD Spacecraft Cockpit Header - Pure Glass & Curved HUD */}
      <header className="w-full max-w-6xl relative z-10 px-4 mt-6">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 p-6 rounded-[32px] flex flex-col md:flex-row justify-between items-center gap-6 shadow-[0_12px_45px_0_rgba(15,23,42,0.3)]">
          
          <div className="flex items-center gap-5">
            {/* Embedded planet sphere widget with rotating halo */}
            <div className="relative w-16 h-16 rounded-full flex items-center justify-center bg-radial from-slate-950/80 to-slate-900 border border-white/20 shadow-inner group">
              <div className="absolute inset-0.5 rounded-full border border-dashed border-cyan-400 animate-spin-slow" />
              <div className="w-8 h-8 rounded-full bg-cyan-500/10 blur-[8px] absolute" />
              <div className={`w-4 h-4 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 transition-transform ${isWarpMode ? 'scale-150 animate-ping' : ''}`} />
              <div className="absolute -inset-2 border border-dotted border-white/5 rounded-full pointer-events-none" />
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl md:text-3xl font-black font-sans tracking-tight text-white flex items-center gap-3">
                  ENDURANCE <span className="text-cyan-400 text-xs font-semibold px-3 py-1 rounded-full border border-cyan-400/30 font-mono tracking-widest bg-cyan-400/5">MISSION_LOG</span>
                </h1>
              </div>
              <p className="text-[10px] uppercase font-mono tracking-widest text-cyan-300 mt-1 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full inline-block animate-pulse shrink-0" />
                Atmospheric Telemetry Protocol: Chandigarh, India Real-Time Orbit
              </p>
            </div>
          </div>

          {/* Luxury Rounded Controls & Action Feeds */}
          <div className="flex flex-wrap items-center gap-3">
            
            <button 
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                synth.beep(soundEnabled ? 350 : 750, 'sine', 0.1);
              }}
              className={`px-5 py-2.5 rounded-full border font-mono text-[10px] font-bold tracking-widest flex items-center gap-2 transition-all cursor-pointer ${
                soundEnabled 
                  ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.25)]' 
                  : 'bg-slate-950/40 border-slate-700 text-slate-500 hover:border-slate-600'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              SOUND: {soundEnabled ? "ON" : "OFF"}
            </button>

            <button 
              onClick={fetchChandigarhAtmosphere}
              disabled={loading}
              className="px-5 py-2.5 rounded-full border border-amber-500/40 hover:border-amber-400 font-mono text-[10px] font-extrabold tracking-widest text-[#ffaa33] bg-amber-500/5 hover:bg-amber-500/15 transition-all flex items-center gap-2 uppercase cursor-pointer shadow-sm hover:scale-[1.03] active:scale-[0.98]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              RESET TELEMETRY
            </button>
          </div>

        </div>
      </header>

      {/* 3. Main Glass Grid Cockpit */}
      <main className="w-full max-w-6xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 mt-8 flex-1">
        
        {/* Left Console Quadrant: Chandigarh Climate Observatory (7 Columns) */}
        <div className="col-span-1 lg:col-span-7 flex flex-col gap-8">
          
          {/* Main Chandigarh Observatory Glass Panel */}
          <section className="bg-slate-900/25 backdrop-blur-xl border border-white/10 p-8 rounded-[36px] shadow-[0_16px_50px_0_rgba(15,23,42,0.4)] relative flex flex-col justify-between overflow-hidden">
            
            {/* Subtle light refraction corner arcs */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-white/5 rounded-tl-[36px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-white/5 rounded-br-[36px] pointer-events-none" />

            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div className="flex items-center gap-2 font-sans">
                <Globe className="w-5 h-5 text-cyan-400 animate-spin-slow" />
                <span className="text-xs uppercase font-extrabold tracking-wider text-slate-300">GEO_STATION: CHANDIGARH, IN</span>
              </div>
              <div className="text-[9px] font-mono text-cyan-400 bg-cyan-500/10 px-3.5 py-1 rounded-full border border-cyan-400/25 uppercase tracking-widest">
                SAT-GATE: ACTIVE
              </div>
            </div>

            {loading ? (
              <div className="py-24 flex flex-col items-center justify-center font-mono text-center gap-4">
                <div className="relative w-14 h-14 flex items-center justify-center border-4 border-t-cyan-400 border-white/10 rounded-full animate-spin">
                  <div className="w-6 h-6 rounded-full bg-cyan-400/10 animate-ping absolute" />
                </div>
                <p className="text-xs tracking-widest animate-pulse text-cyan-300 uppercase font-semibold">Decrypting atmospheric satellite vectors...</p>
              </div>
            ) : errorText ? (
              <div className="py-16 p-8 border border-red-500/20 bg-red-950/10 rounded-2xl text-center flex flex-col gap-4 font-mono max-w-md mx-auto">
                <AlertTriangle className="w-10 h-10 text-red-500 mx-auto" />
                <p className="text-red-400 font-black tracking-widest">TELEMETRY LINK BREACH</p>
                <p className="text-xs text-neutral-400">{errorText}</p>
                <button 
                  onClick={fetchChandigarhAtmosphere} 
                  className="mt-2 mx-auto px-6 py-2 rounded-full border border-red-500/40 text-red-400 text-xs hover:bg-red-500/10 transition-colors"
                >
                  RETRY SAT-COM
                </button>
              </div>
            ) : (
              <div className="mt-6 flex flex-col gap-8">
                
                {/* Curved Dial Circular Dashboard Gauge for Temperature Display */}
                <div className="flex flex-col md:flex-row items-center gap-8 justify-around">
                  
                  {/* Luxury Gauge Dial Svg Representation */}
                  <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      {/* Gradient definition for circular border */}
                      <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                      {/* Gray track circle ring */}
                      <circle 
                        cx="96" 
                        cy="96" 
                        r="80" 
                        className="stroke-slate-800" 
                        strokeWidth="8" 
                        fill="transparent" 
                      />
                      {/* Active circular gauge value */}
                      <circle 
                        cx="96" 
                        cy="96" 
                        r="80" 
                        stroke="url(#gaugeGradient)" 
                        strokeWidth="10" 
                        fill="transparent" 
                        strokeDasharray={2 * Math.PI * 80}
                        strokeDashoffset={(2 * Math.PI * 80) * (1 - Math.min(100, Math.max(0, ((weather?.temp ?? 20) / 50))) )}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                      />
                    </svg>

                    {/* Dashboard text reading inside circle */}
                    <div className="absolute text-center flex flex-col items-center">
                      <Thermometer className="w-6 h-6 text-cyan-400 animate-pulse mb-1" />
                      <div className="font-mono text-4xl font-extrabold tracking-tighter text-white flex items-baseline">
                        {weather?.temp}
                        <span className="text-xl font-light text-cyan-300 ml-0.5">°C</span>
                      </div>
                      <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase mt-0.5">CHANDIGARH</span>
                    </div>

                    {/* Orbiting dot indicator */}
                    <div 
                      className="absolute w-3 h-3 bg-white rounded-full border border-cyan-400 shadow-[0_0_10px_rgb(6,182,212)] animate-spin-slow"
                      style={{ transformOrigin: '96px 96px', transform: 'rotate(45deg) translate(80px) rotate(-45deg)', left: '44px', top: '44px' }}
                    />
                  </div>

                  {/* Satellite readings text summaries */}
                  <div className="flex flex-col gap-4 text-center md:text-left">
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4 max-w-xs">
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">THERMAL COGNIZANCE</div>
                      <p className="text-sm font-semibold text-slate-200 uppercase font-mono">
                        Apparent vector measures <span className="text-[#ffaa33]">{weather?.apparentTemp}°C</span>. Ambient atmospheric gravity constant is stable.
                      </p>
                    </div>

                    <div className="flex justify-center md:justify-start items-center gap-3 text-xs text-neutral-400 font-mono">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                      <span>ELEVATION: 321M AMSL</span>
                    </div>
                  </div>

                </div>

                {/* Satellite Weather Description Capsule */}
                <div className="bg-radial from-cyan-950/20 to-slate-900/60 border border-cyan-500/20 rounded-2xl p-5 relative overflow-hidden shadow-inner">
                  {/* Scanline pattern for tech cockpit HUD */}
                  <div className="absolute inset-0 bg-linear-to-b from-transparent 50% to-slate-950/15 bg-[size:100%_3px] pointer-events-none" />
                  <div className="absolute top-1/2 -translate-y-1/2 right-6 text-[8px] font-mono tracking-widest font-black text-cyan-400 bg-cyan-400/5 px-2.5 py-1 rounded-full border border-cyan-400/20 uppercase animate-indicator">
                    EVALUATING SYSTEM
                  </div>
                  
                  <div className="text-[9px] font-mono text-cyan-400 font-bold tracking-widest uppercase mb-1.5 flex items-center gap-1">
                    <Sparkle className="w-3 h-3 text-cyan-400 shrink-0" /> BIOSHPHERE STATUS READOUT :
                  </div>
                  <p className="text-lg font-black uppercase text-white font-mono tracking-wide leading-tight">
                    {weather?.weatherDesc}
                  </p>
                </div>

                {/* Sub Telemetry Specs Glass Tiles */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  
                  <div className="p-4 bg-slate-900/40 rounded-2xl border border-white/5 flex flex-col justify-between transition-transform hover:-translate-y-1">
                    <span className="text-[9px] font-mono font-bold text-slate-400 tracking-widest flex items-center gap-1.5 uppercase">
                      <Droplets className="w-3.5 h-3.5 text-cyan-400" /> HUMIDITY
                    </span>
                    <span className="text-2xl font-mono font-extrabold mt-2 text-cyan-300">{weather?.humidity}%</span>
                    <span className="text-[8px] font-mono text-cyan-500 uppercase tracking-wide mt-1">Water Vapor</span>
                  </div>

                  <div className="p-4 bg-slate-900/40 rounded-2xl border border-white/5 flex flex-col justify-between transition-transform hover:-translate-y-1">
                    <span className="text-[9px] font-mono font-bold text-slate-400 tracking-widest flex items-center gap-1.5 uppercase">
                      <Wind className="w-3.5 h-3.5 text-cyan-400" /> WIND SPEED
                    </span>
                    <span className="text-2xl font-mono font-extrabold mt-2 text-cyan-300">{weather?.windSpeed} km/h</span>
                    <span className="text-[8px] font-mono text-cyan-500 uppercase tracking-wide mt-1">Gale Vector</span>
                  </div>

                  <div className="p-4 bg-slate-900/40 rounded-2xl border border-white/5 flex flex-col justify-between transition-transform hover:-translate-y-1">
                    <span className="text-[9px] font-mono font-bold text-slate-400 tracking-widest flex items-center gap-1.5 uppercase">
                      <CloudRain className="w-3.5 h-3.5 text-pink-500" /> PRECIPITATION
                    </span>
                    <span className="text-2xl font-mono font-extrabold mt-2 text-pink-400">
                      {simulatedPrecipitation ? 'Monsoon' : `${weather?.precipitation} mm`}
                    </span>
                    <span className="text-[8px] font-mono text-pink-500 uppercase tracking-wide mt-1">Precip force</span>
                  </div>

                  <div className="p-4 bg-slate-900/40 rounded-2xl border border-white/5 flex flex-col justify-between transition-transform hover:-translate-y-1">
                    <span className="text-[9px] font-mono font-bold text-slate-400 tracking-widest flex items-center gap-1.5 uppercase">
                      <Clock className="w-3.5 h-3.5 text-amber-500" /> SOLAR CYCLE
                    </span>
                    <span className="text-lg font-mono font-extrabold mt-2 text-amber-400 truncate tracking-tight">{weather?.isDay ? 'DAYLIGHT' : 'DARK VOID'}</span>
                    <span className="text-[8px] font-mono text-amber-500 uppercase tracking-wide mt-1">Sector state</span>
                  </div>

                </div>

                {/* Curved Spline/Wave Representation of Rainfall Predictive Model */}
                <div className="border border-white/5 bg-slate-900/45 rounded-3xl p-6 font-mono relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] rounded-full pointer-events-none" />
                  
                  <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
                    <span className="text-[10px] font-bold text-cyan-300 tracking-wider uppercase flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> Spacetime 12-Hour Rainfall Curve Model
                    </span>
                    <span className="text-[9px] text-cyan-400 font-bold bg-cyan-400/5 px-2.5 py-0.5 rounded-full border border-cyan-400/10">PROBABILITY: {weather?.rainProbability}%</span>
                  </div>
                  
                  {/* Gorgeous curving SVG spline based on real probability data */}
                  <div className="w-full h-16 relative flex items-end mb-4">
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 20">
                      {/* Gradient fill */}
                      <defs>
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Interactive morphing curve path based on rain level */}
                      <path 
                        d={`M 0,20 Q 25,${Math.max(2, 20 - (weather?.rainProbability ?? 20)*0.18)} 50,${Math.max(2, 20 - (weather?.rainProbability ?? 20)*0.22)} T 100,20`} 
                        fill="url(#areaGradient)" 
                        className="transition-all duration-1000"
                      />
                      <path 
                        d={`M 0,20 Q 25,${Math.max(2, 20 - (weather?.rainProbability ?? 20)*0.18)} 50,${Math.max(2, 20 - (weather?.rainProbability ?? 20)*0.22)} T 100,20`} 
                        fill="none" 
                        stroke="#22d3ee" 
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                      {/* Pulse circle on peak */}
                      <circle 
                        cx="50" 
                        cy={Math.max(2, 20 - (weather?.rainProbability ?? 20)*0.22)} 
                        r="2.5" 
                        fill="#ffffff" 
                        className="animate-pulse shadow-[0_0_8px_#22d3ee] transition-all duration-1000"
                      />
                    </svg>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-mono uppercase bg-slate-950/50 p-3 rounded-xl border-l-[3px] border-amber-500 font-semibold shadow-inner">
                    <span className="text-amber-500 font-black tracking-wider">[ OBSERVATION DECK ]:</span> {weather?.rainForecastText}
                  </p>
                </div>

              </div>
            )}

            {/* Display telemetry update age */}
            <div className="text-[10px] font-mono text-slate-450 border-t border-white/5 mt-6 pt-4 flex justify-between items-center">
              <span>Sat-Com Transmission: Stable (5.4GHz)</span>
              <span>Updated Coordinates: {lastUpdated || "STANDBY"}</span>
            </div>

          </section>

          {/* Interactive Bookshelf Gravitational Morse Module */}
          <section className="bg-slate-900/25 backdrop-blur-xl border border-white/10 p-6 rounded-[32px] overflow-hidden shadow-[0_16px_50px_0_rgba(15,23,42,0.4)]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-black font-mono tracking-widest text-cyan-400 uppercase flex items-center gap-1.5">
                📚 COOPER'S BOOKSHELF TRANSMITTER
              </h3>
              <span className="text-[9px] font-mono text-amber-500 uppercase bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/25">GRAVITY ANOMALIES</span>
            </div>
            
            <p className="text-xs text-slate-300 font-semibold mb-4 uppercase leading-snug">
              Click books to push gravitational dust coordinates. Morse letters "S-T-A-Y" will trigger short spatial pitch signals!
            </p>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
              {bookshelfItems.map((book) => {
                const isActive = activeBooks.includes(book.id);
                return (
                  <button
                    key={book.id}
                    onClick={() => triggerBookMorse(book.id, book.title)}
                    className={`h-24 rounded-lg flex flex-col justify-end p-2 transition-all duration-200 cursor-pointer ${book.color} ${
                      isActive 
                        ? 'translate-y-2 scale-95 ring-2 ring-white shadow-[0_0_15px_#ffffff]' 
                        : 'hover:-translate-y-1.5'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-white font-mono break-words leading-tight text-left uppercase">
                      {book.title}
                    </div>
                    {/* Tiny glowing coordinate dot */}
                    <div className={`w-1.5 h-1.5 rounded-full mt-2 self-start ${isActive ? 'bg-white animate-ping' : 'bg-white/40'}`} />
                  </button>
                );
              })}
            </div>
          </section>

        </div>

        {/* Right Console Quadrant: Pilot Assistant TARS & Relativity Matrix (5 Columns) */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-8">
          
          {/* Cybernetic Assistant TARS Interface */}
          <section className="bg-slate-900/25 backdrop-blur-xl border border-white/10 p-6 rounded-[36px] shadow-[0_16px_50px_0_rgba(15,23,42,0.4)] relative flex flex-col justify-between overflow-hidden">
            
            <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-white/5 rounded-tr-[36px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-white/5 rounded-bl-[36px] pointer-events-none" />

            <div className="border-b border-white/5 pb-3.5 mb-4">
              <span className="text-xs font-sans font-extrabold text-cyan-400 tracking-widest uppercase flex items-center justify-between">
                <span>🤖 MISSION CO-PILOT: TARS</span>
                <span className="text-[9px] bg-cyan-500 text-black font-bold px-3 py-1 rounded-full uppercase">ONLINE</span>
              </span>
            </div>

            {/* Simulated Vintage Space Helmet Reticule Screen */}
            <div className="bg-slate-950/90 border-2 border-slate-800 p-5 rounded-2xl font-mono text-xs mb-5 min-h-[160px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-radial from-transparent to-slate-950 opacity-90 pointer-events-none" />
              {/* Futuristic scanlines */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent 50% to-slate-950/20 bg-[size:100%_4px] pointer-events-none" />
              
              <div className="flex justify-between items-center text-[9px] text-zinc-500 border-b border-zinc-850 pb-2 mb-2 relative z-10">
                <span>[ SPACETIME AI ENGINE ]</span>
                <span className="text-[#ffaa33]">SARCASM LIMIT: {tarsHumorLevel}%</span>
              </div>

              {/* Graphical TARS Segments (interactive curved visual columns) */}
              <div className="grid grid-cols-4 gap-2.5 text-center text-[9px] font-bold mb-3 relative z-10">
                <div className={`py-1.5 rounded-md border transition-colors duration-250 ${tarsHumorLevel < 35 ? 'bg-cyan-500/15 border-cyan-400 text-white' : 'bg-slate-900/60 border-slate-800 text-slate-500'}`}>SEG_01</div>
                <div className={`py-1.5 rounded-md border transition-colors duration-250 ${tarsHumorLevel >= 35 && tarsHumorLevel < 75 ? 'bg-cyan-500/15 border-cyan-400 text-white' : 'bg-slate-900/60 border-slate-800 text-slate-500'}`}>SEG_02</div>
                <div className={`py-1.5 rounded-md border transition-colors duration-250 ${tarsHumorLevel >= 75 && tarsHumorLevel <= 90 ? 'bg-cyan-500/15 border-cyan-400 text-white' : 'bg-slate-900/60 border-slate-800 text-slate-500'}`}>SEG_03</div>
                <div className={`py-1.5 rounded-md border transition-colors duration-250 ${tarsHumorLevel > 90 ? 'bg-pink-500/15 border-pink-400 text-white' : 'bg-slate-900/60 border-slate-800 text-slate-500'}`}>SEG_04</div>
              </div>

              <p className="text-[#a5f3fc] text-xs leading-relaxed uppercase break-words px-1 relative z-10 font-bold min-h-[40px] drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                {tarsMessage}
              </p>
            </div>

            {/* Humor regulator slider with full curves */}
            <div className="flex flex-col gap-2 font-mono">
              <div className="flex justify-between text-[11px] font-bold uppercase text-slate-400">
                <span>Modulate Cybernetic Humor Factor</span>
                <span className="text-cyan-400">{tarsHumorLevel}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="25"
                value={tarsHumorLevel}
                onChange={(e) => changeTarsHumor(parseInt(e.target.value))}
                className="w-full h-2 rounded-full cursor-pointer accent-cyan-400 bg-slate-800 outline-none"
              />
              <div className="flex justify-between text-[8px] text-slate-500 font-extrabold uppercase mt-1">
                <span>0% Bureau</span>
                <span>50% Sober</span>
                <span>75% Cooper</span>
                <span>100% Extreme</span>
              </div>
            </div>

          </section>

          {/* Relativity / Nolan Time Dilation Decoder */}
          <section className="bg-slate-900/25 backdrop-blur-xl border border-white/10 p-6 rounded-[36px] shadow-[0_16px_50px_0_rgba(15,23,42,0.4)] relative flex flex-col justify-between overflow-hidden">
            
            <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-white/5 rounded-tl-[36px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-white/5 rounded-br-[36px] pointer-events-none" />

            <div className="border-b border-white/5 pb-3 mb-4 flex items-center justify-between">
              <span className="text-xs font-sans font-extrabold text-cyan-400 tracking-widest uppercase">
                🪐 TIME DILATION MATRIX
              </span>
              <span className="text-[8px] font-mono opacity-60 bg-cyan-400/10 px-2 py-0.5 rounded-full border border-cyan-400/20">MILLER SCALE</span>
            </div>

            <p className="text-xs text-slate-300 uppercase leading-snug mb-4 font-semibold">
              Near Gargantua, spacetime folds. <strong className="text-[#ffaa33]">1 Hour on Miller equals 7 Earth Years!</strong> Explore duration dilation below.
            </p>

            {/* Calculator container */}
            <div className="flex flex-col gap-3 font-mono">
              <label className="text-[9px] text-slate-400 uppercase font-black tracking-widest">
                MILLER SURFACE LOGGING SECONDS :
              </label>
              
              <div className="flex gap-2.5">
                <input 
                  type="number"
                  value={millersInputSeconds}
                  onChange={(e) => setMillersInputSeconds(e.target.value)}
                  className="flex-1 bg-slate-950/70 border-2 border-cyan-400/40 focus:border-cyan-400 rounded-full px-5 py-2.5 text-white font-mono text-sm outline-none transition-colors"
                  placeholder="30"
                />
                
                <button
                  onClick={runDilationCalculations}
                  className="px-6 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-sans font-extrabold text-xs transition-transform hover:scale-[1.04] active:scale-[0.96] cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.3)] shrink-0"
                >
                  SOLVE HORIZON
                </button>
              </div>

              {timeDilationResult && (
                <div className="mt-3 p-4 rounded-2xl border-2 border-dashed border-amber-500/40 bg-amber-950/15 text-amber-300 text-xs uppercase leading-snug font-bold animate-pulse-ring">
                  {timeDilationResult}
                </div>
              )}
            </div>

          </section>

          {/* Action Climate Catalysts & Simulated Anomalies */}
          <section className="bg-slate-900/25 backdrop-blur-xl border border-white/10 p-6 rounded-[36px] shadow-[0_16px_50px_0_rgba(15,23,42,0.4)]">
            <h3 className="text-xs font-black font-mono tracking-widest text-[#ffaa33] uppercase mb-4 flex items-center gap-1.5">
              🚀 ENVIRONMENTAL MATRIX CONTROLS
            </h3>

            <div className="flex flex-col gap-3.5">
              
              <button
                onClick={toggleMillerTicking}
                className={`py-3.5 px-5 rounded-full font-mono text-xs font-bold tracking-widest uppercase transition-all border-2 flex items-center justify-between cursor-pointer ${
                  tickingActive 
                    ? 'bg-amber-400 border-amber-300 text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.3)] scale-[1.02]' 
                    : 'bg-slate-950/30 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/5'
                }`}
              >
                <span>{tickingActive ? "⏸ ABORT TEMPORAL TICKS" : "▶ START TEMPORAL TICKS"}</span>
                <span className="font-mono text-[9px] bg-slate-950/50 text-cyan-300 px-2.5 py-0.5 rounded-full border border-white/5">
                  {tickingActive ? `TICKS: ${ticksCount}` : '80 BPM'}
                </span>
              </button>

              <button
                onClick={triggerGargantuaWarp}
                className="py-3.5 px-5 rounded-full font-sans text-xs font-black tracking-widest uppercase transition-all bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white border-0 shadow-[0_0_20px_rgba(244,63,94,0.35)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center"
              >
                💥 COLLAPSE SPACE COGNIZANCE WARP
              </button>

              <div className="grid grid-cols-2 gap-3.5">
                <button
                  onClick={() => {
                    setSimulatedPrecipitation(!simulatedPrecipitation);
                    setTarsMessage(`TARS: Comet monsoon ${!simulatedPrecipitation ? 'ACTIVE' : 'MUTED'}. Chandigarh orbit reporting dynamic storm water.`);
                    if (soundEnabled) synth.beep(simulatedPrecipitation ? 110 : 360, 'sawtooth', 0.2, 0.08);
                  }}
                  className={`py-3 px-4 rounded-full border font-mono text-[9px] font-black tracking-widest uppercase transition-all cursor-pointer ${
                    simulatedPrecipitation 
                      ? 'bg-pink-600 border-pink-400 text-white animate-pulse shadow-[0_0_12px_rgba(236,72,153,0.35)]' 
                      : 'bg-slate-950/30 border-pink-500/20 text-pink-400 hover:bg-slate-950/60'
                  }`}
                >
                  {simulatedPrecipitation ? "🚫 CUT COMET STORM" : "🌠 FORCE COMET STORM"}
                </button>

                <button
                  onClick={() => {
                    setSimulatedAura(!simulatedAura);
                    setTarsMessage(`TARS: Aurora coils ${!simulatedAura ? 'EMITTED' : 'GROUNDED'}. Spacetime hue shifted.`);
                    if (soundEnabled) synth.beep(660, 'sine', 0.15, 0.1);
                  }}
                  className={`py-3 px-4 rounded-full border font-mono text-[9px] font-black tracking-widest uppercase transition-all cursor-pointer ${
                    simulatedAura 
                      ? 'bg-emerald-600 border-emerald-400 text-white animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.35)]' 
                      : 'bg-slate-950/30 border-emerald-500/20 text-emerald-400 hover:bg-slate-950/60'
                  }`}
                >
                  {simulatedAura ? "🚫 CUT AURORA COILS" : "🌌 SPARK SOLAR AURORA"}
                </button>
              </div>

            </div>
          </section>

        </div>

      </main>

      {/* 4. Christopher Nolan Cinematic Tribute Footer */}
      <footer className="w-full max-w-6xl relative z-10 border-t border-white/5 mt-12 pt-6 px-4 text-center flex flex-col items-center gap-3">
        
        <blockquote className="font-sans italic text-slate-350 text-sm md:text-base max-w-2xl leading-relaxed tracking-wider">
          "Do not go gentle into that good night. Rage, rage against the dying of the light."
        </blockquote>
        
        <cite className="font-mono text-[9px] text-slate-500 tracking-widest uppercase not-italic">
          — Christopher Nolan, Interstellar (2014)
        </cite>

        <div className="w-full max-w-lg h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent my-1" />
        
        <p className="font-mono font-bold text-[9px] text-slate-400 uppercase tracking-widest">
          COSMIC SYSTEMS COCKPIT v2.0 // ORBIT STATUS: <span className="text-cyan-400">{isWarpMode ? 'QUANTUM_WARPING' : 'STABLE_GRAVITY'}</span>
        </p>

      </footer>

    </div>
  );
}
