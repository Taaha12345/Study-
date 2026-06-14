import { useState } from 'react';
import { 
  Calculator, HelpCircle, Sparkles, BookOpen, Layers, CheckCircle2, 
  XCircle, ArrowRight, RefreshCw, Bookmark, Award, GraduationCap, ChevronRight, Play
} from 'lucide-react';

const INTEGERS_SUBTOPICS = [
  {
    id: 'directed',
    title: 'Directed Real Numbers',
    desc: 'Understand how positive and negative signed values represent direction and depth (Tides, loss, elevation).',
    icon: Layers
  },
  {
    id: 'computation',
    title: 'Standard Computations',
    desc: 'Review operational tables: adding, subtracting, multiplying, and dividing negative parameters.',
    icon: Calculator
  },
  {
    id: 'primes',
    title: 'Primes & Index Form',
    desc: 'Calculate prime factors, exponents, base values, and decompose composites.',
    icon: BookOpen
  }
];

export function IntegersNotes() {
  const [activeSubTab, setActiveSubTab] = useState<string>('directed');
  
  // Interactive Stepwise BODMAS States
  const [equationIndex, setEquationIndex] = useState<number>(0);
  const sampleEquations = [
    { expr: '5 + (-3) * 2', steps: ['Multiply: (-3) * 2 = -6', 'Apply: 5 + (-6)', 'Answer = -1'] },
    { expr: '12 / (-4) - 5', steps: ['Divide: 12 / (-4) = -3', 'Apply: -3 - 5', 'Answer = -8'] },
    { expr: '-3 * (-4) + 6', steps: ['Multiply: -3 * -4 = 12', 'Add: 12 + 6', 'Answer = 18'] }
  ];

  const activeEquation = sampleEquations[equationIndex];

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      {/* Visual Header */}
      <div className="relative mb-8 bg-gradient-to-r from-red-800 to-orange-850 dark:from-[#3E1C1C] dark:to-[#382318] text-white p-6 sm:p-8 rounded-[32px] overflow-hidden shadow-md">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-1/4 scale-150">
          <Calculator className="w-96 h-96" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 dark:bg-[#EF5350]/10 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#FFEBEE] dark:text-[#EF5350] mb-2 border border-white/5">
              <Sparkles className="w-3 h-3 fill-[#FFEBEE] dark:fill-[#EF5350]" /> Integer Suite
            </div>
            <h2 className="text-2xl md:text-3.5xl font-extrabold tracking-tight font-serif">Year 7 Directed Integers</h2>
            <p className="text-red-100 dark:text-neutral-300 text-xs sm:text-sm mt-1 font-medium max-w-lg">
              Unlock directed coordinates, negative multiplication, index decompositions, and BODMAS order of operations.
            </p>
          </div>
          <div className="shrink-0 flex items-center bg-white/10 dark:bg-black/30 p-1.5 rounded-2xl border border-white/5">
            <GraduationCap className="w-10 h-10 text-red-350 dark:text-red-400 p-1.5" />
            <div className="pr-3 text-left">
              <p className="text-[9px] uppercase tracking-wider text-red-200 dark:text-red-300 font-extrabold leading-none">Mathematics Spec</p>
              <p className="text-xs font-bold font-mono mt-0.5 leading-none text-white">NESA Stage 4 Algebra</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dual Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Topic Navigation & BODMAS Stepwise Simulator */}
        <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-24">
          
          {/* Mobile Horizontal Selector */}
          <div className="lg:hidden flex overflow-x-auto pb-2 gap-2 scrollbar-hide snap-x">
            {INTEGERS_SUBTOPICS.map(topic => {
              const IconComp = topic.icon;
              const isActive = activeSubTab === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setActiveSubTab(topic.id)}
                  className={`snap-center shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-red-600 text-white border-red-600 shadow-sm'
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
              {INTEGERS_SUBTOPICS.map(topic => {
                const isActive = activeSubTab === topic.id;
                const IconComp = topic.icon;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setActiveSubTab(topic.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl border flex items-center justify-between transition-all group cursor-pointer ${
                      isActive 
                        ? 'bg-red-50 text-red-850 dark:bg-red-955/20 dark:text-red-300 border-red-200 dark:border-red-900/40 font-bold shadow-sm translate-x-1'
                        : 'bg-transparent border-transparent text-[#5A5A40] dark:text-[#C1BEB5] hover:text-red-605 dark:hover:text-red-400 hover:bg-neutral-50'
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

          {/* SIDEBAR WIDGET: BODMAS stepwise visualizer tool */}
          <div className="bg-gradient-to-br from-[#FDFBF7] to-[#FAF8F2] dark:from-[#25251F] dark:to-[#1D1D18] rounded-2xl border-2 border-dashed border-[#DFDFD3] dark:border-[#3A3A30] p-4 text-left">
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-red-700 bg-red-50 dark:bg-[#2D1F1F] px-2 py-0.5 rounded-md">BODMAS step simulator</span>
            
            <div className="mt-4 space-y-4">
              <div className="bg-white dark:bg-neutral-900 p-3.5 rounded-xl border relative shadow-inner">
                <span className="text-[8px] uppercase tracking-wider text-rose-500 bg-rose-50 px-1 rounded font-mono">Expression</span>
                <p className="font-mono text-base font-extrabold text-neutral-850 dark:text-white mt-1.5">{activeEquation.expr}</p>
              </div>

              <div className="space-y-1.5 p-3.5 bg-[#FAF9F5] dark:bg-neutral-900 rounded-xl border border-[#DFDFD3]">
                <p className="text-[9px] uppercase font-bold text-neutral-400">Stepwise derivation:</p>
                {activeEquation.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-1 text-[11px] font-mono font-medium text-neutral-700">
                    <span className="text-neutral-400">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setEquationIndex(prev => (prev + 1) % sampleEquations.length)}
                className="w-full py-2 bg-red-650 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" /> Next Example Equation
              </button>
            </div>
          </div>

        </aside>

        {/* RIGHT COLUMN: Interactive Work Desk and Syllabus Details */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* TAB: DIRECTED */}
          {activeSubTab === 'directed' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-6">
                  <span className="p-2 bg-red-50 dark:bg-red-955 rounded-xl text-red-650"><Layers className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">Directed Numbers in Real-World Contexts</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">How signed values correspond directly to physical scale depths</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#FAF9F5] p-4 rounded-xl border flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-red-800">Sea Level Elevation</strong>
                      <p className="text-[10px] text-neutral-500 mt-1">A physical submarine traversing 25m below baseline ocean heights represents values of -25.</p>
                    </div>
                    <span className="font-mono text-xs font-extrabold text-neutral-400 mt-4">Example: -25m</span>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-red-800">Financial Assets</strong>
                      <p className="text-[10px] text-neutral-500 mt-1">Subtracting card ledger debit balances or experiencing a capital stock loss is marked on books as negative.</p>
                    </div>
                    <span className="font-mono text-xs font-extrabold text-neutral-400 mt-4">Example: -$40</span>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-red-800">Temperature Differentials</strong>
                      <p className="text-[10px] text-neutral-500 mt-1">Measuring climatic points that drop directly past ice thresholds on Celsius scale bars.</p>
                    </div>
                    <span className="font-mono text-xs font-extrabold text-neutral-400 mt-4">Example: -5°C</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Standard Computations */}
          {activeSubTab === 'computation' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-6">
                  <span className="p-2 bg-rose-50 dark:bg-rose-955 rounded-xl text-rose-500"><Calculator className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">Rules for Adding, Subtracting, Multiplying & Dividing</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">Operational sign combinations that resolve values</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#FAF9F5] p-5 rounded-2xl border">
                    <strong className="text-xs text-rose-800 block mb-2">Adding & Subtracting Multipliers</strong>
                    <ul className="space-y-1.5 font-mono text-xs text-neutral-600 bg-white p-3 rounded-lg border border-dashed shadow-inner">
                      <li>• + and + makes + (e.g. 5 + +3 = 8)</li>
                      <li>• + and - makes - (e.g. 5 + -3 = 2)</li>
                      <li>• - and + makes - (e.g. 5 - +3 = 2)</li>
                      <li>• - and - makes + (e.g. 5 - -3 = 8)</li>
                    </ul>
                  </div>

                  <div className="bg-[#FAF9F5] p-5 rounded-2xl border">
                    <strong className="text-xs text-rose-800 block mb-2">Multiplying & Dividing Rules</strong>
                    <p className="text-[11px] text-neutral-500 leading-relaxed mb-2 font-medium">Matching signs yield a positive answer. Divergent signs yield a negative answer.</p>
                    <ul className="space-y-1.5 font-mono text-xs text-neutral-600 bg-white p-3 rounded-lg border border-dashed shadow-inner">
                      <li>• (-3) × (-4) = +12  (Matching parameters)</li>
                      <li>• (-3) × 4 = -12  (Divergent values)</li>
                      <li>• 12 ÷ (-4) = -3   (Divergent values)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PRIMES & INDEX FORM */}
          {activeSubTab === 'primes' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-6">
                  <span className="p-2 bg-emerald-50 dark:bg-emerald-955 rounded-xl text-emerald-600"><BookOpen className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">Primes, Base Variables, & Exponents</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">NSW Stage 4 specifications for prime factorization decompositions</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#FAF9F5] p-5 rounded-2xl border flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-emerald-800">Prime Numbers Grid</strong>
                      <p className="text-[11px] text-neutral-500 mt-2 font-semibold">Numbers greater than 1 that only possess exactly two factors: 1 and itself.</p>
                    </div>
                    <div className="font-mono text-xs text-emerald-600 bg-white border p-3 rounded-xl mt-4 font-bold">
                      Primes: 2, 3, 5, 7, 11, 13, 17, 19, 23...
                    </div>
                  </div>

                  <div className="bg-[#FAF9F5] p-5 rounded-2xl border flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-emerald-800">Prime Decompositions</strong>
                      <p className="text-[11px] text-neutral-500 mt-2 font-semibold">Any composite integers can compile back to its fundamental prime base products.</p>
                    </div>
                    <div className="font-mono text-xs text-emerald-600 bg-white border p-3 rounded-xl mt-4 font-bold">
                      24 = 2 × 2 × 2 × 3 = 2³ × 3
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
