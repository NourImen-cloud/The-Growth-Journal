import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Plus, 
  Heart, 
  Star,
  Flame,
  BookOpen,
  Mic,
  GraduationCap
} from 'lucide-react';
import { useJournal } from '../context/JournalContext';
import { CuteRibbonBow, LavenderVase, Paperclip } from './AestheticDecorations';
import { playCelebrationChime, playSoftPop } from '../utils/audio';
import { firePastelConfetti } from '../utils/confetti';

export default function AchievementsView() {
  const { data, unlockAchievement, addAchievement } = useJournal();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newIcon, setNewIcon] = useState('🏆');
  const [newCategory, setNewCategory] = useState('Language');

  const unlockedCount = data.achievements.filter((a) => a.unlocked).length;
  const totalCount = data.achievements.length;
  const progressPct = Math.round((unlockedCount / totalCount) * 100);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addAchievement({
      title: newTitle.trim(),
      description: newDesc.trim() || 'A milestone in personal growth and consistency.',
      icon: newIcon,
      category: newCategory,
    });
    setNewTitle('');
    setNewDesc('');
    setShowAddModal(false);
    firePastelConfetti();
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative bg-white/95 rounded-3xl p-6 border border-[#EADCF0] shadow-soft-card overflow-hidden">
        <div className="washi-tape washi-tape-purple"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9333EA] bg-[#F5EEFB] px-2.5 py-1 rounded-full">
                05. Achievements & Milestones Shelf
              </span>
              <span className="text-xs text-[#8F7D99]">
                Proof of Consistency
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#473450] font-title">
              Your Scrapbook of Wins
            </h2>
            <p className="text-xs md:text-sm text-[#6C5677] mt-1">
              "Never underestimate the small victories. They are the scaffolding of who you are becoming."
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#FAF5FD] border border-[#E8D9F2] rounded-2xl px-4 py-2.5 text-center">
              <span className="text-[10px] font-semibold text-[#8B7498] uppercase">Unlocked</span>
              <div className="text-2xl font-bold font-title text-[#7E22CE]">
                {unlockedCount} / {totalCount}
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-2xl text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] flex items-center gap-1.5 shadow-md shadow-purple-200"
            >
              <Plus className="w-4 h-4" />
              <span>Add Milestone</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ribbon Progress Banner */}
      <div className="bg-linear-to-r from-[#F9F5FC] via-[#FFF5F8] to-[#FAF5FC] border border-[#EADBEE] rounded-3xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-[#EADBEE] flex items-center justify-center text-2xl">
            🎖️
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#473450] font-title">
              Growth Journey Level 4 • Dedicated Practitioner
            </h4>
            <p className="text-xs text-[#867391]">
              You've unlocked {progressPct}% of your growth milestones this season!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            playCelebrationChime();
            firePastelConfetti();
          }}
          className="px-4 py-1.5 rounded-xl bg-white border border-[#EADBEE] text-xs font-semibold text-[#8B5CF6] hover:bg-[#FAF5FC] shadow-2xs"
        >
          Celebrate All Wins ✨
        </button>
      </div>

      {/* Achievements Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {data.achievements.map((ach) => (
          <div
            key={ach.id}
            className={`
              relative rounded-3xl p-5 border flex flex-col justify-between transition-all duration-300
              ${ach.unlocked
                ? 'bg-white/95 border-[#EADCF0] shadow-soft-card hover:shadow-cozy-hover'
                : 'bg-[#F9F7FA] border-[#ECE2F0] opacity-80'}
            `}
          >
            {/* Washi tape snippet on top */}
            {ach.unlocked && (
              <div className="washi-tape washi-tape-pink w-16 h-4 -top-2"></div>
            )}

            <div>
              <div className="flex items-center justify-between pb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A855F7] bg-[#F5EEFB] px-2 py-0.5 rounded-full">
                  {ach.category}
                </span>

                {ach.unlocked ? (
                  <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Unlocked</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-[#9D8AA6] flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>Locked</span>
                  </span>
                )}
              </div>

              {/* Icon & Title */}
              <div className="my-3 text-center">
                <div className={`
                  w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-2
                  ${ach.unlocked ? 'bg-[#FAF5FD] border border-[#EADBEE] shadow-xs' : 'bg-gray-100 grayscale'}
                `}>
                  {ach.icon}
                </div>
                <h4 className="text-sm font-bold font-title text-[#473450] leading-snug">
                  {ach.title}
                </h4>
                <p className="text-xs text-[#7B6787] mt-1 leading-relaxed">
                  {ach.description}
                </p>
              </div>
            </div>

            {/* Bottom status or Unlock Button */}
            <div className="pt-3 border-t border-[#F2E8F8] flex items-center justify-between text-xs">
              {ach.unlocked ? (
                <span className="text-[10px] font-mono text-[#9B88A5]">
                  {ach.unlockedDate || 'Completed ♡'}
                </span>
              ) : (
                <div className="w-full flex items-center justify-between">
                  <span className="text-[10px] text-[#A291AB]">{ach.progress || 'In progress'}</span>
                  <button
                    onClick={() => unlockAchievement(ach.id)}
                    className="text-[10px] font-bold text-white bg-[#A855F7] hover:bg-[#9333EA] px-2.5 py-1 rounded-lg shadow-2xs"
                  >
                    Claim! ✨
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Milestone Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-purple-950/30 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-[#EADDF0] shadow-2xl">
            <h3 className="text-base font-bold text-[#4B3953] font-title mb-2">
              Add Personal Milestone 🏆
            </h3>
            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Milestone Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Completed 100 days of morning yoga"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Celebrate this turning point in your journey..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#665370] mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                  >
                    <option value="Language">Language</option>
                    <option value="Reading">Reading</option>
                    <option value="Speaking">Speaking</option>
                    <option value="Tech">Tech</option>
                    <option value="Habits">Habits</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#665370] mb-1">
                    Badge Emoji
                  </label>
                  <select
                    value={newIcon}
                    onChange={(e) => setNewIcon(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden text-center text-sm"
                  >
                    <option value="🏆">🏆 Trophy</option>
                    <option value="📖">📖 Book</option>
                    <option value="🎤">🎤 Mic</option>
                    <option value="🎓">🎓 Cap</option>
                    <option value="🔥">🔥 Flame</option>
                    <option value="🌸">🌸 Bloom</option>
                    <option value="⭐">⭐ Star</option>
                    <option value="✨">✨ Sparkle</option>
                  </select>
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
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] rounded-xl"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
