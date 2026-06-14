import { useState } from 'react';
import { 
  BarChart2, HelpCircle, Sparkles, BookOpen, Layers, CheckCircle2, 
  XCircle, ArrowRight, RefreshCw, Bookmark, Award, GraduationCap, ChevronRight, Play
} from 'lucide-react';

const DATA_SUBTOPICS = [
  {
    id: 'types',
    title: 'Types of Data',
    desc: 'Examine words vs numbers: Nominal vs Ordinal Categorical and Discrete vs Continuous Numerical data.',
    icon: Layers
  },
  {
    id: 'measures',
    title: 'Measures of Center',
    desc: 'Master calculations for the big four statistical centers: Mean, Median, Mode, and Range.',
    icon: BookOpen
  },
  {
    id: 'graphs',
    title: 'Chart Representations',
    desc: 'Verify rules for dot plots, column graphs, histograms, stem-and-leaf plots, and sectors.',
    icon: BarChart2
  }
];

export function DataNotes() {
  const [activeSubTab, setActiveSubTab] = useState<string>('types');
  const [rawInput, setRawInput] = useState<string>('4, 8, 8, 12, 28');

  // Parse and calculate live stats
  const numbers = rawInput
    .split(',')
    .map(val => parseFloat(val.trim()))
    .filter(val => !isNaN(val));

  const calculateStats = () => {
    if (numbers.length === 0) {
      return { mean: 0, median: 0, mode: 'None', range: 0, outliers: 'None' };
    }

    // Mean
    const totalSum = numbers.reduce((acc, curr) => acc + curr, 0);
    const meanVal = (totalSum / numbers.length).toFixed(1);

    // Median
    const sorted = [...numbers].sort((a, b) => a - b);
    let medianVal = 0;
    const midIdx = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
      medianVal = (sorted[midIdx - 1] + sorted[midIdx]) / 2;
    } else {
      medianVal = sorted[midIdx];
    }

    // Mode
    const freq: Record<number, number> = {};
    numbers.forEach(num => {
      freq[num] = (freq[num] || 0) + 1;
    });
    let maxFreq = 0;
    let modeVal: number[] = [];
    Object.keys(freq).forEach(key => {
      const numKey = parseFloat(key);
      if (freq[numKey] > maxFreq) {
        maxFreq = freq[numKey];
        modeVal = [numKey];
      } else if (freq[numKey] === maxFreq) {
        modeVal.push(numKey);
      }
    });
    const parsedMode = maxFreq > 1 ? modeVal.join(', ') : 'None';

    // Range
    const maxVal = Math.max(...numbers);
    const minVal = Math.min(...numbers);
    const rangeVal = maxVal - minVal;

    // Outliers using simplified IQR
    // Simple 1.5 * IQR outlier detection
    const q1 = sorted[Math.floor(sorted.length * 0.25)];
    const q3 = sorted[Math.floor(sorted.length * 0.75)];
    const iqr = q3 - q1;
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
    const foundOutliers = numbers.filter(n => n < lowerBound || n > upperBound);
    const outlierString = foundOutliers.length > 0 ? foundOutliers.join(', ') : 'None';

    return {
      mean: meanVal,
      median: medianVal,
      mode: parsedMode,
      range: rangeVal,
      outliers: outlierString
    };
  };

  const currentStats = calculateStats();

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      {/* Visual Header */}
      <div className="relative mb-8 bg-gradient-to-r from-emerald-800 to-teal-850 dark:from-[#1F3E2B] dark:to-[#18342D] text-white p-6 sm:p-8 rounded-[32px] overflow-hidden shadow-md">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-1/4 scale-150">
          <BarChart2 className="w-96 h-96" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 dark:bg-[#66BB6A]/10 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#E8F5E9] dark:text-[#66BB6A] mb-2 border border-white/5">
              <Sparkles className="w-3 h-3 fill-[#E8F5E9] dark:fill-[#66BB6A]" /> Statistics Studio
            </div>
            <h2 className="text-2xl md:text-3.5xl font-extrabold tracking-tight font-serif">Year 7 Data & Statistics</h2>
            <p className="text-emerald-100 dark:text-neutral-300 text-xs sm:text-sm mt-1 font-medium max-w-lg">
              Explore dynamic population spreads, continuous graphs, measures of central tendency, and outlier identification algorithms.
            </p>
          </div>
          <div className="shrink-0 flex items-center bg-white/10 dark:bg-black/30 p-1.5 rounded-2xl border border-white/5">
            <GraduationCap className="w-10 h-10 text-emerald-300 dark:text-emerald-405 p-1.5" />
            <div className="pr-3 text-left">
              <p className="text-[9px] uppercase tracking-wider text-emerald-250 dark:text-emerald-300 font-extrabold leading-none">Mathematics Spec</p>
              <p className="text-xs font-bold font-mono mt-0.5 leading-none text-white">NESA Stage 4 Data</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dual Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Topic Navigation & Dataset Calculator */}
        <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-24">
          
          {/* Mobile Horizontal Selector */}
          <div className="lg:hidden flex overflow-x-auto pb-2 gap-2 scrollbar-hide snap-x">
            {DATA_SUBTOPICS.map(topic => {
              const IconComp = topic.icon;
              const isActive = activeSubTab === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setActiveSubTab(topic.id)}
                  className={`snap-center shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
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
              {DATA_SUBTOPICS.map(topic => {
                const isActive = activeSubTab === topic.id;
                const IconComp = topic.icon;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setActiveSubTab(topic.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl border flex items-center justify-between transition-all group cursor-pointer ${
                      isActive 
                        ? 'bg-emerald-50 text-emerald-850 dark:bg-emerald-950/20 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/40 font-bold shadow-sm translate-x-1'
                        : 'bg-transparent border-transparent text-[#5A5A40] dark:text-[#C1BEB5] hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-neutral-50'
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

          {/* SIDEBAR WIDGET: Real Dataset Calculator */}
          <div className="bg-gradient-to-br from-[#FDFBF7] to-[#FAF8F2] dark:from-[#25251F] dark:to-[#1D1D18] rounded-2xl border-2 border-dashed border-[#DFDFD3] dark:border-[#3A3A30] p-4 text-left">
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#386641] bg-[#E2F0D9] dark:bg-[#1C2C1A] px-2 py-0.5 rounded-md">Live Dataset Analyzer</span>
            
            <div className="mt-4 space-y-3.5">
              <div className="space-y-1">
                <span className="text-[8px] uppercase tracking-wider text-neutral-400">Comma-separated input:</span>
                <input 
                  type="text" 
                  value={rawInput}
                  onChange={(e) => setRawInput(e.target.value)}
                  placeholder="e.g. 2, 5, 5, 9, 32"
                  className="w-full bg-white dark:bg-[#1E1E1A] text-xs font-mono font-bold px-3 py-2 border shadow-inner rounded-xl outline-none focus:border-emerald-500"
                />
              </div>

              {/* Statistics Results Grid */}
              <div className="bg-white dark:bg-neutral-900 rounded-xl border p-3 divide-y divide-neutral-100 space-y-1.5">
                <div className="flex justify-between text-xs py-1">
                  <span className="text-neutral-400 font-semibold">Mean</span>
                  <strong className="font-mono text-[#386641]">{currentStats.mean}</strong>
                </div>
                <div className="flex justify-between text-xs pt-1.5 py-1">
                  <span className="text-neutral-400 font-semibold">Median</span>
                  <strong className="font-mono text-[#386641]">{currentStats.median}</strong>
                </div>
                <div className="flex justify-between text-xs pt-1.5 py-1">
                  <span className="text-neutral-400 font-semibold">Mode</span>
                  <strong className="font-mono text-[#386641]">{currentStats.mode}</strong>
                </div>
                <div className="flex justify-between text-xs pt-1.5 py-1">
                  <span className="text-neutral-400 font-semibold">Range</span>
                  <strong className="font-mono text-[#386641]">{currentStats.range}</strong>
                </div>
                <div className="flex justify-between text-xs pt-1.5">
                  <span className="text-neutral-400 font-semibold">Outliers</span>
                  <strong className="font-mono text-rose-500">{currentStats.outliers}</strong>
                </div>
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
                  <span className="p-2 bg-emerald-50 dark:bg-emerald-955 rounded-xl text-emerald-650"><Layers className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">Categorical vs Numerical Configurations</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">How statistics separates metrics back to their root classifications</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#FAF9F5] p-5 rounded-2xl border flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold text-[#2B6CB0] bg-[#EBF8FF] px-2 py-0.5 rounded uppercase font-sans">Categorical Nominal</span>
                      <p className="text-xs text-neutral-600 mt-2 font-semibold">Qualitative labels or descriptions where order possesses zero mathematical utility.</p>
                    </div>
                    <div className="font-mono text-xs text-neutral-400 mt-4 pt-3 border-t border-dashed">Example: Eye color, car brands</div>
                  </div>

                  <div className="bg-[#FAF9F5] p-5 rounded-2xl border flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold text-[#2B6CB0] bg-[#EBF8FF] px-2 py-0.5 rounded uppercase font-sans">Categorical Ordinal</span>
                      <p className="text-xs text-neutral-600 mt-2 font-semibold">Qualitative configurations which can be arranged along a natural hierarchy or order scale.</p>
                    </div>
                    <div className="font-mono text-xs text-neutral-400 mt-4 pt-3 border-t border-dashed">Example: T-Shirt sizing S/M/L</div>
                  </div>

                  <div className="bg-[#FAF9F5] p-5 rounded-2xl border flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase font-sans">Numerical Discrete</span>
                      <p className="text-xs text-neutral-600 mt-2 font-semibold">Quantifiable variables calculated via individual integers (Strict count boundaries).</p>
                    </div>
                    <div className="font-mono text-xs text-neutral-400 mt-4 pt-3 border-t border-dashed">Example: Sibling tally (1, 2, 3)</div>
                  </div>

                  <div className="bg-[#FAF9F5] p-5 rounded-2xl border flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase font-sans">Numerical Continuous</span>
                      <p className="text-xs text-neutral-600 mt-2 font-semibold">Quantitative continuous metrics measured dynamically (Exhibiting decimals/infinite subdivisions).</p>
                    </div>
                    <div className="font-mono text-xs text-neutral-400 mt-4 pt-3 border-t border-dashed">Example: Height, time, age intervals</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: MEASURES OF CENTER */}
          {activeSubTab === 'measures' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-6">
                  <span className="p-2 bg-rose-50 dark:bg-rose-955 rounded-xl text-rose-500"><BookOpen className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">Mean, Median, Mode, & Range Calculations</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">Formulas for evaluating averages and distribution layouts</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#FAF9F5] p-4 rounded-xl border relative">
                    <strong className="text-xs text-rose-800">Mean (The average)</strong>
                    <p className="text-[10px] text-neutral-500 mt-1">Sum of all dataset observations divided strictly by its structural count.</p>
                    <span className="block mt-3 text-[11px] font-mono font-bold text-neutral-400 leading-none">Formula: Sum / Count</span>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border relative">
                    <strong className="text-xs text-rose-800">Median (The center value)</strong>
                    <p className="text-[10px] text-neutral-500 mt-1">The middle point when elements parse sequentially back-to-front.</p>
                    <span className="block mt-3 text-[11px] font-mono font-bold text-neutral-400 leading-none">Odd: Middle | Even: Average of two center bounds</span>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border relative">
                    <strong className="text-xs text-rose-800">Mode (Frequency winner)</strong>
                    <p className="text-[10px] text-neutral-500 mt-1">The score exhibiting the highest observation frequency.</p>
                    <span className="block mt-3 text-[11px] font-mono font-bold text-neutral-400 leading-none">Tip: Datasets can be bimodal!</span>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border relative">
                    <strong className="text-xs text-rose-800">Range (Spread limit)</strong>
                    <p className="text-[10px] text-neutral-500 mt-1">The direct linear distance separating absolute extremes.</p>
                    <span className="block mt-3 text-[11px] font-mono font-bold text-neutral-400 leading-none">Formula: Max - Min</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CHART REPRESENTATIONS */}
          {activeSubTab === 'graphs' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-6">
                  <span className="p-2 bg-emerald-50 dark:bg-emerald-955 rounded-xl text-emerald-600"><BarChart2 className="w-5 h-5" /></span>
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">Visual representation of data</h3>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">Review the structural specifications for standard Year 7 diagram templates</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#FAF9F5] p-4 rounded-xl border">
                    <strong className="text-xs text-[#386641] block mb-1">Column Graphs</strong>
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-semibold">Vertical bars offset by clear whitespace gaps. Best fitted for categorical variables.</p>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border">
                    <strong className="text-xs text-[#386641] block mb-1">Histograms</strong>
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-semibold">Vertical bars completely flush without gaps. Fitted for continuous numeric groupings.</p>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border">
                    <strong className="text-xs text-[#386641] block mb-1">Dot Plots</strong>
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-semibold">Discrete data observations stacked in vertical dots above reference scales.</p>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border">
                    <strong className="text-xs text-[#386641] block mb-1">Stem-and-Leaf representation</strong>
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-semibold">Numerical matrix split on base values: stem represents the tens axis, leaf represents units.</p>
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
