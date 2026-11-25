import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data/defaultData';
import { playSoftPop, playCelebrationChime, ambientPlayer } from '../utils/audio';
import { firePastelConfetti } from '../utils/confetti';

const JournalContext = createContext();

const STORAGE_KEY = 'growth_journal_data_v1';

export function JournalProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Default fallback
    }
    return initialData;
  });

  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const [currentMonthId, setCurrentMonthId] = useState('nov-2026');

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage error fallback
    }
  }, [data]);

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
  };

  const deleteHabit = (habitId) => {
    setData((prev) => ({
      ...prev,
      habits: prev.habits.filter((h) => h.id !== habitId),
    }));
  };

  // Monthly Focus & Milestones
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
    setData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((ach) =>
        ach.id === id ? { ...ach, unlocked: true, unlockedDate: 'Just now! 🌸' } : ach
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
          unlockedDate: 'Today ✨',
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
        activeSection,
        setActiveSection,
        searchQuery,
        setSearchQuery,
        ambientPlaying,
        toggleAmbient,
        currentMonthId,
        setCurrentMonthId,
        updateProfile,
        toggleScheduleItem,
        addScheduleItem,
        toggleHabitDate,
        addHabit,
        deleteHabit,
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
