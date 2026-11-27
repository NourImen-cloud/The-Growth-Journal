import React, { useState } from 'react';
import { 
  Sparkles, 
  Mic, 
  PenTool, 
  Headphones, 
  BookOpen, 
  Languages, 
  Plus, 
  CheckCircle2, 
  Star, 
  Volume2, 
  Play, 
  RotateCw, 
  Eye, 
  BookMarked,
  Heart,
  Trash2,
  ExternalLink,
  Link,
  X
} from 'lucide-react';
import { useJournal } from '../context/JournalContext';
import { CuteRibbonBow, LavenderVase, Paperclip } from './AestheticDecorations';
import { playSoftPop, playCelebrationChime } from '../utils/audio';
import { firePastelConfetti } from '../utils/confetti';

export default function SkillProgressView() {
  const { 
    data, 
    toggleFlashcardMastered, 
    addFlashcard, 
    deleteFlashcard,
    addSpeakingLog, 
    deleteSpeakingLog,
    addWritingEssay, 
    deleteWritingEssay,
    addPodcastLog, 
    deletePodcastLog,
    addBookReading,
    deleteBookReading,
    updateBookReadingProgress 
  } = useJournal();

  const [activeTab, setActiveTab] = useState('vocabulary'); // vocabulary, speaking, writing, listening, reading
  const [flippedCards, setFlippedCards] = useState({});

  // Modals state
  const [showAddVocabModal, setShowAddVocabModal] = useState(false);
  const [showAddSpeakingModal, setShowAddSpeakingModal] = useState(false);
  const [showAddWritingModal, setShowAddWritingModal] = useState(false);
  const [showAddPodcastModal, setShowAddPodcastModal] = useState(false);
  const [showAddBookModal, setShowAddBookModal] = useState(false);

  // Forms
  const [newWord, setNewWord] = useState('');
  const [newDef, setNewDef] = useState('');
  const [newEx, setNewEx] = useState('');
  const [newSpeakingTitle, setNewSpeakingTitle] = useState('');
  const [newSpeakingNotes, setNewSpeakingNotes] = useState('');
  const [newSpeakingDuration, setNewSpeakingDuration] = useState('04:00');
  const [newEssayTitle, setNewEssayTitle] = useState('');
  const [newEssayText, setNewEssayText] = useState('');
  const [newPodcastTitle, setNewPodcastTitle] = useState('');
  const [newPodcastTakeaway, setNewPodcastTakeaway] = useState('');
  const [newPodcastUrl, setNewPodcastUrl] = useState('');

  // Book / Article Form
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');
  const [newBookPages, setNewBookPages] = useState('200');
  const [newBookCurrent, setNewBookCurrent] = useState('0');
  const [newBookUrl, setNewBookUrl] = useState('');
  const [newBookIsArticle, setNewBookIsArticle] = useState(false);

  const englishData = data.skillsData.english;

  const toggleFlip = (id) => {
    playSoftPop();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddVocab = (e) => {
    e.preventDefault();
    if (!newWord || !newDef) return;
    addFlashcard({
      word: newWord,
      phonetic: '',
      definition: newDef,
      example: newEx || `Using ${newWord} in daily context.`,
      category: 'General',
    });
    setNewWord('');
    setNewDef('');
    setNewEx('');
    setShowAddVocabModal(false);
    firePastelConfetti();
  };

  const handleAddSpeaking = (e) => {
    e.preventDefault();
    if (!newSpeakingTitle) return;
    addSpeakingLog({
      title: newSpeakingTitle,
      notes: newSpeakingNotes || 'Practiced clear vocal delivery and rhythm.',
      duration: newSpeakingDuration,
    });
    setNewSpeakingTitle('');
    setNewSpeakingNotes('');
    setShowAddSpeakingModal(false);
  };

  const handleAddWriting = (e) => {
    e.preventDefault();
    if (!newEssayTitle || !newEssayText) return;
    const words = newEssayText.trim().split(/\s+/).length;
    addWritingEssay({
      title: newEssayTitle,
      words: words,
      excerpt: newEssayText.slice(0, 180) + '...',
    });
    setNewEssayTitle('');
    setNewEssayText('');
    setShowAddWritingModal(false);
  };

  const handleAddPodcast = (e) => {
    e.preventDefault();
    if (!newPodcastTitle) return;
    addPodcastLog({
      title: newPodcastTitle,
      host: 'Featured Host',
      duration: '35 min',
      keyTakeaway: newPodcastTakeaway || 'Gained insightful perspective on continuous improvement.',
      url: newPodcastUrl.trim(),
    });
    setNewPodcastTitle('');
    setNewPodcastTakeaway('');
    setNewPodcastUrl('');
    setShowAddPodcastModal(false);
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    if (!newBookTitle.trim()) return;
    addBookReading({
      title: newBookTitle.trim(),
      author: newBookAuthor.trim() || (newBookIsArticle ? 'Web Article' : 'Author'),
      totalPages: Number(newBookPages) || 100,
      pagesRead: Number(newBookCurrent) || 0,
      rating: 5,
      url: newBookUrl.trim(),
      isArticle: newBookIsArticle,
    });
    setNewBookTitle('');
    setNewBookAuthor('');
    setNewBookPages('200');
    setNewBookCurrent('0');
    setNewBookUrl('');
    setNewBookIsArticle(false);
    setShowAddBookModal(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative bg-white/95 rounded-3xl p-6 border border-[#EADCF0] shadow-soft-card overflow-hidden">
        <div className="washi-tape washi-tape-purple"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-[#8F7D99]">
                5 Sub-disciplines
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#473450] font-title">
              Deep Practice & Artifacts
            </h2>
            <p className="text-xs md:text-sm text-[#6C5677] mt-1">
              "Mastery is not an overnight leap; it is the compound interest of everyday curiosity."
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-handwriting text-[#7E22CE] bg-[#FAF5FD] border border-[#EADBEE] px-3.5 py-1.5 rounded-2xl">
              Speaking • Writing • Listening • Reading • Vocab
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#EBDCF2] pb-1 overflow-x-auto">
        {[
          { id: 'vocabulary', label: 'Vocabulary & Flashcards', icon: Languages, count: englishData.vocabulary.length },
          { id: 'speaking', label: 'Speaking Recordings', icon: Mic, count: englishData.speaking.length },
          { id: 'writing', label: 'Submitted Essays', icon: PenTool, count: englishData.writing.length },
          { id: 'listening', label: 'Completed Podcasts', icon: Headphones, count: englishData.listening.length },
          { id: 'reading', label: 'Books & Articles', icon: BookOpen, count: englishData.reading.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playSoftPop();
                setActiveTab(tab.id);
              }}
              className={`
                px-4 py-2.5 rounded-2xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 shrink-0
                ${isActive
                  ? 'bg-[#B185DB] text-white shadow-md shadow-purple-300/40 translate-y-[-1px]'
                  : 'bg-white text-[#6E5677] border border-[#E9DDF0] hover:bg-[#F6EFFB]'}
              `}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-700'}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: VOCABULARY FLASHCARDS */}
      {activeTab === 'vocabulary' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#7A6686]">
              Click any card to flip and reveal the definition. Mark as mastered to build your lexicon! ♡
            </p>
            <button
              onClick={() => setShowAddVocabModal(true)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Expression</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {englishData.vocabulary.map((card) => {
              const isFlipped = !!flippedCards[card.id];
              return (
                <div
                  key={card.id}
                  className={`
                    relative min-h-[190px] rounded-3xl p-5 border cursor-pointer transition-all duration-300 shadow-soft-card flex flex-col justify-between
                    ${card.mastered 
                      ? 'bg-[#F9F5FC] border-[#E5D7EE]' 
                      : 'bg-white border-[#EADCF0] hover:shadow-cozy-hover'}
                  `}
                  onClick={() => toggleFlip(card.id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A855F7] bg-[#F5EEFB] px-2 py-0.5 rounded-full">
                      {card.category || 'Vocab'}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlashcardMastered(card.id);
                        if (!card.mastered) firePastelConfetti();
                      }}
                      className="p-1 rounded-full text-xs flex items-center gap-1 hover:bg-[#F0E5F8]"
                    >
                      {card.mastered ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100" />
                      ) : (
                        <span className="text-[10px] text-[#A291AB] hover:text-[#7E22CE]">Mark Mastered</span>
                      )}
                    </button>
                  </div>

                  {!isFlipped ? (
                    <div className="my-3 text-center">
                      <h4 className="text-2xl font-bold font-title text-[#473450] tracking-wide">
                        {card.word}
                      </h4>
                      {card.phonetic && (
                        <p className="text-xs text-[#9B88A5] font-mono mt-1">{card.phonetic}</p>
                      )}
                      <p className="text-[11px] text-[#B09EB8] mt-2 flex items-center justify-center gap-1">
                        <RotateCw className="w-3 h-3" />
                        <span>Click to flip definition</span>
                      </p>
                    </div>
                  ) : (
                    <div className="my-2 text-left space-y-2 animate-in fade-in duration-200">
                      <p className="text-xs text-[#4F3D57] font-medium leading-relaxed">
                        {card.definition}
                      </p>
                      <div className="bg-[#FAF5FC] border-l-2 border-[#A855F7] p-2 rounded-r-lg text-[11px] text-[#6E5677] italic">
                        "{card.example}"
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#F2E8F8] flex items-center justify-between text-[10px] text-[#9785A1]">
                    <div className="flex items-center gap-2">
                      <span>Flip Card</span>
                      {card.mastered && <span className="text-emerald-600 font-bold">✓ Mastered</span>}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFlashcard(card.id);
                      }}
                      className="p-1 text-[#B09EB8] hover:text-rose-500 rounded-md transition-colors cursor-pointer"
                      title="Delete card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: SPEAKING RECORDINGS */}
      {activeTab === 'speaking' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#7A6686]">
              Keep record of your weekly monologues, speaking exercises, and pronunciation drills.
            </p>
            <button
              onClick={() => setShowAddSpeakingModal(true)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Spoken Reflection</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {englishData.speaking.map((log) => (
              <div
                key={log.id}
                className="bg-white/95 rounded-3xl p-5 border border-[#EADCF0] shadow-soft-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#F2E8F8]">
                    <span className="text-[11px] font-semibold text-[#8B7498]">{log.date}</span>
                    <span className="text-xs font-mono font-bold text-[#A855F7] bg-[#F5EEFB] px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Play className="w-2.5 h-2.5 fill-current" />
                      {log.duration}
                    </span>
                  </div>
                  <h4 className="text-base font-bold font-title text-[#473450] mt-3">
                    {log.title}
                  </h4>
                  <p className="text-xs text-[#6E587B] mt-2 leading-relaxed bg-[#FAF6FC] p-3 rounded-2xl border border-[#EFE5F5]">
                    {log.notes}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#F2E8F8] flex items-center justify-between text-xs text-[#9B88A5]">
                  <span>Speaking Journal</span>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-600 font-semibold">Self-reviewed ♡</span>
                    <button
                      type="button"
                      onClick={() => deleteSpeakingLog(log.id)}
                      className="p-1 text-[#B09EB8] hover:text-rose-500 rounded-md transition-colors cursor-pointer"
                      title="Delete recording"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: WRITING ESSAYS */}
      {activeTab === 'writing' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#7A6686]">
              Submitted reflective essays, deliberate vocabulary practice, and structural outlines.
            </p>
            <button
              onClick={() => setShowAddWritingModal(true)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Submit New Essay</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {englishData.writing.map((essay) => (
              <div
                key={essay.id}
                className="bg-white/95 rounded-3xl p-5 border border-[#EADCF0] shadow-soft-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#F2E8F8]">
                    <span className="text-[11px] font-semibold text-[#8B7498]">{essay.date}</span>
                    <span className="text-xs font-mono font-bold text-[#EC4899] bg-[#FDF2F8] px-2 py-0.5 rounded-full">
                      {essay.words} words
                    </span>
                  </div>
                  <h4 className="text-base font-bold font-title text-[#473450] mt-3">
                    {essay.title}
                  </h4>
                  <p className="text-xs text-[#6E587B] mt-2 leading-relaxed italic bg-[#FFFBF7] p-3 rounded-2xl border border-[#F6EBDD]">
                    "{essay.excerpt}"
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#F2E8F8] flex items-center justify-between text-xs text-[#9B88A5]">
                  <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {essay.status || 'Published'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span>Writing Archive</span>
                    <button
                      type="button"
                      onClick={() => deleteWritingEssay(essay.id)}
                      className="p-1 text-[#B09EB8] hover:text-rose-500 rounded-md transition-colors cursor-pointer"
                      title="Delete essay"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: LISTENING & PODCASTS */}
      {activeTab === 'listening' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#7A6686]">
              Podcasts, lectures, and interviews logged with distilled takeaways.
            </p>
            <button
              onClick={() => setShowAddPodcastModal(true)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Podcast</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {englishData.listening.map((item) => (
              <div
                key={item.id}
                className="bg-white/95 rounded-3xl p-5 border border-[#EADCF0] shadow-soft-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#F2E8F8]">
                    <span className="text-[11px] font-semibold text-[#8B7498]">{item.date}</span>
                    <span className="text-xs font-mono font-bold text-[#3B82F6] bg-[#EFF6FF] px-2 py-0.5 rounded-full">
                      {item.duration}
                    </span>
                  </div>
                  <h4 className="text-base font-bold font-title text-[#473450] mt-3">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#A291AB] mt-0.5">Host: {item.host}</p>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#A855F7] hover:text-[#7E22CE] underline mt-1.5"
                    >
                      <span>Listen / View Episode</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <div className="mt-3 bg-[#FAF5FD] p-3 rounded-2xl border border-[#EADBEE]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9333EA] block mb-1">
                      Key Takeaway
                    </span>
                    <p className="text-xs text-[#685375] leading-relaxed">
                      {item.keyTakeaway}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-[#F2E8F8] flex items-center justify-between text-xs text-[#9B88A5]">
                  <span>Active Listening</span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-semibold">Completed ✓</span>
                    <button
                      type="button"
                      onClick={() => deletePodcastLog(item.id)}
                      className="p-1 text-[#B09EB8] hover:text-rose-500 rounded-md transition-colors cursor-pointer"
                      title="Delete podcast"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: READING BOOKS & ARTICLES */}
      {activeTab === 'reading' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#7A6686]">
              Books and long-form articles in progress. Drag the slider to update your current page count!
            </p>
            <button
              onClick={() => setShowAddBookModal(true)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Book / Article</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {englishData.reading.map((book) => {
              const progressPct = Math.round((book.pagesRead / (book.totalPages || 1)) * 100);
              return (
                <div
                  key={book.id}
                  className="bg-white/95 rounded-3xl p-5 border border-[#EADCF0] shadow-soft-card flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-[#F2E8F8]">
                      <span className="text-xs font-bold text-[#86569B] uppercase tracking-wider">
                        {book.isArticle ? 'Online Article' : (book.status || 'In Progress')}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5 text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="text-xs font-bold text-[#554160]">{book.rating || 5}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteBookReading(book.id)}
                          className="p-1 text-[#B09EB8] hover:text-rose-500 rounded-md transition-colors cursor-pointer"
                          title="Delete book/article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h4 className="text-lg font-bold font-title text-[#473450] mt-3">
                      {book.title}
                    </h4>
                    <p className="text-xs text-[#8A7694]">by {book.author}</p>
                    {book.url && (
                      <a
                        href={book.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#A855F7] hover:text-[#7E22CE] underline mt-1.5"
                      >
                        <span>Open Book / Article Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    <div className="my-4 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#786483]">Reading Progress:</span>
                        <span className="font-bold text-[#533B5E]">
                          {book.pagesRead} / {book.totalPages} pages ({progressPct}%)
                        </span>
                      </div>
                      <div className="w-full bg-[#F3ECF8] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#10B981] h-full rounded-full transition-all duration-300"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>

                      {/* Interactive page range input */}
                      <div className="pt-2 flex items-center gap-3">
                        <span className="text-[11px] text-[#9785A1]">Update page:</span>
                        <input
                          type="range"
                          min="0"
                          max={book.totalPages}
                          value={book.pagesRead}
                          onChange={(e) => updateBookReadingProgress(book.id, e.target.value)}
                          className="flex-1 accent-[#10B981] cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#F2E8F8] flex items-center justify-between text-[11px] text-[#867491]">
                    <span>{Math.max(0, book.totalPages - book.pagesRead)} pages left</span>
                    <span className="font-handwriting text-sm text-[#7E22CE]">Happy reading ♡</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Vocab Modal */}
      {showAddVocabModal && (
        <div className="fixed inset-0 bg-purple-950/30 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-[#EADDF0] shadow-2xl">
            <h3 className="text-base font-bold text-[#4B3953] font-title mb-2">
              Add New Expression 🌸
            </h3>
            <form onSubmit={handleAddVocab} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Word / Idiom
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ubiquitous"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Definition
                </label>
                <textarea
                  rows={2}
                  placeholder="Present, appearing, or found everywhere."
                  value={newDef}
                  onChange={(e) => setNewDef(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Example Sentence
                </label>
                <input
                  type="text"
                  placeholder="Smartphones have become ubiquitous in modern life."
                  value={newEx}
                  onChange={(e) => setNewEx(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddVocabModal(false)}
                  className="px-3 py-1.5 text-xs text-[#7D6B87]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] rounded-xl"
                >
                  Save Word
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Speaking Modal */}
      {showAddSpeakingModal && (
        <div className="fixed inset-0 bg-purple-950/30 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-[#EADDF0] shadow-2xl">
            <h3 className="text-base font-bold text-[#4B3953] font-title mb-2">
              Log Speaking Recording 🎙️
            </h3>
            <form onSubmit={handleAddSpeaking} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Topic / Title
                </label>
                <input
                  type="text"
                  placeholder="Reviewing today's AI breakthroughs"
                  value={newSpeakingTitle}
                  onChange={(e) => setNewSpeakingTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Duration (e.g. 05:20)
                </label>
                <input
                  type="text"
                  value={newSpeakingDuration}
                  onChange={(e) => setNewSpeakingDuration(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Self-critique & Pronunciation Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Pacing felt comfortable, reduced fillers."
                  value={newSpeakingNotes}
                  onChange={(e) => setNewSpeakingNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddSpeakingModal(false)}
                  className="px-3 py-1.5 text-xs text-[#7D6B87]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] rounded-xl"
                >
                  Log Recording
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Essay Modal */}
      {showAddWritingModal && (
        <div className="fixed inset-0 bg-purple-950/30 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md border border-[#EADDF0] shadow-2xl">
            <h3 className="text-base font-bold text-[#4B3953] font-title mb-2">
              Submit Essay Reflection ✍️
            </h3>
            <form onSubmit={handleAddWriting} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Essay Title
                </label>
                <input
                  type="text"
                  placeholder="On Patience and Compound Growth"
                  value={newEssayTitle}
                  onChange={(e) => setNewEssayTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Essay Content / Excerpt
                </label>
                <textarea
                  rows={4}
                  placeholder="Write your thoughts here..."
                  value={newEssayText}
                  onChange={(e) => setNewEssayText(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddWritingModal(false)}
                  className="px-3 py-1.5 text-xs text-[#7D6B87]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] rounded-xl"
                >
                  Submit Essay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Podcast Modal */}
      {showAddPodcastModal && (
        <div className="fixed inset-0 bg-purple-950/30 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-[#EADDF0] shadow-2xl">
            <h3 className="text-base font-bold text-[#4B3953] font-title mb-2">
              Log Podcast Episode ♡
            </h3>
            <form onSubmit={handleAddPodcast} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Podcast / Episode Title
                </label>
                <input
                  type="text"
                  placeholder="The Mel Robbins Show - Episode 42"
                  value={newPodcastTitle}
                  onChange={(e) => setNewPodcastTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Podcast / Audio URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://open.spotify.com/episode/... or YouTube"
                  value={newPodcastUrl}
                  onChange={(e) => setNewPodcastUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Key Takeaway / Lesson
                </label>
                <textarea
                  rows={2}
                  placeholder="Action creates inspiration, not the other way around."
                  value={newPodcastTakeaway}
                  onChange={(e) => setNewPodcastTakeaway(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPodcastModal(false)}
                  className="px-3 py-1.5 text-xs text-[#7D6B87] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] rounded-xl cursor-pointer"
                >
                  Save Episode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Book / Article Modal */}
      {showAddBookModal && (
        <div className="fixed inset-0 bg-purple-950/30 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-[#EADDF0] shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#F2E8F8] mb-3">
              <h3 className="text-base font-bold text-[#4B3953] font-title">
                Add Book or Article ♡
              </h3>
              <button
                type="button"
                onClick={() => setShowAddBookModal(false)}
                className="text-[#9C8AA6] hover:text-[#554160] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddBook} className="space-y-3">
              <div className="flex items-center gap-4 py-1">
                <label className="flex items-center gap-1.5 text-xs text-[#624E6E] font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="bookType"
                    checked={!newBookIsArticle}
                    onChange={() => setNewBookIsArticle(false)}
                    className="accent-purple-600"
                  />
                  <span>Book</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs text-[#624E6E] font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="bookType"
                    checked={newBookIsArticle}
                    onChange={() => setNewBookIsArticle(true)}
                    className="accent-purple-600"
                  />
                  <span>Article / Essay</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  {newBookIsArticle ? 'Article Title' : 'Book Title'}
                </label>
                <input
                  type="text"
                  placeholder={newBookIsArticle ? "e.g. How to Think Clearly" : "e.g. Atomic Habits"}
                  value={newBookTitle}
                  onChange={(e) => setNewBookTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Author / Publication
                </label>
                <input
                  type="text"
                  placeholder={newBookIsArticle ? "e.g. Paul Graham / Medium" : "e.g. James Clear"}
                  value={newBookAuthor}
                  onChange={(e) => setNewBookAuthor(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Link / URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newBookUrl}
                  onChange={(e) => setNewBookUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#665370] mb-1">
                    {newBookIsArticle ? 'Est. Pages / Min' : 'Total Pages'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newBookPages}
                    onChange={(e) => setNewBookPages(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#665370] mb-1">
                    Current Progress
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newBookCurrent}
                    onChange={(e) => setNewBookCurrent(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddBookModal(false)}
                  className="px-3 py-1.5 text-xs text-[#7D6B87] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] rounded-xl cursor-pointer"
                >
                  Add to Reading List
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
