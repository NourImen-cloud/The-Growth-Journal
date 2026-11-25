import React, { useState } from 'react';
import { 
  Calendar, 
  Target, 
  CheckCircle2, 
  Circle, 
  Star, 
  Sparkles, 
  Clock, 
  Plus, 
  Save, 
  Award,
  ChevronRight,
  TrendingUp,
  Edit3,
  Trash2,
  BookOpen
} from 'lucide-react';
import { useJournal } from '../context/JournalContext';
import { CuteRibbonBow, LavenderVase, Paperclip } from './AestheticDecorations';
import { playSoftPop, playCelebrationChime } from '../utils/audio';

export default function MonthlyFocusView() {
  const { 
    data, 
    currentMonthId, 
    setCurrentMonthId, 
    toggleMonthlyMilestone, 
    addMonthlyMilestone,
    deleteMonthlyMilestone,
    updateMonthlySkill,
    updateMonthlyAssessment,
    updateMonthlyHours,
    addMonthlyFocus 
  } = useJournal();

  // Active month
  const activeMonth = data.monthlyFocusList.find((m) => m.id === currentMonthId) || data.monthlyFocusList[0];

  // Edit Monthly Skill Modal State
  const [showEditSkillModal, setShowEditSkillModal] = useState(false);
  const [editSkillName, setEditSkillName] = useState(activeMonth.skill);
  const [editGoal, setEditGoal] = useState(activeMonth.goal);
  const [editQuote, setEditQuote] = useState(activeMonth.quote);
  const [editTargetHours, setEditTargetHours] = useState(activeMonth.targetHours);
  const [editMonthName, setEditMonthName] = useState(activeMonth.month);

  // New Milestone inline input
  const [newMilestoneText, setNewMilestoneText] = useState('');

  // Assessment form state
  const [assessmentStrengths, setAssessmentStrengths] = useState(activeMonth.finalAssessment?.strengths || '');
  const [assessmentGrowth, setAssessmentGrowth] = useState(activeMonth.finalAssessment?.growthAreas || '');
  const [assessmentCarry, setAssessmentCarry] = useState(activeMonth.finalAssessment?.carryForward || '');
  const [assessmentRating, setAssessmentRating] = useState(activeMonth.finalAssessment?.selfRating || 0);
  const [savedNotification, setSavedNotification] = useState(false);

  // Milestone completion stats
  const completedMilestones = activeMonth.milestones.filter((m) => m.done).length;
  const milestoneProgress = activeMonth.milestones.length > 0
    ? Math.round((completedMilestones / activeMonth.milestones.length) * 100)
    : 0;
  const hoursProgress = activeMonth.targetHours > 0
    ? Math.round((activeMonth.completedHours / activeMonth.targetHours) * 100)
    : 0;

  const handleSaveSkill = (e) => {
    e.preventDefault();
    updateMonthlySkill(activeMonth.id, {
      skill: editSkillName,
      month: editMonthName,
      goal: editGoal,
      quote: editQuote,
      targetHours: Number(editTargetHours),
    });
    setShowEditSkillModal(false);
  };

  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (!newMilestoneText.trim()) return;
    addMonthlyMilestone(activeMonth.id, newMilestoneText.trim());
    setNewMilestoneText('');
  };

  const handleSaveAssessment = (e) => {
    e.preventDefault();
    updateMonthlyAssessment(activeMonth.id, {
      strengths: assessmentStrengths,
      growthAreas: assessmentGrowth,
      carryForward: assessmentCarry,
      selfRating: assessmentRating,
      status: 'Reviewed',
    });
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Month Switcher Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {data.monthlyFocusList.map((month) => {
            const isSelected = month.id === activeMonth.id;
            return (
              <button
                key={month.id}
                onClick={() => {
                  playSoftPop();
                  setCurrentMonthId(month.id);
                  setEditSkillName(month.skill);
                  setEditGoal(month.goal);
                  setEditQuote(month.quote);
                  setEditTargetHours(month.targetHours);
                  setEditMonthName(month.month);
                }}
                className={`
                  px-4 py-2 rounded-2xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 shrink-0
                  ${isSelected
                    ? 'bg-[#B185DB] text-white shadow-md shadow-purple-300/40 translate-y-[-1px]'
                    : 'bg-white text-[#6E5677] border border-[#E9DDF0] hover:bg-[#F6EFFB]'}
                `}
              >
                <span>{month.month}: {month.skill}</span>
                {isSelected && <Sparkles className="w-3.5 h-3.5 text-white" />}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            setEditSkillName(activeMonth.skill);
            setEditGoal(activeMonth.goal);
            setEditQuote(activeMonth.quote);
            setEditTargetHours(activeMonth.targetHours);
            setEditMonthName(activeMonth.month);
            setShowEditSkillModal(true);
          }}
          className="px-4 py-2 rounded-2xl text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] flex items-center gap-1.5 shadow-md shadow-purple-200"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Define This Month's Skill</span>
        </button>
      </div>

      {/* Main Focus Hero Banner */}
      <div className="relative bg-white/95 rounded-3xl p-6 border border-[#EADCF0] shadow-soft-card overflow-hidden">
        <div className="washi-tape washi-tape-pink"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-2">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#8F7D99]">
                {activeMonth.finalAssessment?.status || 'In Progress'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#473450] font-title">
                {activeMonth.skill}
              </h2>
              <button
                onClick={() => setShowEditSkillModal(true)}
                className="p-1.5 rounded-full hover:bg-purple-100 text-[#8B5CF6] transition-colors"
                title="Edit skill details"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-[#665171] leading-relaxed">
              {activeMonth.goal}
            </p>

            {/* Motivational Quote */}
            <div className="bg-[#FAF5FC] border border-[#EEDDF7] rounded-2xl p-3 text-xs italic text-[#745B82] flex items-center gap-2">
              <span className="text-base">🌸</span>
              <span>"{activeMonth.quote}"</span>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 gap-3 lg:w-72 shrink-0">
            <div className="bg-[#FAF6FC] border border-[#EADBEE] rounded-2xl p-3.5 text-center">
              <span className="text-[10px] font-semibold text-[#8A7596] uppercase">Milestones</span>
              <div className="font-title text-2xl font-bold text-[#4B3456] my-1">
                {completedMilestones} / {activeMonth.milestones.length}
              </div>
              <div className="w-full bg-[#E8DAF0] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#A855F7] h-full rounded-full transition-all duration-500"
                  style={{ width: `${milestoneProgress}%` }}
                />
              </div>
              <span className="text-[10px] text-[#93819F] mt-1 block">
                {milestoneProgress}% complete
              </span>
            </div>

            <div className="bg-[#FAF6FC] border border-[#EADBEE] rounded-2xl p-3.5 text-center">
              <span className="text-[10px] font-semibold text-[#8A7596] uppercase">Study Hours</span>
              <div className="font-title text-2xl font-bold text-[#4B3456] my-1">
                {activeMonth.completedHours}h
              </div>
              <div className="w-full bg-[#E8DAF0] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#A855F7] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, hoursProgress)}%` }}
                />
              </div>
              <div className="text-[10px] text-[#93819F] mt-1">
                Target: {activeMonth.targetHours}h ({hoursProgress}%)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Section: Milestones & Final Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Monthly Milestones Checklist (User creates them!) */}
        <div className="bg-white/95 rounded-3xl p-6 border border-[#EADCF0] shadow-soft-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F2E8F8]">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[#A855F7]" />
                <h3 className="text-base font-bold text-[#473450] font-title">
                  My Monthly Milestones
                </h3>
              </div>
              <span className="text-xs font-semibold text-[#8B5CF6] bg-[#F5EEFB] px-2 py-0.5 rounded-full">
                {milestoneProgress}% Done
              </span>
            </div>

            {/* Add Milestone Inline Form */}
            <form onSubmit={handleAddMilestone} className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder="Add a milestone (e.g. Finish 5 modules, record a talk)..."
                value={newMilestoneText}
                onChange={(e) => setNewMilestoneText(e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-3 py-2 text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] rounded-xl shrink-0 flex items-center gap-1 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>

            {/* Milestones list */}
            <div className="mt-4 space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {activeMonth.milestones.length === 0 ? (
                <div className="text-center py-6 text-xs text-[#9B88A5] italic">
                  No milestones added yet. Type above to define your first milestone! 🌸
                </div>
              ) : (
                activeMonth.milestones.map((m) => (
                  <div
                    key={m.id}
                    className={`
                      flex items-start justify-between gap-3 p-3 rounded-2xl transition-all border group
                      ${m.done
                        ? 'bg-[#F9F5FC] border-[#E8DAF0] text-[#786483]'
                        : 'bg-white border-[#EDE1F2] text-[#4E3957] hover:border-[#C084FC]'}
                    `}
                  >
                    <div
                      onClick={() => toggleMonthlyMilestone(activeMonth.id, m.id)}
                      className="flex items-start gap-3 flex-1 cursor-pointer"
                    >
                      {m.done ? (
                        <CheckCircle2 className="w-5 h-5 text-[#A855F7] fill-[#F3E8FF] shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#CBB9D4] shrink-0 mt-0.5" />
                      )}
                      <p className={`text-xs md:text-sm font-medium ${m.done ? 'line-through text-[#94819F]' : ''}`}>
                        {m.title}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteMonthlyMilestone(activeMonth.id, m.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-300 hover:text-red-400 transition-opacity"
                      title="Delete milestone"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick study hours logger */}
          <div className="mt-6 pt-4 border-t border-[#F2E8F8] flex items-center justify-between">
            <span className="text-xs text-[#7F6B8A] font-medium">Log study hours for this skill:</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="200"
                step="0.5"
                value={activeMonth.completedHours}
                onChange={(e) => updateMonthlyHours(activeMonth.id, e.target.value)}
                className="w-18 px-2 py-1 text-xs border border-[#DECDE7] rounded-xl text-center font-bold text-[#4B3456]"
              />
              <span className="text-xs text-[#8A7694]">hrs</span>

              <button
                type="button"
                onClick={() => updateMonthlyHours(activeMonth.id, activeMonth.completedHours + 1)}
                className="px-2 py-1 bg-purple-100 hover:bg-purple-200 text-[#7E22CE] rounded-lg text-xs font-bold"
                title="Add 1 hour"
              >
                +1h
              </button>
            </div>
          </div>
        </div>

        {/* Right: Final Assessment Form */}
        <div className="bg-white/95 rounded-3xl p-6 border border-[#EADCF0] shadow-soft-card relative">
          <div className="flex items-center justify-between pb-3 border-b border-[#F2E8F8]">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#EC4899]" />
              <h3 className="text-base font-bold text-[#473450] font-title">
                Final Monthly Assessment
              </h3>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setAssessmentRating(star)}
                  className="focus:outline-hidden"
                >
                  <Star
                    className={`w-4 h-4 ${
                      star <= assessmentRating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-200'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSaveAssessment} className="mt-4 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#6A5774] mb-1">
                What went well? (Key wins & breakthroughs)
              </label>
              <textarea
                rows={2}
                value={assessmentStrengths}
                onChange={(e) => setAssessmentStrengths(e.target.value)}
                placeholder="Write your breakthroughs, consistency wins, or confidence gains..."
                className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden text-[#4B3456]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6A5774] mb-1">
                Growth areas & hurdles faced
              </label>
              <textarea
                rows={2}
                value={assessmentGrowth}
                onChange={(e) => setAssessmentGrowth(e.target.value)}
                placeholder="What challenged you or requires deeper study next time..."
                className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden text-[#4B3456]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6A5774] mb-1">
                Carry-forward plan for next month
              </label>
              <input
                type="text"
                value={assessmentCarry}
                onChange={(e) => setAssessmentCarry(e.target.value)}
                placeholder="What skill or habit to transition into the coming month..."
                className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden text-[#4B3456]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              {savedNotification ? (
                <span className="text-xs font-semibold text-emerald-600 animate-fade-in">
                  ✓ Assessment saved gracefully! 🌸
                </span>
              ) : (
                <span className="text-[11px] text-[#9785A1]">Self-reflection cements true progress</span>
              )}

              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Reflection</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Edit Skill Modal */}
      {showEditSkillModal && (
        <div className="fixed inset-0 bg-purple-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md border border-[#EADDF0] shadow-2xl">
            <h3 className="text-base font-bold text-[#4B3953] font-title mb-1">
              Define Your Monthly Skill
            </h3>
            <p className="text-xs text-[#897793] mb-4">
              Choose the primary capability you want to develop this month.
            </p>

            <form onSubmit={handleSaveSkill} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#665370] mb-1">
                    Month Name
                  </label>
                  <input
                    type="text"
                    value={editMonthName}
                    onChange={(e) => setEditMonthName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#665370] mb-1">
                    Skill to Learn
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. English, Python, Public Speaking"
                    value={editSkillName}
                    onChange={(e) => setEditSkillName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden font-bold text-[#6D28D9]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Learning Goal & Objective
                </label>
                <textarea
                  rows={2}
                  placeholder="What will you be able to do by the end of this month?"
                  value={editGoal}
                  onChange={(e) => setEditGoal(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Inspirational Focus Quote
                </label>
                <input
                  type="text"
                  placeholder="A quote to keep you inspired every day..."
                  value={editQuote}
                  onChange={(e) => setEditQuote(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Target Study Hours (Monthly)
                </label>
                <input
                  type="number"
                  min="5"
                  max="200"
                  value={editTargetHours}
                  onChange={(e) => setEditTargetHours(e.target.value)}
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
                  Save Skill Focus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
