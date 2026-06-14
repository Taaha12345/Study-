export function MistakesNotes() {
  const mistakes = [
    {
      title: "Adding unlike terms",
      wrong: ["3x + 2 = 5x", "4x² + 3x = 7x³"],
      correct: "3x + 2 stays as 3x + 2",
      fix: "Only add if SAME letter AND SAME power!"
    },
    {
      title: "Forgetting x means 1x",
      wrong: ["x + x = x²", "3x + x = 3x²"],
      correct: "x + x = 2x",
      fix: "x = 1x, so 3x + 1x = 4x"
    },
    {
      title: "Mixing up adding vs multiplying",
      wrong: ["3x × 2x = 6x"],
      correct: "3x × 2x = 6x²",
      fix: "+ → add coefficients. × → multiply coefficients AND add indices"
    },
    {
      title: "Forgetting to do same to BOTH sides",
      wrong: ["2x + 3 = 11 → 2x = 11"],
      correct: "2x = 8 → x = 4",
      fix: "Whatever you do to left, do to right!"
    },
    {
      title: "Losing negative signs",
      wrong: ["-3x + 5x = -2x"],
      correct: "-3x + 5x = 2x",
      fix: "Rewrite with brackets: (-3x) + (5x) = 2x"
    },
    {
      title: "(x²)³ mistake",
      wrong: ["(x²)³ = x⁵"],
      correct: "(x²)³ = x⁶",
      fix: "Power of a power → MULTIPLY the indices (2×3=6)"
    },
    {
      title: "Forgetting to square the coefficient",
      wrong: ["(3x)² = 3x²"],
      correct: "(3x)² = 9x²",
      fix: "(3x)² = 3² × x² = 9x²"
    },
    {
      title: "Misreading word problems",
      wrong: ['"5 less than a number" → 5 - n'],
      correct: '"5 less than n" → n - 5',
      fix: '"Less than" means REVERSE the order!'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#FAE1DD] dark:bg-[#402020] border-l-4 border-[#B05B5B] dark:border-[#E5A8A8] p-5 rounded-r-2xl mb-8 shadow-sm">
        <h2 className="text-[#B05B5B] dark:text-[#E5A8A8] font-bold text-lg uppercase tracking-tight">Watch out!</h2>
        <p className="text-[#B05B5B]/80 dark:text-[#E5A8A8]/80 text-sm font-medium">These are the most common trap doors in exams. Review these specifically before your half-yearly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mistakes.map((m, idx) => (
          <div key={idx} className="bg-[#FAE1DD] dark:bg-[#322020] border border-[#F8D7DA] dark:border-[#4A2A2A] rounded-[32px] overflow-hidden shadow-sm flex flex-col">
            <div className="bg-white/40 dark:bg-black/20 border-b border-white/60 dark:border-black/40 p-5">
              <h3 className="font-bold text-[#B05B5B] dark:text-[#E5A8A8] flex items-center gap-2 uppercase tracking-wide text-sm">
                <span className="bg-white/60 dark:bg-black/30 text-[#B05B5B] dark:text-[#E5A8A8] w-6 h-6 rounded-full flex items-center justify-center text-xs">{idx + 1}</span>
                {m.title}
              </h3>
            </div>
            <div className="p-5 flex-1 space-y-4">
              <div className="space-y-2">
                {m.wrong.map((w, i) => (
                  <div key={i} className="flex items-center text-[#B05B5B] dark:text-[#E5A8A8] bg-white/40 dark:bg-black/20 p-3 rounded-2xl text-xs font-mono border border-white/60 dark:border-black/40">
                    <span className="mr-2 opacity-80">❌</span> {w}
                  </div>
                ))}
              </div>
              <div className="flex items-center text-[#386641] dark:text-[#A7C890] bg-[#F2E8CF] dark:bg-[#1A2016] p-3 rounded-2xl text-xs font-mono border border-[#DAE3C5] dark:border-[#2D3A26] shadow-sm">
                <span className="mr-2 opacity-80">✅</span> {m.correct}
              </div>
            </div>
            <div className="bg-[#B05B5B] dark:bg-[#722F2F] p-5 text-white flex items-start gap-3 m-2 mt-0 rounded-2xl mx-4 mb-4 shadow-sm">
              <span className="text-[#FAE1DD] text-xl">🔧</span>
              <div>
                <span className="block text-[10px] font-black text-[#FAE1DD] uppercase tracking-widest mb-1">The Fix</span>
                <span className="text-white opacity-95 text-sm font-medium leading-tight">{m.fix}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white dark:bg-[#2A2A22] rounded-[32px] p-8 shadow-sm border border-[#E5E5DB] dark:border-[#3A3A30]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#5A5A40] dark:text-[#EAE6D8]">Common Algebra Mistakes Only</h2>
          <span className="text-[10px] bg-[#FAE1DD] dark:bg-[#402020] text-[#B05B5B] dark:text-[#E5A8A8] px-3 py-1 rounded-full font-black uppercase tracking-wider w-max">No Fixes, Just Errors</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-[#FBFBF8] dark:bg-[#32322A] p-5 rounded-2xl border border-[#F0F0E8] dark:border-[#404035]">
              <p className="text-[10px] font-black text-[#8B8B7A] dark:text-[#A0A096] mb-3 uppercase tracking-widest border-b border-[#F0F0E8] dark:border-[#404035] pb-2">Mistake 1</p>
              <p className="font-mono text-sm text-[#B05B5B] dark:text-[#E5A8A8] mb-2 font-bold opacity-90">3x + 2 = 5x</p>
              <p className="font-mono text-sm text-[#B05B5B] dark:text-[#E5A8A8] font-bold opacity-90">4x² + 3x = 7x³</p>
            </div>
            <div className="bg-[#FBFBF8] dark:bg-[#32322A] p-5 rounded-2xl border border-[#F0F0E8] dark:border-[#404035]">
              <p className="text-[10px] font-black text-[#8B8B7A] dark:text-[#A0A096] mb-3 uppercase tracking-widest border-b border-[#F0F0E8] dark:border-[#404035] pb-2">Mistake 2</p>
              <p className="font-mono text-sm text-[#B05B5B] dark:text-[#E5A8A8] mb-2 font-bold opacity-90">x + x = x²</p>
              <p className="font-mono text-sm text-[#B05B5B] dark:text-[#E5A8A8] font-bold opacity-90">3x + x = 3x²</p>
            </div>
            <div className="bg-[#FBFBF8] dark:bg-[#32322A] p-5 rounded-2xl border border-[#F0F0E8] dark:border-[#404035]">
              <p className="text-[10px] font-black text-[#8B8B7A] dark:text-[#A0A096] mb-3 uppercase tracking-widest border-b border-[#F0F0E8] dark:border-[#404035] pb-2">Mistake 3</p>
              <p className="font-mono text-sm text-[#B05B5B] dark:text-[#E5A8A8] font-bold opacity-90">3x × 2x = 6x <span className="opacity-70 text-xs italic font-sans font-medium ml-2">(forgot x × x = x²)</span></p>
            </div>
            <div className="bg-[#FBFBF8] dark:bg-[#32322A] p-5 rounded-2xl border border-[#F0F0E8] dark:border-[#404035]">
              <p className="text-[10px] font-black text-[#8B8B7A] dark:text-[#A0A096] mb-3 uppercase tracking-widest border-b border-[#F0F0E8] dark:border-[#404035] pb-2">Mistake 4</p>
              <p className="font-mono text-sm text-[#B05B5B] dark:text-[#E5A8A8] mb-2 font-bold opacity-90">2x + 3 = 11</p>
              <p className="font-mono text-sm text-[#B05B5B] dark:text-[#E5A8A8] font-bold opacity-90">2x = 11 <span className="opacity-70 text-xs italic font-sans font-medium ml-2">(forgot to subtract 3 from both sides)</span></p>
            </div>
            <div className="bg-[#FBFBF8] dark:bg-[#32322A] p-5 rounded-2xl border border-[#F0F0E8] dark:border-[#404035]">
              <p className="text-[10px] font-black text-[#8B8B7A] dark:text-[#A0A096] mb-3 uppercase tracking-widest border-b border-[#F0F0E8] dark:border-[#404035] pb-2">Mistake 5</p>
              <p className="text-sm text-[#B05B5B] dark:text-[#E5A8A8] mb-2 font-medium opacity-90">Writing -2x when it should be +2x</p>
              <p className="text-sm text-[#B05B5B] dark:text-[#E5A8A8] font-medium opacity-90">Losing negative signs</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-[#FBFBF8] dark:bg-[#32322A] p-5 rounded-2xl border border-[#F0F0E8] dark:border-[#404035]">
              <p className="text-[10px] font-black text-[#8B8B7A] dark:text-[#A0A096] mb-3 uppercase tracking-widest border-b border-[#F0F0E8] dark:border-[#404035] pb-2">Mistake 6</p>
              <p className="font-mono text-sm text-[#B05B5B] dark:text-[#E5A8A8] font-bold opacity-90">(x²)³ = x⁵</p>
            </div>
            <div className="bg-[#FBFBF8] dark:bg-[#32322A] p-5 rounded-2xl border border-[#F0F0E8] dark:border-[#404035]">
              <p className="text-[10px] font-black text-[#8B8B7A] dark:text-[#A0A096] mb-3 uppercase tracking-widest border-b border-[#F0F0E8] dark:border-[#404035] pb-2">Mistake 7</p>
              <p className="font-mono text-sm text-[#B05B5B] dark:text-[#E5A8A8] font-bold opacity-90">(3x)² = 3x²</p>
            </div>
            <div className="bg-[#FBFBF8] dark:bg-[#32322A] p-5 rounded-2xl border border-[#F0F0E8] dark:border-[#404035]">
              <p className="text-[10px] font-black text-[#8B8B7A] dark:text-[#A0A096] mb-3 uppercase tracking-widest border-b border-[#F0F0E8] dark:border-[#404035] pb-2">Mistake 8</p>
              <p className="font-mono text-sm text-[#B05B5B] dark:text-[#E5A8A8] mb-2 font-bold opacity-90">2x + 7 = 15</p>
              <p className="font-mono text-sm text-[#B05B5B] dark:text-[#E5A8A8] font-bold opacity-90">x = 4 <span className="opacity-70 text-xs italic font-sans font-medium ml-2">(no working shown, equals sign missing)</span></p>
            </div>
            <div className="bg-[#FBFBF8] dark:bg-[#32322A] p-5 rounded-2xl border border-[#F0F0E8] dark:border-[#404035]">
              <p className="text-[10px] font-black text-[#8B8B7A] dark:text-[#A0A096] mb-3 uppercase tracking-widest border-b border-[#F0F0E8] dark:border-[#404035] pb-2">Mistake 9</p>
              <p className="text-sm text-[#B05B5B] dark:text-[#E5A8A8] font-medium opacity-90">"5 less than a number" written as 5 - n</p>
            </div>
            <div className="bg-[#FBFBF8] dark:bg-[#32322A] p-5 rounded-2xl border border-[#F0F0E8] dark:border-[#404035]">
              <p className="text-[10px] font-black text-[#8B8B7A] dark:text-[#A0A096] mb-3 uppercase tracking-widest border-b border-[#F0F0E8] dark:border-[#404035] pb-2">Mistake 10</p>
              <p className="text-sm text-[#B05B5B] dark:text-[#E5A8A8] font-medium opacity-90">Solving and moving on (not checking answer)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
