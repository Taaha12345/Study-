import { useState, useMemo } from 'react';
import { flashcards } from '../data/flashcards';
import { algebraProblems, probabilityScenarios, interactiveAlgebra } from '../data/practice';
import { subjectQuizQuestions } from '../data/quizExcellence';

type QuizItem = {
  id: string;
  question: string;
  answer: string;
  explanation: string;
  type: 'All' | 'Algebra' | 'Probability' | 'Angles' | 'Integers' | 'Data' | 'English' | 'Science' | 'History';
};

export function Quiz() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [mistakes, setMistakes] = useState<QuizItem[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [quizIteration, setQuizIteration] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState<'All' | 'Algebra' | 'Probability' | 'Angles' | 'Integers' | 'Data' | 'English' | 'Science' | 'History'>('All');

  // Build high-quality pool across all subjects
  const quizQuestions = useMemo(() => {
    const pool: QuizItem[] = [
      ...flashcards.map(f => ({
        id: `f-${f.id}`,
        question: f.question,
        answer: f.answer,
        explanation: 'Flashcard recall question. Check details on Flashcards tab.',
        type: f.category
      })),
      ...algebraProblems.map((p, i) => ({
        id: `ap-${i}`,
        question: p.q,
        answer: p.a,
        explanation: p.exp,
        type: 'Algebra' as const
      })),
      ...interactiveAlgebra.map((p, i) => ({
        id: `ia-${i}`,
        question: p.q,
        answer: p.options[p.answer],
        explanation: p.exp,
        type: 'Algebra' as const
      })),
      ...probabilityScenarios.map((s, i) => ({
        id: `ps-${i}`,
        question: `${s.desc} ${s.q}`,
        answer: s.a,
        explanation: s.formula,
        type: 'Probability' as const
      })),
      ...subjectQuizQuestions.map(sq => ({
        id: sq.id,
        question: sq.question,
        answer: sq.answer,
        explanation: sq.explanation,
        type: sq.type
      }))
    ];

    const filtered = selectedSubject === 'All' 
      ? pool 
      : pool.filter(q => q.type === selectedSubject);

    // Shuffle and pick up to 10
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  }, [quizIteration, selectedSubject]);

  const handleStart = () => {
    setHasStarted(true);
    setCurrentIdx(0);
    setScore(0);
    setShowAnswer(false);
    setMistakes([]);
    setIsFinished(false);
  };

  const handleResetSection = () => {
    setHasStarted(false);
    setCurrentIdx(0);
    setScore(0);
    setShowAnswer(false);
    setMistakes([]);
    setIsFinished(false);
  };

  const handleAnswer = (gotItRight: boolean) => {
    const currentQ = quizQuestions[currentIdx];
    if (gotItRight) {
      setScore(s => s + 1);
      // Dispatch correct answer dopamine spike
      window.dispatchEvent(new CustomEvent('study-dopamine-achieved', {
        detail: {
          type: 'success',
          xpReward: 15,
          coinReward: 10,
          message: 'Correct Answer! 🧠'
        }
      }));
    } else {
      setMistakes(prev => [...prev, currentQ]);
      // Gentle incorrect notification sound
      window.dispatchEvent(new CustomEvent('study-dopamine-achieved', {
        detail: {
          type: 'fail',
          xpReward: 0,
          coinReward: 0,
          message: 'Incorrect Answer'
        }
      }));
    }

    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx(i => i + 1);
      setShowAnswer(false);
    } else {
      setIsFinished(true);
      // Delayed grand celebration for quiz completion
      setTimeout(() => {
        const finalScore = score + (gotItRight ? 1 : 0);
        const total = quizQuestions.length;
        if (finalScore === total) {
          window.dispatchEvent(new CustomEvent('study-dopamine-achieved', {
            detail: {
              type: 'goal_achieved',
              xpReward: 100,
              coinReward: 50,
              message: 'Perfect Quiz Score! 🏆🏅'
            }
          }));
        } else if (finalScore > 0) {
          window.dispatchEvent(new CustomEvent('study-dopamine-achieved', {
            detail: {
              type: 'success',
              xpReward: finalScore * 10,
              coinReward: finalScore * 5,
              message: `Quiz Completed: ${finalScore}/${total}! ✨`
            }
          }));
        }
      }, 300);
    }
  };

  const handleRetake = () => {
    setQuizIteration(it => it + 1);
    handleStart();
  };

  if (!hasStarted) {
    const subjectsList = [
      { id: 'All', name: 'All Subjects (Mixed)', icon: '🌟', desc: 'A grand cumulative test of everything' },
      { id: 'Algebra', name: 'Algebra Section', icon: '➗', desc: 'Variables, coefficients, equations, brackets' },
      { id: 'Probability', name: 'Probability Section', icon: '🎲', desc: 'The scale, simple fractions, independent events' },
      { id: 'Angles', name: 'Angles Section', icon: '📐', desc: 'Adjacent, complementary, transversals, F/Z/C rules' },
      { id: 'Integers', name: 'Integers Section', icon: '🧮', desc: 'BODMAS, multiplication signs, Cartesian plots' },
      { id: 'Data', name: 'Data Section', icon: '📊', desc: 'Discrete vs continuous, nominal, range, median' },
      { id: 'English', name: 'English Section', icon: '📚', desc: 'PETAL paragraphing, imagery, A Monster Calls' },
      { id: 'Science', name: 'Science Section', icon: '🔬', desc: 'Lab variables, solar system designs, force balancing' },
      { id: 'History', name: 'History Section', icon: '🏛️', desc: 'Primary sources, Egyptology, Nile silt, chronology' },
    ] as const;

    return (
      <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500 py-6 pb-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#4A4A40] dark:text-[#E0E0D8]">
            🧠 Adaptive Subject Quizzes
          </h2>
          <p className="text-[#8B8B7A] dark:text-[#A0A096] text-sm max-w-xl mx-auto">
            Pick a specific study section to test your memory or try the Mixed grand exam across all eight subjects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {subjectsList.map((sub) => {
            const isSelected = selectedSubject === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubject(sub.id)}
                className={`text-left p-5 rounded-[24px] border transition-all cursor-pointer flex flex-col justify-between h-36 ${
                  isSelected
                    ? 'bg-[#F2E8CF] border-[#5A5A40] dark:bg-[#322F24] dark:border-[#968250] shadow-md'
                    : 'bg-white border-[#E5E5DB] hover:bg-[#FBFBF8] dark:bg-[#2A2A22] dark:border-[#3A3A30] dark:hover:bg-[#323229]'
                }`}
              >
                <div className="flex justify-between items-start w-full">
                  <span className="text-2xl">{sub.icon}</span>
                  {isSelected && (
                    <span className="text-xs bg-[#5A5A40] text-white dark:bg-[#7A6C4A] px-2 py-0.5 rounded-full font-bold">
                      Active
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#4A4A40] dark:text-[#EAE6D8]">{sub.name}</h4>
                  <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096] line-clamp-2 mt-1">{sub.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-center pt-4">
          <button 
            onClick={handleStart}
            className="bg-[#5A5A40] dark:bg-[#EAE6D8] text-white dark:text-[#2A2A22] font-semibold py-3 px-10 rounded-2xl hover:scale-105 transition-all text-sm uppercase tracking-wider font-sans cursor-pointer shadow-sm"
          >
            Start {selectedSubject === 'All' ? 'Cumulative Mixed' : `${selectedSubject}`} Quiz
          </button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500 py-6">
        <div className="text-center mb-8">
          <span className="text-3xl">🏆</span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#4A4A40] dark:text-[#EAE6D8] mt-4">
            {selectedSubject === 'All' ? 'Mixed' : selectedSubject} Section Finished
          </h2>
          <p className="text-2xl font-mono mt-4 font-bold text-[#386641] dark:text-[#A7C890]" aria-live="polite">
            Score: {score} / {quizQuestions.length}
          </p>
        </div>

        {mistakes.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-lg font-bold tracking-tight text-[#B05B5B] dark:text-[#E5A8A8]">Reviewing Mistakes</h3>
              <span className="text-[10px] bg-[#FAE1DD] dark:bg-[#402020] text-[#B05B5B] dark:text-[#E5A8A8] px-3 py-1 rounded-full font-black uppercase tracking-wider">
                {mistakes.length} errors
              </span>
            </div>
            
            <div className="space-y-4">
              {mistakes.map((m, i) => (
                <div key={i} className="bg-white dark:bg-[#2A2A22] p-5 rounded-2xl border border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <p className="font-bold text-sm text-[#4A4A40] dark:text-[#E0E0D8]">{m.question}</p>
                    <span className="text-[9px] bg-[#E5E5DB] dark:bg-[#3A3A30] text-[#5A5A40] dark:text-[#E0E0D8] px-2 py-0.5 rounded uppercase font-bold whitespace-nowrap">
                      {m.type}
                    </span>
                  </div>
                  <div className="bg-[#FBFBF8] dark:bg-[#32322A] p-4 rounded-xl border border-[#F0F0E8] dark:border-[#404035] space-y-2">
                    <p className="text-sm font-bold text-[#386641] dark:text-[#A7C890]">Correct Answer: {m.answer}</p>
                    <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096] whitespace-pre-wrap">{m.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center p-12 bg-white dark:bg-[#2A2A22] rounded-3xl border border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
            <p className="text-[#386641] dark:text-[#A7C890] font-bold text-lg">Perfect Score! 🎉</p>
            <p className="text-[#8B8B7A] dark:text-[#A0A096] text-sm mt-2">
              You absolutely mastered every question in the {selectedSubject === 'All' ? 'grand revision' : `${selectedSubject}`} set!
            </p>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button 
            onClick={handleRetake}
            className="bg-[#5A5A40] text-white dark:bg-[#EAE6D8] dark:text-[#2A2A22] font-semibold py-2.5 px-6 rounded-xl hover:opacity-90 transition-opacity text-sm cursor-pointer"
          >
            Retake Section
          </button>
          <button 
            onClick={handleResetSection}
            className="bg-[#E5E5DB] dark:bg-[#3A3A30] text-[#5A5A40] dark:text-[#E0E0D8] font-semibold py-2.5 px-6 rounded-xl hover:bg-[#D5D5CB] dark:hover:bg-[#404035] transition-colors text-sm cursor-pointer"
          >
            Choose Other Subject
          </button>
        </div>
      </div>
    );
  }

  const currentQ = quizQuestions[currentIdx];

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-300 py-6" id="quiz-interactive-layout">
      <div className="flex justify-between items-center bg-[#FBFBF8] dark:bg-[#2A2A22] p-4 rounded-2xl border border-[#E5E5DB] dark:border-[#3A3A30] flex-wrap gap-2">
        <button 
          id="back-to-subjects-btn"
          onClick={handleResetSection}
          className="text-xs font-semibold text-[#8B8B7A] dark:text-[#A0A096] hover:text-[#5A5A40] dark:hover:text-[#EAE6D8] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
        >
          <span>←</span> Back to Subjects
        </button>
        <div className="flex items-center gap-2">
          <button 
            id="instant-restart-quiz-btn"
            onClick={handleRetake}
            className="text-xs font-black text-[#BC6C25] hover:text-[#D4A373] uppercase tracking-widest flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>🔄</span> Reset Quiz
          </button>
          <span className="text-xs font-bold text-[#5A5A40] dark:text-[#D4A373] uppercase tracking-wider bg-[#F2E8CF] dark:bg-[#322F24] px-3 py-1 rounded-full">
            {selectedSubject === 'All' ? 'GRAND MIXED' : `${selectedSubject} Quiz`}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B8B7A] dark:text-[#A0A096]">
            Question {currentIdx + 1} of {quizQuestions.length}
          </span>
          <span className="text-sm font-bold text-[#386641] dark:text-[#A7C890]" aria-live="polite">
            Mastery: {score} Correct
          </span>
        </div>
        <div className="w-full bg-[#E5E5DB] dark:bg-[#3A3A30] h-2 rounded-full overflow-hidden">
          <div 
            className="bg-[#D4A373] dark:bg-[#BC6C25] h-full transition-all duration-300 rounded-full" 
            style={{ width: `${(currentIdx / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-[#2A2A22] rounded-3xl p-8 shadow-sm border border-[#E5E5DB] dark:border-[#3A3A30] min-h-[300px] flex flex-col items-center justify-center text-center relative overflow-hidden">
        <span className="absolute top-4 right-4 text-[9px] bg-[#E5E5DB] dark:bg-[#3A3A30] text-[#5A5A40] dark:text-[#EAE6D8] px-2.5 py-1 rounded font-bold uppercase tracking-wider">
          {currentQ.type}
        </span>
        
        <p className="text-xl md:text-2xl font-bold text-[#4A4A40] dark:text-[#EAE6D8] mb-8 leading-relaxed max-w-lg mt-6">
          {currentQ.question}
        </p>
        
        {!showAnswer ? (
          <button 
            onClick={() => setShowAnswer(true)}
            className="mt-4 bg-[#5A5A40] dark:bg-[#EAE6D8] text-white dark:text-[#2A2A22] font-semibold py-3 px-8 rounded-xl hover:opacity-90 hover:scale-105 transition-all text-sm uppercase tracking-wider cursor-pointer"
          >
            Reveal Answer
          </button>
        ) : (
          <div className="w-full animate-in fade-in slide-in-from-bottom-2 mt-4 space-y-6">
            <div className="bg-[#F5F5F0] dark:bg-[#1E1E18] p-6 rounded-2xl border border-[#E5E5DB] dark:border-[#3A3A30]">
              <p className="font-bold text-[#386641] dark:text-[#A7C890] text-xl font-mono mb-2">
                {currentQ.answer}
              </p>
              <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096] italic">
                {currentQ.explanation}
              </p>
            </div>
            
            <div className="flex gap-4 w-full">
              <button 
                onClick={() => handleAnswer(false)}
                className="flex-1 bg-[#FAE1DD] dark:bg-[#402020] text-[#B05B5B] dark:text-[#E5A8A8] font-bold py-3 px-4 rounded-xl hover:opacity-85 transition-opacity text-sm cursor-pointer"
              >
                Got it Wrong
              </button>
              <button 
                onClick={() => handleAnswer(true)}
                className="flex-1 bg-[#F2E8CF] dark:bg-[#2D3321] text-[#386641] dark:text-[#A7C890] font-bold py-3 px-4 rounded-xl hover:opacity-85 transition-opacity text-sm cursor-pointer"
              >
                Got it Right
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
