import { useState } from 'react';
import { 
  Dices, HelpCircle, Sparkles, BookOpen, Layers, CheckCircle2, 
  XCircle, ArrowRight, RefreshCw, Bookmark, Award, GraduationCap, ChevronRight, Play
} from 'lucide-react';

const PROBABILITY_SUBTOPICS = [
  {
    id: 'intro',
    title: 'Definitions of Likelihood',
    desc: 'Understand probability spaces, outcomes, events, and standard probability scales (0 to 1).',
    icon: Sparkles
  },
  {
    id: 'formula',
    title: 'The Basic Ratio Formula',
    desc: 'Master the fundamental fraction/ratio used to determine the exact odds of occurrences.',
    icon: BookOpen
  },
  {
    id: 'rules',
    title: 'AND / OR Compound Rules',
    desc: 'Learn mutually exclusive (addition rule) and independent events law (multiplication law).',
    icon: Layers
  },
  {
    id: 'expected',
    title: 'Complement & Expected Frequency',
    desc: 'Calculate complementary events and predicted occurrence rates over massive attempts.',
    icon: Award
  }
];

export function ProbabilityNotes() {
  const [activeSubTab, setActiveSubTab] = useState<string>('intro');
  
  // Interactive Simulator States
  const [totalRolls, setTotalRolls] = useState<number>(0);
  const [rollHistory, setRollHistory] = useState<number[]>([]);
  const [lastRoll, setLastRoll] = useState<number | null>(null);

  const [totalDraws, setTotalDraws] = useState<number>(0);
  const [drawHistory, setDrawHistory] = useState<string[]>([]);
  const [lastDraw, setLastDraw] = useState<{ suit: string; value: string } | null>(null);

  // Roll a dice helper
  const handleRollDice = () => {
    const rolled = Math.floor(Math.random() * 6) + 1;
    setLastRoll(rolled);
    setTotalRolls(prev => prev + 1);
    setRollHistory(prev => [rolled, ...prev.slice(0, 5)]);
  };

  // Draw card helper
  const suits = ['♠ Hearts', '♦ Diamonds', '♣ Clubs', '♠ Spades'];
  const values = ['Ace', '2', '5', '10', 'Jack', 'Queen', 'King'];
  const handleDrawCard = () => {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const val = values[Math.floor(Math.random() * values.length)];
    setLastDraw({ suit, value: val });
    setTotalDraws(prev => prev + 1);
    setDrawHistory(prev => [`${val} of ${suit}`, ...prev.slice(0, 4)]);
  };

  const handleResetSimulators = () => {
    setTotalRolls(0);
    setRollHistory([]);
    setLastRoll(null);
    setTotalDraws(0);
    setDrawHistory([]);
    setLastDraw(null);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      {/* Visual Header */}
      <div className="relative mb-8 bg-gradient-to-r from-amber-700 to-yellow-800 dark:from-[#3E2D12] dark:to-[#382B18] text-white p-6 sm:p-8 rounded-[32px] overflow-hidden shadow-md">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-1/4 scale-150">
          <Dices className="w-96 h-96" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 dark:bg-[#FFD54F]/10 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#FFF8E1] dark:text-[#FFD54F] mb-2 border border-white/5">
              <Sparkles className="w-3 h-3 fill-[#FFF8E1] dark:fill-[#FFD54F]" /> Probability Labs
            </div>
            <h2 className="text-2xl md:text-3.5xl font-extrabold tracking-tight font-serif">Year 7 Probability Analysis</h2>
            <p className="text-amber-105 dark:text-neutral-300 text-xs sm:text-sm mt-1 font-medium max-w-lg">
              Analyze relative frequencies, compound event boundaries, mutually exclusive structures, and live experimental distributions.
            </p>
          </div>
          <div className="shrink-0 flex items-center bg-white/10 dark:bg-black/30 p-1.5 rounded-2xl border border-white/5">
            <GraduationCap className="w-10 h-10 text-amber-300 dark:text-amber-400 p-1.5" />
            <div className="pr-3 text-left">
              <p className="text-[9px] uppercase tracking-wider text-amber-200 dark:text-amber-300 font-extrabold leading-none">Mathematics Spec</p>
              <p className="text-xs font-bold font-mono mt-0.5 leading-none text-white">NESA Stage 4 Probability</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dual Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Topic Navigation & Interactive Dices Simulator */}
        <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-24">
          
          {/* Mobile Horizontal Selector */}
          <div className="lg:hidden flex overflow-x-auto pb-2 gap-2 scrollbar-hide snap-x">
            {PROBABILITY_SUBTOPICS.map(topic => {
              const IconComp = topic.icon;
              const isActive = activeSubTab === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setActiveSubTab(topic.id)}
                  className={`snap-center shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
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
              {PROBABILITY_SUBTOPICS.map(topic => {
                const isActive = activeSubTab === topic.id;
                const IconComp = topic.icon;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setActiveSubTab(topic.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl border flex items-center justify-between transition-all group cursor-pointer ${
                      isActive 
                        ? 'bg-amber-50 text-amber-850 dark:bg-amber-955/20 dark:text-amber-300 border-amber-200 dark:border-amber-900/40 font-bold shadow-sm translate-x-1'
                        : 'bg-transparent border-transparent text-[#5A5A40] dark:text-[#C1BEB5] hover:text-amber-650 dark:hover:text-amber-400 hover:bg-neutral-50'
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

          {/* SIDEBAR WIDGET: Simulated Probability Lab */}
          <div className="bg-gradient-to-br from-[#FDFBF7] to-[#FAF8F2] dark:from-[#25251F] dark:to-[#1D1D18] rounded-2xl border-2 border-dashed border-[#DFDFD3] dark:border-[#3A3A30] p-4 text-left">
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#C08546] bg-[#FAF1E6] dark:bg-[#2C241C] px-2 py-0.5 rounded-md">Relative frequency experiment</span>
            
            <div className="mt-4 space-y-4">
              {/* Dice Roller section */}
              <div className="bg-white dark:bg-neutral-900 p-3 rounded-2xl border shadow-inner">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] text-[#8B8B7A] uppercase font-bold">Six-Sided Dice</span>
                  <span className="text-[9px] text-amber-600 font-mono font-bold">P(Theoretical) = 1/6 (16.7%)</span>
                </div>
                <div className="flex items-center justify-between gap-3 mt-2">
                  <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-serif font-black text-2xl flex items-center justify-center border-2 border-amber-250 dark:border-amber-900 rounded-xl relative shadow-md animate-duration-200">
                    {lastRoll ? lastRoll : '🎲'}
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-neutral-500">Exp. Rolls: <strong className="font-mono text-neutral-700">{totalRolls}</strong></p>
                    <p className="text-[9px] font-mono text-neutral-405 truncate">History: {rollHistory.join(', ')}</p>
                  </div>
                  <button 
                    onClick={handleRollDice}
                    className="p-1 px-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    Roll
                  </button>
                </div>
              </div>

              {/* Card drawer section */}
              <div className="bg-white dark:bg-neutral-900 p-3 rounded-2xl border shadow-inner">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] text-[#8B8B7A] uppercase font-bold">Standard Card Draw</span>
                  <span className="text-[9px] text-amber-605 font-mono font-bold">P(Any Card) = 1/52 (1.9%)</span>
                </div>
                <div className="flex items-center justify-between gap-3 mt-2">
                  <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/20 text-rose-600 font-serif font-bold text-xs flex flex-col items-center justify-center border-2 border-rose-200 rounded-xl relative shadow-md">
                    {lastDraw ? (
                      <>
                        <span className="text-[8px] leading-tight text-neutral-400">{lastDraw.suit.charAt(0)}</span>
                        <span className="text-xs font-black">{lastDraw.value}</span>
                      </>
                    ) : (
                      '🃏'
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-neutral-500">Exp. Draws: <strong className="font-mono text-neutral-700">{totalDraws}</strong></p>
                    <p className="text-[8px] font-mono text-neutral-405 truncate">History: {drawHistory.join(', ')}</p>
                  </div>
                  <button 
                    onClick={handleDrawCard}
                    className="p-1 px-2.5 bg-[#4A6635] hover:bg-[#3D552B] text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    Draw
                  </button>
                </div>
              </div>

              <button 
                onClick={handleResetSimulators}
                className="w-full py-1.5 border border-neutral-200 hover:bg-neutral-50 text-[10px] font-bold text-neutral-500 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> Reset experiment stats
              </button>
            </div>
          </div>

        </aside>

        {/* RIGHT COLUMN: Interactive Work Desk and Syllabus Details */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* TAB: INTRODUCTION & escalas */}
          {activeSubTab === 'intro' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-6">
                  <span className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-amber-600"><Sparkles className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">Probability Scale & Core Definitions</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">Scale bounds of numeric frequency: from 0 (Impossible) to 1 (Certain)</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                    Under the Year 7 syllabus, all probabilities must fall within the range of <strong className="text-amber-700">0 to 1</strong>. You can express probability as a fraction, decimal, or percentage.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-neutral-150">
                      <div className="text-2xl font-mono font-black text-amber-700 mb-1">0</div>
                      <span className="text-[10px] font-extrabold text-neutral-400 bg-white border px-2 py-0.5 rounded uppercase tracking-wider">Impossible</span>
                      <p className="text-[11px] text-neutral-500 mt-2">Example: Drawing a blue marble from a bag containing only red marbles.</p>
                    </div>

                    <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-neutral-150">
                      <div className="text-2xl font-mono font-black text-amber-700 mb-1">0.5</div>
                      <span className="text-[10px] font-extrabold text-[#2B6CB0] bg-white border px-2 py-0.5 rounded uppercase tracking-wider">Even Chance (50%)</span>
                      <p className="text-[11px] text-neutral-500 mt-2">Example: Flipped coins landing with the head side face up.</p>
                    </div>

                    <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-neutral-150">
                      <div className="text-2xl font-mono font-black text-[#386641] mb-1">1</div>
                      <span className="text-[10px] font-extrabold text-[#386641] bg-white border px-2 py-0.5 rounded uppercase tracking-wider">Certain (100%)</span>
                      <p className="text-[11px] text-neutral-500 mt-2">Example: Throwing a number less than 7 on a standard 6-sided dice.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: THE BASIC RATIO FORMULA */}
          {activeSubTab === 'formula' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-6">
                  <span className="p-2 bg-rose-50 dark:bg-rose-955 rounded-xl text-rose-500"><BookOpen className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">The Basic Ratio Formula</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">The universally applicable ratio calculation for theoretical frequency</p>
                  </div>
                </div>

                <div className="bg-[#FEFAE0] dark:bg-[#2A2B1D] border-2 border-[#E9EDC9] p-6 rounded-2xl flex justify-center items-center">
                  <div className="text-center">
                    <div className="text-xs text-[#BC6C25] font-extrabold uppercase tracking-widest mb-3">Formula Map</div>
                    <div className="text-sm md:text-base font-serif italic text-neutral-800 dark:text-neutral-300 pb-3 border-b border-[#BC6C25]/20">
                      Number of favourable outcomes
                    </div>
                    <div className="text-sm md:text-base font-serif italic text-neutral-800 dark:text-neutral-300 pt-3">
                      Total number of outcomes in event space
                    </div>
                  </div>
                </div>

                {/* Practical Example */}
                <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-neutral-150 mt-6 relative">
                  <span className="text-[9px] uppercase font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">Real Example</span>
                  <p className="text-xs font-semibold text-neutral-700 mt-3">What is the probability of picking an odd number from a standard deck of numbers 1 to 10?</p>
                  <ul className="text-xs text-neutral-600 mt-3 space-y-1.5">
                    <li>• Total Outcomes: <strong className="font-mono">10</strong> (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)</li>
                    <li>• Favourable outcomes: <strong className="font-mono">5</strong> (1, 3, 5, 7, 9)</li>
                    <li>• Calculation: <strong className="font-mono bg-white border px-1 rounded text-emerald-600">P(Odd) = 5/10 = 1/2 (50%)</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB: COMPONENT COMPOUND LAWS */}
          {activeSubTab === 'rules' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-6">
                  <span className="p-2 bg-emerald-50 dark:bg-emerald-955 rounded-xl text-emerald-600"><Layers className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">Mutually Exclusive vs Independent Rules</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">How to calculate compound events with &quot;AND&quot; versus &quot;OR&quot; qualifiers</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#FAF9F5] p-5 rounded-2xl border flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-[#FAF1E6] text-amber-700 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">OR Qualifier</span>
                        <strong className="text-xs font-sans text-neutral-800">Add the values</strong>
                      </div>
                      <p className="text-xs text-neutral-500 leading-relaxed font-semibold">For mutually exclusive events (both cannot occur simultaneously).</p>
                    </div>
                    <div className="font-mono text-xs text-emerald-600 bg-white border p-3.5 rounded-xl mt-4">
                      P(Head OR Tail) = 1/2 + 1/2 = 1
                    </div>
                  </div>

                  <div className="bg-[#FAF9F5] p-5 rounded-2xl border flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-[#E2F0D9] text-[#4A6635] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">AND Qualifier</span>
                        <strong className="text-xs font-sans text-neutral-800">Multiply the values</strong>
                      </div>
                      <p className="text-xs text-neutral-500 leading-relaxed font-semibold">For independent events occurring sequentially.</p>
                    </div>
                    <div className="font-mono text-xs text-emerald-600 bg-white border p-3.5 rounded-xl mt-4">
                      P(Two heads in a row) = 1/2 × 1/2 = 1/4
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB:expected COMPLEMENTARY AND FREQUENCY */}
          {activeSubTab === 'expected' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-6">
                  <span className="p-2 bg-indigo-50 dark:bg-indigo-955 rounded-xl text-indigo-600"><Award className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">Complementary Odds & Predicted Frequencies</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">How to calculate odds of non-occurrence, and expected results over intervals</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#FAF9F5] p-5 rounded-2xl border relative">
                    <h4 className="text-xs font-extrabold text-neutral-850">Complementary Events</h4>
                    <p className="text-[10px] text-neutral-400 mt-1 uppercase font-bold">Odds of something NOT happening</p>
                    <p className="text-xs text-neutral-500 mt-2 font-medium">The sum of an event happening and not happening always equals exactly 1.</p>
                    <div className="font-mono text-xs text-neutral-805 bg-white border p-3.5 rounded-xl mt-4 text-[#386641]">
                      P(Not Happening) = 1 - P(Happening)
                    </div>
                  </div>

                  <div className="bg-[#FAF9F5] p-5 rounded-2xl border relative">
                    <h4 className="text-xs font-extrabold text-neutral-850">Expected Frequency</h4>
                    <p className="text-[10px] text-neutral-400 mt-1 uppercase font-bold">Long-Term Theoretical Target</p>
                    <p className="text-xs text-neutral-500 mt-2 font-medium">How many times you expect an event to complete over multiple independent trials.</p>
                    <div className="font-mono text-xs text-neutral-805 bg-white border p-3.5 rounded-xl mt-4 text-[#386641]">
                      Expected = P(theoretical) × total attempts
                    </div>
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
