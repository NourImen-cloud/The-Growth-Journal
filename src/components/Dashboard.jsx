import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Plus, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  BookOpen, 
  ChevronRight, 
  Flame, 
  Heart, 
  Calendar, 
  Languages, 
  PenTool, 
  Headphones, 
  Award, 
  Compass, 
  Edit3, 
  RotateCcw 
} from 'lucide-react';
import { useJournal } from '../context/JournalContext';
import PomodoroWidget from './PomodoroWidget';
import { CuteRibbonBow, LavenderVase, Paperclip, FluffyMascot } from './AestheticDecorations';
import { playSoftPop } from '../utils/audio';

const dailyMotivations = [
  { text: "One day all your hard work will pay off.", footer: "Keep shining brightly ♡", gradient: "from-[#E9D5FF] via-[#FCE7F3] to-[#FEF08A]" },
  { text: "Small daily improvements over time lead to stunning results.", footer: "Trust the process ♡", gradient: "from-[#FCE7F3] via-[#EDE9FE] to-[#BAE6FD]" },
  { text: "You don't have to be extreme, just consistent.", footer: "Step by step ♡", gradient: "from-[#FEF08A] via-[#FBCFE8] to-[#E9D5FF]" },
  { text: "The secret of getting ahead is getting started.", footer: "Today is your day ♡", gradient: "from-[#EDE9FE] via-[#FCE7F3] to-[#FED7AA]" },
  { text: "Be proud of every step you take toward your dreams.", footer: "Celebrate yourself ♡", gradient: "from-[#E0E7FF] via-[#FCE7F3] to-[#FDE047]" },
  { text: "Discipline is simply choosing who you want to become.", footer: "Focus and flourish 🌸", gradient: "from-[#F5D0FE] via-[#E0E7FF] to-[#BBF7D0]" },
  { text: "Quiet mornings build powerful futures.", footer: "Your time is sacred ♡", gradient: "from-[#DDD6FE] via-[#FBCFE8] to-[#FEF08A]" },
  { text: "You are capable of far more than you know.", footer: "Believe a little more ♡", gradient: "from-[#FED7AA] via-[#FCE7F3] to-[#E9D5FF]" },
  { text: "Consistency turns average into excellence.", footer: "Keep showing up ♡", gradient: "from-[#FCE7F3] via-[#DDD6FE] to-[#BAE6FD]" },
  { text: "Breathe. You don't have to figure it all out today.", footer: "Peaceful progress 🌸", gradient: "from-[#E9D5FF] via-[#FED7AA] to-[#FCE7F3]" },
  { text: "Every expert was once a beginner who refused to quit.", footer: "You've got this ♡", gradient: "from-[#BAE6FD] via-[#EDE9FE] to-[#FCE7F3]" },
  { text: "What you water today will bloom tomorrow.", footer: "Patience and grace 🌿", gradient: "from-[#BBF7D0] via-[#FCE7F3] to-[#DDD6FE]" },
  { text: "Success is the sum of small efforts repeated daily.", footer: "Little by little ♡", gradient: "from-[#FDE047] via-[#FBCFE8] to-[#E0E7FF]" },
  { text: "Fall in love with the quiet process of learning.", footer: "Curiosity is magic ♡", gradient: "from-[#E9D5FF] via-[#FCE7F3] to-[#FEF08A]" },
  { text: "Your future self will thank you for today's dedication.", footer: "Make yourself proud ♡", gradient: "from-[#FCE7F3] via-[#E0E7FF] to-[#FED7AA]" },
  { text: "Mistakes are proof that you are trying and growing.", footer: "Keep going forward 🌸", gradient: "from-[#FED7AA] via-[#DDD6FE] to-[#BAE6FD]" },
  { text: "Courage doesn't always roar. Sometimes it's a quiet whisper.", footer: "I will try again tomorrow ♡", gradient: "from-[#DDD6FE] via-[#FBCFE8] to-[#FEF08A]" },
  { text: "Focus on progress, not perfection.", footer: "Grace over guilt ♡", gradient: "from-[#E0E7FF] via-[#FCE7F3] to-[#BBF7D0]" },
  { text: "A gentle reminder: You are doing better than you think.", footer: "Be kind to yourself ♡", gradient: "from-[#FCE7F3] via-[#FED7AA] to-[#E9D5FF]" },
  { text: "Energy flows where attention goes.", footer: "Guard your focus 🌸", gradient: "from-[#BAE6FD] via-[#DDD6FE] to-[#FCE7F3]" },
  { text: "The magic you're looking for is in the work you avoid.", footer: "Start with 5 minutes ♡", gradient: "from-[#FEF08A] via-[#FCE7F3] to-[#E0E7FF]" },
  { text: "Bloom with grace and quiet confidence.", footer: "Shine your own light ♡", gradient: "from-[#F5D0FE] via-[#FED7AA] to-[#BAE6FD]" },
  { text: "Action creates clarity. Start before you feel ready.", footer: "Take the leap ♡", gradient: "from-[#E9D5FF] via-[#FCE7F3] to-[#FED7AA]" },
  { text: "Celebrate the small wins. They are your milestones.", footer: "Every victory counts 🌸", gradient: "from-[#BBF7D0] via-[#DDD6FE] to-[#FCE7F3]" },
  { text: "Your potential is unlimited. Your focus is your power.", footer: "Own this day ♡", gradient: "from-[#FED7AA] via-[#E0E7FF] to-[#FDE047]" },
  { text: "Peace begins the moment you choose not to rush.", footer: "Slow and steady ♡", gradient: "from-[#DDD6FE] via-[#FCE7F3] to-[#BAE6FD]" },
  { text: "Great things are done by a series of small things brought together.", footer: "One piece at a time ♡", gradient: "from-[#FCE7F3] via-[#FEF08A] to-[#E9D5FF]" },
  { text: "You are the author of this chapter. Write it beautifully.", footer: "Your story matters 🌸", gradient: "from-[#E0E7FF] via-[#FBCFE8] to-[#FED7AA]" },
  { text: "Do something today that makes tomorrow easier.", footer: "Gift to your future self ♡", gradient: "from-[#FED7AA] via-[#BAE6FD] to-[#DDD6FE]" },
  { text: "Cultivate a mind that sees opportunities in obstacles.", footer: "Growth mindset ♡", gradient: "from-[#FDE047] via-[#FCE7F3] to-[#E0E7FF]" },
  { text: "Believe in who you are becoming, every single sunrise.", footer: "You are blooming ♡", gradient: "from-[#E9D5FF] via-[#FED7AA] to-[#FCE7F3]" },
];

export default function Dashboard() {
  const { 
    data, 
    setActiveSection, 
    toggleScheduleItem, 
    addScheduleItem, 
    toggleHabitDate, 
    addHabit,
    updateMonthlySkill,
    addQuickNote 
  } = useJournal();

  const [newScheduleTitle, setNewScheduleTitle] = useState('');
  const [newScheduleTime, setNewScheduleTime] = useState('');
  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [showAddNote, setShowAddNote] = useState(false);

  // Quick Add Habit Modal
  const [showAddHabitModal, setShowAddHabitModal] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitCategory, setNewHabitCategory] = useState('Learning');
  const [newHabitColor, setNewHabitColor] = useState('#A855F7');

  // Quick Edit Monthly Skill Modal
  const [showEditSkillModal, setShowEditSkillModal] = useState(false);
  const currentMonth = data.monthlyFocusList[0];
  const [quickSkillName, setQuickSkillName] = useState(currentMonth.skill);
  const [quickGoal, setQuickGoal] = useState(currentMonth.goal);
  const [quickTargetHours, setQuickTargetHours] = useState(currentMonth.targetHours);

  // Daily Motivation (changes every day based on date)
  const todayDayNumber = new Date().getDate(); // 1 to 31
  const [motivationIndex, setMotivationIndex] = useState(Math.max(0, todayDayNumber - 1) % dailyMotivations.length);
  const currentMotivation = dailyMotivations[motivationIndex];

  const handleNextMotivation = (e) => {
    e.stopPropagation();
    playSoftPop();
    setMotivationIndex((prev) => (prev + 1) % dailyMotivations.length);
  };

  const todayStr = new Date().toISOString().split('T')[0];

  // Calculate today's habit completion
  const todayHabitsDoneCount = data.habits.filter(
    (h) => data.habitHistory?.[`${h.id}_${todayStr}`]
  ).length;

  const currentMonthProgress = currentMonth.targetHours > 0
    ? Math.round((currentMonth.completedHours / currentMonth.targetHours) * 100)
    : 0;

  const handleAddPlan = (e) => {
    e.preventDefault();
    if (!newScheduleTitle || !newScheduleTime) return;
    addScheduleItem({
      time: newScheduleTime,
      title: newScheduleTitle,
      duration: '45 mins',
      category: 'Focus',
      color: '#A855F7',
    });
    setNewScheduleTitle('');
    setNewScheduleTime('');
    setShowAddPlanModal(false);
  };

  const handleAddHabit = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    addHabit({
      name: newHabitName.trim(),
      category: newHabitCategory,
      color: newHabitColor,
    });
    setNewHabitName('');
    setShowAddHabitModal(false);
  };

  const handleQuickSaveSkill = (e) => {
    e.preventDefault();
    updateMonthlySkill(currentMonth.id, {
      skill: quickSkillName,
      goal: quickGoal,
      targetHours: Number(quickTargetHours),
    });
    setShowEditSkillModal(false);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    addQuickNote(newNoteText.trim());
    setNewNoteText('');
    setShowAddNote(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 3-Column Top Grid: Monthly/Today's Focus + Pomodoro + Tasks Today */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Widget 1: Today's Focus & Monthly Skill */}
        <div className="bg-white/90 backdrop-blur-xs rounded-3xl p-5 border border-[#ECE0F2] shadow-soft-card flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#86569B] uppercase tracking-wider">
              <span>⭐</span>
              <span>Today's Focus</span>
            </div>
            <button
              onClick={() => {
                setQuickSkillName(currentMonth.skill);
                setQuickGoal(currentMonth.goal);
                setQuickTargetHours(currentMonth.targetHours);
                setShowEditSkillModal(true);
              }}
              className="text-[11px] font-semibold text-[#A855F7] dark:text-purple-300 hover:text-[#7E22CE] flex items-center gap-1 bg-[#FAF5FD] dark:bg-purple-950/50 px-2 py-0.5 rounded-full border border-[#EEDBFA] dark:border-purple-800"
            >
              <Edit3 className="w-3 h-3" />
              <span>Define Skill</span>
            </button>
          </div>

          <div className="my-3 flex items-center gap-4">
            {/* Circular Progress Ring */}
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#F3E8FF"
                  strokeWidth="9"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="url(#purpleGradient)"
                  strokeWidth="9"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * currentMonthProgress) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C084FC" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-title font-bold text-xl text-[#4A3258]">
                  {currentMonthProgress}%
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#937C9E] -mt-0.5">
                  Completed
                </span>
              </div>
            </div>

            {/* Target Hours & Goal */}
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#7F6B8A] font-medium">Monthly Skill:</span>
                <span className="font-bold text-[#6B21A8] bg-[#F5EEFB] px-2 py-0.5 rounded-full text-[11px] truncate max-w-[120px]">
                  {currentMonth.skill}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#7F6B8A] font-medium">Study Hours:</span>
                <span className="font-bold text-[#4B3657]">
                  {currentMonth.completedHours} / {currentMonth.targetHours} hrs
                </span>
              </div>
              <div className="w-full bg-[#F3ECF8] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-linear-to-r from-[#C084FC] to-[#8B5CF6] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, currentMonthProgress)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quote Pill */}
          <div className="bg-[#FAF5FC] border border-[#EEDBFA] rounded-2xl p-2.5 text-[11px] text-[#695275] italic leading-snug">
            "{currentMonth.quote}"
          </div>
        </div>

        {/* Widget 2: Pomodoro Timer */}
        <PomodoroWidget />

        {/* Widget 3: Tasks & Habits Today (with direct + Add Habit button!) */}
        <div className="bg-white/90 backdrop-blur-xs rounded-3xl p-5 border border-[#ECE0F2] shadow-soft-card flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between pb-2 border-b border-[#F3EAF8]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#86569B] uppercase tracking-wider">
              <span>🌸</span>
              <span>Tasks & Habits Today</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddHabitModal(true)}
                className="text-[11px] font-semibold text-[#8B5CF6] dark:text-purple-300 bg-[#F7EFFC] dark:bg-purple-900/50 hover:bg-[#EEDBFA] dark:hover:bg-purple-900/70 border border-[#EEDBFA] dark:border-purple-800 px-2.5 py-0.5 rounded-full transition-colors flex items-center gap-1 shadow-2xs"
                title="Add a new routine"
              >
                <Plus className="w-3 h-3" />
                <span>Add Habit</span>
              </button>
              <button
                onClick={() => setActiveSection('habitTracker')}
                className="text-[11px] font-semibold text-[#A855F7] hover:underline"
              >
                Habit Grid
              </button>
            </div>
          </div>

          {/* Quick list of today's habits */}
          <div className="my-2 space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {data.habits.length === 0 ? (
              <div className="text-center py-6 text-xs text-[#9E8AA9] italic">
                No habits added yet. Click "+ Add Habit" to start!
              </div>
            ) : (
              data.habits.slice(0, 6).map((habit) => {
                const historyKey = `${habit.id}_${todayStr}`;
                const isChecked = !!data.habitHistory?.[historyKey];
                return (
                  <div
                    key={habit.id}
                    onClick={() => toggleHabitDate(habit.id, todayStr)}
                    className={`
                      flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer transition-all
                      ${isChecked ? 'bg-[#F4EDFA] text-[#6E4287]' : 'hover:bg-[#FAF6FC] text-[#55435E]'}
                    `}
                  >
                    <div className="flex items-center gap-2.5">
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-[#A855F7] fill-[#EDE5F8]" />
                      ) : (
                        <Circle className="w-4 h-4 text-[#C9BACF]" />
                      )}
                      <span className={`font-medium ${isChecked ? 'line-through opacity-70' : ''}`}>
                        {habit.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-[#A694AF]">
                      <Flame className="w-3 h-3 text-amber-500 fill-amber-400" />
                      <span>{habit.streak}d</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="pt-2 border-t border-[#F3EAF8] flex items-center justify-between text-[11px] text-[#867391]">
            <span>Completed {todayHabitsDoneCount} of {data.habits.length} habits today</span>
            <span className="text-pink-500 font-bold">You've got this! ♡</span>
          </div>
        </div>
      </div>

      {/* Middle Row: Today's Plan + Subject/Skill Progress + Motivation Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 4: Today's Plan (Schedule) */}
        <div className="bg-white/90 backdrop-blur-xs rounded-3xl p-5 border border-[#ECE0F2] shadow-soft-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F3EAF8]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#86569B] uppercase tracking-wider">
                <span>Today's Plan</span>
              </div>
              <button
                onClick={() => setShowAddPlanModal(true)}
                className="text-[11px] font-semibold text-[#A855F7] dark:text-purple-300 bg-[#F7EFFC] dark:bg-purple-900/50 hover:bg-[#EEDFFA] dark:hover:bg-purple-900/70 border border-[#EEDBFA] dark:border-purple-800 px-2.5 py-1 rounded-full transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add Block</span>
              </button>
            </div>

            {/* Plan Timeline Items */}
            <div className="mt-3 space-y-2 max-h-72 overflow-y-auto pr-1">
              {data.todaySchedule.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#9B88A5] italic">
                  Your day is open. Click "+ Add Block" to plan your morning & focus sessions! ♡
                </div>
              ) : (
                data.todaySchedule.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleScheduleItem(item.id)}
                    className={`
                      flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer transition-colors border
                      ${item.completed 
                        ? 'bg-[#FAF7FC] border-[#EEDBFA] text-[#887593] line-through' 
                        : 'bg-white border-[#F0E5F5] text-[#4E3C56] hover:border-[#D8B4FE]'}
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-semibold text-[#8C52AA] w-16 shrink-0">
                        {item.time}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-medium truncate max-w-[130px]">{item.title}</span>
                    </div>
                    <span className="text-[10px] text-[#A291AB] font-mono shrink-0">
                      {item.duration}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-2 border-t border-[#F3EAF8] text-right">
            <span className="text-[11px] text-[#A291AB]">Plan with calm intention</span>
          </div>
        </div>

        {/* Card 5: Skill / Subject Progress */}
        <div className="bg-white/90 backdrop-blur-xs rounded-3xl p-5 border border-[#ECE0F2] shadow-soft-card flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3EAF8]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#86569B] uppercase tracking-wider">
              <span>Skill Studio Breakdown</span>
            </div>
            <button
              onClick={() => setActiveSection('skillProgress')}
              className="text-[11px] font-semibold text-[#A855F7] hover:underline"
            >
              Open Studio
            </button>
          </div>

          {/* Skill Breakdown Rows */}
          <div className="my-2 space-y-3">
            {[
              { name: 'Speaking Practice', icon: Headphones, progress: data.skillsData.english.speaking.length * 20, color: '#A855F7', detail: `${data.skillsData.english.speaking.length} logs recorded` },
              { name: 'Essay Writing', icon: PenTool, progress: data.skillsData.english.writing.length * 25, color: '#EC4899', detail: `${data.skillsData.english.writing.length} submitted` },
              { name: 'Listening & Podcasts', icon: Sparkles, progress: data.skillsData.english.listening.length * 30, color: '#3B82F6', detail: `${data.skillsData.english.listening.length} completed` },
              { name: 'Book Reading', icon: BookOpen, progress: 0, color: '#10B981', detail: '0 pages logged' },
              { name: 'Vocabulary Deck', icon: Languages, progress: data.skillsData.english.vocabulary.filter(v => v.mastered).length * 33, color: '#F59E0B', detail: `${data.skillsData.english.vocabulary.filter(v => v.mastered).length} mastered` },
            ].map((skill, idx) => {
              const Icon = skill.icon;
              const boundedProgress = Math.min(100, skill.progress);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-[#523F5B]">
                      <Icon className="w-3.5 h-3.5" style={{ color: skill.color }} />
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#9785A1]">{skill.detail}</span>
                      <span className="font-bold text-[11px]" style={{ color: skill.color }}>
                        {boundedProgress}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-[#F3ECF8] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${boundedProgress}%`, backgroundColor: skill.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#F3EAF8] text-right">
            <span className="text-[11px] text-[#86569B] font-medium">Ready for your first session ♡</span>
          </div>
        </div>

        {/* Card 6: Daily Motivation Polaroid (changes every day!) */}
        <div className="relative bg-white/95 rounded-3xl p-5 border border-[#ECE0F2] shadow-soft-card flex flex-col justify-between overflow-hidden">
          {/* Header with day indicator & shuffle button */}
          <div className="flex items-center justify-between pb-1 mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#86569B] uppercase tracking-wider">
              <span>Daily Motivation</span>
            </div>
            <button
              onClick={handleNextMotivation}
              className="text-[10px] text-[#A855F7] hover:text-[#7E22CE] bg-[#FAF5FD] dark:bg-purple-950/50 border border-[#EEDBFA] dark:border-purple-800 px-2 py-0.5 rounded-full flex items-center gap-1 transition-all active:scale-95 shadow-2xs font-semibold"
              title="Click to discover another inspiring quote"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Shuffle</span>
            </button>
          </div>

          {/* Polaroid Frame */}
          <div className="relative bg-[#FFFDF9] border border-[#E8DCB8] p-3 rounded-2xl shadow-md rotate-1 transition-all hover:rotate-0 duration-300">
            {/* Purple Washi Tape across top */}
            <div className="washi-tape washi-tape-purple"></div>

            {/* Butterfly sticker */}
            <div className="absolute -top-3 -left-3 text-2xl select-none animate-pulse">
              🦋
            </div>

            {/* Polaroid Photo area with today's dynamic quote */}
            <div className={`relative min-h-[145px] rounded-xl overflow-hidden bg-linear-to-tr ${currentMotivation.gradient} flex flex-col items-center justify-center p-4 text-center transition-all duration-500`}>
              <p className="font-handwriting text-2xl md:text-3xl text-[#4A285E] leading-snug drop-shadow-xs">
                "{currentMotivation.text}"
              </p>
              <Heart className="w-4 h-4 text-pink-500 fill-pink-400 mt-2 animate-pulse" />
            </div>

            {/* Polaroid footer caption with cute Fluffy puppy */}
            <div className="pt-2 flex items-center justify-between text-xs text-[#7F6B8A]">
              <span className="font-handwriting text-base text-[#6F5B7A]">
                {currentMotivation.footer}
              </span>
              <FluffyMascot className="w-10 h-10 -mr-1" />
            </div>
          </div>

          <div className="mt-2 text-center text-[11px] text-[#A18EA9]">
            <span>Day {todayDayNumber} inspiration for {data.profile.name} ♡</span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Weekly Study Overview + Goals & Milestones + Quick Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 7: Weekly Study Overview */}
        <div className="bg-white/90 backdrop-blur-xs rounded-3xl p-5 border border-[#ECE0F2] shadow-soft-card flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-2 right-4">
            <Paperclip className="w-4 h-7" color="#C084FC" />
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-[#F3EAF8]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#86569B] uppercase tracking-wider">
              <span>Weekly Overview</span>
            </div>
          </div>

          {/* Simple Soft Curve Chart Representation */}
          <div className="my-3">
            <div className="flex items-end justify-between h-28 gap-2 pt-4 px-1">
              {data.weeklyOverview.map((item, idx) => {
                const heightPercent = item.hours > 0 ? (item.hours / 8) * 100 : 8;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                    <span className="text-[10px] font-mono text-[#8C52AA] opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.hours}h
                    </span>
                    <div className="w-full bg-[#F3ECF8] rounded-t-lg h-20 flex items-end">
                      <div
                        className="w-full bg-linear-to-t from-[#B185DB] to-[#D8B4FE] rounded-t-lg transition-all duration-500 group-hover:from-[#9333EA] group-hover:to-[#C084FC]"
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-[#786483] font-medium">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stat Footer */}
          <div className="pt-2 border-t border-[#F3EAF8] flex items-center justify-between text-xs">
            <div>
              <span className="text-[#887593]">Total Study Time: </span>
              <span className="font-bold text-[#4B3657]">{currentMonth.completedHours}h 00m</span>
            </div>
            <span className="text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full font-semibold text-[10px]">
              Ready for Day 1
            </span>
          </div>
        </div>

        {/* Card 8: Goals & Future Milestones */}
        <div className="bg-white/90 backdrop-blur-xs rounded-3xl p-5 border border-[#ECE0F2] shadow-soft-card flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[#F3EAF8]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#86569B] uppercase tracking-wider">
              <span>Long-Term Goals</span>
            </div>
            <button
              onClick={() => setActiveSection('visionBoard')}
              className="text-[11px] font-semibold text-[#A855F7] hover:underline"
            >
              Vision Board
            </button>
          </div>

          <div className="my-2 space-y-2.5">
            {[
              { title: 'Complete First 30 Days of Habit Consistency', progress: 0, color: '#C084FC' },
              { title: 'Read 12 Books this Season', progress: 0, color: '#F472B6' },
              { title: 'Conquer Core Monthly Skill Focus', progress: currentMonthProgress, color: '#38BDF8' },
              { title: 'Pen 20 Introspective Journal Reflections', progress: 0, color: '#4ADE80' },
            ].map((goal, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#523F5B]">{goal.title}</span>
                  <span className="font-bold text-[11px] text-[#6E4287]">{goal.progress}%</span>
                </div>
                <div className="w-full bg-[#F3ECF8] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${goal.progress}%`, backgroundColor: goal.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Note Badge */}
          <div className="bg-[#FFFDF4] border border-[#F2E6C3] rounded-xl p-2 text-center rotate-[-1deg]">
            <span className="font-handwriting text-sm text-[#735A3D]">Make it happen ♡</span>
          </div>
        </div>

        {/* Card 9: Quick Notes & Sticky Reminders */}
        <div className="relative bg-[#FFFBF3] rounded-3xl p-5 border border-[#F3E5C7] shadow-soft-card flex flex-col justify-between">
          <div className="absolute -top-3 left-6">
            <Paperclip className="w-4 h-7" color="#A855F7" />
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-[#EFE0C2]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#86569B] uppercase tracking-wider pl-4">
              <span>Quick Notes</span>
            </div>
            <button
              onClick={() => setShowAddNote(true)}
              className="p-1 rounded-full text-[#8C765C] hover:bg-[#F7EED8]"
              title="Add note"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="my-2 space-y-2 max-h-48 overflow-y-auto pr-1">
            {(data.quickNotes || []).map((note, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-xs text-[#5D472F] font-handwriting text-base leading-snug"
              >
                <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-300 shrink-0 mt-1" />
                <span>{note}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#EFE0C2] flex items-center justify-between">
            <span className="text-[10px] text-[#9C8265]">Keep your affirmations close</span>
            <LavenderVase className="w-8 h-10 -mb-2" />
          </div>
        </div>
      </div>

      {/* Quick Add Habit Modal */}
      {showAddHabitModal && (
        <div className="fixed inset-0 bg-purple-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-[#EADDF0] shadow-2xl">
            <h3 className="text-base font-bold text-[#4B3953] font-title mb-1">
              Add New Daily Routine 🌸
            </h3>
            <p className="text-xs text-[#897793] mb-4">
              Track a small daily habit to build your future self.
            </p>

            <form onSubmit={handleAddHabit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Routine Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. 15 min Speaking / Deep Work"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Category
                </label>
                <select
                  value={newHabitCategory}
                  onChange={(e) => setNewHabitCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                >
                  <option value="Learning">Learning & Skill</option>
                  <option value="Mind">Mind & Journaling</option>
                  <option value="Health">Health & Fitness</option>
                  <option value="Wellness">Wellness & Sleep</option>
                  <option value="Creativity">Creativity & Design</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Accent Color
                </label>
                <div className="flex items-center gap-2">
                  {['#A855F7', '#EC4899', '#3B82F6', '#10B981', '#F59E0B', '#6366F1'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewHabitColor(color)}
                      className={`w-6 h-6 rounded-full transition-transform ${newHabitColor === color ? 'scale-125 ring-2 ring-purple-300' : ''}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddHabitModal(false)}
                  className="px-3 py-1.5 text-xs text-[#7D6B87]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] rounded-xl shadow-xs"
                >
                  Save Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Define Skill Modal */}
      {showEditSkillModal && (
        <div className="fixed inset-0 bg-purple-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-[#EADDF0] shadow-2xl">
            <h3 className="text-base font-bold text-[#4B3953] font-title mb-1">
              Define This Month's Skill
            </h3>
            <p className="text-xs text-[#897793] mb-4">
              Set the core ability you are focusing on right now.
            </p>

            <form onSubmit={handleQuickSaveSkill} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Skill Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. English, Python, Public Speaking"
                  value={quickSkillName}
                  onChange={(e) => setQuickSkillName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden font-bold text-[#6D28D9]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Learning Goal
                </label>
                <textarea
                  rows={2}
                  placeholder="What is your main target for this month?"
                  value={quickGoal}
                  onChange={(e) => setQuickGoal(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Target Study Hours (Month)
                </label>
                <input
                  type="number"
                  min="5"
                  max="200"
                  value={quickTargetHours}
                  onChange={(e) => setQuickTargetHours(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditSkillModal(false)}
                  className="px-3 py-1.5 text-xs text-[#7D6B87]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] rounded-xl shadow-xs"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Plan Modal */}
      {showAddPlanModal && (
        <div className="fixed inset-0 bg-purple-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-[#EADDF0] shadow-2xl">
            <h3 className="text-base font-bold text-[#4B3953] font-title mb-2">
              Add to Today's Plan
            </h3>
            <form onSubmit={handleAddPlan} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Time (e.g., 08:00 AM)
                </label>
                <input
                  type="text"
                  placeholder="08:00 AM"
                  value={newScheduleTime}
                  onChange={(e) => setNewScheduleTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Activity Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. English listening podcast"
                  value={newScheduleTitle}
                  onChange={(e) => setNewScheduleTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPlanModal(false)}
                  className="px-3 py-1.5 text-xs text-[#7D6B87]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] rounded-xl"
                >
                  Add Block
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {showAddNote && (
        <div className="fixed inset-0 bg-purple-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-[#EADDF0] shadow-2xl">
            <h3 className="text-base font-bold text-[#4B3953] font-title mb-2">
              Add a Cozy Note
            </h3>
            <form onSubmit={handleAddNote} className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Write a sweet reminder or thought..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddNote(false)}
                  className="px-3 py-1.5 text-xs text-[#7D6B87]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] rounded-xl"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
