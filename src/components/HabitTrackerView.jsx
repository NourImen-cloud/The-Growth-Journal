import React, { useState } from 'react';
import { 
  CheckSquare, 
  Flame, 
  Plus, 
  Sparkles, 
  Trash2, 
  Calendar as CalendarIcon, 
  Award, 
  Check, 
  Heart,
  TrendingUp
} from 'lucide-react';
import { useJournal } from '../context/JournalContext';
import { CuteRibbonBow, LavenderVase, Paperclip } from './AestheticDecorations';
import { playSoftPop } from '../utils/audio';

export default function HabitTrackerView() {
  const { data, toggleHabitDate, addHabit, deleteHabit } = useJournal();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitCategory, setNewHabitCategory] = useState('Learning');
  const [newHabitColor, setNewHabitColor] = useState('#A855F7');

  // Days in November 2026 (30 days)
  const currentYear = 2026;
  const currentMonthNum = 11; // November
  const totalDays = 30;
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

  // Today's day number in November
  const todayDayNum = 24;

  const handleAddHabit = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    addHabit({
      name: newHabitName.trim(),
      category: newHabitCategory,
      color: newHabitColor,
    });
    setNewHabitName('');
    setShowAddModal(false);
  };

  // Calculate overall consistency percentage
  let totalTrackedCells = 0;
  let completedCells = 0;

  data.habits.forEach((habit) => {
    daysArray.forEach((day) => {
      if (day <= todayDayNum) {
        totalTrackedCells++;
        const dateStr = `${currentYear}-${currentMonthNum.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        if (data.habitHistory?.[`${habit.id}_${dateStr}`]) {
          completedCells++;
        }
      }
    });
  });

  const overallConsistency = totalTrackedCells > 0
    ? Math.round((completedCells / totalTrackedCells) * 100)
    : 82;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative bg-white/95 rounded-3xl p-6 border border-[#EADCF0] shadow-soft-card overflow-hidden">
        <div className="washi-tape washi-tape-purple"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9333EA] bg-[#F5EEFB] px-2.5 py-1 rounded-full">
                02. Habit Tracker • November 2026
              </span>
              <span className="text-xs text-[#8F7D99]">
                Visual consistency calendar
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#473450] font-title">
              Daily Routines & Streaks
            </h2>
            <p className="text-xs md:text-sm text-[#6C5677] mt-1">
              "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
            </p>
          </div>

          {/* Consistency Badge & Add Habit button */}
          <div className="flex items-center gap-3">
            <div className="bg-[#FAF5FD] border border-[#E8D9F2] rounded-2xl px-4 py-2.5 text-center">
              <span className="text-[10px] font-semibold text-[#8B7498] uppercase">Consistency</span>
              <div className="text-2xl font-bold font-title text-[#7E22CE]">
                {overallConsistency}%
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-2xl text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] flex items-center gap-1.5 shadow-md shadow-purple-200"
            >
              <Plus className="w-4 h-4" />
              <span>Add Routine</span>
            </button>
          </div>
        </div>
      </div>

      {/* Monthly Habit Matrix Grid */}
      <div className="bg-white/95 rounded-3xl p-6 border border-[#EADCF0] shadow-soft-card overflow-x-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#F2E8F8] min-w-[750px]">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-[#A855F7]" />
            <h3 className="text-sm font-bold text-[#473450] font-title">
              November Consistency Grid (Days 1 – 30)
            </h3>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#846F90]">
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-md bg-[#A855F7]" /> Completed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-md bg-[#F3ECF8] border border-[#E2D2ED]" /> Pending
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-md border-2 border-dashed border-[#A855F7]" /> Today ({todayDayNum})
            </span>
          </div>
        </div>

        {/* The Grid Table */}
        <div className="mt-4 min-w-[750px]">
          {/* Days Header */}
          <div className="grid grid-cols-[180px_repeat(30,minmax(20px,1fr))_70px] gap-1 items-center pb-2 text-[10px] font-mono text-[#9B88A5] text-center border-b border-[#F5EDFA]">
            <div className="text-left font-bold pl-2">HABIT</div>
            {daysArray.map((day) => (
              <div
                key={day}
                className={`py-1 rounded-sm ${day === todayDayNum ? 'bg-[#EDE4F7] text-[#7E22CE] font-bold' : ''}`}
              >
                {day}
              </div>
            ))}
            <div className="text-right pr-2 font-bold">STREAK</div>
          </div>

          {/* Habit Rows */}
          <div className="divide-y divide-[#F6EFFB]">
            {data.habits.map((habit) => (
              <div
                key={habit.id}
                className="grid grid-cols-[180px_repeat(30,minmax(20px,1fr))_70px] gap-1 items-center py-2.5 group hover:bg-[#FAF7FC] transition-colors rounded-xl px-1"
              >
                {/* Habit Info */}
                <div className="flex items-center justify-between pr-2 text-left">
                  <div className="flex items-center gap-1.5 truncate">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: habit.color || '#A855F7' }}
                    />
                    <span className="text-xs font-semibold text-[#4F3B57] truncate" title={habit.name}>
                      {habit.name}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-300 hover:text-red-400 transition-opacity"
                    title="Delete habit"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                {/* 30 Day Checkbox Cells */}
                {daysArray.map((day) => {
                  const dateStr = `${currentYear}-${currentMonthNum.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                  const isChecked = !!data.habitHistory?.[`${habit.id}_${dateStr}`];
                  const isToday = day === todayDayNum;

                  return (
                    <button
                      key={day}
                      onClick={() => toggleHabitDate(habit.id, dateStr)}
                      className={`
                        aspect-square rounded-md flex items-center justify-center transition-all duration-150 text-[9px]
                        ${isChecked
                          ? 'bg-[#A855F7] text-white shadow-xs hover:bg-[#9333EA] scale-95'
                          : isToday
                          ? 'bg-[#FAF4FD] border-2 border-[#C084FC] hover:bg-[#F3E8FF]'
                          : 'bg-[#F6EFFB] hover:bg-[#EBDCF4] text-transparent hover:text-purple-300'}
                      `}
                      title={`${habit.name} on Nov ${day}: ${isChecked ? 'Completed' : 'Click to toggle'}`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </button>
                  );
                })}

                {/* Streak Counter */}
                <div className="flex items-center justify-end gap-1 text-right pr-2">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  <span className="text-xs font-bold font-mono text-[#584163]">
                    {habit.streak}d
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Footer note */}
        <div className="mt-4 pt-3 border-t border-[#F2E8F8] flex items-center justify-between text-xs text-[#8A7694]">
          <span className="font-handwriting text-base text-[#6E4287]">
            "Consistency creates momentum. Momentum creates results." ♡
          </span>
          <span className="text-[11px] font-medium">Click any box to mark habit done</span>
        </div>
      </div>

      {/* Add Routine Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-purple-950/30 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-[#EADDF0] shadow-2xl">
            <h3 className="text-base font-bold text-[#4B3953] font-title mb-1">
              Add New Daily Habit 🌸
            </h3>
            <p className="text-xs text-[#897793] mb-4">
              Commit to a small daily routine to build your future self.
            </p>

            <form onSubmit={handleAddHabit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Habit Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. 15 min Shadowing / Stretching"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                  required
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
                  <option value="Learning">Learning & Study</option>
                  <option value="Mind">Mind & Journaling</option>
                  <option value="Health">Health & Exercise</option>
                  <option value="Wellness">Wellness & Sleep</option>
                  <option value="Creativity">Creativity & Art</option>
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
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-xs text-[#7D6B87]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] rounded-xl shadow-xs"
                >
                  Create Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
