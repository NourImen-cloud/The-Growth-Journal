import React from 'react';
import { 
  Home, 
  CalendarRange, 
  CheckSquare, 
  Sparkles, 
  BookHeart, 
  Trophy, 
  Compass, 
  Volume2, 
  VolumeX, 
  Heart
} from 'lucide-react';
import { useJournal } from '../context/JournalContext';
import { BearMascot, CuteRibbonBow, LavenderVase, Paperclip } from './AestheticDecorations';

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const { activeSection, setActiveSection, ambientPlaying, toggleAmbient } = useJournal();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, badge: 'Home' },
    { id: 'monthlyFocus', label: 'Monthly Focus', icon: CalendarRange, badge: '01' },
    { id: 'habitTracker', label: 'Habit Tracker', icon: CheckSquare, badge: '02' },
    { id: 'skillProgress', label: 'Skill Progress', icon: Sparkles, badge: '03' },
    { id: 'dailyJournal', label: 'Daily Journal', icon: BookHeart, badge: '04' },
    { id: 'achievements', label: 'Achievements', icon: Trophy, badge: '05' },
    { id: 'visionBoard', label: 'Vision Board', icon: Compass, badge: '06' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-purple-950/20 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#FAF6FC] border-r border-[#E8DEF2] 
        p-4 flex flex-col justify-between z-50 transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Header Card */}
        <div>
          <div className="relative bg-white/80 backdrop-blur-xs rounded-2xl p-3.5 border border-[#E9DFEE] shadow-soft-card mb-4 overflow-hidden">
            <div className="absolute -top-1 -left-1">
              <CuteRibbonBow className="w-7 h-7" color="#C084FC" />
            </div>
            
            <div className="pl-6 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#8B5CF6] font-semibold tracking-wider uppercase">
                  <span>✨</span>
                  <span>Daily Planner</span>
                </div>
                <h1 className="text-lg font-bold text-[#4C3B53] font-title tracking-tight">
                  Growth Journal
                </h1>
              </div>
              <div className="text-right">
                <span className="text-xl">🌸</span>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    if (setMobileOpen) setMobileOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm
                    transition-all duration-200 group text-left
                    ${isActive 
                      ? 'bg-[#B185DB] text-white shadow-md shadow-purple-300/40 translate-x-1 font-semibold' 
                      : 'text-[#67576E] hover:bg-[#F1E8F7] hover:text-[#4A3258]'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-[#9D7BB0]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-[#EDE5F4] text-[#866A96] group-hover:bg-[#E5D5F0]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mascot & Sticky Note Section */}
        <div className="pt-2">
          {/* Ambient sound toggle */}
          <button
            onClick={toggleAmbient}
            className={`
              w-full mb-3 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold
              border transition-all duration-200
              ${ambientPlaying 
                ? 'bg-[#EDE4F7] text-[#7A3E9D] border-[#C8B0E5] shadow-xs animate-pulse' 
                : 'bg-white/70 text-[#857090] border-[#EADDF0] hover:bg-white'}
            `}
          >
            {ambientPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Playing Cozy Rain Beats 🌧️</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#9E8CA9]" />
                <span>Play Cozy Study Ambiance</span>
              </>
            )}
          </button>

          {/* Sticky Note with Paperclip */}
          <div className="relative bg-[#FFFBF0] border border-[#F2E5C8] rounded-xl p-3 shadow-xs mb-3 rotate-[-1deg]">
            <div className="absolute -top-3.5 right-4 z-10">
              <Paperclip className="w-4 h-7" color="#C084FC" />
            </div>
            <p className="font-handwriting text-base text-[#6E553A] leading-tight flex items-center gap-1">
              <span>You've got this!</span>
              <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400 inline" />
            </p>
            <p className="text-[10px] text-[#A68864] mt-0.5">Focus today, shine tomorrow</p>
          </div>

          {/* Cute Mascot footer illustration */}
          <div className="flex items-end justify-between px-2">
            <BearMascot className="w-20 h-20 -mb-1 drop-shadow-xs" />
            <LavenderVase className="w-12 h-16 drop-shadow-xs" />
          </div>
        </div>
      </aside>
    </>
  );
}
