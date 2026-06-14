import { useState } from 'react';
import { 
  Compass, HelpCircle, Sparkles, BookOpen, Layers, CheckCircle2, 
  XCircle, ArrowRight, RefreshCw, Bookmark, Award, GraduationCap, ChevronRight, Play, Microscope
} from 'lucide-react';

const SCIENCE_SUBTOPICS = [
  {
    id: 'method',
    title: 'Scientific Method & Labs',
    desc: 'Verify lab equipment drawing details and master independent, dependent, and co-controlled variables.',
    icon: Microscope
  },
  {
    id: 'astronomy',
    title: 'Astronomy & Space Systems',
    desc: 'Compare Geocentric vs Heliocentric models, explain seasons (Earth axis tilt), moon phases, and eclipses.',
    icon: Compass
  },
  {
    id: 'forces',
    title: 'Balanced vs Unbalanced Forces',
    desc: 'Examine direct contact forces (friction, drag) and non-contact fields (gravity, magnetic pulls).',
    icon: Layers
  }
];

export function ScienceNotes() {
  const [activeSubTab, setActiveSubTab] = useState<string>('method');
  const [isHeliocentric, setIsHeliocentric] = useState<boolean>(true);

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      {/* Visual Header */}
      <div className="relative mb-8 bg-gradient-to-r from-blue-900 to-[#101F30] text-white p-6 sm:p-8 rounded-[32px] overflow-hidden shadow-md">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-1/4 scale-150">
          <Microscope className="w-96 h-96" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 dark:bg-[#42A5F5]/10 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#E3F2FD] dark:text-[#42A5F5] mb-2 border border-white/5">
              <Sparkles className="w-3 h-3 fill-[#E3F2FD] dark:fill-[#42A5F5]" /> Celestial Lab
            </div>
            <h2 className="text-2xl md:text-3.5xl font-extrabold tracking-tight font-serif">Year 7 General Science</h2>
            <p className="text-blue-100 dark:text-neutral-300 text-xs sm:text-sm mt-1 font-medium max-w-lg">
              Explore lab safety methodologies, variable bounds control, astronomical system rules, and mechanical fields.
            </p>
          </div>
          <div className="shrink-0 flex items-center bg-white/10 dark:bg-black/30 p-1.5 rounded-2xl border border-white/5">
            <GraduationCap className="w-10 h-10 text-blue-300 dark:text-blue-400 p-1.5" />
            <div className="pr-3 text-left">
              <p className="text-[9px] uppercase tracking-wider text-blue-200 dark:text-blue-300 font-extrabold leading-none">Science Curriculum</p>
              <p className="text-xs font-bold font-mono mt-0.5 leading-none text-white">NESA Stage 4 Science</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dual Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Topic Navigation & Space orbit simulator */}
        <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-24">
          
          {/* Mobile Horizontal Selector */}
          <div className="lg:hidden flex overflow-x-auto pb-2 gap-2 scrollbar-hide snap-x">
            {SCIENCE_SUBTOPICS.map(topic => {
              const IconComp = topic.icon;
              const isActive = activeSubTab === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setActiveSubTab(topic.id)}
                  className={`snap-center shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
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
              {SCIENCE_SUBTOPICS.map(topic => {
                const isActive = activeSubTab === topic.id;
                const IconComp = topic.icon;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setActiveSubTab(topic.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl border flex items-center justify-between transition-all group cursor-pointer ${
                      isActive 
                        ? 'bg-blue-50 text-blue-850 dark:bg-blue-950/20 dark:text-blue-300 border-blue-200 dark:border-blue-900/40 font-bold shadow-sm translate-x-1'
                        : 'bg-transparent border-transparent text-[#5A5A40] dark:text-[#C1BEB5] hover:text-blue-600 dark:hover:text-blue-400 hover:bg-neutral-50'
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

          {/* SIDEBAR WIDGET: Orbit model simulator */}
          <div className="bg-gradient-to-br from-[#FDFBF7] to-[#FAF8F2] dark:from-[#25251F] dark:to-[#1D1D18] rounded-2xl border-2 border-dashed border-[#DFDFD3] dark:border-[#3A3A30] p-4 text-left">
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#1E3A8A] bg-[#DFE7F6] dark:bg-[#1C2333] px-2 py-0.5 rounded-md">Scientific Models simulator</span>
            
            <div className="mt-4 space-y-4">
              <div className="flex justify-center bg-black py-4 rounded-xl relative shadow-inner overflow-hidden h-28 items-center">
                
                {/* Dynamic solar orbit system mockup inside circular wrapper */}
                <div className="relative w-16 h-16 border border-neutral-800 rounded-full flex items-center justify-center">
                  
                  {isHeliocentric ? (
                    <>
                      {/* Sun in center */}
                      <span className="text-sm z-10 select-none animate-pulse">☀️</span>
                      {/* Earth orbiting */}
                      <div className="absolute w-full h-full animate-spin-slow">
                        <span className="text-[10px] absolute -top-1 left-6 select-none">🌍</span>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Earth in center */}
                      <span className="text-sm z-10 select-none">🌍</span>
                      {/* Sun orbiting around */}
                      <div className="absolute w-full h-full animate-spin-slow">
                        <span className="text-[10px] absolute -top-1 left-6 select-none">☀️</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="absolute bottom-1 right-2 text-[8px] text-neutral-400 font-mono">
                  {isHeliocentric ? "Copernicus" : "Ptolemy"}
                </div>
              </div>

              <div className="flex gap-1.5 p-1 bg-neutral-100 rounded-xl border">
                <button
                  onClick={() => setIsHeliocentric(true)}
                  className={`flex-1 text-[10px] font-bold py-1.5 rounded-lg border transition-all cursor-pointer ${
                    isHeliocentric 
                      ? 'bg-white text-blue-900 border-neutral-200 shadow-sm'
                      : 'text-neutral-500 border-transparent'
                  }`}
                >
                  Heliocentric
                </button>
                <button
                  onClick={() => setIsHeliocentric(false)}
                  className={`flex-1 text-[10px] font-bold py-1.5 rounded-lg border transition-all cursor-pointer ${
                    !isHeliocentric 
                      ? 'bg-white text-blue-900 border-neutral-200 shadow-sm'
                      : 'text-neutral-500 border-transparent'
                  }`}
                >
                  Geocentric
                </button>
              </div>

              <div className="bg-white p-3 rounded-xl border text-[10px] text-neutral-500 leading-relaxed font-semibold">
                {isHeliocentric 
                  ? "Heliocentric represents modern truth: The sun lies fixed in center, and planets orbit around it."
                  : "Geocentric represents historical consensus: Ptolemy modeled everything orbiting Earth."
                }
              </div>
            </div>
          </div>

        </aside>

        {/* RIGHT COLUMN: Interactive Work Desk and Syllabus Details */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* TAB: METHOD */}
          {activeSubTab === 'method' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-6">
                  <span className="p-2 bg-blue-50 dark:bg-blue-955 rounded-xl text-blue-600"><Microscope className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">Scientific Investigation Skills</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">Core variables control maps and plotting standards</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#FAF9F5] p-4 rounded-xl border flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-blue-800">Independent Variable</strong>
                      <p className="text-[10px] text-neutral-500 mt-1 leading-normal">The parameter altered manually inside tests to evaluate different scenarios.</p>
                    </div>
                    <span className="font-mono text-[9px] uppercase font-bold text-neutral-400 mt-4">The cause (X-Axis)</span>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-blue-800">Dependent Variable</strong>
                      <p className="text-[10px] text-neutral-500 mt-1 leading-normal">The resulting outcome metric measured directly over test sequences.</p>
                    </div>
                    <span className="font-mono text-[9px] uppercase font-bold text-neutral-400 mt-4">The effect (Y-Axis)</span>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-blue-800">Control Variable</strong>
                      <p className="text-[10px] text-neutral-500 mt-1 leading-normal">The remaining environmental variables locked fixed to guarantee fair results.</p>
                    </div>
                    <span className="font-mono text-[9px] uppercase font-bold text-neutral-400 mt-4">Locks parity</span>
                  </div>
                </div>

                {/* Lab Safety Checklist */}
                <div className="bg-blue-50/20 p-5 rounded-2xl border border-blue-100 flex items-start gap-4 mt-6">
                  <div className="bg-blue-100 p-2 text-blue-600 rounded-xl text-lg">🧪</div>
                  <div className="text-xs leading-relaxed font-semibold text-neutral-700">
                    <span className="text-blue-900 font-extrabold block mb-1">NSW Year 7 Lab Safety Specifications</span>
                    Always represent cross-sections (beakers, test tubes, Bunsen burners) in clear 2D line sketches. Never use shaded gradients. Always outline lines with metric pencils and straight ruler frames.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ASTRONOMY */}
          {activeSubTab === 'astronomy' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-6">
                  <span className="p-2 bg-rose-50 dark:bg-rose-955 rounded-xl text-rose-500"><Compass className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">Space Systems, Seasons, Tides & Eclipses</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">Physical celestial motion properties causing rhythmic patterns</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#FAF9F5] p-5 rounded-2xl border flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-rose-800">The 23.5° Rotation Tilt (Seasons)</strong>
                      <p className="text-xs text-neutral-500 mt-2 font-medium">Day and night rotation is caused by Earth spin. Seasons are caused strictly by the 23.5° axis tilt combined with orbital travels around the Sun.</p>
                    </div>
                    <div className="font-mono text-xs text-rose-600 bg-white border p-3 rounded-xl mt-4">
                      Revolution interval = 365.25 days
                    </div>
                  </div>

                  <div className="bg-[#FAF9F5] p-5 rounded-2xl border flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-rose-800">Eclipses (Solar vs Lunar)</strong>
                      <p className="text-xs text-neutral-500 mt-2 font-medium">A solar eclipse is caused when the Moon lies directly between the Earth and Sun, casting umbra shadows on the surface.</p>
                    </div>
                    <div className="font-mono text-xs text-rose-600 bg-white border p-3 rounded-xl mt-4">
                      Lunar = Earth casts shadows on Moon
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: FORCES */}
          {activeSubTab === 'forces' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-6">
                  <span className="p-2 bg-emerald-50 dark:bg-emerald-955 rounded-xl text-emerald-600"><Layers className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">Balanced vs Unbalanced mechanical Forces</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">Syllabus rules defining acceleration boundaries and non-contact physics fields</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#FAF9F5] p-5 rounded-2xl border flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-emerald-855">Contact Forces</strong>
                      <p className="text-xs text-neutral-500 mt-2 font-semibold">Forces requiring direct physical collision surfaces to interact or direct mechanical pushes.</p>
                    </div>
                    <div className="font-mono text-xs text-emerald-600 bg-white border p-3 rounded-xl mt-4">
                      Friction, Air-friction drag, tension
                    </div>
                  </div>

                  <div className="bg-[#FAF9F5] p-5 rounded-2xl border flex flex-col justify-between">
                    <div>
                      <strong className="block text-xs text-emerald-855">Non-Contact Fields</strong>
                      <p className="text-xs text-neutral-500 mt-2 font-semibold">Forces operating over remote vectors via dynamic vector fields without physical contact touchpoints.</p>
                    </div>
                    <div className="font-mono text-xs text-emerald-600 bg-white border p-3 rounded-xl mt-4">
                      Gravity, Electrostatics, Magnetic poles
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
