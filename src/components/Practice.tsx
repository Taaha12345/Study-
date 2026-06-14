import { useState } from 'react';
import { RefreshCw, Shuffle } from 'lucide-react';
import { algebraProblems, probabilityScenarios, interactiveAlgebra } from '../data/practice';
import { pastPaperQuestions } from '../data/pastpapers';

export function Practice() {
  const [activeAlgId, setActiveAlgId] = useState<number | null>(null);
  const [activeProbId, setActiveProbId] = useState<number | null>(null);
  const [completedAlg, setCompletedAlg] = useState<Set<number>>(new Set());
  const [completedProb, setCompletedProb] = useState<Set<number>>(new Set());
  
  const [interactiveAnswers, setInteractiveAnswers] = useState<Record<number, number>>({});
  const [pastPaperAnswers, setPastPaperAnswers] = useState<Record<number, number>>({});

  // Randomized state pools
  const [shuffledIntAlgebra, setShuffledIntAlgebra] = useState(() => 
    [...interactiveAlgebra].sort(() => 0.5 - Math.random())
  );
  const [shuffledAlgProblems, setShuffledAlgProblems] = useState(() => 
    [...algebraProblems].sort(() => 0.5 - Math.random())
  );
  const [shuffledProbScenarios, setShuffledProbScenarios] = useState(() => 
    [...probabilityScenarios].sort(() => 0.5 - Math.random())
  );
  const [shuffledPastPapers, setShuffledPastPapers] = useState(() => 
    [...pastPaperQuestions].sort(() => 0.5 - Math.random()).slice(0, 5)
  );

  // Dynamic progress Calculations
  const totalQuestions = shuffledIntAlgebra.length + shuffledAlgProblems.length + shuffledProbScenarios.length + shuffledPastPapers.length;
  const completedCount = completedAlg.size + completedProb.size + Object.keys(interactiveAnswers).length + Object.keys(pastPaperAnswers).length;
  const progressPercent = Math.round((completedCount / totalQuestions) * 100) || 0;

  // Resets & Individual Shufflers
  const resetInteractiveAlgebra = () => {
    setShuffledIntAlgebra([...interactiveAlgebra].sort(() => 0.5 - Math.random()));
    setInteractiveAnswers({});
    
    window.dispatchEvent(new CustomEvent('study-dopamine-achieved', {
      detail: {
        type: 'click',
        xpReward: 0,
        coinReward: 0,
        message: 'Algebra MCQ Randomised! 🔄'
      }
    }));
  };

  const resetAlgebraProblems = () => {
    setShuffledAlgProblems([...algebraProblems].sort(() => 0.5 - Math.random()));
    setCompletedAlg(new Set());
    setActiveAlgId(null);
    
    window.dispatchEvent(new CustomEvent('study-dopamine-achieved', {
      detail: {
        type: 'click',
        xpReward: 0,
        coinReward: 0,
        message: 'Abstract Problems Shuffled! 🔄'
      }
    }));
  };

  const resetProbabilityScenarios = () => {
    setShuffledProbScenarios([...probabilityScenarios].sort(() => 0.5 - Math.random()));
    setCompletedProb(new Set());
    setActiveProbId(null);
    
    window.dispatchEvent(new CustomEvent('study-dopamine-achieved', {
      detail: {
        type: 'click',
        xpReward: 0,
        coinReward: 0,
        message: 'Probability Shuffled! 🔄'
      }
    }));
  };

  const resetPastPapers = () => {
    setShuffledPastPapers([...pastPaperQuestions].sort(() => 0.5 - Math.random()).slice(0, 5));
    setPastPaperAnswers({});
    
    window.dispatchEvent(new CustomEvent('study-dopamine-achieved', {
      detail: {
        type: 'click',
        xpReward: 0,
        coinReward: 0,
        message: 'New Past Paper Selection Generated! 🎓🔄'
      }
    }));
  };

  const resetAllPractice = () => {
    setShuffledIntAlgebra([...interactiveAlgebra].sort(() => 0.5 - Math.random()));
    setShuffledAlgProblems([...algebraProblems].sort(() => 0.5 - Math.random()));
    setShuffledProbScenarios([...probabilityScenarios].sort(() => 0.5 - Math.random()));
    setShuffledPastPapers([...pastPaperQuestions].sort(() => 0.5 - Math.random()).slice(0, 5));
    
    setInteractiveAnswers({});
    setPastPaperAnswers({});
    setCompletedAlg(new Set());
    setCompletedProb(new Set());
    setActiveAlgId(null);
    setActiveProbId(null);

    window.dispatchEvent(new CustomEvent('study-dopamine-achieved', {
      detail: {
        type: 'goal_achieved',
        xpReward: 10,
        coinReward: 5,
        message: 'All Tasks Shuffled & Reset! 🌟🔄'
      }
    }));
  };

  const handleAlgClick = (idx: number) => {
    setActiveAlgId(activeAlgId === idx ? null : idx);
    setCompletedAlg(prev => new Set(prev).add(idx));
  };

  const handleProbClick = (idx: number) => {
    setActiveProbId(activeProbId === idx ? null : idx);
    setCompletedProb(prev => new Set(prev).add(idx));
  };
  
  const handleInteractiveAnswer = (qIdx: number, optIdx: number) => {
    setInteractiveAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    const questionItem = shuffledIntAlgebra[qIdx];
    const isCorrect = questionItem.answer === optIdx;
    
    window.dispatchEvent(new CustomEvent('study-dopamine-achieved', {
      detail: {
        type: isCorrect ? 'success' : 'fail',
        xpReward: isCorrect ? 15 : 0,
        coinReward: isCorrect ? 10 : 0,
        message: isCorrect ? 'Algebra Task Solved! 🧠' : 'Incorrect Option'
      }
    }));
  };

  const handlePastPaperAnswer = (qIdx: number, optIdx: number) => {
    setPastPaperAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    const questionItem = shuffledPastPapers[qIdx];
    const isCorrect = questionItem.answer === optIdx;
    
    window.dispatchEvent(new CustomEvent('study-dopamine-achieved', {
      detail: {
        type: isCorrect ? 'success' : 'fail',
        xpReward: isCorrect ? 20 : 0,
        coinReward: isCorrect ? 15 : 0,
        message: isCorrect ? 'NESA Past Paper Resolved! 🎓' : 'Incorrect Option'
      }
    }));
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12" id="practice-workspace-root">
      
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#4A4A40] dark:text-[#E0E0D8]">Interactive Practice</h2>
        <p className="text-[#8B8B7A] dark:text-[#A0A096] text-sm mt-2 font-medium">Test your knowledge with these scenarios and problems.</p>
        
        <div className="max-w-2xl mx-auto mt-6 bg-white dark:bg-[#25251E] border-2 border-[#D4A373]/45 dark:border-[#BC6C25]/45 rounded-3xl p-5 shadow-lg relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-4 mb-4">
            <div>
              <span className="text-[9px] font-black uppercase tracking-widest text-[#D4A373] dark:text-[#BC6C25] font-mono">Control Center</span>
              <h3 className="text-sm font-black text-[#4A4A40] dark:text-[#EAE6D8] mt-0.5">🔄 syllabus practice deck & shufflers</h3>
            </div>
            
            <div className="w-full sm:w-auto shrink-0">
              <div className="flex justify-between sm:justify-end items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B8B7A]">Practice Progress</span>
                <span className="text-xs font-black text-[#386641] dark:text-[#A7C890] bg-[#386641]/10 px-2.5 py-0.5 rounded-full">{completedCount} / {totalQuestions} Solved ({progressPercent}%)</span>
              </div>
              <div className="w-full sm:w-48 bg-[#E5E5DB] dark:bg-[#3A3A30] h-2.5 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="bg-gradient-to-r from-[#386641] to-[#A7C890] h-full transition-all duration-500 rounded-full" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[#8B8B7A] dark:text-[#A0A096] leading-relaxed mb-4 text-left">
            Randomize or clear your study progress on-the-fly to challenge yourself under different exam conditions. Click any button below to immediately re-shuffle or reset states:
          </p>

          {/* Combined Grid of Resets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="centralized-practice-resets-grid">
            {/* Master Key Reset button */}
            <button 
              id="reset-all-practice-tasks-btn"
              onClick={resetAllPractice}
              className="col-span-1 sm:col-span-2 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:from-red-700 hover:to-amber-700 transition-all hover:scale-[1.01] active:scale-95 shadow-md cursor-pointer border border-transparent"
              title="Reset all tasks and randomize everything"
            >
              <RefreshCw className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
              <span>🧹 RESET ALL PRACTICE TOPICS</span>
            </button>

            {/* Algebra MCQ Reset */}
            <button
               id="dashboard-reset-algebra-mcq-btn"
               onClick={resetInteractiveAlgebra}
               className="flex items-center justify-between p-2.5 bg-purple-50 hover:bg-purple-100/80 dark:bg-purple-950/20 dark:hover:bg-purple-900/30 border-2 border-purple-200/60 dark:border-purple-800/50 rounded-xl text-left cursor-pointer transition-all hover:scale-[1.01] active:scale-95 group"
            >
              <div className="truncate pr-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-purple-700 dark:text-purple-300 block font-mono">Reshuffle List</span>
                <span className="text-xs font-bold text-neutral-700 dark:text-[#EAE6D8]">1. Algebra MCQ</span>
              </div>
              <span className="p-1 rounded-lg bg-purple-100 dark:bg-[#34243C] group-hover:bg-purple-200 text-purple-700 dark:text-purple-300 shrink-0">
                <Shuffle className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Abstract Algebra Problems Reset */}
            <button
               id="dashboard-reset-abstract-problems-btn"
               onClick={resetAlgebraProblems}
               className="flex items-center justify-between p-2.5 bg-teal-50 hover:bg-teal-100/80 dark:bg-teal-950/20 dark:hover:bg-teal-900/30 border-2 border-teal-200/60 dark:border-teal-800/50 rounded-xl text-left cursor-pointer transition-all hover:scale-[1.01] active:scale-95 group"
            >
              <div className="truncate pr-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-teal-700 dark:text-teal-300 block font-mono">Reset & Unveil</span>
                <span className="text-xs font-bold text-neutral-700 dark:text-[#EAE6D8]">2. Abstract Problems</span>
              </div>
              <span className="p-1 rounded-lg bg-teal-100 dark:bg-[#1E3434] group-hover:bg-teal-200 text-teal-700 dark:text-teal-300 shrink-0">
                <Shuffle className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Probability Scenarios Reset */}
            <button
               id="dashboard-reset-probability-btn"
               onClick={resetProbabilityScenarios}
               className="flex items-center justify-between p-2.5 bg-emerald-50 hover:bg-[#E2F0D9] dark:bg-emerald-950/20 dark:hover:bg-emerald-900/30 border-2 border-emerald-200/60 dark:border-emerald-800/50 rounded-xl text-left cursor-pointer transition-all hover:scale-[1.01] active:scale-95 group"
            >
              <div className="truncate pr-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#386641] dark:text-[#A7C890] block font-mono">Syllabus Randomise</span>
                <span className="text-xs font-bold text-neutral-700 dark:text-[#EAE6D8]">3. Probability Deck</span>
              </div>
              <span className="p-1 rounded-lg bg-emerald-100 dark:bg-[#1E361F] group-hover:bg-emerald-200 text-emerald-700 dark:text-emerald-300 shrink-0">
                <Shuffle className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Past Papers Reset */}
            <button
               id="dashboard-reset-pastpapers-btn"
               onClick={resetPastPapers}
               className="flex items-center justify-between p-2.5 bg-blue-50 hover:bg-blue-100/80 dark:bg-blue-950/20 dark:hover:bg-blue-900/30 border-2 border-blue-200/60 dark:border-blue-800/50 rounded-xl text-left cursor-pointer transition-all hover:scale-[1.01] active:scale-95 group"
            >
              <div className="truncate pr-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-blue-700 dark:text-blue-300 block font-mono">Generate 5 New Qs</span>
                <span className="text-xs font-bold text-neutral-700 dark:text-[#EAE6D8]">4. NESA Past Papers</span>
              </div>
              <span className="p-1 rounded-lg bg-blue-100 dark:bg-[#1F2C3C] group-hover:bg-blue-200 text-blue-700 dark:text-blue-300 shrink-0">
                <RefreshCw className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Algebra MCQ Section */}
      <div id="interactive-algebra-mcq-section">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
             <h3 className="text-xl font-bold tracking-tight text-[#5A5A40] dark:text-[#EAE6D8]">Interactive Algebra</h3>
             <span className="text-[10px] bg-[#E5E5DB] dark:bg-[#3A3A30] text-[#5A5A40] dark:text-[#EAE6D8] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">{shuffledIntAlgebra.length} Questions</span>
          </div>
          <button
            id="reset-algebra-mcq-btn"
            onClick={resetInteractiveAlgebra}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#FAF9F5] hover:bg-[#F2ECE1] dark:bg-white/5 dark:hover:bg-white/10 text-xs font-bold rounded-xl border border-[#E5E5DB] dark:border-[#3A3A30] text-[#5A5A40] dark:text-[#EAE6D8] cursor-pointer transition-colors"
          >
            <Shuffle className="w-3 h-3 text-[#D4A373]" />
            <span>Reset & Randomise</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shuffledIntAlgebra.map((item, qIdx) => (
            <div key={qIdx} className="bg-white dark:bg-[#2A2A22] p-5 rounded-[24px] shadow-sm border border-[#E5E5DB] dark:border-[#3A3A30]">
              <p className="font-medium text-[#4A4A40] dark:text-[#D4D0C4] text-sm mb-4">
                <span className="text-[#D4A373] dark:text-[#BC6C25] font-bold mr-2 text-xs">Q{qIdx+1}.</span>
                {item.q}
              </p>
              <div className="space-y-2">
                {item.options.map((opt, oIdx) => {
                  const isSelected = interactiveAnswers[qIdx] === oIdx;
                  const isCorrect = item.answer === oIdx;
                  const hasAnswered = interactiveAnswers[qIdx] !== undefined;
                  
                  let btnClass = "w-full text-left p-3 rounded-xl border text-sm transition-colors cursor-pointer ";
                  if (!hasAnswered) {
                    btnClass += "border-[#E5E5DB] dark:border-[#3A3A30] hover:bg-[#FBFBF8] dark:hover:bg-[#322F24] text-[#5A5A40] dark:text-[#EAE6D8]";
                  } else if (isCorrect) {
                    btnClass += "bg-[#F2E8CF] dark:bg-[#1A2016] border-[#386641] dark:border-[#4A6635] text-[#386641] dark:text-[#A7C890] font-bold";
                  } else if (isSelected) {
                    btnClass += "bg-[#FAE1DD] dark:bg-[#402020] border-[#B05B5B] dark:border-[#6A3030] text-[#B05B5B] dark:text-[#E5A8A8] font-bold";
                  } else {
                    btnClass += "border-[#E5E5DB] dark:border-[#3A3A30] opacity-50 dark:opacity-40";
                  }
                  
                  return (
                    <button
                      key={oIdx}
                      id={`algebra-q${qIdx}-opt${oIdx}`}
                      disabled={hasAnswered}
                      onClick={() => handleInteractiveAnswer(qIdx, oIdx)}
                      className={btnClass}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {interactiveAnswers[qIdx] !== undefined && (
                <div className="mt-4 p-4 bg-[#FBFBF8] dark:bg-[#322F24] rounded-xl border border-[#F0F0E8] dark:border-[#4A402A] animate-in fade-in">
                  <p className="text-xs text-[#5A5A40] dark:text-[#D4D0C4] leading-relaxed">
                    <span className="font-bold uppercase tracking-wider text-[#386641] dark:text-[#A7C890] mr-2">Feedback:</span> {item.exp}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Abstract Algebra Problems */}
        <div className="space-y-4" id="abstract-problems-section">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
               <h3 className="text-lg font-bold tracking-tight text-[#5A5A40] dark:text-[#EAE6D8]">Abstract Problems</h3>
               <span className="text-[10px] bg-[#E5E5DB] dark:bg-[#3A3A30] text-[#5A5A40] dark:text-[#EAE6D8] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">{shuffledAlgProblems.length} Questions</span>
            </div>
            <button
              id="reset-abstract-algebra-btn"
              onClick={resetAlgebraProblems}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#FAF9F5] hover:bg-[#F2ECE1] dark:bg-white/5 dark:hover:bg-white/10 text-xs font-bold rounded-xl border border-[#E5E5DB] dark:border-[#3A3A30] text-[#5A5A40] dark:text-[#EAE6D8] cursor-pointer transition-colors"
            >
              <Shuffle className="w-3 h-3 text-[#D4A373]" />
              <span>Shuffle Problems</span>
            </button>
          </div>
          
          {shuffledAlgProblems.map((prob, idx) => (
            <div key={idx} className="bg-white dark:bg-[#2A2A22] rounded-[24px] shadow-sm border border-[#E5E5DB] dark:border-[#3A3A30] overflow-hidden">
              <button 
                id={`abstract-prob-trigger-${idx}`}
                onClick={() => handleAlgClick(idx)}
                className="w-full text-left p-5 flex justify-between items-center hover:bg-[#FBFBF8] dark:hover:bg-[#322F24] transition-colors cursor-pointer"
               >
                 <span className="font-medium text-[#4A4A40] dark:text-[#D4D0C4] text-sm sm:text-base">
                   <span className="text-[#D4A373] dark:text-[#BC6C25] font-bold mr-2 text-xs">P{idx+1}.</span>
                   {prob.q}
                 </span>
                 <span className="text-[#8B8B7A] dark:text-[#A0A096] font-bold text-xl leading-none ml-4">{activeAlgId === idx ? '−' : '+'}</span>
              </button>
              {activeAlgId === idx && (
                <div className="p-5 pt-0 bg-[#FBFBF8] dark:bg-[#2A261A] border-t border-[#F0F0E8] dark:border-[#3A3A30] animate-in fade-in slide-in-from-top-2">
                  <div className="mt-4 p-4 bg-white dark:bg-[#322F24] border border-[#E5E5DB] dark:border-[#4A4A40] shadow-sm rounded-2xl">
                    <p className="font-bold text-[#386641] dark:text-[#A7C890] font-mono text-lg mb-2">{prob.a}</p>
                    <p className="text-xs text-[#5A5A40] dark:text-[#D4D0C4] italic font-medium">{prob.exp}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Probability Scenarios */}
        <div className="space-y-4" id="probability-scenarios-section">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
               <h3 className="text-lg font-bold tracking-tight text-[#5A5A40] dark:text-[#EAE6D8]">Probability Scenarios</h3>
               <span className="text-[10px] bg-[#E5E5DB] dark:bg-[#3A3A30] text-[#5A5A40] dark:text-[#EAE6D8] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">{shuffledProbScenarios.length} Scenarios</span>
            </div>
            <button
              id="reset-probability-btn"
              onClick={resetProbabilityScenarios}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#FAF9F5] hover:bg-[#F2ECE1] dark:bg-white/5 dark:hover:bg-white/10 text-xs font-bold rounded-xl border border-[#E5E5DB] dark:border-[#3A3A30] text-[#5A5A40] dark:text-[#EAE6D8] cursor-pointer transition-colors"
            >
              <Shuffle className="w-3 h-3 text-[#D4A373]" />
              <span>Shuffle Scenarios</span>
            </button>
          </div>
          
          {shuffledProbScenarios.map((scen, idx) => (
            <div key={idx} className="bg-white dark:bg-[#2A2A22] rounded-[24px] shadow-sm border border-[#E5E5DB] dark:border-[#3A3A30] overflow-hidden">
              <button 
                id={`probability-trigger-${idx}`}
                onClick={() => handleProbClick(idx)}
                className="w-full text-left p-5 flex justify-between items-start hover:bg-[#FBFBF8] dark:hover:bg-[#322F24] transition-colors cursor-pointer"
               >
                 <div className="pr-4">
                   <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4A373] dark:text-[#BC6C25] block mb-2">{scen.title}</span>
                   <span className="font-medium text-[#8B8B7A] dark:text-[#A0A096] text-xs block mb-3 border-l-2 border-[#E5E5DB] dark:border-[#4A4A40] pl-2">{scen.desc}</span>
                   <span className="font-bold text-[#4A4A40] dark:text-[#D4D0C4] text-sm block">{scen.q}</span>
                 </div>
                 <span className="text-[#8B8B7A] dark:text-[#A0A096] font-bold text-xl leading-none mt-1">{activeProbId === idx ? '−' : '+'}</span>
              </button>
              {activeProbId === idx && (
                <div className="p-5 pt-0 bg-[#FBFBF8] dark:bg-[#2A261A] border-t border-[#F0F0E8] dark:border-[#3A3A30] animate-in fade-in slide-in-from-top-2">
                  <div className="mt-4 p-4 bg-white dark:bg-[#322F24] border border-[#E5E5DB] dark:border-[#4A4A40] shadow-sm rounded-2xl flex flex-col items-center text-center">
                    <p className="text-[10px] text-[#8B8B7A] dark:text-[#A0A096] uppercase font-bold tracking-widest mb-1">Answer</p>
                    <p className="font-bold text-[#386641] dark:text-[#A7C890] font-mono text-2xl mb-3">{scen.a}</p>
                    <p className="text-xs text-[#5A5A40] dark:text-[#EAE6D8] font-mono bg-[#F5F5F0] dark:bg-[#20201A] p-2 rounded-xl w-full">{scen.formula}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Real Past Papers Section */}
      <div className="pt-8 mt-12 border-t border-[#E5E5DB] dark:border-[#3A3A30]" id="past-papers-extraction-block">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3">
             <h3 className="text-2xl font-bold tracking-tight text-[#4A4A40] dark:text-[#EAE6D8]">Past Papers Extract</h3>
             <span className="text-[10px] bg-[#386641] dark:bg-[#4A6635] text-white px-3 py-1 rounded-full uppercase font-bold tracking-wider text-xs">Active Practice Pool: {shuffledPastPapers.length} Qs</span>
          </div>
          <button
            id="reset-past-papers-btn"
            onClick={resetPastPapers}
            className="flex items-center gap-2 px-4 py-2 bg-[#386641] hover:bg-[#2D5233] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer hover:scale-105"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset & Randomise 5 Qs</span>
          </button>
        </div>
        <p className="text-[#8B8B7A] dark:text-[#A0A096] text-sm mb-8">Selected multiple-choice and calculation questions extracted directly from 2022, 2024, and 2025 NSW Half-Yearly Examinations. Shuffling feeds 5 random questions from our cumulative pool of 30.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shuffledPastPapers.map((item, qIdx) => (
            <div key={qIdx} className="bg-white dark:bg-[#2A2A22] p-5 rounded-[24px] shadow-sm border border-[#E5E5DB] dark:border-[#3A3A30] flex flex-col justify-between min-h-[280px]">
              <div>
                <p className="font-medium text-[#4A4A40] dark:text-[#D4D0C4] text-sm mb-4">
                  <span className="text-[#D4A373] dark:text-[#BC6C25] font-bold mr-2 text-xs">PQ{qIdx+1}.</span>
                  {item.q}
                </p>
              </div>
              <div>
                <div className="space-y-2 mt-auto">
                  {item.options.map((opt, oIdx) => {
                    const isSelected = pastPaperAnswers[qIdx] === oIdx;
                    const isCorrect = item.answer === oIdx;
                    const hasAnswered = pastPaperAnswers[qIdx] !== undefined;
                    
                    let btnClass = "w-full text-left p-3 rounded-xl border text-xs transition-colors cursor-pointer ";
                    if (!hasAnswered) {
                      btnClass += "border-[#E5E5DB] dark:border-[#3A3A30] hover:bg-[#FBFBF8] dark:hover:bg-[#322F24] text-[#5A5A40] dark:text-[#EAE6D8]";
                    } else if (isCorrect) {
                      btnClass += "bg-[#F2E8CF] dark:bg-[#1A2016] border-[#386641] dark:border-[#4A6635] text-[#386641] dark:text-[#A7C890] font-bold";
                    } else if (isSelected) {
                      btnClass += "bg-[#FAE1DD] dark:bg-[#402020] border-[#B05B5B] dark:border-[#6A3030] text-[#B05B5B] dark:text-[#E5A8A8] font-bold";
                    } else {
                      btnClass += "border-[#E5E5DB] dark:border-[#3A3A30] opacity-50 dark:opacity-40";
                    }
                    
                    return (
                      <button
                        key={oIdx}
                        id={`pastpapers-q${qIdx}-opt${oIdx}`}
                        disabled={hasAnswered}
                        onClick={() => handlePastPaperAnswer(qIdx, oIdx)}
                        className={btnClass}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {pastPaperAnswers[qIdx] !== undefined && (
                  <div className="mt-4 p-4 bg-[#FBFBF8] dark:bg-[#322F24] rounded-xl border border-[#F0F0E8] dark:border-[#4A402A] animate-in fade-in">
                    <p className="text-xs text-[#5A5A40] dark:text-[#D4D0C4] leading-relaxed">
                      <span className="font-bold uppercase tracking-wider text-[#386641] dark:text-[#A7C890] mr-2">Method:</span> {item.exp}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Practice;
