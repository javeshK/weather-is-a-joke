import { Info, Sparkles, BookOpen, GitBranch, Heart } from 'lucide-react';

export default function AboutTab() {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8 lg:px-12 bg-white dark:bg-[#1e1e1e] text-neutral-800 dark:text-neutral-250 transition-colors duration-300">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header section */}
        <header className="border-b border-dashed border-neutral-200 dark:border-neutral-800 pb-5">
          <span className="text-[10px] uppercase font-bold text-orange-500 font-mono tracking-wider">System Information</span>
          <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white mt-1">Weather is a Joke Manifest</h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-450 mt-1.5 font-mono">
            Chirpy theme visual and functional blueprint documentation
          </p>
        </header>

        {/* About Card Content */}
        <div className="space-y-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          
          <div className="p-5 border border-dashed border-neutral-250 dark:border-neutral-800 rounded-2xl bg-neutral-50/10 dark:bg-[#222325]/140">
            <h3 className="font-bold text-neutral-900 dark:text-white flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-orange-500 shrink-0" />
              Chirpy Theme Philosophy
            </h3>
            <p className="mb-3">
              This application has been meticulously redesigned to echo the layout and typographic elegance of <strong>Jekyll Chirpy</strong>, one of the most prominent, high-performance, minimalist blogging themes. 
            </p>
            <p>
              Chirpy values clean horizontal borders, distinct typographic weights (with extensive use of monospaced subtitles and tags), high contrast Slate tones, and a hierarchical sidebar-driven grid spacing.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-orange-500" />
              Integrated Technical Frameworks
            </h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>WMO Weather Decoding Engine:</strong> Raw telemetry codes provided directly by real-time satellites are decrypted into beautiful weather condition panels.
              </li>
              <li>
                <strong>Open-Meteo Geolocation:</strong> Integrates an offline-free geolocation coordinate matcher enabling high speed city query index matching.
              </li>
              <li>
                <strong>Subsystem Memory States:</strong> Snapshots of live systems can be persisted directly to local ledger buffers, enabling historical log archives tracking.
              </li>
            </ul>
          </div>

          <div className="border-t border-neutral-200 dark:border-neutral-850 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5">
              <GitBranch className="w-4 h-4" /> Node Environment: Production
            </span>
            <span className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500 animate-pulse" /> Crafted for Lighthearted Humans
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
