import { useState } from 'react';
import { 
  Hash, Calculator, HelpCircle, Sparkles, BookOpen, Layers, CheckCircle2, 
  XCircle, ArrowRight, RefreshCw, Wand2, PenTool, Award, GraduationCap, ChevronRight
} from 'lucide-react';

const ALGEBRA_SUBTOPICS = [
  {
    id: 'vocab',
    title: 'Algebra Vocabulary',
    desc: 'Unlock the essential building blocks of algebra: variables, coefficients, and constants.',
    icon: Hash
  },
  {
    id: 'indices',
    title: 'Indices & Powers',
    desc: 'Understand power laws, base values, coefficients, and base-exponent pairs.',
    icon: Layers
  },
  {
    id: 'liketerms',
    title: 'Combining Like Terms',
    desc: 'Master simplification rules: only add/subtract terms with the exact same variables and powers.',
    icon: BookOpen
  },
  {
    id: 'solving',
    title: 'Solving Equations',
    desc: 'Discover back-tracking rules and standard balance methods: do the same to both sides.',
    icon: Calculator
  },
  {
    id: 'worded',
    title: 'Worded Expressions',
    desc: 'Translate natural English sentences into perfect algebraic formulas.',
    icon: PenTool
  }
];

export function AlgebraNotes() {
  const [activeSubTab, setActiveSubTab] = useState<string>('vocab');
  
  // Interactive Simulator States
  const [coefficient, setCoefficient] = useState<number>(3);
  const [variable, setVariable] = useState<string>('x');
  const [power, setPower] = useState<number>(2);
  const [constant, setConstant] = useState<number>(5);

  const [solveStep, setSolveStep] = useState<number>(1);
  const [userGuess, setUserGuess] = useState<string>('');
  const [guessResult, setGuessResult] = useState<'correct' | 'incorrect' | null>(null);

  // Vocabulary drag/test simulator
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const vocabDefinitions: Record<string, { term: string; desc: string; example: string }> = {
    'variable': { term: 'Variable/Pronumeral', desc: 'A letter representing an unknown, fluid quantity.', example: 'x, y, a, n' },
    'coefficient': { term: 'Coefficient', desc: 'The number multiplied directly next to a variable.', example: 'The "3" in 3y' },
    'constant': { term: 'Constant', desc: 'A fixed value that sits alone without any variable next to it.', example: 'The "+5" in 4x + 5' },
    'liketerms': { term: 'Like Terms', desc: 'Terms that share the exact same letter variables and powers.', example: '3ab and 12ab' }
  };

  const handleTestEquationGuess = (guess: string) => {
    setUserGuess(guess);
    if (guess.trim().toLowerCase().replace(/\s/g, '') === 'x=4') {
      setGuessResult('correct');
    } else {
      setGuessResult('incorrect');
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      {/* Visual Header */}
      <div className="relative mb-8 bg-gradient-to-r from-orange-800 to-amber-800 dark:from-[#3E251C] dark:to-[#382618] text-white p-6 sm:p-8 rounded-[32px] overflow-hidden shadow-md">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-1/4 scale-150">
          <Calculator className="w-96 h-96" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 dark:bg-[#FFB74D]/10 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#FFF3E0] dark:text-[#FFB74D] mb-2 border border-white/5">
              <Sparkles className="w-3 h-3 fill-[#FFF3E0] dark:fill-[#FFB74D]" /> Interactive Formula Suite
            </div>
            <h2 className="text-2xl md:text-3.5xl font-extrabold tracking-tight font-serif">Year 7 Algebra Mastery</h2>
            <p className="text-amber-100 dark:text-neutral-300 text-xs sm:text-sm mt-1 font-medium max-w-lg">
              Explore structural terminology, simplify power laws, solve multivariable equations, and test algebraic equivalents in real-time.
            </p>
          </div>
          <div className="shrink-0 flex items-center bg-white/10 dark:bg-black/30 p-1.5 rounded-2xl border border-white/5">
            <GraduationCap className="w-10 h-10 text-amber-350 dark:text-amber-400 p-1.5" />
            <div className="pr-3 text-left">
              <p className="text-[9px] uppercase tracking-wider text-amber-200 dark:text-amber-300 font-extrabold leading-none">Mathematics Spec</p>
              <p className="text-xs font-bold font-mono mt-0.5 leading-none text-white">NESA Stage 4 Algebra</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dual Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Topic Navigation & Interactive Component Simulator */}
        <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-24">
          
          {/* Mobile Horizontal Selector */}
          <div className="lg:hidden flex overflow-x-auto pb-2 gap-2 scrollbar-hide snap-x">
            {ALGEBRA_SUBTOPICS.map(topic => {
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
              {ALGEBRA_SUBTOPICS.map(topic => {
                const isActive = activeSubTab === topic.id;
                const IconComp = topic.icon;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setActiveSubTab(topic.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl border flex items-center justify-between transition-all group cursor-pointer ${
                      isActive 
                        ? 'bg-amber-50 text-amber-850 dark:bg-amber-950/20 dark:text-amber-300 border-amber-200 dark:border-amber-900/40 font-bold shadow-sm translate-x-1'
                        : 'bg-transparent border-transparent text-[#5A5A40] dark:text-[#C1BEB5] hover:text-amber-600 dark:hover:text-amber-400 hover:bg-neutral-50'
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

          {/* SIDEBAR WIDGET: Interactive Equation term builder */}
          <div className="bg-gradient-to-br from-[#FDFBF7] to-[#FAF8F2] dark:from-[#25251F] dark:to-[#1D1D18] rounded-2xl border-2 border-dashed border-[#DFDFD3] dark:border-[#3A3A30] p-4">
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#C08546] bg-[#FAF1E6] dark:bg-[#2C241C] px-2 py-0.5 rounded-md">Live Formula Builder</span>
            
            <div className="mt-4 space-y-3.5">
              <div className="bg-white dark:bg-neutral-900 p-3 rounded-2xl border border-neutral-150 text-center shadow-inner relative overflow-hidden">
                <div className="text-xl font-mono tracking-tight font-extrabold text-neutral-850 dark:text-white">
                  <span className="text-amber-600" title="Coefficient">{coefficient}</span>
                  <span className="text-indigo-600" title="Variable">{variable}</span>
                  <sup className="text-xs text-rose-500" title="Exponent/Power">{power}</sup>
                  <span className="text-emerald-600 mx-1">+</span>
                  <span className="text-emerald-600" title="Constant">{constant}</span>
                </div>
                <div className="text-[9px] text-neutral-400 font-mono mt-1">Interactive Term</div>
              </div>

              {/* Slider controls for values */}
              <div className="space-y-2 text-left">
                <div>
                  <div className="flex justify-between text-[9px] text-[#8B8B7A] uppercase font-extrabold">
                    <span>Coefficient</span>
                    <span>{coefficient}</span>
                  </div>
                  <input 
                    type="range" min="1" max="9" value={coefficient} 
                    onChange={(e) => setCoefficient(parseInt(e.target.value))}
                    className="w-full accent-amber-500 h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[9px] text-[#8B8B7A] uppercase font-extrabold">
                    <span>Power</span>
                    <span>{power}</span>
                  </div>
                  <input 
                    type="range" min="0" max="5" value={power} 
                    onChange={(e) => setPower(parseInt(e.target.value))}
                    className="w-full accent-rose-500 h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[9px] text-[#8B8B7A] uppercase font-extrabold">
                    <span>Constant</span>
                    <span>{constant}</span>
                  </div>
                  <input 
                    type="range" min="1" max="15" value={constant} 
                    onChange={(e) => setConstant(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

        </aside>

        {/* RIGHT COLUMN: Interactive Work Desk and Syllabus Details */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* TAB: VOCABULARY */}
          {activeSubTab === 'vocab' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-6">
                  <span className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-amber-600"><Hash className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">Algebra vocabulary Fundamentals</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">Essential words and definitions required under NSW Code: Stage 4</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-neutral-150 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded uppercase">Pronumeral / Variable</span>
                      <p className="text-xs text-neutral-600 mt-2 font-medium">A letter used to stand in for an unknown numerical value.</p>
                    </div>
                    <div className="font-mono text-sm text-neutral-400 mt-3 pt-3 border-t border-dashed">Example: <span className="text-amber-600 font-bold">x</span>, <span className="text-amber-600 font-bold">y</span>, <span className="text-amber-600 font-bold">a</span>, <span className="text-amber-600 font-bold">n</span></div>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-neutral-150 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold text-rose-700 bg-rose-50 px-2 py-0.5 rounded uppercase">Coefficient</span>
                      <p className="text-xs text-neutral-600 mt-2 font-medium">The number sitting directly next to a variable. Multiplying the variable.</p>
                    </div>
                    <div className="font-mono text-sm text-neutral-400 mt-3 pt-3 border-t border-dashed">Example: The <span className="text-rose-600 font-bold">4</span> in <span className="text-rose-600 font-bold">4</span>x</div>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-neutral-150 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">Constant</span>
                      <p className="text-xs text-neutral-600 mt-2 font-medium">A fixed number that stands completely alone without a variable attachment.</p>
                    </div>
                    <div className="font-mono text-sm text-neutral-400 mt-3 pt-3 border-t border-dashed">Example: The <span className="text-emerald-600 font-bold">+7</span> in 3x <span className="text-emerald-600 font-bold">+7</span></div>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-neutral-150 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold text-[#2B6CB0] bg-[#EBF8FF] px-2 py-0.5 rounded uppercase">Term</span>
                      <p className="text-xs text-neutral-600 mt-2 font-medium">A single numerical constant, single letter, or constant combined with letters.</p>
                    </div>
                    <div className="font-mono text-sm text-[#2B6CB0] mt-3 pt-3 border-t border-dashed">Example: <span className="font-bold">5x²</span>, <span className="font-bold">3b</span>, <span className="font-bold">-9</span></div>
                  </div>
                </div>

                {/* Vocabulary Definition Click Tester */}
                <div className="mt-6 p-5 bg-gradient-to-r from-amber-50 to-amber-50/10 rounded-2xl border-2 border-amber-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs uppercase text-amber-850 flex items-center gap-1">
                      <Wand2 className="w-4 h-4 text-amber-600 animate-pulse" /> Vocabulary Term Checker
                    </h4>
                    <p className="text-[11px] text-neutral-500">Select any term below to learn its precise algebraic definitions and usage rules in exams.</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {Object.keys(vocabDefinitions).map(key => (
                        <button
                          key={key}
                          onClick={() => setSelectedTerm(key)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                            selectedTerm === key 
                              ? 'bg-amber-600 text-white border-amber-600' 
                              : 'bg-white text-neutral-600 border-neutral-250 hover:bg-amber-50'
                          }`}
                        >
                          {vocabDefinitions[key].term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedTerm && (
                    <div className="flex-1 bg-white p-4 rounded-xl border border-amber-200 animate-in slide-in-from-left-4 duration-300">
                      <p className="text-xs font-extrabold text-amber-700">{vocabDefinitions[selectedTerm].term}</p>
                      <p className="text-xs text-neutral-600 mt-1 leading-relaxed font-semibold">{vocabDefinitions[selectedTerm].desc}</p>
                      <p className="text-[10px] font-mono text-neutral-400 mt-2 bg-neutral-50 px-2.5 py-1 rounded border border-dashed">Example: {vocabDefinitions[selectedTerm].example}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: INDICES & POWERS */}
          {activeSubTab === 'indices' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-6">
                  <span className="p-2 bg-rose-50 dark:bg-rose-955 rounded-xl text-rose-500"><Layers className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">Indices, Bases, & Powers</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">Laws for indexing repeated multiplications securely</p>
                  </div>
                </div>

                <div className="bg-[#FAFBF9] p-5 rounded-2xl border border-neutral-150 space-y-4">
                  <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                    An exponent or power indicates how many times a base is multiplied by itself:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-3 rounded-xl border text-center relative overflow-hidden">
                      <span className="text-[9px] uppercase font-extrabold text-neutral-400">Power of 1</span>
                      <div className="font-mono text-xl font-bold text-neural-800 mt-1">x¹ = x</div>
                      <p className="text-[10px] text-neutral-500 mt-1">Always equals itself</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border text-center relative overflow-hidden">
                      <span className="text-[9px] uppercase font-extrabold text-neutral-400">Power of 2</span>
                      <div className="font-mono text-xl font-bold text-neural-800 mt-1">x² = x × x</div>
                      <p className="text-[10px] text-neutral-500 mt-1">&quot;x squared&quot;</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border text-center relative overflow-hidden">
                      <span className="text-[9px] uppercase font-extrabold text-neutral-400">Power of 3</span>
                      <div className="font-mono text-xl font-bold text-neural-800 mt-1">y³ = y × y × y</div>
                      <p className="text-[10px] text-neutral-500 mt-1">&quot;y cubed&quot;</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border text-center relative overflow-hidden">
                      <span className="text-[9px] uppercase font-extrabold text-neutral-400">Power of 0</span>
                      <div className="font-mono text-xl font-bold text-neutral-800 mt-1">x⁰ = 1</div>
                      <p className="text-[10px] text-neutral-500 mt-1">Always equals 1</p>
                    </div>
                  </div>
                </div>

                {/* Conceptual index helper card */}
                <div className="bg-rose-50/20 p-5 rounded-2xl border border-rose-100 flex items-start gap-4 mt-6">
                  <div className="bg-rose-100 p-2.5 rounded-xl text-rose-500 text-lg">💡</div>
                  <div className="text-xs leading-relaxed font-semibold">
                    <span className="text-rose-800 font-extrabold block mb-1">Index Representation</span>
                    In Year 7, remember that <strong className="text-rose-600 font-mono">5y³</strong> means <strong className="font-mono">5 × y × y × y</strong>. 
                    The coefficient <strong className="text-rose-600">5</strong> is NOT raised to the power of 3. Only the variable <strong className="text-[#2B6CB0]">y</strong> has the exponent!
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: COMBINING LIKE TERMS */}
          {activeSubTab === 'liketerms' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-6">
                  <span className="p-2 bg-emerald-50 dark:bg-emerald-955 rounded-xl text-emerald-600"><BookOpen className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">Combining Like Terms</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">Syllabus Rule: Addition & Subtraction is only valid for terms with matching variables & powers</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-neutral-150 relative">
                    <div className="absolute top-2 right-2 flex items-center justify-center p-1 font-extrabold text-emerald-600 bg-emerald-50 rounded-full w-5 h-5 text-xs">✓</div>
                    <span className="text-[10px] font-mono text-emerald-600">Addition (Like variables)</span>
                    <p className="font-mono text-sm text-neutral-800 font-bold mt-2">3x + 5x = 8x</p>
                    <p className="text-[10px] text-neutral-400 mt-1">Both share variable &quot;x&quot; to power of 1.</p>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-neutral-150 relative">
                    <div className="absolute top-2 right-2 flex items-center justify-center p-1 font-extrabold text-emerald-600 bg-emerald-50 rounded-full w-5 h-5 text-xs">✓</div>
                    <span className="text-[10px] font-mono text-emerald-600">Complex Power Exponents</span>
                    <p className="font-mono text-sm text-neutral-800 font-bold mt-2">4x² + 2x² = 6x²</p>
                    <p className="text-[10px] text-neutral-400 mt-1">Both share variable &quot;x&quot; and matching index &quot;2&quot;.</p>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-neutral-150 relative">
                    <div className="absolute top-2 right-2 flex items-center justify-center p-1 font-extrabold text-rose-600 bg-rose-50 rounded-full w-5 h-5 text-xs">×</div>
                    <span className="text-[10px] font-mono text-rose-500">Unlike Constants/Letters</span>
                    <p className="font-mono text-sm text-neutral-800 font-bold mt-2">3x + 4y</p>
                    <p className="text-[10px] text-neutral-400 mt-1 text-red-500/80">CANNOT BE COMBINED (Strictly different variables).</p>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-neutral-150 relative">
                    <div className="absolute top-2 right-2 flex items-center justify-center p-1 font-extrabold text-rose-600 bg-rose-50 rounded-full w-5 h-5 text-xs">×</div>
                    <span className="text-[10px] font-mono text-rose-500">Unlike Indices Power Laws</span>
                    <p className="font-mono text-sm text-neutral-800 font-bold mt-2">4x² + 3x</p>
                    <p className="text-[10px] text-neutral-400 mt-1 text-red-500/80">CANNOT BE COMBINED (Variables have non-matching exponents).</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SOLVING EQUATIONS */}
          {activeSubTab === 'solving' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-6">
                  <span className="p-2 bg-indigo-50 dark:bg-indigo-955 rounded-xl text-indigo-600"><Calculator className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">Solving Linear Equations (1 & 2 Steps)</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">Balancing methods: do exactly the same operation to both sides of the sign</p>
                  </div>
                </div>

                <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-neutral-150 space-y-4">
                  <p className="text-xs text-[#8B8B7A] uppercase tracking-widest font-extrabold">Step-by-Step Balance Workflow</p>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 bg-white p-3 rounded-lg border">
                      <span className="text-xs font-mono text-right text-neutral-600">x + 7 = 15</span>
                      <span className="text-amber-500 font-bold text-xs">Subtract 7 from both sides</span>
                      <span className="text-xs font-mono font-bold text-emerald-600">x = 8</span>
                    </div>

                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 bg-white p-3 rounded-lg border">
                      <span className="text-xs font-mono text-right text-neutral-600">4x = 20</span>
                      <span className="text-amber-500 font-bold text-xs">Divide both sides by 4</span>
                      <span className="text-xs font-mono font-bold text-emerald-600">x = 5</span>
                    </div>

                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 bg-white p-3 rounded-lg border">
                      <span className="text-xs font-mono text-right text-neutral-600">2x + 3 = 13</span>
                      <span className="text-amber-500 font-bold text-xs">Sub 3, then division by 2</span>
                      <span className="text-xs font-mono font-bold text-emerald-600">2x = 10 → x = 5</span>
                    </div>
                  </div>
                </div>

                {/* Equation interactive trial box */}
                <div className="mt-6 p-4 rounded-xl border bg-indigo-50/15 border-indigo-100">
                  <h4 className="text-xs font-bold text-indigo-900 border-b border-indigo-100 pb-2 mb-3">⚡ Practice Balance Solver</h4>
                  <p className="text-xs text-neutral-650 leading-relaxed mb-3">Solve for x: <strong className="font-mono bg-white px-2 py-0.5 rounded border">3x - 2 = 10</strong>. Enter your final step result below to verify.</p>
                  
                  <div className="flex flex-col sm:flex-row gap-2 max-w-sm">
                    <input 
                      type="text"
                      value={userGuess}
                      placeholder="e.g., x=4"
                      onChange={(e) => handleTestEquationGuess(e.target.value)}
                      className="bg-white px-3 py-2 text-xs font-mono font-bold rounded-xl border shadow-inner text-neutral-800 outline-none focus:border-indigo-500"
                    />
                    <button
                      onClick={() => handleTestEquationGuess(userGuess)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow hover:bg-indigo-700 cursor-pointer"
                    >
                      Check Step
                    </button>
                  </div>

                  {guessResult !== null && (
                    <div className="mt-2.5">
                      {guessResult === 'correct' ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-white px-3 py-1 rounded-full border border-emerald-100">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Core balance step solved! (x = 4 represents correct substitution)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs text-rose-600 font-bold bg-white px-3 py-1 rounded-full border border-rose-100">
                          <XCircle className="w-3.5 h-3.5" /> Try again! (Hint: Add 2 to both sides so that 3x = 12).
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: WORDED PHRASES TRANSLATION */}
          {activeSubTab === 'worded' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-6">
                  <span className="p-2 bg-amber-50 dark:bg-amber-955 rounded-xl text-amber-500"><PenTool className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">English Sentence to Algebraic Translation</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">Learn translation maps for standard questions</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-neutral-150 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono text-neutral-400">English statement</p>
                      <p className="font-sans text-xs font-bold text-neutral-700">&quot;a number plus 4&quot;</p>
                    </div>
                    <span className="font-mono text-sm font-bold text-amber-600">n + 4</span>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#FAF1E6] flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono text-neutral-400">English statement</p>
                      <p className="font-sans text-xs font-bold text-neutral-700">&quot;twice a number&quot;</p>
                    </div>
                    <span className="font-mono text-sm font-bold text-amber-600">2n</span>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#FAF1E6] flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono text-neutral-400">English statement</p>
                      <p className="font-sans text-xs font-bold text-neutral-700">&quot;3 less than a number&quot;</p>
                    </div>
                    <span className="font-mono text-sm font-bold text-amber-600">n - 3</span>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#FAF1E6] flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono text-neutral-400">English statement</p>
                      <p className="font-sans text-xs font-bold text-neutral-700">&quot;half of a number&quot;</p>
                    </div>
                    <span className="font-mono text-sm font-bold text-amber-600">n ÷ 2</span>
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
