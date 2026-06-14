import { useState } from 'react';
import { 
  Compass, HelpCircle, Sparkles, BookOpen, Layers, CheckCircle2, 
  XCircle, ArrowRight, RefreshCw, Bookmark, Award, GraduationCap, ChevronRight, Play
} from 'lucide-react';

const ANGLES_SUBTOPICS = [
  {
    id: 'types',
    title: 'Classifications & Types',
    desc: 'Master basic angle names and degree boundaries (Acute, Right, Obtuse, Reflex, Straight).',
    icon: Compass
  },
  {
    id: 'rules',
    title: 'Point & Line Rules',
    desc: 'Explore adjacent, supplementary, complementary, and vertically opposite angle rules.',
    icon: Layers
  },
  {
    id: 'parallel',
    title: 'Parallel Transversals',
    desc: 'Identify corresponding F-angles, alternate Z-angles, and co-interior C-angles on parallel lines.',
    icon: BookOpen
  }
];

export function AnglesNotes() {
  const [activeSubTab, setActiveSubTab] = useState<string>('types');
  const [degreeValue, setDegreeValue] = useState<number>(45);

  const getAngleClassification = (deg: number) => {
    if (deg > 0 && deg < 90) return { name: 'Acute Angle', desc: 'Sits strictly between 0° and 90°.' };
    if (deg === 90) return { name: 'Right Angle', desc: 'Measures exactly 90°. Represented with a square corner.' };
    if (deg > 90 && deg < 180) return { name: 'Obtuse Angle', desc: 'Larger than 90° but strictly smaller than 180°.' };
    if (deg === 180) return { name: 'Straight Angle', desc: 'Measures exactly 180°. Forms a clean straight line.' };
    if (deg > 180 && deg < 360) return { name: 'Reflex Angle', desc: 'Sits between 180° and 360°.' };
    if (deg === 360) return { name: 'Revolution', desc: 'Exactly 360°. Represents a complete 100% rotation.' };
    return { name: 'Zero Angle', desc: 'No rotation.' };
  };

  const angleInfo = getAngleClassification(degreeValue);

  // Calculate SVG line endpoint for angle drawing
  const radians = ((degreeValue - 90) * Math.PI) / 180;
  const lineX = 50 + 40 * Math.cos(radians);
  const lineY = 50 + 40 * Math.sin(radians);

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      {/* Visual Header */}
      <div className="relative mb-8 bg-gradient-to-r from-teal-700 to-cyan-800 dark:from-[#1C3E3B] dark:to-[#183438] text-white p-6 sm:p-8 rounded-[32px] overflow-hidden shadow-md">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-1/4 scale-150">
          <Compass className="w-96 h-96" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 dark:bg-[#4DB6AC]/10 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#E0F2F1] dark:text-[#4DB6AC] mb-2 border border-white/5">
              <Sparkles className="w-3 h-3 fill-[#E0F2F1] dark:fill-[#4DB6AC]" /> Geometry Studio
            </div>
            <h2 className="text-2xl md:text-3.5xl font-extrabold tracking-tight font-serif">Year 7 Geometry & Angles</h2>
            <p className="text-teal-100 dark:text-neutral-300 text-xs sm:text-sm mt-1 font-medium max-w-lg">
              Analyze supplementary, alternate, and corresponding co-interior angle vectors under Australian curricula.
            </p>
          </div>
          <div className="shrink-0 flex items-center bg-white/10 dark:bg-black/30 p-1.5 rounded-2xl border border-white/5">
            <GraduationCap className="w-10 h-10 text-teal-300 dark:text-teal-400 p-1.5" />
            <div className="pr-3 text-left">
              <p className="text-[9px] uppercase tracking-wider text-teal-200 dark:text-teal-300 font-extrabold leading-none">Mathematics Spec</p>
              <p className="text-xs font-bold font-mono mt-0.5 leading-none text-white">NESA Stage 4 Geometry</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dual Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Topic Navigation & Protractor Dial */}
        <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-24">
          
          {/* Mobile Horizontal Selector */}
          <div className="lg:hidden flex overflow-x-auto pb-2 gap-2 scrollbar-hide snap-x">
            {ANGLES_SUBTOPICS.map(topic => {
              const IconComp = topic.icon;
              const isActive = activeSubTab === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setActiveSubTab(topic.id)}
                  className={`snap-center shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
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
              {ANGLES_SUBTOPICS.map(topic => {
                const isActive = activeSubTab === topic.id;
                const IconComp = topic.icon;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setActiveSubTab(topic.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl border flex items-center justify-between transition-all group cursor-pointer ${
                      isActive 
                        ? 'bg-teal-50 text-teal-850 dark:bg-teal-950/20 dark:text-teal-300 border-teal-200 dark:border-teal-900/40 font-bold shadow-sm translate-x-1'
                        : 'bg-transparent border-transparent text-[#5A5A40] dark:text-[#C1BEB5] hover:text-teal-600 dark:hover:text-teal-400 hover:bg-neutral-50'
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

          {/* SIDEBAR WIDGET: Interactive Protractor Dial */}
          <div className="bg-gradient-to-br from-[#FDFBF7] to-[#FAF8F2] dark:from-[#25251F] dark:to-[#1D1D18] rounded-2xl border-2 border-dashed border-[#DFDFD3] dark:border-[#3A3A30] p-4 text-left">
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#008080] bg-[#E0F2F1] dark:bg-[#1A3331] px-2 py-0.5 rounded-md">Protractor Dial</span>
            
            <div className="mt-4 space-y-4">
              <div className="flex justify-center bg-white dark:bg-neutral-900 py-4 rounded-xl border relative shadow-inner">
                {/* SVG Visual Angle Drawer */}
                <svg width="100" height="100" className="overflow-visible select-none pointer-events-none">
                  {/* Outer circle layout */}
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="2" />
                  <circle cx="50" cy="50" r="3" fill="#319795" />
                  {/* Zero baseline angle */}
                  <line x1="50" y1="50" x2="90" y2="50" stroke="#CBD5E0" strokeWidth="2.5" />
                  {/* Dynamic angle vector */}
                  <line x1="50" y1="50" x2={lineX} y2={lineY} stroke="#319795" strokeWidth="3" />
                  {/* Angle arc overlay */}
                  <circle cx="50" cy="50" r="12" fill="#319795" fillOpacity="0.15" />
                </svg>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase">Input degrees</span>
                  <span className="font-mono text-xs font-black text-teal-600">{degreeValue}°</span>
                </div>
                <input 
                  type="range" min="1" max="360" value={degreeValue} 
                  onChange={(e) => setDegreeValue(parseInt(e.target.value))}
                  className="w-full accent-teal-600 h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="bg-white dark:bg-[#1E1E1A] p-3 rounded-xl border">
                <p className="text-xs font-extrabold text-teal-850 dark:text-teal-350">{angleInfo.name}</p>
                <p className="text-[10px] text-neutral-500 mt-1 leading-snug font-semibold">{angleInfo.desc}</p>
              </div>
            </div>
          </div>

        </aside>

        {/* RIGHT COLUMN: Interactive Work Desk and Syllabus Details */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* TAB: TYPES */}
          {activeSubTab === 'types' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-6">
                  <span className="p-2 bg-teal-50 dark:bg-teal-950/40 rounded-xl text-teal-650"><Compass className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">Angles Classification & Measures</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">Core geometric names and rotation properties</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-neutral-150 flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-[#319795]">Acute Angle</strong>
                      <p className="text-[11px] text-neutral-500 mt-1">Sits strictly between 0° and 90°.</p>
                    </div>
                    <span className="font-mono text-xs font-extrabold text-neutral-400 mt-3">0° &lt; Angle &lt; 90°</span>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-neutral-150 flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-[#319795]">Right Angle</strong>
                      <p className="text-[11px] text-neutral-500 mt-1">Perfect quarter circle. Marked by a square-shaped inner arc.</p>
                    </div>
                    <span className="font-mono text-xs font-extrabold text-neutral-400 mt-3">Exactly 90°</span>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-neutral-150 flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-[#319795]">Obtuse Angle</strong>
                      <p className="text-[11px] text-neutral-500 mt-1">Sits strictly between 90° and 180°.</p>
                    </div>
                    <span className="font-mono text-xs font-extrabold text-neutral-400 mt-3">90° &lt; Angle &lt; 180°</span>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-neutral-150 flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-[#319795]">Straight Angle</strong>
                      <p className="text-[11px] text-neutral-500 mt-1">Creates a flat horizontal line width.</p>
                    </div>
                    <span className="font-mono text-xs font-extrabold text-neutral-400 mt-3">Exactly 180°</span>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-neutral-150 flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-[#319795]">Reflex Angle</strong>
                      <p className="text-[11px] text-neutral-500 mt-1">Exceeds a straight line width on rotation.</p>
                    </div>
                    <span className="font-mono text-xs font-extrabold text-neutral-400 mt-3">180° &lt; Angle &lt; 360°</span>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-neutral-150 flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-[#319795]">Revolution</strong>
                      <p className="text-[11px] text-neutral-500 mt-1">Full 100% circle rotation back to basis.</p>
                    </div>
                    <span className="font-mono text-xs font-extrabold text-neutral-400 mt-3">Exactly 360°</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: POINT & LINE RULES */}
          {activeSubTab === 'rules' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-6">
                  <span className="p-2 bg-rose-50 dark:bg-rose-955 rounded-xl text-rose-500"><Layers className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">Intersection & Baseline Rules</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">Mathematical rules governing intersected configurations and straight planes</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#FAF9F5] p-5 rounded-2xl border flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-rose-800">Complementary Angle Pairs</strong>
                      <p className="text-xs text-neutral-500 mt-2 font-medium">Adjacent coordinates sharing a common arm whose sum totals a perfect right angle.</p>
                    </div>
                    <div className="font-mono text-xs text-neutral-805 bg-white border p-3 rounded-xl mt-4">
                      Angle 1 + Angle 2 = 90°
                    </div>
                  </div>

                  <div className="bg-[#FAF9F5] p-5 rounded-2xl border flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-rose-800">Supplementary Angle Pairs</strong>
                      <p className="text-xs text-neutral-500 mt-2 font-medium">Adjacent coordinates lying flat along a straight baseline path.</p>
                    </div>
                    <div className="font-mono text-xs text-neutral-805 bg-white border p-3 rounded-xl mt-4">
                      Angle 1 + Angle 2 = 180°
                    </div>
                  </div>

                  <div className="bg-[#FAF9F5] p-5 rounded-2xl border flex flex-col justify-between col-span-1 md:col-span-2">
                    <div>
                      <strong className="block text-xs text-rose-800">Vertically Opposite Rule</strong>
                      <p className="text-xs text-neutral-500 mt-2 font-medium">When two straight lines cross, the vertical angles opposite each other share exact parity.</p>
                    </div>
                    <div className="font-mono text-xs text-emerald-600 bg-white border p-3 rounded-xl mt-4">
                      Opposite angles are strictly EQUAL
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PARALLEL TRANSVERSALS */}
          {activeSubTab === 'parallel' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-6">
                  <span className="p-2 bg-emerald-50 dark:bg-emerald-955 rounded-xl text-emerald-600"><BookOpen className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">Transversals on Parallel Paths</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">Syllabus rules for corresponding F-shapes, alternate Z-shapes, and interior C-shapes</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-neutral-150 text-center">
                    <div className="bg-teal-50 text-teal-800 font-black w-8 h-8 flex items-center justify-center rounded-lg text-lg mx-auto mb-3">F</div>
                    <strong className="text-xs text-neutral-800 block mb-1">Corresponding</strong>
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-semibold">Matching quadrant positions on each cross section.</p>
                    <span className="block mt-3 text-xs font-bold text-[#386641] font-mono">They are EQUAL</span>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-neutral-150 text-center">
                    <div className="bg-rose-50 text-rose-800 font-black w-8 h-8 flex items-center justify-center rounded-lg text-lg mx-auto mb-3">Z</div>
                    <strong className="text-xs text-neutral-800 block mb-1">Alternate</strong>
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-semibold">Angles nesting opposite between parallel parameters.</p>
                    <span className="block mt-3 text-xs font-bold text-[#386641] font-mono">They are EQUAL</span>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-neutral-150 text-center">
                    <div className="bg-indigo-50 text-indigo-850 font-black w-8 h-8 flex items-center justify-center rounded-lg text-lg mx-auto mb-3">C</div>
                    <strong className="text-xs text-neutral-800 block mb-1">Co-interior</strong>
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-semibold">Adjacent interior configurations on same side crossing.</p>
                    <span className="block mt-3 text-xs font-bold text-indigo-600 font-mono">They add up to 180°</span>
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
