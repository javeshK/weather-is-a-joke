import { useState } from 'react';
import { 
  Home, 
  Calendar, 
  Archive, 
  Info, 
  Github, 
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  savedLogsCount: number;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  savedLogsCount,
  darkMode,
  toggleDarkMode
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'today', label: 'Today\'s Forecast', icon: Home },
    { id: 'forecast', label: '7-Day Outlook', icon: Calendar },
    { id: 'logs', label: 'Meteorology Logs', icon: Archive, badge: savedLogsCount > 0 ? savedLogsCount : undefined },
    { id: 'about', label: 'About Theme', icon: Info },
  ];

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Top Header */}
      <header id="mobile-header" className="lg:hidden w-full h-16 flex items-center justify-between px-6 border-b border-neutral-200 dark:border-neutral-805 bg-neutral-50 dark:bg-[#1b1c1e] text-neutral-800 dark:text-neutral-200 sticky top-0 z-40 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full bg-neutral-100 dark:bg-[#222325] flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
            <svg
              className="w-5 h-5 text-orange-500 fill-current animate-pulse"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
              Weather is a Joke
            </h1>
            <p className="text-[9px] text-neutral-550 dark:text-neutral-450 font-mono">
              Meteorological Journal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme Switch Quick Button in Mobile Header */}
          <button
            id="mobile-theme-toggle"
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-neutral-200/50 dark:hover:bg-neutral-805/50 text-neutral-500 dark:text-neutral-400"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="w-4.5 h-4.5 text-amber-500" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-indigo-600" />
            )}
          </button>

          {/* Hamburger Menu button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-neutral-200/50 dark:hover:bg-neutral-805/50 text-neutral-600 dark:text-neutral-300"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown overlay */}
      {isOpen && (
        <div id="mobile-nav-panel" className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-30 bg-neutral-50 dark:bg-[#1b1c1e] border-t border-neutral-200 dark:border-neutral-805 px-6 py-6 flex flex-col justify-between overflow-y-auto transition-all duration-305">
          <div className="space-y-6">
            <span className="text-[10px] font-mono tracking-wider text-neutral-400 dark:text-neutral-500 uppercase font-bold">Navigation</span>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-btn-${item.id}`}
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive 
                        ? 'bg-neutral-200/80 dark:bg-neutral-800 text-orange-600 dark:text-orange-500 font-bold' 
                        : 'hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4.5 h-4.5" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className="text-[10px] bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 px-1.5 py-0.5 rounded font-mono font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col items-center gap-4">
            <div className="flex gap-6">
              <a href="https://github.com/javeshK" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors" title="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </div>
            <div className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono text-center">
              <p>© 2026 Weather is a Joke • Powered by Chirpy</p>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside id="chirpy-sidebar" className="hidden lg:flex w-64 shrink-0 flex-col justify-between p-8 border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#1b1c1e] text-neutral-800 dark:text-neutral-200 sticky top-0 h-screen transition-colors duration-300">
        {/* Top Profile / Branding Section */}
        <div className="flex flex-col items-start">
          {/* Glowing circular avatar placeholder in Chirpy style */}
          <div className="relative group cursor-pointer mb-5 flex items-center justify-center">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-orange-400 to-rose-500 opacity-60 group-hover:opacity-100 blur-sm transition duration-300"></div>
            <div className="relative w-16 h-16 rounded-full bg-neutral-100 dark:bg-[#222325] flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
              <svg
                className="w-8 h-8 text-orange-500 fill-current animate-pulse"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
          </div>

          {/* Title and Subtitle */}
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white text-left">
            Weather is a Joke
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-450 mt-1 mb-8 text-left font-mono font-bold text-orange-500 dark:text-orange-400">
            Meteorological Journal
          </p>

          {/* Navigation list */}
          <nav className="w-full space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                    isActive 
                      ? 'bg-neutral-200/60 dark:bg-neutral-800/85 text-orange-600 dark:text-orange-500 font-semibold' 
                      : 'hover:bg-neutral-200/30 dark:hover:bg-neutral-800/40 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-orange-600 dark:text-orange-500' : 'text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="text-[10px] bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 px-1.5 py-0.5 rounded font-mono font-semibold">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-orange-500 dark:bg-orange-500 rounded-r-md"></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer (Dark Mode and Socials/Credits) */}
        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col items-start gap-4">
          {/* Theme select toggler */}
          <button
            id="theme-toggler"
            onClick={toggleDarkMode}
            className="w-full py-1.5 px-3 rounded-lg flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200/40 dark:hover:bg-neutral-808/30 hover:text-neutral-900 dark:hover:text-white transition duration-200"
          >
            <span className="font-mono">Appearance</span>
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-500" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Social Icons & Copyright */}
          <div className="w-full flex flex-col gap-4 items-start">
            <div className="flex gap-4">
              <a href="https://github.com/javeshK" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200" title="GitHub">
                <Github className="w-4 h-4" />
              </a>
            </div>

            <div className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono text-left leading-relaxed">
              <p>© 2026 Weather is a Joke</p>
              <p className="mt-0.5">Powered by Chirpy</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
