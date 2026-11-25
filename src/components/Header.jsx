import React, { useState, useRef } from 'react';
import { Search, Bell, Moon, Sun, Menu, Sparkles, Heart, CheckCircle2, RotateCcw, Camera, Upload, Check } from 'lucide-react';
import { useJournal } from '../context/JournalContext';
import { playCelebrationChime } from '../utils/audio';

export default function Header({ onMenuClick }) {
  const { data, updateProfile, searchQuery, setSearchQuery, isDarkMode, toggleDarkMode, resetToFresh } = useJournal();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [tempName, setTempName] = useState(data.profile.name);
  const [tempSubtitle, setTempSubtitle] = useState(data.profile.subtitle);
  const [tempAvatar, setTempAvatar] = useState(data.profile.avatar);
  const [avatarTab, setAvatarTab] = useState('presets'); // presets, upload, url
  const [customUrl, setCustomUrl] = useState('');
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  const fileInputRef = useRef(null);

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Aesthetic Preset Avatars
  const presetAvatars = [
    { id: 'p1', label: 'Cozy Portrait', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80' },
    { id: 'p2', label: 'Warm Smile', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80' },
    { id: 'p3', label: 'Study Girl', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80' },
    { id: 'p4', label: 'Creative Mind', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80' },
    { id: 'p5', label: 'Gentle Artist', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80' },
    { id: 'p6', label: 'Cozy Pet', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=250&q=80' },
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setTempAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrl = (e) => {
    e.preventDefault();
    if (customUrl.trim()) {
      setTempAvatar(customUrl.trim());
      setCustomUrl('');
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: tempName.trim() || 'My Journal',
      subtitle: tempSubtitle.trim() || 'Focus today, shine tomorrow. ♡',
      avatar: tempAvatar,
    });
    playCelebrationChime();
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

          {/* User Avatar & Profile Modal Trigger */}
          <button
            onClick={() => {
              setTempName(data.profile.name);
              setTempSubtitle(data.profile.subtitle);
              setTempAvatar(data.profile.avatar);
              setShowProfileModal(true);
            }}
            className="relative group focus:outline-hidden"
            title="Click to view & customize your profile and picture"
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

      {/* Enhanced Profile & Picture Modification Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-purple-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md border border-[#EADDF0] shadow-2xl overflow-y-auto max-h-[88vh] my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F2E8F8]">
              <div>
                <h3 className="text-lg font-bold text-[#4B3953] font-title flex items-center gap-1.5">
                  <span>Your Profile & Identity</span>
                  <span>🌸</span>
                </h3>
                <p className="text-xs text-[#897793]">
                  Customize your name, motto, and profile picture.
                </p>
              </div>
              <span className="text-xs font-semibold text-[#8B5CF6] bg-[#F5EEFB] px-2.5 py-1 rounded-full">
                Active Space
              </span>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-4 space-y-4">
              {/* Picture Preview & Quick Upload Trigger */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <div className="w-24 h-24 rounded-full border-4 border-[#D8B4FE] p-1 shadow-md overflow-hidden bg-purple-50">
                    <img
                      src={tempAvatar}
                      alt={tempName}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="absolute inset-0 bg-purple-950/40 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6 mb-0.5" />
                    <span className="text-[10px] font-bold">Change</span>
                  </div>
                </div>
                <span className="text-[11px] text-[#8C7A96] mt-1.5">
                  Click avatar or choose an option below
                </span>
              </div>

              {/* Picture Options: Presets vs Upload vs URL */}
              <div className="bg-[#FAF6FC] border border-[#EADBEE] rounded-2xl p-3 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-semibold text-[#665370]">
                  <span>Choose Profile Picture:</span>
                  <div className="flex gap-1 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setAvatarTab('presets')}
                      className={`px-2 py-0.5 rounded-md ${avatarTab === 'presets' ? 'bg-[#A855F7] text-white font-bold' : 'text-[#877492] hover:bg-purple-100'}`}
                    >
                      Presets
                    </button>
                    <button
                      type="button"
                      onClick={() => setAvatarTab('upload')}
                      className={`px-2 py-0.5 rounded-md ${avatarTab === 'upload' ? 'bg-[#A855F7] text-white font-bold' : 'text-[#877492] hover:bg-purple-100'}`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setAvatarTab('url')}
                      className={`px-2 py-0.5 rounded-md ${avatarTab === 'url' ? 'bg-[#A855F7] text-white font-bold' : 'text-[#877492] hover:bg-purple-100'}`}
                    >
                      URL
                    </button>
                  </div>
                </div>

                {/* Presets Grid */}
                {avatarTab === 'presets' && (
                  <div className="grid grid-cols-6 gap-2 pt-1">
                    {presetAvatars.map((preset) => {
                      const isSelected = tempAvatar === preset.url;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setTempAvatar(preset.url)}
                          className={`
                            relative aspect-square rounded-full overflow-hidden border-2 transition-transform hover:scale-105
                            ${isSelected ? 'border-[#A855F7] ring-2 ring-purple-300' : 'border-transparent'}
                          `}
                          title={preset.label}
                        >
                          <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                          {isSelected && (
                            <div className="absolute inset-0 bg-[#A855F7]/40 flex items-center justify-center">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Upload File Option */}
                {avatarTab === 'upload' && (
                  <div className="pt-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2.5 px-3 border-2 border-dashed border-[#CBB8DD] hover:border-[#A855F7] rounded-xl text-xs font-semibold text-[#7E22CE] bg-white flex items-center justify-center gap-2 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload image from your computer</span>
                    </button>
                  </div>
                )}

                {/* Custom URL Option */}
                {avatarTab === 'url' && (
                  <div className="flex gap-2 pt-1">
                    <input
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={handleApplyUrl}
                      className="px-3 py-1.5 bg-[#A855F7] text-white text-xs font-semibold rounded-xl"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Name input */}
              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Your Display Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Divya"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden font-bold text-[#4B3953]"
                  required
                />
              </div>

              {/* Subtitle / Morning Motto input */}
              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Morning Motto / Daily Intention
                </label>
                <input
                  type="text"
                  placeholder="Focus today, shine tomorrow. ♡"
                  value={tempSubtitle}
                  onChange={(e) => setTempSubtitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden text-[#584561]"
                  required
                />
              </div>

              {/* Footer actions */}
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
                  <span>Reset All Data</span>
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
                    Save Changes
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
