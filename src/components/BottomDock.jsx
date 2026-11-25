import React from 'react';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  Languages, 
  Headphones, 
  BookHeart, 
  CheckSquare, 
  Trophy, 
  Compass, 
  Heart,
  Sparkles
} from 'lucide-react';
import { useJournal } from '../context/JournalContext';
import { playSoftPop } from '../utils/audio';

export default function BottomDock() {
  const { activeSection, setActiveSection, ambientPlaying, toggleAmbient } = useJournal();

  const dockButtons = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'monthlyFocus', label: 'Month Plan', icon: Calendar },
    { id: 'habitTracker', label: 'Habits', icon: CheckSquare },
    { id: 'skillProgress', label: 'Studio', icon: Languages },
    { id: 'dailyJournal', label: 'Journal', icon: BookHeart },
    { id: 'achievements', label: 'Rewards', icon: Trophy },
    { id: 'visionBoard', label: 'Vision', icon: Compass },
  ];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-[95vw]">
      <div className="bg-white/95 backdrop-blur-md border border-[#EADBEE] shadow-cozy-hover rounded-full px-4 py-2 flex items-center gap-1.5 md:gap-3">
        {dockButtons.map((btn) => {
          const Icon = btn.icon;
          const isActive = activeSection === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => {
                playSoftPop();
                setActiveSection(btn.id);
              }}
              className={`
                flex flex-col md:flex-row items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all
                ${isActive
                  ? 'bg-[#B185DB] text-white shadow-xs scale-105'
                  : 'text-[#7B6787] hover:bg-[#F5EDFA] hover:text-[#562F70]'}
              `}
              title={btn.label}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="text-[10px] md:text-xs hidden sm:inline">{btn.label}</span>
            </button>
          );
        })}

        <div className="w-px h-5 bg-[#E6D7EE] mx-1 hidden sm:block" />

        {/* Ambient music button */}
        <button
          onClick={toggleAmbient}
          className={`
            hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all
            ${ambientPlaying ? 'bg-purple-100 text-purple-700 animate-pulse' : 'text-[#877492] hover:bg-gray-100'}
          `}
          title="Toggle cozy rain ambiance"
        >
          <Headphones className="w-3.5 h-3.5 text-[#A855F7]" />
          <span className="text-[11px] font-handwriting text-base">
            {ambientPlaying ? 'Rain Beats 🌧️' : 'Cozy Audio 🎧'}
          </span>
        </button>

        <span className="text-xs hidden xl:inline font-handwriting text-[#9D84A9] pl-3 border-l border-[#E6D7EE] whitespace-nowrap">
          "Believe in yourself a little more each day. ♡"
        </span>
      </div>
    </div>
  );
}
