import React, { useState } from 'react';
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
  const { activeSection } = useJournal();
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
