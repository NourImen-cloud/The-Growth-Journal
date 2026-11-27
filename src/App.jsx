import React, { useState } from 'react';
import { Clock, X, ArrowRight } from 'lucide-react';
import { JournalProvider, useJournal } from './context/JournalContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import MonthlyFocusView from './components/MonthlyFocusView';
import HabitTrackerView from './components/HabitTrackerView';
import SkillProgressView from './components/SkillProgressView';
import DailyJournalView from './components/DailyJournalView';
import AchievementsView from './components/AchievementsView';
import VisionBoardView from './components/VisionBoardView';

function MainLayout() {
  const { activeSection, setActiveSection, activeToast, dismissToast } = useJournal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'monthlyFocus':
        return <MonthlyFocusView />;
      case 'habitTracker':
        return <HabitTrackerView />;
      case 'skillProgress':
        return <SkillProgressView />;
      case 'dailyJournal':
        return <DailyJournalView />;
      case 'achievements':
        return <AchievementsView />;
      case 'visionBoard':
        return <VisionBoardView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F2] dark:bg-[#151120] flex flex-row relative bg-dot-pattern transition-colors">
      {/* Real-Time Floating 5-Minute Task Alert Toast */}
      {activeToast && (
        <div className="fixed top-5 right-5 z-[99999] max-w-sm w-full mx-4 sm:mx-0 bg-white/95 dark:bg-[#231A33]/95 backdrop-blur-md border-2 border-[#D8B4FE] dark:border-[#7A5B9C] shadow-2xl rounded-3xl p-4 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center shrink-0 text-purple-600 dark:text-purple-300">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold bg-[#F3E8FF] dark:bg-[#4C336D] text-[#9333EA] dark:text-[#E9D5FF] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {activeToast.badge}
                </span>
                <button
                  onClick={dismissToast}
                  className="text-[#A291AB] hover:text-[#4A3955] dark:hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                  title="Close alert"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="toast-title font-bold text-sm text-[#463350] mt-1.5 truncate">
                {activeToast.title}
              </p>
              <div className="flex items-center justify-between mt-1">
                <p className="toast-subtext text-xs text-[#7B698A]">
                  Scheduled for <span className="font-semibold text-[#8C52AA]">{activeToast.time}</span>
                </p>
                <button
                  onClick={() => {
                    setActiveSection('dashboard');
                    dismissToast();
                  }}
                  className="text-xs font-bold text-[#9333EA] dark:text-[#D8B4FE] hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cozy Sidebar */}
      <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header onMenuClick={() => setMobileMenuOpen(true)} />

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <JournalProvider>
      <MainLayout />
    </JournalProvider>
  );
}
