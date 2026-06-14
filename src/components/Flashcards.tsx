import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { flashcards } from '../data/flashcards';

type SubjectFilter = 'All' | 'Algebra' | 'Probability' | 'Angles' | 'Integers' | 'Data' | 'English' | 'Science' | 'History';

export function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filter, setFilter] = useState<SubjectFilter>('All');
  const [viewedCards, setViewedCards] = useState<Set<string>>(new Set());

  const filteredCards = flashcards.filter(c => filter === 'All' || c.category === filter);
  const currentCard = filteredCards[currentIndex];
  
  const completedCount = filteredCards.filter(c => viewedCards.has(c.id)).length;
  const progressPercent = Math.round((completedCount / filteredCards.length) * 100) || 0;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped && currentCard) {
      setViewedCards(prev => new Set(prev).add(currentCard.id));
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    }, 150);
  };

  const handleFilterChange = (newFilter: SubjectFilter) => {
    setFilter(newFilter);
    setViewedCards(new Set());
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight') {
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, currentIndex, filteredCards.length]);

  if (!currentCard) return <div>No cards found.</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#4A4A40]">Active Recall Training</h2>
        <p className="text-[#8B8B7A] text-sm mt-2">Test yourself before your half-yearlies. Read the question, say the answer out loud, then click to flip.</p>
        
        <div className="max-w-md mx-auto pt-6">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B8B7A]">Progress ({filter})</span>
            <span className="text-sm font-bold text-[#5A5A40]">{completedCount} / {filteredCards.length} Completed</span>
          </div>
          <div className="w-full bg-[#E5E5DB] h-3 rounded-full overflow-hidden">
            <div 
              className="bg-[#D4A373] h-full transition-all duration-500 rounded-full" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center flex-wrap gap-2 max-w-xl mx-auto">
        {(['All', 'Algebra', 'Probability', 'Angles', 'Integers', 'Data', 'English', 'Science', 'History'] as const).map(f => (
          <button
            key={f}
            onClick={() => handleFilterChange(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              filter === f 
                ? 'bg-[#5A5A40] text-white shadow-md' 
                : 'bg-white text-[#8B8B7A] border border-[#E5E5DB] hover:bg-[#F5F5F0]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="relative h-[300px] w-full perspective-1000" onClick={handleFlip}>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentCard.id + (isFlipped ? '-back' : '-front')}
            initial={{ rotateX: isFlipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: isFlipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 w-full h-full rounded-[32px] shadow-xl flex flex-col items-center justify-center p-8 cursor-pointer select-none border-4 transition-colors ${
              isFlipped 
                ? 'bg-[#FBFBF8] border-[#E5E5DB] text-[#4A4A40]' 
                : 'bg-[#5A5A40] border-transparent text-white'
            }`}
          >
            {!isFlipped ? (
              <>
                <span className="absolute top-6 left-6 text-[10px] font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
                  {currentCard.category}
                </span>
                <span className="absolute top-6 right-6 text-xs font-bold opacity-60">
                  {currentIndex + 1} / {filteredCards.length}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-center leading-tight">
                  {currentCard.question}
                </h3>
                <p className="absolute bottom-8 opacity-60 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                  Click or Space to flip
                </p>
              </>
            ) : (
              <>
                <span className="absolute top-6 left-6 text-[10px] bg-[#D4A373]/20 px-3 py-1 rounded-full text-[#D4A373] font-bold uppercase tracking-widest">
                  Answer
                </span>
                <p className="text-xl md:text-2xl font-medium text-center text-[#4A4A40]">
                  {currentCard.answer}
                </p>
                <div className="absolute bottom-8 flex gap-4 text-[10px] font-bold uppercase tracking-widest text-[#8B8B7A]">
                  Did you get it right?
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-4">
        <button 
          onClick={handlePrev}
          className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-[#E5E5DB] font-bold text-[#5A5A40] hover:bg-[#FBFBF8] flex items-center gap-2 uppercase tracking-wide text-xs"
        >
           ← Prev
        </button>
        <button 
          onClick={handleNext}
          className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-[#E5E5DB] font-bold text-[#5A5A40] hover:bg-[#FBFBF8] flex items-center gap-2 uppercase tracking-wide text-xs"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
