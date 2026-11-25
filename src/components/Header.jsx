import React, { useState } from 'react';
import { Search, Bell, Moon, Sun, Menu, Sparkles, Heart, CheckCircle2, RotateCcw } from 'lucide-react';
import { useJournal } from '../context/JournalContext';

export default function Header({ onMenuClick }) {
  const { data, updateProfile, searchQuery, setSearchQuery, isDarkMode, toggleDarkMode, resetToFresh } = useJournal();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [tempName, setTempName] = useState(data.profile.name);
  const [tempSubtitle, setTempSubtitle] = useState(data.profile.subtitle);
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: tempName,
      subtitle: tempSubtitle,
    });
    setShowProfileModal(false);
  };

  return (
    <header className="px-4 lg:px-8 py-4 border-b border-[#EDE5F4] bg-[#FAF8FB]/90 backdrop-blur-xs sticky top-0 z-30 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Greeting & Motto */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl bg-white border border-[#E8DEF2] text-[#6A5873] hover:bg-[#F3EBF9]"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-bold text-[#42324A] font-title tracking-tight flex items-center gap-1.5">
                <span>{getGreeting()}, {data.profile.name}!</span>
                <Sparkles className="w-4 h-4 text-amber-400 fill-amber-300 animate-bounce inline" />
              </h2>
            </div>
            <p className="text-xs md:text-sm text-[#877491] flex items-center gap-1.5 font-medium mt-0.5">
              <span>{data.profile.subtitle}</span>
            </p>
          </div>
        </div>

        {/* Right: Search, Notification, Dark Mode Toggle, Avatar */}
        <div className="flex items-center gap-2.5 self-end md:self-auto w-full md:w-auto">
          {/* Search bar */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-[#A896B2] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search plans, habits, notes..."
              className="w-full pl-9 pr-3.5 py-2 text-xs md:text-sm bg-white border border-[#E7DCEE] rounded-full text-[#4E3D56] placeholder-[#AFA1B7] focus:outline-hidden focus:border-[#B185DB] focus:ring-2 focus:ring-[#B185DB]/20 shadow-2xs transition-all"
            />
          </div>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationToast(!showNotificationToast)}
              className="w-9 h-9 rounded-full bg-white border border-[#E7DCEE] flex items-center justify-center text-[#74617F] hover:bg-[#F5EDFA] hover:text-[#562F70] transition-colors relative shadow-2xs"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#F472B6] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                3
              </span>
            </button>

            {showNotificationToast && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#EADDF2] p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 text-xs font-bold text-[#564360]">
                  <span>Today's Reminders 🌸</span>
                  <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">New</span>
                </div>
                <div className="mt-2 space-y-2 text-xs">
                  <div className="p-2 bg-[#F9F5FC] rounded-lg text-[#5F4D69] flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Define Monthly Focus</p>
                      <p className="text-[11px] text-[#8C7A96]">Set the skills and milestones for this month!</p>
                    </div>
                  </div>
                  <div className="p-2 bg-[#FFF7ED] rounded-lg text-[#6A4D3B] flex items-start gap-2">
                    <Heart className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Build Daily Consistency</p>
                      <p className="text-[11px] text-[#937562]">Check off your first daily routine today ♡</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* WORKING DARK MODE TOGGLE */}
          <button
            onClick={toggleDarkMode}
            className={`
              w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 shadow-2xs
              ${isDarkMode 
                ? 'bg-[#2D2340] border-[#5B477D] text-amber-300 hover:bg-[#382C4E]' 
                : 'bg-white border-[#E7DCEE] text-[#8B5CF6] hover:bg-[#F5EDFA]'}
            `}
            title={isDarkMode ? "Switch to Cozy Light Mode ☀️" : "Switch to Cozy Midnight Mode 🌙"}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 fill-amber-300 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 fill-[#A855F7]/30 text-[#8B5CF6]" />
            )}
          </button>

          {/* User Avatar & Edit modal trigger */}
          <button
            onClick={() => {
              setTempName(data.profile.name);
              setTempSubtitle(data.profile.subtitle);
              setShowProfileModal(true);
            }}
            className="relative group focus:outline-hidden"
            title="Edit profile & journal settings"
          >
            <div className="w-10 h-10 rounded-full border-2 border-[#D8B4FE] p-0.5 shadow-2xs overflow-hidden transition-transform group-hover:scale-105">
              <img
                src={data.profile.avatar}
                alt={data.profile.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Edit Profile & Reset Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-purple-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-[#EADDF0] shadow-2xl">
            <h3 className="text-lg font-bold text-[#4B3953] font-title mb-1">
              Personalize Your Space 🌸
            </h3>
            <p className="text-xs text-[#897793] mb-4">
              Update how your growth journal greets you every morning.
            </p>

            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Morning Motto / Subtitle
                </label>
                <input
                  type="text"
                  value={tempSubtitle}
                  onChange={(e) => setTempSubtitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                  required
                />
              </div>

              <div className="pt-2 border-t border-[#F0E5F5] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Start fresh with a clean slate? This will reset your hours and progress.")) {
                      resetToFresh();
                      setShowProfileModal(false);
                    }
                  }}
                  className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start Clean Slate</span>
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowProfileModal(false)}
                    className="px-3 py-1.5 text-xs text-[#7D6B87]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] rounded-xl shadow-xs"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
