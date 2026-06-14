import { useState } from 'react';
import { 
  Landmark, HelpCircle, Sparkles, BookOpen, Layers, CheckCircle2, 
  XCircle, ArrowRight, RefreshCw, Bookmark, Award, GraduationCap, ChevronRight, Play
} from 'lucide-react';

const HISTORY_SUBTOPICS = [
  {
    id: 'fundamentals',
    title: 'History Fundamentals',
    desc: 'Review chronological scales (BCE vs CE), archaeological remains vs written archives, and Stratigraphy dating.',
    icon: Landmark
  },
  {
    id: 'sources',
    title: 'Sources & Evidence',
    desc: 'Contrast Primary vs Secondary sources, audit trustworthiness, and analyze ancient perspectives.',
    icon: BookOpen
  },
  {
    id: 'egypt',
    title: 'Ancient Egypt & The Nile',
    desc: 'Analyse the importance of the Nile, the divine Pharaoh, social structures, and mummification rites.',
    icon: Layers
  }
];

const HIEROGLYPH_MAP: Record<string, { symbol: string; name: string }> = {
  a: { symbol: '𓄿', name: 'Vulture' },
  b: { symbol: '𓃾', name: 'Foot' },
  c: { symbol: '𓎡', name: 'Basket' },
  d: { symbol: '𓂋', name: 'Hand' },
  e: { symbol: '𓇋', name: 'Reed' },
  f: { symbol: '𓆑', name: 'Horned Viper' },
  g: { symbol: '𓎛', name: 'Jar Stand' },
  h: { symbol: '𓉔', name: 'Courtyard' },
  i: { symbol: '𓇋', name: 'Two Reeds' },
  j: { symbol: '𓆓', name: 'Cobra' },
  k: { symbol: '𓎡', name: 'Basket' },
  l: { symbol: '𓃠', name: 'Lion' },
  m: { symbol: '𓅓', name: 'Owl' },
  n: { symbol: '𓈖', name: 'Water' },
  o: { symbol: '𓐠', name: 'Lasso' },
  p: { symbol: '𓊲', name: 'Stool' },
  q: { symbol: '𓌌', name: 'Slope' },
  r: { symbol: '𓂋', name: 'Mouth' },
  s: { symbol: '𓊃', name: 'Folded Cloth' },
  t: { symbol: '𓏏', name: 'Loaf' },
  u: { symbol: '𓅱', name: 'Quail Chick' },
  v: { symbol: '𓆑', name: 'Fallen Horn' },
  w: { symbol: '𓅱', name: 'Quail Chick' },
  x: { symbol: '𓎡𓊃', name: 'Basket Linen' },
  y: { symbol: '𓇋', name: 'Two Reeds' },
  z: { symbol: '𓊃', name: 'Folded Cloth' }
};

export function HistoryNotes() {
  const [activeSubTab, setActiveSubTab] = useState<string>('fundamentals');
  const [englishName, setEnglishName] = useState<string>('Leo');

  // Convert name to Hieroglyphs
  const getHieroglyphs = () => {
    return englishName
      .toLowerCase()
      .split('')
      .map(char => HIEROGLYPH_MAP[char] || { symbol: '', name: '' })
      .filter(item => item.symbol !== '');
  };

  const processedGlyphs = getHieroglyphs();

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      {/* Visual Header */}
      <div className="relative mb-8 bg-gradient-to-r from-[#8C6D4A] to-[#604A33] text-white p-6 sm:p-8 rounded-[32px] overflow-hidden shadow-md">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-1/4 scale-150">
          <Landmark className="w-96 h-96" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 dark:bg-[#D4A373]/10 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#FDF6E3] dark:text-[#D4A373] mb-2 border border-white/5">
              <Sparkles className="w-3 h-3 fill-[#FDF6E3] dark:fill-[#D4A373]" /> Chronos Archive
            </div>
            <h2 className="text-2xl md:text-3.5xl font-extrabold tracking-tight font-serif">Year 7 Ancient History</h2>
            <p className="text-amber-100 dark:text-neutral-300 text-xs sm:text-sm mt-1 font-medium max-w-lg">
              Explore primary source archives, radiocarbon stratigraphy systems, social structures, and ancient civilizations.
            </p>
          </div>
          <div className="shrink-0 flex items-center bg-white/10 dark:bg-black/30 p-1.5 rounded-2xl border border-white/5">
            <GraduationCap className="w-10 h-10 text-amber-300 dark:text-amber-400 p-1.5" />
            <div className="pr-3 text-left">
              <p className="text-[9px] uppercase tracking-wider text-amber-200 dark:text-amber-350 font-extrabold leading-none">History Curriculum</p>
              <p className="text-xs font-bold font-mono mt-0.5 leading-none text-white">NESA Stage 4 History</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dual Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Topic Navigation & Royal Cartouche Translator */}
        <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-24">
          
          {/* Mobile Horizontal Selector */}
          <div className="lg:hidden flex overflow-x-auto pb-2 gap-2 scrollbar-hide snap-x">
            {HISTORY_SUBTOPICS.map(topic => {
              const IconComp = topic.icon;
              const isActive = activeSubTab === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setActiveSubTab(topic.id)}
                  className={`snap-center shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-amber-700 text-white border-amber-700 shadow-sm'
                      : 'bg-white dark:bg-[#25251F] text-[#5A5A40] dark:text-[#CBD5E0] border-[#E5E5DB] dark:border-[#3A3A30] hover:bg-neutral-50'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{topic.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop Sidebar Course Directory */}
          <div className="hidden lg:block bg-white dark:bg-[#25251F] rounded-2xl border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm overflow-hidden p-4">
            <p className="text-[10px] font-extrabold uppercase text-[#9C9C8B] tracking-widest px-2 mb-3">Topic Curriculum</p>
            <nav className="space-y-1.5">
              {HISTORY_SUBTOPICS.map(topic => {
                const isActive = activeSubTab === topic.id;
                const IconComp = topic.icon;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setActiveSubTab(topic.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl border flex items-center justify-between transition-all group cursor-pointer ${
                      isActive 
                        ? 'bg-amber-50 text-amber-850 dark:bg-amber-955/20 dark:text-amber-300 border-amber-200 dark:border-amber-900/40 font-bold shadow-sm translate-x-1'
                        : 'bg-transparent border-transparent text-[#5A5A40] dark:text-[#C1BEB5] hover:text-amber-700 dark:hover:text-amber-400 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg border transition-colors ${
                        isActive ? 'bg-white/80 dark:bg-[#1E1E1A]' : 'bg-neutral-100 dark:bg-neutral-800 border-transparent'
                      }`}>
                        <IconComp className="w-4 h-4 shrink-0" />
                      </div>
                      <div>
                        <p className="text-xs font-bold leading-none">{topic.title}</p>
                        <p className="text-[8px] font-semibold text-neutral-400 dark:text-neutral-500 mt-1 leading-none">NESA Standard</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-600 transition-all ${
                      isActive ? 'opacity-100 translate-x-0.5' : 'opacity-0'
                    }`} />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* SIDEBAR WIDGET: Royal Cartouche Translator */}
          <div className="bg-gradient-to-br from-[#FDFBF7] to-[#FAF8F2] dark:from-[#25251F] dark:to-[#1D1D18] rounded-2xl border-2 border-dashed border-[#DFDFD3] dark:border-[#3A3A30] p-4 text-left">
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#7B4F21] bg-[#FAF1E6] dark:bg-[#2C241C] px-2 py-0.5 rounded-md">Royal Cartouche Translator</span>
            
            <div className="mt-4 space-y-3.5">
              <div className="space-y-1">
                <span className="text-[8px] uppercase tracking-wider text-neutral-400">Latin input:</span>
                <input 
                  type="text" 
                  value={englishName}
                  onChange={(e) => setEnglishName(e.target.value)}
                  placeholder="e.g. Cleo"
                  maxLength={12}
                  className="w-full bg-white dark:bg-[#1E1E1A] text-xs font-sans font-bold px-3 py-2 border shadow-inner rounded-xl outline-none focus:border-amber-650"
                />
              </div>

              {/* Cartouche Display Container */}
              <div className="bg-[#FAF9F5] dark:bg-neutral-900 rounded-3xl border-4 border-amber-700/60 p-4 shadow-md text-center flex flex-col items-center justify-center min-h-[90px] relative">
                {/* Horizontal Cartouche bounds */}
                <div className="absolute top-1 bottom-1 left-2.5 right-2.5 border-2 border-dotted border-amber-800/40 rounded-2xl pointer-events-none" />
                
                {processedGlyphs.length > 0 ? (
                  <div className="flex flex-col items-center gap-1 leading-none z-10">
                    <span className="text-3xl tracking-wide text-amber-900 select-none">
                      {processedGlyphs.map(g => g.symbol).join('')}
                    </span>
                    <span className="text-[9px] text-neutral-400 font-bold uppercase mt-1">
                      {processedGlyphs.map(g => g.name.charAt(0)).join('.')}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-neutral-400 font-medium z-10">Enter alphabetics</span>
                )}
              </div>
            </div>
          </div>

        </aside>

        {/* RIGHT COLUMN: Interactive Work Desk and Syllabus Details */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* TAB: FUNDAMENTALS */}
          {activeSubTab === 'fundamentals' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-6">
                  <span className="p-2 bg-amber-50 dark:bg-amber-955 rounded-xl text-amber-600"><Landmark className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">History Foundations & Chronological Scales</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">How historic analysts partition chronological scales</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#FAF9F5] p-4 rounded-xl border flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-amber-800">What is History?</strong>
                      <p className="text-[10px] text-neutral-500 mt-1 leading-normal">The rigorous scientific investigation and narrative modeling of past occurrences based strictly on evidence.</p>
                    </div>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-amber-800">Historians vs Archaeologists</strong>
                      <p className="text-[10px] text-neutral-500 mt-1 leading-normal">Historians formulate narratives using written parchment records. Archaeologists extract physical remains (artifacts).</p>
                    </div>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-amber-800">The BCE / CE Timeline</strong>
                      <p className="text-[10px] text-neutral-500 mt-1 leading-normal">Before Common Era (BCE) counts backwards. Common Era (CE) tracks forward intervals starting from year 1.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SOURCES */}
          {activeSubTab === 'sources' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-6">
                  <span className="p-2 bg-rose-50 dark:bg-rose-955 rounded-xl text-rose-500"><BookOpen className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">Primary vs Secondary Evidence</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">Auditing the authority, biases, perspectives, and dating accuracy of archives</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#FAF9F5] p-5 rounded-2xl border flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-rose-800">Primary Sources</strong>
                      <p className="text-xs text-neutral-500 mt-2 font-medium">Unfiltered physical records, scrolls, tools, or testimonies directly forged during the historic epoch being analyzed.</p>
                    </div>
                    <div className="font-mono text-xs text-neutral-450 mt-4 pt-3 border-t border-dashed">Example: Hieroglyph scrolls, pottery, skeletal remains</div>
                  </div>

                  <div className="bg-[#FAF9F5] p-5 rounded-2xl border flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-rose-800">Secondary Sources</strong>
                      <p className="text-xs text-neutral-500 mt-2 font-medium">Interpretations, books, or historical papers constructed retrospectively after the era under description.</p>
                    </div>
                    <div className="font-mono text-xs text-neutral-450 mt-4 pt-3 border-t border-dashed">Example: Modern documentaries, history textbooks</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: EGYPT */}
          {activeSubTab === 'egypt' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-6">
                  <span className="p-2 bg-emerald-50 dark:bg-emerald-955 rounded-xl text-emerald-650"><Layers className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">Ancient Egypt & Nile River Irrigation</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">How geographical resources enabled extensive societal coordination structures</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs text-neutral-700 leading-relaxed font-semibold">
                  <div className="bg-[#FAF9F5] p-4 rounded-xl border">
                    <strong className="text-emerald-800 text-xs block mb-1">The Gift of the Nile</strong>
                    The lifeblood of civilization. Periodic rising waters left highly nutritious black sludge (Kemet) along dry sands, fostering extensive agricultural and trading systems.
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border">
                    <strong className="text-emerald-800 text-xs block mb-1">Societal Pharaoh Divine Rule</strong>
                    Considered a physical avatar representing the sky god Osiris. Pharaohs wielded absolute legislative, militaristic, and high religious authority over Egypt.
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border">
                    <strong className="text-emerald-800 text-xs block mb-1">Mummification & The Afterlife (Duat)</strong>
                    Rites aimed to preserve the physical vessel of the Ka. Key organs were stored inside canonical jars, leaving the heart inside to be weighed against the feather of Ma&apos;at.
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
