import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data/defaultData';
import { playSoftPop, playCelebrationChime, ambientPlayer } from '../utils/audio';
import { firePastelConfetti } from '../utils/confetti';

const JournalContext = createContext();

const FORBIDDEN_EMOJI_REGEX = /[📚📅📈🎯📝🚀🌱🌟✨]/g;

function sanitizeData(inputData) {
  try {
    const serialized = JSON.stringify(inputData);
    const sanitized = serialized.replace(FORBIDDEN_EMOJI_REGEX, '♡');
    const parsed = JSON.parse(sanitized);
    // Ensure default avatar is always the cute bear SVG and never an unsplash stock photo
    if (!parsed.profile || !parsed.profile.avatar || parsed.profile.avatar.includes('unsplash.com') || parsed.profile.avatar.includes('images.unsplash')) {
      parsed.profile = {
        ...(parsed.profile || {}),
        avatar: initialData.profile.avatar
      };
    }
    return parsed;
  } catch {
    return inputData;
  }
}

const STORAGE_KEY = 'growth_journal_data_v6_cute_bear';
const DARK_MODE_KEY = 'growth_journal_dark_mode';

export function JournalProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('growth_journal_data_v5_pure');
      if (saved) {
        return sanitizeData(JSON.parse(saved));
      }
    } catch {
      // Default fallback
    }
    return sanitizeData(initialData);
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      return localStorage.getItem(DARK_MODE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const [currentMonthId, setCurrentMonthId] = useState('focus-month-1');

  // Sync dark mode class on document element
  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem(DARK_MODE_KEY, 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem(DARK_MODE_KEY, 'false');
      }
    } catch {
      // Ignore
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    playSoftPop();
    setIsDarkMode((prev) => !prev);
  };

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage error fallback
    }
  }, [data]);

  // Notifications State
  const [dismissedNotifications, setDismissedNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('growth_journal_dismissed_notifications');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customNotifications, setCustomNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('growth_journal_custom_notifications');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const pushNotification = (notification) => {
    const newItem = {
      id: notification.id || 'notif_' + Date.now(),
      title: notification.title,
      message: notification.message,
      type: notification.type || 'info', // 'timer', 'achievement', 'habit', 'journal', 'focus'
      actionSection: notification.actionSection || null,
      actionLabel: notification.actionLabel || null,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setCustomNotifications((prev) => {
      const updated = [newItem, ...prev.filter((n) => n.id !== newItem.id).slice(0, 8)];
      try {
        localStorage.setItem('growth_journal_custom_notifications', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    playCelebrationChime();
  };

  const dismissNotification = (id) => {
    playSoftPop();
    setDismissedNotifications((prev) => {
      const updated = [...prev, id];
      try {
        localStorage.setItem('growth_journal_dismissed_notifications', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setCustomNotifications((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      try {
        localStorage.setItem('growth_journal_custom_notifications', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const clearAllNotifications = (activeIds = []) => {
    playSoftPop();
    setDismissedNotifications((prev) => {
      const updated = Array.from(new Set([...prev, ...activeIds]));
      try {
        localStorage.setItem('growth_journal_dismissed_notifications', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setCustomNotifications([]);
    try {
      localStorage.removeItem('growth_journal_custom_notifications');
    } catch {}
  };

  // Derive active dynamic notifications based on live data
  const getLiveNotifications = () => {
    const todayStr = new Date().toISOString().split('T')[0];

    // 1. Uncompleted habits for today
    const uncompletedHabits = (data.habits || []).filter(
      (h) => !data.habitHistory?.[`${h.id}_${todayStr}`]
    );

    // 2. Journal entry written today?
    const wroteJournalToday = (data.journalEntries || []).some(
      (e) => e.date === todayStr
    );

    // 3. Current month milestones
    const currentMonth = data.monthlyFocusList?.[0] || {};
    const milestones = currentMonth.milestones || [];
    const pendingMilestones = milestones.filter((m) => !m.done);

    const systemReminders = [];

    if (uncompletedHabits.length > 0) {
      const habitId = `habit_remind_${todayStr}_${uncompletedHabits.length}`;
      if (!dismissedNotifications.includes(habitId)) {
        systemReminders.push({
          id: habitId,
          title: "Daily Habits Reminder",
          message: `You have ${uncompletedHabits.length} habit${uncompletedHabits.length > 1 ? 's' : ''} left today: ${uncompletedHabits.slice(0, 2).map((h) => h.name).join(', ')}${uncompletedHabits.length > 2 ? '...' : ''}`,
          type: 'habit',
          actionSection: 'habits',
          actionLabel: 'Check Habits',
        });
      }
    }

    if (!wroteJournalToday) {
      const journalId = `journal_remind_${todayStr}`;
      if (!dismissedNotifications.includes(journalId)) {
        systemReminders.push({
          id: journalId,
          title: "Daily Journal Reflection",
          message: "Take a quiet moment to reflect: What did you learn and achieve today? ♡",
          type: 'journal',
          actionSection: 'journal',
          actionLabel: 'Write Entry',
        });
      }
    }

    if (pendingMilestones.length > 0 && currentMonth.skill) {
      const focusId = `focus_remind_${currentMonth.id}_${pendingMilestones.length}`;
      if (!dismissedNotifications.includes(focusId)) {
        systemReminders.push({
          id: focusId,
          title: `Monthly Focus: ${currentMonth.skill}`,
          message: `${milestones.length - pendingMilestones.length} of ${milestones.length} milestones completed. Keep going!`,
          type: 'focus',
          actionSection: 'monthly',
          actionLabel: 'View Focus',
        });
      }
    }

    return [...customNotifications, ...systemReminders];
  };

  const toggleAmbient = () => {
    const isPlaying = ambientPlayer.toggle();
    setAmbientPlaying(isPlaying);
  };

  // Profile update
  const updateProfile = (profileUpdate) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...profileUpdate },
    }));
  };

  // Reset to clean slate
  const resetToFresh = () => {
    setData(sanitizeData(initialData));
    playCelebrationChime();
  };

  // Schedule toggle
  const toggleScheduleItem = (id) => {
    playSoftPop();
    setData((prev) => ({
      ...prev,
      todaySchedule: prev.todaySchedule.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    }));
  };

  const addScheduleItem = (item) => {
    setData((prev) => ({
      ...prev,
      todaySchedule: [...prev.todaySchedule, { ...item, id: Date.now().toString(), completed: false }],
    }));
    playSoftPop();
  };

  // Habit toggling
  const toggleHabitDate = (habitId, dateStr) => {
    playSoftPop();
    setData((prev) => {
      const historyKey = `${habitId}_${dateStr}`;
      const wasDone = !!prev.habitHistory?.[historyKey];
      const newHistory = {
        ...(prev.habitHistory || {}),
        [historyKey]: !wasDone,
      };

      const newHabits = prev.habits.map((h) => {
        if (h.id === habitId) {
          const delta = !wasDone ? 1 : -1;
          const newStreak = Math.max(0, h.streak + delta);
          return {
            ...h,
            streak: newStreak,
            bestStreak: Math.max(h.bestStreak, newStreak),
          };
        }
        return h;
      });

      return {
        ...prev,
        habitHistory: newHistory,
        habits: newHabits,
      };
    });
  };

  const addHabit = (newHabit) => {
    setData((prev) => ({
      ...prev,
      habits: [
        ...prev.habits,
        {
          id: 'h_' + Date.now(),
          streak: 0,
          bestStreak: 0,
          color: '#A855F7',
          ...newHabit,
        },
      ],
    }));
    playCelebrationChime();
    firePastelConfetti();
  };

  const deleteHabit = (habitId) => {
    setData((prev) => ({
      ...prev,
      habits: prev.habits.filter((h) => h.id !== habitId),
    }));
  };

  // Monthly Focus & Milestones
  const updateMonthlySkill = (monthId, updates) => {
    setData((prev) => ({
      ...prev,
      monthlyFocusList: prev.monthlyFocusList.map((m) =>
        m.id === monthId ? { ...m, ...updates } : m
      ),
    }));
    playCelebrationChime();
  };

  const addMonthlyMilestone = (monthId, milestoneTitle) => {
    if (!milestoneTitle.trim()) return;
    setData((prev) => ({
      ...prev,
      monthlyFocusList: prev.monthlyFocusList.map((m) =>
        m.id === monthId
          ? {
              ...m,
              milestones: [
                ...m.milestones,
                { id: 'ms_' + Date.now(), title: milestoneTitle.trim(), done: false },
              ],
            }
          : m
      ),
    }));
    playSoftPop();
  };

  const deleteMonthlyMilestone = (monthId, milestoneId) => {
    setData((prev) => ({
      ...prev,
      monthlyFocusList: prev.monthlyFocusList.map((m) =>
        m.id === monthId
          ? {
              ...m,
              milestones: m.milestones.filter((ms) => ms.id !== milestoneId),
            }
          : m
      ),
    }));
  };

  const toggleMonthlyMilestone = (monthId, milestoneId) => {
    playSoftPop();
    setData((prev) => {
      let isComplete = false;
      const updatedList = prev.monthlyFocusList.map((month) => {
        if (month.id === monthId) {
          const updatedMilestones = month.milestones.map((m) => {
            if (m.id === milestoneId) {
              const nextDone = !m.done;
              if (nextDone) isComplete = true;
              return { ...m, done: nextDone };
            }
            return m;
          });
          return { ...month, milestones: updatedMilestones };
        }
        return month;
      });

      if (isComplete) {
        playCelebrationChime();
        firePastelConfetti();
      }

      return {
        ...prev,
        monthlyFocusList: updatedList,
      };
    });
  };

  const updateMonthlyAssessment = (monthId, assessmentData) => {
    setData((prev) => ({
      ...prev,
      monthlyFocusList: prev.monthlyFocusList.map((m) =>
        m.id === monthId ? { ...m, finalAssessment: { ...m.finalAssessment, ...assessmentData } } : m
      ),
    }));
  };

  const updateMonthlyHours = (monthId, hours) => {
    setData((prev) => ({
      ...prev,
      monthlyFocusList: prev.monthlyFocusList.map((m) =>
        m.id === monthId ? { ...m, completedHours: Number(hours) } : m
      ),
    }));
  };

  const addMonthlyFocus = (newMonth) => {
    setData((prev) => ({
      ...prev,
      monthlyFocusList: [...prev.monthlyFocusList, newMonth],
    }));
  };

  // Daily Journal
  const addJournalEntry = (entry) => {
    const newEntry = {
      id: 'j_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...entry,
    };
    setData((prev) => ({
      ...prev,
      journalEntries: [newEntry, ...prev.journalEntries],
    }));
    playCelebrationChime();
    firePastelConfetti();
  };

  const deleteJournalEntry = (id) => {
    setData((prev) => ({
      ...prev,
      journalEntries: prev.journalEntries.filter((j) => j.id !== id),
    }));
  };

  // Achievements
  const unlockAchievement = (id) => {
    playCelebrationChime();
    firePastelConfetti();
    const targetAch = (data.achievements || []).find((a) => a.id === id);
    if (targetAch) {
      pushNotification({
        id: 'ach_unlock_' + id,
        title: `Achievement Unlocked: ${targetAch.title} 🏆`,
        message: "Congratulations! You reached a milestone in your growth journey.",
        type: 'achievement',
        actionSection: 'rewards',
        actionLabel: 'View Badges →',
      });
    }
    setData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((ach) =>
        ach.id === id ? { ...ach, unlocked: true, unlockedDate: 'Unlocked Today! 🌸' } : ach
      ),
    }));
  };

  const addAchievement = (newAch) => {
    playCelebrationChime();
    setData((prev) => ({
      ...prev,
      achievements: [
        {
          id: 'ach_' + Date.now(),
          unlocked: true,
          unlockedDate: 'Today ♡',
          color: '#C084FC',
          ...newAch,
        },
        ...prev.achievements,
      ],
    }));
  };

  // Skills Data manipulation
  const toggleFlashcardMastered = (id) => {
    playSoftPop();
    setData((prev) => {
      const vocab = prev.skillsData.english.vocabulary.map((card) =>
        card.id === id ? { ...card, mastered: !card.mastered } : card
      );
      return {
        ...prev,
        skillsData: {
          ...prev.skillsData,
          english: {
            ...prev.skillsData.english,
            vocabulary: vocab,
          },
        },
      };
    });
  };

  const addFlashcard = (card) => {
    setData((prev) => ({
      ...prev,
      skillsData: {
        ...prev.skillsData,
        english: {
          ...prev.skillsData.english,
          vocabulary: [
            ...prev.skillsData.english.vocabulary,
            { id: 'vc_' + Date.now(), mastered: false, ...card },
          ],
        },
      },
    }));
  };

  const addSpeakingLog = (log) => {
    playCelebrationChime();
    setData((prev) => ({
      ...prev,
      skillsData: {
        ...prev.skillsData,
        english: {
          ...prev.skillsData.english,
          speaking: [
            { id: 'sp_' + Date.now(), date: 'Today', ...log },
            ...prev.skillsData.english.speaking,
          ],
        },
      },
    }));
  };

  const addWritingEssay = (essay) => {
    playCelebrationChime();
    setData((prev) => ({
      ...prev,
      skillsData: {
        ...prev.skillsData,
        english: {
          ...prev.skillsData.english,
          writing: [
            { id: 'wr_' + Date.now(), date: 'Today', status: 'Drafted', ...essay },
            ...prev.skillsData.english.writing,
          ],
        },
      },
    }));
  };

  const addPodcastLog = (podcast) => {
    playCelebrationChime();
    setData((prev) => ({
      ...prev,
      skillsData: {
        ...prev.skillsData,
        english: {
          ...prev.skillsData.english,
          listening: [
            { id: 'ls_' + Date.now(), date: 'Today', ...podcast },
            ...prev.skillsData.english.listening,
          ],
        },
      },
    }));
  };

  const updateBookReadingProgress = (bookId, pagesRead) => {
    setData((prev) => {
      const books = prev.skillsData.english.reading.map((b) =>
        b.id === bookId
          ? {
              ...b,
              pagesRead: Number(pagesRead),
              status: Number(pagesRead) >= b.totalPages ? 'Completed' : 'Currently Reading',
            }
          : b
      );
      return {
        ...prev,
        skillsData: {
          ...prev.skillsData,
          english: {
            ...prev.skillsData.english,
            reading: books,
          },
        },
      };
    });
  };

  // Vision Board
  const toggleBucketItem = (id) => {
    playSoftPop();
    setData((prev) => ({
      ...prev,
      visionBoard: {
        ...prev.visionBoard,
        bucketList: prev.visionBoard.bucketList.map((b) =>
          b.id === id ? { ...b, done: !b.done } : b
        ),
      },
    }));
  };

  const addBucketItem = (itemText) => {
    setData((prev) => ({
      ...prev,
      visionBoard: {
        ...prev.visionBoard,
        bucketList: [
          ...prev.visionBoard.bucketList,
          { id: 'bc_' + Date.now(), item: itemText, done: false },
        ],
      },
    }));
  };

  const addVisionDream = (dream) => {
    setData((prev) => ({
      ...prev,
      visionBoard: {
        ...prev.visionBoard,
        dreams: [
          ...prev.visionBoard.dreams,
          { id: 'vd_' + Date.now(), tapeColor: 'purple', ...dream },
        ],
      },
    }));
    playCelebrationChime();
    firePastelConfetti();
  };

  // Quick notes
  const addQuickNote = (note) => {
    setData((prev) => ({
      ...prev,
      quickNotes: [note, ...prev.quickNotes],
    }));
  };

  const deleteQuickNote = (index) => {
    setData((prev) => ({
      ...prev,
      quickNotes: prev.quickNotes.filter((_, idx) => idx !== index),
    }));
  };

  return (
    <JournalContext.Provider
      value={{
        data,
        isDarkMode,
        toggleDarkMode,
        activeSection,
        setActiveSection,
        searchQuery,
        setSearchQuery,
        ambientPlaying,
        toggleAmbient,
        currentMonthId,
        setCurrentMonthId,
        updateProfile,
        resetToFresh,
        toggleScheduleItem,
        addScheduleItem,
        toggleHabitDate,
        addHabit,
        deleteHabit,
        updateMonthlySkill,
        addMonthlyMilestone,
        deleteMonthlyMilestone,
        toggleMonthlyMilestone,
        updateMonthlyAssessment,
        updateMonthlyHours,
        addMonthlyFocus,
        addJournalEntry,
        deleteJournalEntry,
        unlockAchievement,
        addAchievement,
        toggleFlashcardMastered,
        addFlashcard,
        addSpeakingLog,
        addWritingEssay,
        addPodcastLog,
        updateBookReadingProgress,
        toggleBucketItem,
        addBucketItem,
        addVisionDream,
        quickNotes: data.quickNotes,
        addQuickNote,
        deleteQuickNote,
        pushNotification,
        dismissNotification,
        clearAllNotifications,
        getLiveNotifications,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
}
