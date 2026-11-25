import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  BookMarked, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Heart, 
  Star, 
  Image as ImageIcon,
  Pin
} from 'lucide-react';
import { useJournal } from '../context/JournalContext';
import { CuteRibbonBow, LavenderVase, Paperclip, FluffyMascot } from './AestheticDecorations';
import { playSoftPop } from '../utils/audio';

export default function VisionBoardView() {
  const { data, toggleBucketItem, addBucketItem, addVisionDream } = useJournal();

  const [showAddDreamModal, setShowAddDreamModal] = useState(false);
  const [showAddBucketModal, setShowAddBucketModal] = useState(false);

  const [newDreamTitle, setNewDreamTitle] = useState('');
  const [newDreamDesc, setNewDreamDesc] = useState('');
  const [newDreamImage, setNewDreamImage] = useState('');
  const [newDreamCategory, setNewDreamCategory] = useState('Life');

  const [newBucketText, setNewBucketText] = useState('');

  const visionData = data.visionBoard;

  const handleAddDream = (e) => {
    e.preventDefault();
    if (!newDreamTitle.trim()) return;
    addVisionDream({
      title: newDreamTitle.trim(),
      description: newDreamDesc.trim(),
      image: newDreamImage || 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80',
      category: newDreamCategory,
    });
    setNewDreamTitle('');
    setNewDreamDesc('');
    setNewDreamImage('');
    setShowAddDreamModal(false);
  };

  const handleAddBucket = (e) => {
    e.preventDefault();
    if (!newBucketText.trim()) return;
    addBucketItem(newBucketText.trim());
    setNewBucketText('');
    setShowAddBucketModal(false);
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
                Dreams, Books & Bucket List
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#473450] font-title">
              Visualizing the Future
            </h2>
            <p className="text-xs md:text-sm text-[#6C5677] mt-1">
              "Whatever the mind can conceive and believe, it can achieve."
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddDreamModal(true)}
              className="px-4 py-2.5 rounded-2xl text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] flex items-center gap-1.5 shadow-md shadow-purple-200"
            >
              <Plus className="w-4 h-4" />
              <span>Pin New Vision</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Vision Pinboard (Polaroids & Inspirations) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-[#473450] font-title flex items-center gap-2">
            <span>Dreams & Aspirations (Polaroid Gallery)</span>
          </h3>
          <span className="text-xs text-[#8B7498]">Pinned with intention ♡</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visionData.dreams.map((dream, idx) => {
            const rotations = ['rotate-[-1.5deg]', 'rotate-[1.5deg]', 'rotate-[-0.5deg]', 'rotate-[2deg]'];
            const rotClass = rotations[idx % rotations.length];
            return (
              <div
                key={dream.id}
                className={`
                  relative bg-[#FFFDF9] border border-[#EADBEE] p-4 rounded-3xl shadow-soft-card hover:shadow-cozy-hover 
                  transition-all duration-300 hover:rotate-0 hover:-translate-y-1 ${rotClass}
                `}
              >
                {/* Washi Tape */}
                <div className={`washi-tape ${idx % 2 === 0 ? 'washi-tape-pink' : 'washi-tape-yellow'} w-24 h-4 -top-2`}></div>

                {/* Polaroid Image */}
                <div className="w-full h-52 rounded-2xl overflow-hidden bg-purple-100 mb-3 shadow-inner">
                  <img
                    src={dream.image}
                    alt={dream.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Caption in handwriting & title */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A855F7] bg-[#FAF5FD] px-2 py-0.5 rounded-full">
                      {dream.category}
                    </span>
                    <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                  </div>
                  <h4 className="font-title font-bold text-base text-[#473450]">
                    {dream.title}
                  </h4>
                  <p className="font-handwriting text-base text-[#7B6343] leading-snug">
                    "{dream.description}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Grid: Books to Read Shelf & Experiences Bucket List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Books Wishlist */}
        <div className="bg-white/95 rounded-3xl p-6 border border-[#EADCF0] shadow-soft-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F2E8F8]">
              <div className="flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-[#A855F7]" />
                <h3 className="text-base font-bold text-[#473450] font-title">
                  Books to Read Wishlist
                </h3>
              </div>
              <span className="text-xs text-[#8F7D99]">
                {visionData.readingWishlist.length} on shelf
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {visionData.readingWishlist.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF6FC] border border-[#EADBEE] hover:bg-[#F5EDFA] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{book.cover}</span>
                    <div>
                      <h5 className="text-xs md:text-sm font-bold text-[#473450]">{book.title}</h5>
                      <p className="text-[11px] text-[#8C7A96]">{book.author}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    book.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-700'
                      : book.status === 'Reading'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {book.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#F2E8F8] flex items-center justify-between text-xs text-[#887593]">
            <span>Feed your mind every day</span>
            <span className="font-handwriting text-sm text-[#7E22CE]">Never stop learning ♡</span>
          </div>
        </div>

        {/* Bucket List & Experiences to Have */}
        <div className="bg-white/95 rounded-3xl p-6 border border-[#EADCF0] shadow-soft-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F2E8F8]">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#EC4899]" />
                <h3 className="text-base font-bold text-[#473450] font-title">
                  Experiences & Bucket List ✈️
                </h3>
              </div>
              <button
                onClick={() => setShowAddBucketModal(true)}
                className="text-xs font-semibold text-[#A855F7] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              {visionData.bucketList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleBucketItem(item.id)}
                  className={`
                    flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all border
                    ${item.done
                      ? 'bg-[#F9F5FC] border-[#E8DAF0] text-[#867391] line-through'
                      : 'bg-white border-[#EDE1F2] text-[#4E3957] hover:border-[#C084FC]'}
                  `}
                >
                  {item.done ? (
                    <CheckCircle2 className="w-4 h-4 text-[#A855F7] fill-[#F3E8FF] shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-[#CBB9D4] shrink-0" />
                  )}
                  <span className="text-xs md:text-sm font-medium">{item.item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cute Sticky Note Affirmation */}
          <div className="relative mt-6 bg-[#FFFDF2] border border-[#F2E5C4] rounded-2xl p-3.5 rotate-[-1deg]">
            <div className="absolute -top-3 right-4">
              <Paperclip className="w-3.5 h-6" color="#C084FC" />
            </div>
            <p className="font-handwriting text-base text-[#6C5338] leading-tight">
              "{visionData.affirmations[0].text}"
            </p>
          </div>
        </div>
      </div>

      {/* Add Dream Modal */}
      {showAddDreamModal && (
        <div className="fixed inset-0 bg-purple-950/30 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-[#EADDF0] shadow-2xl">
            <h3 className="text-base font-bold text-[#4B3953] font-title mb-2">
              Pin a Future Dream ♡
            </h3>
            <form onSubmit={handleAddDream} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Vision Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mastered French, Living in Paris"
                  value={newDreamTitle}
                  onChange={(e) => setNewDreamTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Description / Feeling
                </label>
                <input
                  type="text"
                  placeholder="The morning breeze, croissants, and speaking effortlessly."
                  value={newDreamDesc}
                  onChange={(e) => setNewDreamDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Image URL (or leave blank for aesthetic default)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newDreamImage}
                  onChange={(e) => setNewDreamImage(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddDreamModal(false)}
                  className="px-3 py-1.5 text-xs text-[#7D6B87]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] rounded-xl"
                >
                  Pin Vision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Bucket Item Modal */}
      {showAddBucketModal && (
        <div className="fixed inset-0 bg-purple-950/30 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-[#EADDF0] shadow-2xl">
            <h3 className="text-base font-bold text-[#4B3953] font-title mb-2">
              Add Bucket Experience ✈️
            </h3>
            <form onSubmit={handleAddBucket} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#665370] mb-1">
                  Experience / Adventure
                </label>
                <input
                  type="text"
                  placeholder="e.g. Star gazing in the Atacama desert"
                  value={newBucketText}
                  onChange={(e) => setNewBucketText(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#DECDE7] rounded-xl focus:border-[#A855F7] focus:outline-hidden"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddBucketModal(false)}
                  className="px-3 py-1.5 text-xs text-[#7D6B87]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] rounded-xl"
                >
                  Add to List
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
