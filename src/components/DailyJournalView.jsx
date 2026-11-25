import React, { useState } from 'react';
import { 
  BookHeart, 
  Sparkles, 
  Calendar, 
  Smile, 
  Heart, 
  Trash2, 
  Tag, 
  ChevronDown, 
  Send,
  Feather
} from 'lucide-react';
import { useJournal } from '../context/JournalContext';
import { CuteRibbonBow, LavenderVase, Paperclip } from './AestheticDecorations';
import { playSoftPop } from '../utils/audio';

export default function DailyJournalView() {
  const { data, addJournalEntry, deleteJournalEntry } = useJournal();

  // Form State
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState('Peaceful 🌸');
  const [learnPrompt, setLearnPrompt] = useState('');
  const [challengePrompt, setChallengePrompt] = useState('');
  const [proudPrompt, setProudPrompt] = useState('');
  const [improvePrompt, setImprovePrompt] = useState('');
  const [gratitude, setGratitude] = useState('');
  const [tagsInput, setTagsInput] = useState('Growth, Focus');

  const [expandedEntryId, setExpandedEntryId] = useState(data.journalEntries[0]?.id || null);

  const moodsList = [
    'Peaceful 🌸',
    'Inspired ♡',
    'Productive ☕',
    'Cozy 🧸',
    'Reflective 🌙',
    'Energetic 💪',
  ];

  const handleSaveEntry = (e) => {
    e.preventDefault();
    if (!learnPrompt && !proudPrompt) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addJournalEntry({
      title: title || 'A Gentle Day of Becoming',
      mood,
      prompts: {
        learn: learnPrompt,
        challenge: challengePrompt,
        proud: proudPrompt,
        improve: improvePrompt,
      },
      tags,
      gratitude,
    });

    // Reset Form
    setTitle('');
    setLearnPrompt('');
    setChallengePrompt('');
    setProudPrompt('');
    setImprovePrompt('');
    setGratitude('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative bg-white/95 rounded-3xl p-6 border border-[#EADCF0] shadow-soft-card overflow-hidden">
        <div className="washi-tape washi-tape-pink"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-[#8F7D99]">
                4 Guided Inquiries
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#473450] font-title">
              Who You Are Becoming
            </h2>
            <p className="text-xs md:text-sm text-[#6C5677] mt-1">
              "Write what is real. What you reflect on today becomes wisdom for tomorrow."
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-handwriting text-lg text-[#7E22CE] bg-[#FAF5FD] border border-[#EADBEE] px-4 py-2 rounded-2xl">
              Today is a clean page ♡
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Today's Guided Reflection Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white/95 rounded-3xl p-6 border border-[#EADCF0] shadow-soft-card flex flex-col justify-between relative">
          <div className="flex items-center justify-between pb-3 border-b border-[#F2E8F8]">
            <div className="flex items-center gap-2">
              <Feather className="w-4 h-4 text-[#A855F7]" />
              <h3 className="text-base font-bold text-[#473450] font-title">
                Today's Guided Reflection
              </h3>
            </div>
            <span className="text-xs font-semibold text-[#8B5CF6]">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <form onSubmit={handleSaveEntry} className="mt-4 space-y-4">
            {/* Title & Mood */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#6A5774] mb-1">
                  Entry Title / Theme
                </label>
                <input
                  type="text"
                  placeholder="e.g. Small steps, calm focus"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden text-[#4B3456]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6A5774] mb-1">
                  Today's Mood
                </label>
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden text-[#4B3456]"
                >
                  {moodsList.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Prompt 1: What did I learn today? */}
            <div className="bg-[#FAF6FC] border border-[#EADBEE] rounded-2xl p-3.5 space-y-1">
              <label className="block text-xs font-bold text-[#6D4284]">
                1. What did I learn today? 💡
              </label>
              <textarea
                rows={2}
                placeholder="A new concept, language insight, realization about my habits..."
                value={learnPrompt}
                onChange={(e) => setLearnPrompt(e.target.value)}
                className="w-full p-2 text-xs bg-white border border-[#E6D7EE] rounded-xl focus:border-[#A855F7] focus:outline-hidden text-[#4B3456]"
                required
              />
            </div>

            {/* Prompt 2: What challenged me? */}
            <div className="bg-[#FAF6FC] border border-[#EADBEE] rounded-2xl p-3.5 space-y-1">
              <label className="block text-xs font-bold text-[#6D4284]">
                2. What challenged me? 🏔️
              </label>
              <textarea
                rows={2}
                placeholder="Procrastination, difficulty understanding a topic, self-doubt..."
                value={challengePrompt}
                onChange={(e) => setChallengePrompt(e.target.value)}
                className="w-full p-2 text-xs bg-white border border-[#E6D7EE] rounded-xl focus:border-[#A855F7] focus:outline-hidden text-[#4B3456]"
              />
            </div>

            {/* Prompt 3: What am I proud of? */}
            <div className="bg-[#FAF6FC] border border-[#EADBEE] rounded-2xl p-3.5 space-y-1">
              <label className="block text-xs font-bold text-[#6D4284]">
                3. What am I proud of? 🌸
              </label>
              <textarea
                rows={2}
                placeholder="Showing up, finishing my Pomodoros, being kind to myself..."
                value={proudPrompt}
                onChange={(e) => setProudPrompt(e.target.value)}
                className="w-full p-2 text-xs bg-white border border-[#E6D7EE] rounded-xl focus:border-[#A855F7] focus:outline-hidden text-[#4B3456]"
                required
              />
            </div>

            {/* Prompt 4: What should I improve tomorrow? */}
            <div className="bg-[#FAF6FC] border border-[#EADBEE] rounded-2xl p-3.5 space-y-1">
              <label className="block text-xs font-bold text-[#6D4284]">
                4. What should I improve tomorrow?
              </label>
              <textarea
                rows={2}
                placeholder="Start earlier, step away from screens, review vocab before bed..."
                value={improvePrompt}
                onChange={(e) => setImprovePrompt(e.target.value)}
                className="w-full p-2 text-xs bg-white border border-[#E6D7EE] rounded-xl focus:border-[#A855F7] focus:outline-hidden text-[#4B3456]"
              />
            </div>

            {/* Gratitude & Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#6A5774] mb-1">
                  Little Gratitude Note ♡
                </label>
                <input
                  type="text"
                  placeholder="Warm tea, quiet moments, friendly smiles..."
                  value={gratitude}
                  onChange={(e) => setGratitude(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden text-[#4B3456]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6A5774] mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="English, Mindset, Habit"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden text-[#4B3456]"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-[#9785A1]">
                Your words are saved safely on your device ♡
              </span>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-2xl text-xs font-bold text-white bg-[#A855F7] hover:bg-[#9333EA] flex items-center gap-1.5 shadow-md shadow-purple-200 transition-all transform active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Save Journal Entry</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Past Entries Timeline (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#473450] font-title uppercase tracking-wider flex items-center gap-1.5">
              <span>📖</span>
              <span>Past Journal Reflections</span>
            </h3>
            <span className="text-xs text-[#8F7D99] font-medium">
              {data.journalEntries.length} entries
            </span>
          </div>

          <div className="space-y-4 max-h-[750px] overflow-y-auto pr-1">
            {data.journalEntries.map((entry) => {
              const isExpanded = expandedEntryId === entry.id;
              return (
                <div
                  key={entry.id}
                  className="bg-white/95 rounded-3xl p-5 border border-[#EADCF0] shadow-soft-card transition-all"
                >
                  <div
                    onClick={() => {
                      playSoftPop();
                      setExpandedEntryId(isExpanded ? null : entry.id);
                    }}
                    className="flex items-start justify-between cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-[#A855F7] bg-[#F5EEFB] px-2 py-0.5 rounded-full">
                          {entry.date}
                        </span>
                        <span className="text-xs text-[#8F7D99]">
                          {entry.mood}
                        </span>
                      </div>
                      <h4 className="text-base font-bold font-title text-[#473450]">
                        {entry.title}
                      </h4>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteJournalEntry(entry.id);
                      }}
                      className="p-1 text-gray-300 hover:text-red-400"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Snippet / Expanded Details */}
                  {isExpanded ? (
                    <div className="mt-4 pt-3 border-t border-[#F2E8F8] space-y-3 text-xs text-[#584561]">
                      {entry.prompts?.learn && (
                        <div>
                          <span className="font-bold text-[#7E22CE] block text-[11px]">
                            💡 What I learned:
                          </span>
                          <p className="mt-0.5 text-[#634F6D]">{entry.prompts.learn}</p>
                        </div>
                      )}

                      {entry.prompts?.challenge && (
                        <div>
                          <span className="font-bold text-[#7E22CE] block text-[11px]">
                            🏔️ The Challenge:
                          </span>
                          <p className="mt-0.5 text-[#634F6D]">{entry.prompts.challenge}</p>
                        </div>
                      )}

                      {entry.prompts?.proud && (
                        <div>
                          <span className="font-bold text-[#7E22CE] block text-[11px]">
                            🌸 What I'm proud of:
                          </span>
                          <p className="mt-0.5 text-[#634F6D]">{entry.prompts.proud}</p>
                        </div>
                      )}

                      {entry.prompts?.improve && (
                        <div>
                          <span className="font-bold text-[#7E22CE] block text-[11px]">
                            Tomorrow's improvement:
                          </span>
                          <p className="mt-0.5 text-[#634F6D]">{entry.prompts.improve}</p>
                        </div>
                      )}

                      {entry.gratitude && (
                        <div className="bg-[#FFFDF4] border border-[#F2E5C5] p-2.5 rounded-xl font-handwriting text-base text-[#6C553B]">
                          Grateful for: {entry.gratitude} ♡
                        </div>
                      )}

                      {/* Tags */}
                      {entry.tags && entry.tags.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap pt-1">
                          {entry.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-[#F5EEFB] text-[#7E22CE] px-2 py-0.5 rounded-full font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="mt-2 text-xs text-[#877593] line-clamp-2">
                      {entry.prompts?.learn || entry.prompts?.proud}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
