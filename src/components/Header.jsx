import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Search, Bell, Moon, Sun, Menu, Heart, CheckCircle2, RotateCcw, 
  Camera, Upload, Check, X, Flame, Clock, Trophy, ArrowRight, Sparkles 
} from 'lucide-react';
import { useJournal } from '../context/JournalContext';
import { playCelebrationChime, playSoftPop } from '../utils/audio';

export default function Header({ onMenuClick }) {
  const { 
    data, 
    updateProfile, 
    searchQuery, 
    setSearchQuery, 
    isDarkMode, 
    toggleDarkMode, 
    resetToFresh,
    setActiveSection,
    getLiveNotifications,
    dismissNotification,
    clearAllNotifications,
    pushNotification,
  } = useJournal();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [tempName, setTempName] = useState(data.profile.name);
  const [tempSubtitle, setTempSubtitle] = useState(data.profile.subtitle);
  const [tempAvatar, setTempAvatar] = useState(data.profile.avatar);
  const [avatarTab, setAvatarTab] = useState('upload'); // upload, url
  const [customUrl, setCustomUrl] = useState('');
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  const fileInputRef = useRef(null);
  const notificationRef = useRef(null);

  // Close notifications on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotificationToast(false);
      }
    };
    if (showNotificationToast) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotificationToast]);

  const liveNotifications = getLiveNotifications ? getLiveNotifications() : [];

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

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
                <Heart className="w-4 h-4 text-pink-400 fill-pink-400 inline" />
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

          {/* Notifications Button & Dropdown */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => {
                playSoftPop();
                setShowNotificationToast(!showNotificationToast);
              }}
              className="w-9 h-9 rounded-full bg-white dark:bg-[#2A203C] border border-[#E7DCEE] dark:border-[#4E3D69] flex items-center justify-center text-[#74617F] dark:text-[#C5B7D8] hover:bg-[#F5EDFA] dark:hover:bg-[#34284B] hover:text-[#562F70] transition-colors relative shadow-2xs cursor-pointer"
              title={liveNotifications.length > 0 ? `${liveNotifications.length} reminder(s)` : "Notifications"}
            >
              <Bell className="w-4 h-4" />
              {liveNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#F472B6] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-[#2A203C] shadow-xs animate-in zoom-in-50">
                  {liveNotifications.length}
                </span>
              )}
            </button>

            {showNotificationToast && (
              <div className="notification-panel absolute right-0 mt-2 w-80 sm:w-92 bg-white rounded-3xl shadow-2xl border border-[#EADDF2] p-4 z-50 animate-in fade-in slide-in-from-top-2">
                {/* Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-[#F0E6F5] dark:border-[#382C4E]">
                  <div className="flex items-center gap-1.5">
                    <span className="notification-header-title text-xs font-bold text-[#4B3855] font-title">
                      Today's Reminders
                    </span>
                    <span className="text-xs">🌸</span>
                    {liveNotifications.length > 0 && (
                      <span className="text-[10px] font-bold bg-[#F3E8FF] dark:bg-[#4C336D] text-[#9333EA] dark:text-[#E9D5FF] px-2 py-0.5 rounded-full">
                        {liveNotifications.length} new
                      </span>
                    )}
                  </div>
                  {liveNotifications.length > 0 && (
                    <button
                      onClick={() => clearAllNotifications(liveNotifications.map(n => n.id))}
                      className="text-[11px] text-[#A855F7] dark:text-[#D8B4FE] hover:underline font-semibold cursor-pointer"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Notifications List */}
                <div className="mt-3 space-y-2.5 max-h-[360px] overflow-y-auto pr-0.5">
                  {liveNotifications.length === 0 ? (
                    <div className="py-8 px-4 text-center flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#FAF5FE] dark:bg-[#2D2142] border border-[#EADDF4] dark:border-[#4A3966] flex items-center justify-center text-lg mb-2 shadow-2xs">
                        🍵
                      </div>
                      <p className="notification-item-title text-xs font-bold text-[#574462]">
                        All caught up! ♡
                      </p>
                      <p className="notification-item-message text-[11px] text-[#9884A4] mt-0.5 max-w-[200px]">
                        No pending reminders for today. You're doing wonderful work!
                      </p>
                    </div>
                  ) : (
                    liveNotifications.map((notif) => {
                      let IconComponent = CheckCircle2;
                      let iconColor = 'text-purple-500 bg-purple-100 dark:bg-purple-950/40 dark:text-purple-300';
                      if (notif.type === 'habit') {
                        IconComponent = Flame;
                        iconColor = 'text-amber-500 bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300';
                      } else if (notif.type === 'journal') {
                        IconComponent = Heart;
                        iconColor = 'text-pink-500 bg-pink-100 dark:bg-pink-950/40 dark:text-pink-300';
                      } else if (notif.type === 'timer') {
                        IconComponent = Clock;
                        iconColor = 'text-sky-500 bg-sky-100 dark:bg-sky-950/40 dark:text-sky-300';
                      } else if (notif.type === 'achievement') {
                        IconComponent = Trophy;
                        iconColor = 'text-yellow-500 bg-yellow-100 dark:bg-yellow-950/40 dark:text-yellow-300';
                      }

                      return (
                        <div
                          key={notif.id}
                          className="notification-item-card p-3 bg-[#FAF7FC] rounded-2xl border border-[#EDE2F4] text-[#55425F] relative group transition-all hover:border-[#D6BCFA]"
                        >
                          <div className="flex items-start gap-2.5">
                            <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${iconColor}`}>
                              <IconComponent className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0 pr-4">
                              <div className="flex items-center justify-between">
                                <p className="notification-item-title text-xs font-bold text-[#4B3755] truncate">
                                  {notif.title}
                                </p>
                              </div>
                              <p className="notification-item-message text-[11px] text-[#786386] mt-0.5 leading-relaxed">
                                {notif.message}
                              </p>
                              {notif.actionSection && (
                                <button
                                  onClick={() => {
                                    playSoftPop();
                                    setActiveSection(notif.actionSection);
                                    setShowNotificationToast(false);
                                  }}
                                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#9333EA] dark:text-[#D8B4FE] hover:underline cursor-pointer"
                                >
                                  <span>{notif.actionLabel || 'Open now'}</span>
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                dismissNotification(notif.id);
                              }}
                              className="text-[#B6A6C1] hover:text-[#5F456F] dark:text-[#B9A8CD] dark:hover:text-[#FFFFFF] p-1 rounded-lg transition-colors cursor-pointer"
                              title="Dismiss"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer Quick Action */}
                <div className="mt-3 pt-2.5 border-t border-[#F0E6F5] dark:border-[#382C4E] flex items-center justify-between text-[11px]">
                  <span className="text-[#9C8AAB] dark:text-[#BFAECF]">
                    Daily Growth Reminders ♡
                  </span>
                  <button
                    onClick={() => {
                      pushNotification({
                        id: 'test_' + Date.now(),
                        title: 'Sweet Reminder 🌸',
                        message: "Take a sip of water and stretch! You're making progress every single day.",
                        type: 'journal',
                      });
                    }}
                    className="text-[#9333EA] dark:text-[#D8B4FE] font-semibold hover:underline cursor-pointer"
                  >
                    Send test alert
                  </button>
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

      {/* Enhanced Profile & Picture Modification Modal mounted directly to document.body via Portal */}
      {showProfileModal && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 bg-purple-950/60 backdrop-blur-md flex items-center justify-center p-4 z-[9999] animate-in fade-in duration-200">
          <div 
            className="fixed inset-0" 
            onClick={() => setShowProfileModal(false)}
          />
          <div className="relative bg-white rounded-3xl p-6 w-full max-w-md border border-[#EADDF0] shadow-2xl overflow-y-auto max-h-[90vh] my-auto z-10">
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

              {/* Picture Options: Upload File vs URL Only */}
              <div className="bg-[#FAF6FC] border border-[#EADBEE] rounded-2xl p-3.5 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-[#665370]">
                  <span>Profile Picture Source:</span>
                  <div className="flex gap-1 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setAvatarTab('upload')}
                      className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${avatarTab === 'upload' ? 'bg-[#A855F7] text-white font-bold shadow-2xs' : 'text-[#877492] hover:bg-purple-100'}`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setAvatarTab('url')}
                      className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${avatarTab === 'url' ? 'bg-[#A855F7] text-white font-bold shadow-2xs' : 'text-[#877492] hover:bg-purple-100'}`}
                    >
                      Paste URL
                    </button>
                  </div>
                </div>

                {/* Upload File Option */}
                {avatarTab === 'upload' && (
                  <div className="pt-0.5">
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
                      className="w-full py-3 px-3 border-2 border-dashed border-[#CBB8DD] hover:border-[#A855F7] rounded-xl text-xs font-semibold text-[#7E22CE] bg-white flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs hover:bg-[#FAF6FD]"
                    >
                      <Upload className="w-4 h-4 text-[#A855F7]" />
                      <span>Choose image file from your computer</span>
                    </button>
                    <p className="text-[10px] text-center text-[#9E8CA9] mt-1.5">
                      Supports PNG, JPG, JPEG, WEBP or GIF
                    </p>
                  </div>
                )}

                {/* Custom URL Option */}
                {avatarTab === 'url' && (
                  <div className="space-y-1.5 pt-0.5">
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://example.com/my-photo.jpg"
                        value={customUrl}
                        onChange={(e) => setCustomUrl(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs bg-white border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={handleApplyUrl}
                        className="px-3.5 py-2 bg-[#A855F7] hover:bg-[#9333EA] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    <p className="text-[10px] text-[#9E8CA9]">
                      Paste any direct image link to set your profile picture
                    </p>
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
        </div>,
        document.body
      )}
    </header>
  );
}
