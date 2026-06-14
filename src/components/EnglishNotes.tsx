import { useState } from 'react';
import { 
  AlertTriangle, Copy, Check, Quote, Sparkles, BookOpen, Layers,
  Shuffle, HelpCircle, CheckCircle2, XCircle, ArrowRight, RefreshCw, Wand2, PenTool, Eye, RotateCcw,
  Book, Award, GraduationCap, ChevronRight, ClipboardList, Bookmark, HelpCircle as HelpIcon, FileText
} from 'lucide-react';
import { unseenPoem, shortResponses, petaetal, englishMcq } from '../data/english';
import { BOOK_CHAPTERS } from '../data/chapters';

const PETAL_BREAKDOWN = [
  {
    step: "P",
    name: "Point",
    desc: "State your main argument directly in response to the exam prompt.",
    sentence: "Patrick Ness demonstrates that storytelling is a powerful psychological tool that forces characters to confront unbearable truths about themselves.",
    borderClass: "border-[#386641] dark:border-[#5E8E65]",
    textClass: "text-[#386641] dark:text-[#81C784]",
    bgClass: "bg-[#386641]/5 dark:bg-[#386641]/10",
    badgeBg: "bg-[#386641] dark:bg-[#4A6635]"
  },
  {
    step: "E",
    name: "Elaborate",
    desc: "Elaborate on your point and provide detailed context from the novel.",
    sentence: "This is evident in Conor, whose deep denial about his mother's terminal illness isolates him until the Monster forces him to engage with complex internal narratives.",
    borderClass: "border-[#5E8E65] dark:border-[#7FCE8A]",
    textClass: "text-[#4D7553] dark:text-[#A1C9A7]",
    bgClass: "bg-[#5E8E65]/5 dark:bg-[#5E8E65]/10",
    badgeBg: "bg-[#5E8E65]"
  },
  {
    step: "T",
    name: "Technique & Quote 1",
    desc: "Introduce your first key quote / piece of evidence alongside a supportive language feature.",
    sentence: "The Monster tells him, \"Stories are wild creatures. When you let them loose, who knows what havoc they might wreak?\"",
    quoteDetail: "Metaphor & Personification",
    colorLabel: "Comparing stories to untamed animals highlight how they break through mental shields.",
    borderClass: "border-[#D4A373] dark:border-[#E5B585]",
    textClass: "text-[#A06C3E] dark:text-[#E2C09A]",
    bgClass: "bg-[#D4A373]/5 dark:bg-[#D4A373]/10",
    badgeBg: "bg-[#D4A373]"
  },
  {
    step: "A",
    name: "Analyze 1",
    desc: "Critically analyze how the quote proves your point.",
    sentence: "This metaphor highlights that the stories are not mere fairytales, but dangerous reflections of Conor's own subconscious that will violently dismantle his denial. The unpredictability of these stories reflects Conor's lack of control over his mother's impending death.",
    borderClass: "border-[#A020F0] dark:border-[#B57EDC]",
    textClass: "text-[#7B1FA2] dark:text-[#CE93D8]",
    bgClass: "bg-[#A020F0]/5 dark:bg-[#A020F0]/10",
    badgeBg: "bg-[#A020F0]"
  },
  {
    step: "E/T",
    name: "Evidence & Technique 2",
    desc: "Synthesize by introducing a second supportive quote and technique.",
    sentence: "Furthermore, the Monster's stories lack clear \"good guys,\" forcing Conor to admit his conflicting desire for his mother's suffering to end, culminating in his confession: \"I want it to be over!\"",
    quoteDetail: "High Modality Dialogue",
    colorLabel: "The exclamation point and simple, desperate language emphasize extreme cognitive conflict.",
    borderClass: "border-[#E05A47] dark:border-[#F08080]",
    textClass: "text-[#C0392B] dark:text-[#E88B80]",
    bgClass: "bg-[#E05A47]/5 dark:bg-[#E05A47]/10",
    badgeBg: "bg-[#E05A47]"
  },
  {
    step: "A",
    name: "Analyze 2",
    desc: "Analyze the second quote and connect it back to the overarching topic.",
    sentence: "The stories strip away his defensive isolation, allowing him to accept his complex grief without guilt.",
    borderClass: "border-[#D46B08] dark:border-[#FF9C39]",
    textClass: "text-[#B95500] dark:text-[#FFA94D]",
    bgClass: "bg-[#D46B08]/5 dark:bg-[#D46B08]/10",
    badgeBg: "bg-[#D46B08]"
  },
  {
    step: "L",
    name: "Link",
    desc: "Formulate a concluding thought that tightly marries your arguments back to the prompt.",
    sentence: "Ultimately, storytelling is depicted not as an escape from reality, but as a destructive yet necessary mechanism for Conor to confront and survive his profound grief.",
    borderClass: "border-[#3182CE] dark:border-[#63B3ED]",
    textClass: "text-[#2B6CB0] dark:text-[#90CDF4]",
    bgClass: "bg-[#3182CE]/5 dark:bg-[#3182CE]/10",
    badgeBg: "bg-[#3182CE]"
  }
];

const MEMORABLE_QUOTES = [
  {
    quote: "Stories are wild creatures. When you let them loose, who knows what havoc they might wreak?",
    speaker: "Yew Tree Monster",
    chapter: "The First Tale",
    techniques: ["Extended Metaphor", "Personification"],
    context: "Said by the Yew Tree Monster to describe the fierce, untruth-shattering nature of narratives.",
    analysis: "By comparing storytelling to an unpredictable beast ('wild creatures'), Ness presents truth as something that cannot be domesticated or suppressed. This serves to break down Conor's layers of emotional walls and isolation.",
    usageTip: "Use this to explain how the stories help Conor confront emotional vulnerability."
  },
  {
    quote: "Your mind will believe comforting lies while also knowing the painful truths that make those lies necessary. And your mind will punish you for believing both.",
    speaker: "Yew Tree Monster",
    chapter: "The Fourth Tale (Conor's Truth)",
    techniques: ["Juxtaposition", "Contrast", "Paradox"],
    context: "The climax of the novel, explaining Conor's guilt over holding conflicting wishes for his mother.",
    analysis: "This quote highlights the core human conflict of grief. Conor wanted his pain to end (letting go) but also loved his mother deeply. The paradox of 'comforting lies' vs 'painful truths' relieves the student of feeling guilt for complex thoughts.",
    usageTip: "Perfect for describing Conor's profound psychological guilt and feelings of cosmic isolation."
  }
];

export function EnglishNotes() {
  const [englishNavTab, setEnglishNavTab] = useState<'blueprint' | 'poetry' | 'chapters' | 'chapterQuiz' | 'petaetal' | 'quotes' | 'mcq'>('blueprint');

  const [activeRes, setActiveRes] = useState<number | null>(null);
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number>>({});
  const [petaetalView, setPetaetalView] = useState<'spaced' | 'full'>('spaced');
  const [copiedQuoteIdx, setCopiedQuoteIdx] = useState<number | null>(null);

  // --- Random Chapter & Custom Quiz States ---
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const [quizMode, setQuizMode] = useState<'mcq' | 'trueFalse' | 'essayPlan'>('mcq');
  const [customQuestionCount, setCustomQuestionCount] = useState<number>(3); // Customizable question count limit
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({}); // For active chapter MCQs
  const [tfAnswers, setTfAnswers] = useState<Record<number, boolean>>({}); // For active chapter True/False
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [studentEssayPlan, setStudentEssayPlan] = useState('');
  const [showExemplarPlan, setShowExemplarPlan] = useState(false);
  const [copiedExemplar, setCopiedExemplar] = useState(false);

  // Interactive PETAL builder active sentence highlight
  const [activePetalStep, setActivePetalStep] = useState<number | null>(null);

  const activeChapter = BOOK_CHAPTERS[currentChapterIdx];

  const handleRandomChapter = () => {
    setIsShuffling(true);
    // Reset quiz states when changing chapters
    setIsQuizActive(false);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setTfAnswers({});
    setQuizScore(0);
    setQuizFinished(false);
    setStudentEssayPlan('');
    setShowExemplarPlan(false);

    let count = 0;
    const interval = setInterval(() => {
      setCurrentChapterIdx(prev => {
        let nextIdx = Math.floor(Math.random() * BOOK_CHAPTERS.length);
        while (nextIdx === prev && BOOK_CHAPTERS.length > 1) {
          nextIdx = Math.floor(Math.random() * BOOK_CHAPTERS.length);
        }
        return nextIdx;
      });
      count++;
      if (count >= 8) {
        clearInterval(interval);
        setIsShuffling(false);
      }
    }, 90);
  };

  const startCustomQuiz = () => {
    setIsQuizActive(true);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setTfAnswers({});
    setQuizScore(0);
    setQuizFinished(false);
    setStudentEssayPlan('');
    setShowExemplarPlan(false);
  };

  const handleChapterMcqAnswer = (qIdx: number, optionIdx: number) => {
    if (selectedAnswers[qIdx] !== undefined) return; // Already answered
    
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optionIdx }));
    const isCorrect = activeChapter.mcq[qIdx].answer === optionIdx;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleChapterTfAnswer = (qIdx: number, answer: boolean) => {
    if (tfAnswers[qIdx] !== undefined) return; // Already answered
    
    setTfAnswers(prev => ({ ...prev, [qIdx]: answer }));
    const isCorrect = activeChapter.trueFalse[qIdx].answer === answer;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleChapterNext = (totalQuestions: number) => {
    if (currentQuestionIdx < totalQuestions - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleChapterResetChoice = () => {
    setIsQuizActive(false);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setTfAnswers({});
    setQuizScore(0);
    setQuizFinished(false);
  };
  
  const handleMcq = (qIdx: number, optIdx: number) => {
    setMcqAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedQuoteIdx(index);
    setTimeout(() => {
      setCopiedQuoteIdx(null);
    }, 2000);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      {/* Visual Header */}
      <div className="relative mb-8 bg-gradient-to-r from-emerald-800 to-teal-800 dark:from-[#203323] dark:to-[#192D29] text-white p-6 sm:p-8 rounded-[32px] overflow-hidden shadow-md">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-1/4 scale-150">
          <Book className="w-96 h-96" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 dark:bg-[#81C784]/10 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#E3F2FD] dark:text-[#81C784] mb-2 border border-white/5">
              <Sparkles className="w-3 h-3 fill-[#E3F2FD] dark:fill-[#81C784]" /> Sophisticated Analytical Studio
            </div>
            <h2 className="text-2xl md:text-3.5xl font-extrabold tracking-tight font-serif">Year 7 English Revision Hub</h2>
            <p className="text-teal-100 dark:text-neutral-300 text-xs sm:text-sm mt-1 font-medium max-w-lg">
              Master the Unseen Poetry (Isolation) and Patrick Ness's novel <em>A Monster Calls</em> utilizing elite paragraph builder mechanics.
            </p>
          </div>
          <div className="shrink-0 flex items-center bg-white/10 dark:bg-black/30 p-1.5 rounded-2xl border border-white/5">
            <GraduationCap className="w-10 h-10 text-emerald-300 dark:text-emerald-400 p-1.5" />
            <div className="pr-3 text-left">
              <p className="text-[9px] uppercase tracking-wider text-teal-200 dark:text-teal-300 font-extrabold leading-none">Curriculum Spec</p>
              <p className="text-xs font-bold font-mono mt-0.5 leading-none text-white">NSW Stage 4 Standard</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Desktop Workspace Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Sidebar Navigation Panel (Stretches on desktop, utilizes the sides!) */}
        <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-24">
          {/* Mobile Tab Selector (Compact, horizontal scroll for small screens) */}
          <div className="lg:hidden flex overflow-x-auto pb-2 gap-2 scrollbar-hide snap-x">
            {[
              { id: 'blueprint', label: '1. Specs', icon: ClipboardList, color: 'text-indigo-500' },
              { id: 'poetry', label: '2. Poetry', icon: BookOpen, color: 'text-sky-500' },
              { id: 'chapters', label: '3. Guide', icon: Book, color: 'text-emerald-500' },
              { id: 'chapterQuiz', label: '4. Practice', icon: Wand2, color: 'text-amber-500' },
              { id: 'petaetal', label: '5. PET-AE-TAL', icon: PenTool, color: 'text-purple-500' },
              { id: 'quotes', label: '6. Quotes', icon: Quote, color: 'text-rose-500' },
              { id: 'mcq', label: '7. Trivia', icon: HelpIcon, color: 'text-teal-500' }
            ].map(tab => {
              const IconComp = tab.icon;
              const isActive = englishNavTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setEnglishNavTab(tab.id as any)}
                  className={`snap-center shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white dark:bg-[#25251F] text-[#5A5A40] dark:text-[#CBD5E0] border-[#E5E5DB] dark:border-[#3A3A30] hover:bg-[#FBEBF8]'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop Left Sidebar Card */}
          <div className="hidden lg:block bg-white dark:bg-[#25251F] rounded-2xl border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm overflow-hidden p-4">
            <p className="text-[10px] font-extrabold uppercase text-[#9C9C8B] tracking-widest px-2 mb-3">Study Modules</p>
            <nav className="space-y-1.5">
              {[
                { id: 'blueprint', primary: 'Exam Blueprint', secondary: 'Specs & Policies', icon: ClipboardList, activeBg: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900/50', hoverText: 'hover:text-indigo-600 dark:hover:text-indigo-400' },
                { id: 'poetry', primary: 'Unseen Poetry Hub', secondary: 'Analytical Q&A', icon: BookOpen, activeBg: 'bg-sky-50 text-sky-700 dark:bg-sky-950/30 dark:text-sky-300 border-sky-200 dark:border-sky-900/50', hoverText: 'hover:text-sky-600 dark:hover:text-sky-400' },
                { id: 'chapters', primary: 'Chapter Analyst', secondary: 'Narrative Guides', icon: Book, activeBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50', hoverText: 'hover:text-emerald-600 dark:hover:text-emerald-400' },
                { id: 'chapterQuiz', primary: 'Chapter Practice', secondary: 'Adaptive Quizzes', icon: Wand2, activeBg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300 border-amber-200 dark:border-amber-900/50', hoverText: 'hover:text-amber-600 dark:hover:text-amber-400' },
                { id: 'petaetal', primary: 'PET-AE-TAL Lab', secondary: 'Interactive Essayist', icon: PenTool, activeBg: 'bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-300 border-purple-200 dark:border-purple-900/50', hoverText: 'hover:text-purple-600 dark:hover:text-purple-400' },
                { id: 'quotes', primary: 'Core Quote Bank', secondary: 'Essay Memoriser', icon: Quote, activeBg: 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-300 border-rose-200 dark:border-rose-900/50', hoverText: 'hover:text-rose-600 dark:hover:text-rose-400' },
                { id: 'mcq', primary: 'Trivia Station', secondary: 'Subject-level MCQ', icon: HelpIcon, activeBg: 'bg-teal-50 text-teal-700 dark:bg-teal-950/30 dark:text-teal-300 border-teal-200 dark:border-teal-900/50', hoverText: 'hover:text-teal-600 dark:hover:text-teal-400' }
              ].map(tab => {
                const isActive = englishNavTab === tab.id;
                const IconComp = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setEnglishNavTab(tab.id as any)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl border flex items-center justify-between transition-all group cursor-pointer ${
                      isActive 
                        ? `${tab.activeBg} font-bold shadow-sm translate-x-1`
                        : `bg-transparent border-transparent text-[#5A5A40] dark:text-[#C1BEB5] ${tab.hoverText} hover:bg-neutral-50 dark:hover:bg-neutral-800`
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg border transition-colors ${
                        isActive ? 'bg-white/80 dark:bg-[#1E1E1A] shadow-inner' : 'bg-neutral-100 dark:bg-neutral-800 border-transparent'
                      }`}>
                        <IconComp className="w-4 h-4 shrink-0" />
                      </div>
                      <div>
                        <p className="text-xs font-bold leading-none">{tab.primary}</p>
                        <p className="text-[9px] font-semibold text-neutral-400 dark:text-neutral-500 mt-1 leading-none">{tab.secondary}</p>
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

          {/* Quick Stats Helper sidebar widget */}
          <div className="bg-gradient-to-br from-[#FDFBF7] to-[#FAF8F2] dark:from-[#25251F] dark:to-[#1D1D18] rounded-2xl border-2 border-dashed border-[#DFDFD3] dark:border-[#3A3A30] p-4 text-center">
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#C08546] bg-[#FAF1E6] dark:bg-[#2C241C] px-2 py-0.5 rounded-md">Revision Stats</span>
            <div className="mt-2 text-2xl font-serif font-bold text-[#4A4A40] dark:text-[#ECECE4]">
              7 / 7 Areas
            </div>
            <p className="text-[10px] text-neutral-400 dark:text-neutral-505 mt-0.5">Fully Structured & Active</p>
            <div className="w-full h-1.5 bg-neutral-150 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: The Interactive Content Canvas (Wide and beautifully spaced!) */}
        <main className="lg:col-span-9 animate-in duration-300">
          
          {/* TAB 1: EXAM BLUEPRINT & ASSESSMENT RULES */}
          {englishNavTab === 'blueprint' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#4A4A40] dark:text-[#EAE6D8] flex items-center gap-2">
                      <span className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-indigo-500"><ClipboardList className="w-5 h-5" /></span>
                      📋 Half Yearly Examination Parameters
                    </h3>
                    <p className="text-[#8B8B7A] dark:text-[#A0A096] text-xs font-medium mt-1">Diverse Voices in Poetry & Novel Paragraph Writing</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 text-[11px] font-extrabold uppercase font-mono tracking-wider">
                    <span className="bg-[#FAF9F5] dark:bg-neutral-800 border-2 border-[#DFDFD3] dark:border-[#3A3A30] text-[#5A5A40] dark:text-neutral-300 px-3 py-1.5 rounded-xl">
                      ⏱️ 1 HR 30 MINS
                    </span>
                    <span className="bg-[#FAF9F5] dark:bg-neutral-800 border-2 border-[#DFDFD3] dark:border-[#3A3A30] text-[#5A5A40] dark:text-neutral-300 px-3 py-1.5 rounded-xl">
                      📝 2 SECTIONS
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Specs Card */}
                  <div className="bg-gradient-to-b from-indigo-50/40 to-indigo-50/10 dark:from-indigo-950/10 dark:to-transparent p-5 rounded-2xl border-2 border-indigo-100 dark:border-indigo-900/40 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-600 bg-white dark:bg-[#2D3139] px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-widest border border-indigo-200 dark:border-indigo-800">
                        Section 1
                      </span>
                      <h4 className="font-bold text-base text-indigo-900 dark:text-indigo-200">Short Response Specs</h4>
                    </div>
                    <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono">30 Marks • Unseen Texts</div>
                    
                    <div className="space-y-3 pt-1">
                      <div>
                        <strong className="text-[10px] text-indigo-800 dark:text-indigo-300 uppercase tracking-wider block mb-1">Key Themes to Focus</strong>
                        <div className="flex flex-wrap gap-1.5">
                          {["Identity & Culture", "Discrimination", "Racism", "Migrant Experience", "Displaced People"].map(t => (
                            <span key={t} className="text-[10px] bg-white dark:bg-[#20252F] px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-900 text-neutral-600 dark:text-neutral-300 font-medium">{t}</span>
                          ))}
                        </div>
                      </div>
                      
                      <ul className="text-xs text-neutral-600 dark:text-neutral-300 space-y-2 font-medium">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                          <span>Focus intensely on identifying and analysing <strong>poetic devices</strong> (similes, metaphors, imagery, alliteration).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                          <span>Questions range from <strong>1 to 3 marks</strong> each. Manage your writing length accordingly (1 mark = 1 line; 3 marks = 4 to 6 lines).</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Specs Card */}
                  <div className="bg-gradient-to-b from-teal-50/40 to-teal-50/10 dark:from-teal-950/10 dark:to-transparent p-5 rounded-2xl border-2 border-teal-100 dark:border-teal-900/40 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-teal-600 bg-white dark:bg-[#202E29] px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-widest border border-teal-200 dark:border-teal-800">
                        Section 2
                      </span>
                      <h4 className="font-bold text-base text-teal-900 dark:text-teal-200">Analytical Writing Specs</h4>
                    </div>
                    <div className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest font-mono">10 Marks • A Monster Calls</div>
                    
                    <div className="space-y-3 pt-1">
                      <div>
                        <strong className="text-[10px] text-teal-800 dark:text-teal-300 uppercase tracking-wider block mb-1">Key Themes to Focus</strong>
                        <div className="flex flex-wrap gap-1.5">
                          {["Imminent Loss & Grief", "Subconscious Denial", "Cosmic Isolation", "The Power of Truth"].map(t => (
                            <span key={t} className="text-[10px] bg-white dark:bg-[#202E29] px-2 py-0.5 rounded border border-teal-100 dark:border-teal-900 text-neutral-600 dark:text-neutral-300 font-medium">{t}</span>
                          ))}
                        </div>
                      </div>

                      <ul className="text-xs text-neutral-600 dark:text-neutral-300 space-y-2 font-medium">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                          <span>Compose a cohesive, comprehensive <strong>PET-AE-TAL</strong> paragraph.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                          <span>Must cite at least <strong>2 high-profile quotes</strong> with explicit literary techniques (metaphors, motifs, irony).</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Grade Descriptor Box */}
                <div className="mt-6 p-4 bg-[#FCF8F2] dark:bg-[#2A231C] rounded-xl border border-[#FAF1E6] dark:border-transparent">
                  <h6 className="text-[10px] text-[#A06C3E] uppercase tracking-widest font-extrabold mb-2 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#C08546]" /> Target Standard Guidelines (Nsw Curriculum)
                  </h6>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs leading-relaxed font-semibold">
                    <div className="p-3 bg-white dark:bg-[#1E1E1A] rounded-lg border border-neutral-150">
                      <span className="text-[#386641] dark:text-[#81C784] font-extrabold uppercase tracking-wide block mb-0.5">9-10 MARKS: Sophisticated</span>
                      <p className="text-neutral-500 dark:text-neutral-400 font-normal">Complex vocabulary, high conceptual insight, deeply detailed analysis of multiple language aspects with integrated context.</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-[#1E1E1A] rounded-lg border border-neutral-150">
                      <span className="text-[#C08546] font-extrabold uppercase tracking-wide block mb-0.5">7-8 MARKS: Well-developed</span>
                      <p className="text-neutral-500 dark:text-neutral-400 font-normal">Clear logical argument, proper PETAL flow, uses quotes correctly but may have simpler thematic evaluations.</p>
                    </div>
                  </div>
                </div>

                {/* Rules & Absences warning container */}
                <div className="mt-6 bg-[#FAF9F5] dark:bg-[#1E1E19] border-l-4 border-amber-500 rounded-r-xl p-4">
                  <h5 className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300 text-xs uppercase tracking-wider mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" /> Assessment Absence Policy
                  </h5>
                  <div className="text-[11px] text-neutral-600 dark:text-neutral-300 space-y-2 leading-relaxed">
                    <p>If you are absent on the day of the task, you <strong className="text-red-500">must notify the Head Teacher of English on or prior to the morning</strong> of the task.</p>
                    <p>A formal medical certificate must be submitted on your first day of return. General doctor notes claiming "unfit for study" without diagnostic specifics will not be accepted. Late or invalid submissions incur a strict <strong className="text-red-500">10% mark deduction penalty</strong>.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: UNSEEN POETRY HUB (PARCHMENT PAPEY DESIGN) */}
          {englishNavTab === 'poetry' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                <div className="flex items-center justify-between border-b border-[#E5E5DB]/60 dark:border-[#3A3A30]/60 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-sky-50 dark:bg-sky-950/40 rounded-xl text-sky-500"><BookOpen className="w-5 h-5" /></span>
                    <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 font-serif">Unseen Poetry Studio</h3>
                  </div>
                  <span className="text-[10px] font-mono font-extrabold bg-sky-50 dark:bg-[#202A35] text-[#2D6CB0] dark:text-sky-300 px-3 py-1 rounded-full uppercase tracking-wider">
                    Unseen Text Practise
                  </span>
                </div>

                {/* Double Panel Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Premium Parchment Paper Poem Reader */}
                  <div className="lg:col-span-5">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9C9C8B] block mb-2">Source Poem Sheet</span>
                    <div className="bg-[#FAF7EC] dark:bg-[#29261E] rounded-2xl border-2 border-[#F0E6D2] dark:border-[#3A3325] p-6 shadow-sm relative overflow-hidden transition-all hover:shadow">
                      {/* Subtle manuscript grid backdrop lines */}
                      <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(rgba(18,17,14,0.015)_1px,transparent_1px)] bg-[size:100%_2rem] pointer-events-none" />
                      
                      <div className="relative z-10">
                        <div className="text-center mb-5">
                          <h4 className="font-serif font-extrabold text-[#3F3B32] dark:text-[#E4DEC9] text-base leading-tight">
                            {unseenPoem.title}
                          </h4>
                          <span className="text-[11px] font-serif italic text-neutral-400 block mt-1">by {unseenPoem.author}</span>
                          <div className="w-10 h-0.5 bg-[#C08546]/30 mx-auto mt-2"></div>
                        </div>

                        <div className="whitespace-pre-wrap font-serif text-[#3F3B32] dark:text-[#E4DEC9] text-sm leading-[2.1] text-center select-text selection:bg-[#F2E8CF] tracking-wide">
                          {unseenPoem.text}
                        </div>
                      </div>
                    </div>
                    {/* Prompt tip */}
                    <p className="text-[10px] font-semibold italic text-neutral-400 mt-2 text-center">
                      💡 Tip: Use your cursor to select text and pinpoint key devices like "puzzle piece" (metaphor).
                    </p>
                  </div>

                  {/* Right Column: Dynamic Q&A Panel */}
                  <div className="lg:col-span-7 space-y-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9C9C8B] block">Interactive Questions</span>
                    <p className="text-xs text-neutral-400">Click on any exam question below to reveal a 100%-graded exemplar student answer and analysis tips.</p>

                    <div className="space-y-3">
                      {shortResponses.map((res, idx) => (
                        <div 
                          key={idx} 
                          className={`rounded-2xl border transition-all ${
                            activeRes === idx 
                              ? 'bg-sky-50/15 border-sky-300 shadow-sm dark:bg-[#1E252D]' 
                              : 'bg-white border-[#DFDFD3] dark:border-[#3A3A30] hover:bg-neutral-50 dark:bg-[#20201B]'
                          }`}
                        >
                          <button 
                            onClick={() => setActiveRes(activeRes === idx ? null : idx)}
                            className="w-full text-left p-4 flex justify-between items-start gap-4 cursor-pointer"
                          >
                            <div className="flex gap-2.5">
                              <span className={`text-[11px] font-mono font-extrabold px-2 py-0.5 rounded h-fit shrink-0 ${
                                activeRes === idx ? 'bg-sky-500 text-white' : 'bg-neutral-100 text-[#4A4A40] dark:bg-neutral-800'
                              }`}>
                                Q{idx+1}
                              </span>
                              <div className="space-y-1">
                                <p className="font-bold text-neutral-800 dark:text-neutral-200 text-xs leading-relaxed">
                                  {res.q}
                                </p>
                                <span className="text-[10px] font-extrabold text-sky-600 dark:text-sky-300 uppercase tracking-wider font-mono">
                                  {res.marks} MARK{res.marks > 1 ? 'S' : ''}
                                </span>
                              </div>
                            </div>
                            <span className="text-neutral-400 text-xs">{activeRes === idx ? '▲' : '▼'}</span>
                          </button>

                          {activeRes === idx && (
                            <div className="px-4 pb-4 animate-in slide-in-from-top-3 duration-200">
                              <div className="p-3.5 bg-white dark:bg-[#171D24] rounded-xl border border-sky-100 dark:border-sky-900/40 mt-1">
                                <p className="text-[9px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest font-mono mb-1.5 flex items-center gap-1.5">
                                  <Award className="w-3.5 h-3.5" /> High-scoring student exemplar answer (100% Marks)
                                </p>
                                <p className="text-xs text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed select-text select-all">
                                  {res.a}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CHAPTER ANALYST GUIDE */}
          {englishNavTab === 'chapters' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#E5E5DB]/60 dark:border-[#3A3A30]/60 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-emerald-500"><Book className="w-5 h-5" /></span>
                    <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 font-serif">A Monster Calls: Interactive Chapters</h3>
                  </div>
                  <button
                    onClick={handleRandomChapter}
                    disabled={isShuffling}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    <Shuffle className={`w-3.5 h-3.5 ${isShuffling ? 'animate-spin' : ''}`} />
                    <span>Shuffle Chapter</span>
                  </button>
                </div>

                {/* Double Column Panel: Left Sidebar selector, Right selected content details */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left sub-panel: Chapter Directory list (Instant Clicking) */}
                  <div className="lg:col-span-4 space-y-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9C9C8B] block">Chapters Directory</span>
                    <div className="space-y-1.5 bg-[#FAF9F5] dark:bg-[#20201B] p-2.5 rounded-xl border border-neutral-150">
                      {BOOK_CHAPTERS.map((ch, idx) => {
                        const isSelected = currentChapterIdx === idx;
                        return (
                          <button
                            key={ch.id}
                            onClick={() => {
                              setCurrentChapterIdx(idx);
                              handleChapterResetChoice();
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-all text-xs font-bold flex items-center justify-between group cursor-pointer ${
                              isSelected
                                ? 'bg-[#386641] text-white'
                                : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
                            }`}
                          >
                            <span className="truncate">{ch.title}</span>
                            <ChevronRight className={`w-3 h-3 opacity-60 transition-transform group-hover:translate-x-0.5 ${isSelected ? 'opacity-100 text-white' : ''}`} />
                          </button>
                        );
                      })}
                    </div>
                    
                    <div className="p-3.5 bg-emerald-50/20 dark:bg-[#1E2E25]/10 rounded-xl border border-emerald-100 dark:border-emerald-900/30 text-[11px] leading-relaxed">
                      <span className="font-extrabold text-[#386641] dark:text-[#81C784]">💡 Theme Hint</span>
                      <p className="text-neutral-500 mt-1">Ness links physical motifs—like the Yew Tree, kitchen clocks, and dining halls—directly to Conor's emotional states of denial.</p>
                    </div>
                  </div>

                  {/* Right sub-panel: Selected Chapter Notebook Card */}
                  <div className={`lg:col-span-8 p-6 rounded-2xl border transition-all duration-300 ${
                    isShuffling ? 'opacity-30 blur-sm scale-[0.99] border-amber-400' : 'bg-[#FAFBF9] dark:bg-[#1D201D] border-[#E2EAE4] dark:border-[#38433C]'
                  }`}>
                    
                    {/* Chapter Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-neutral-200">
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 dark:bg-[#202C24] dark:text-emerald-300 px-2.5 py-0.5 rounded">
                          Selected Chapter
                        </span>
                        <h4 className="font-serif font-extrabold text-neutral-800 dark:text-neutral-200 text-lg">
                          {activeChapter.title}
                        </h4>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {activeChapter.themes.map(t => (
                          <span key={t} className="text-[9px] font-mono font-bold uppercase bg-[#FAF1E6] dark:bg-neutral-800 text-[#C08546] px-2 py-0.5 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Chapter Summary */}
                    <div className="space-y-3.5">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 block mb-1">Plot Summary Outline</span>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans text-justify select-text">
                          {activeChapter.summary}
                        </p>
                      </div>

                      {/* Display Key Chapter Quote */}
                      <div className="p-4 bg-white dark:bg-[#161612] rounded-xl border border-neutral-200 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 text-[#C08546]/5 font-serif font-extrabold text-8xl pointer-events-none tracking-tighter transform translate-x-1/4 -translate-y-1/4">“</div>
                        
                        <div className="flex gap-2 relative z-10">
                          <Quote className="w-5 h-5 text-[#C08546]/30 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-serif font-bold text-neutral-700 dark:text-neutral-200 text-sm leading-relaxed select-text select-all">
                              &quot;{activeChapter.quote.replace(/"/g, '')}&quot;
                            </p>
                            <div className="text-right mt-1.5">
                              <span className="text-[9px] font-mono font-extrabold text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md">
                                Spoken by {activeChapter.speaker}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Literary Strategy */}
                      <div className="p-4 bg-[#EBF8FF] dark:bg-[#1E2B38]/30 rounded-xl border border-[#BEE3F8]/50 text-xs">
                        <span className="font-extrabold text-[#2B6CB0] dark:text-[#90CDF4] uppercase tracking-wide block mb-1.5">
                          🎓 Literary Strategy ({activeChapter.technique})
                        </span>
                        <p className="text-[#2C5282] dark:text-neutral-300 leading-relaxed font-medium">
                          {activeChapter.analysis}
                        </p>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CHAPTER ACTIVE QUIZ ENVIRONMENT */}
          {englishNavTab === 'chapterQuiz' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                
                {/* Header */}
                <div className="border-b border-[#E5E5DB]/60 dark:border-[#3A3A30]/60 pb-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-amber-500"><Wand2 className="w-5 h-5" /></span>
                    <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 font-serif">Assessment Lab: Chapter Practice</h3>
                  </div>
                  <div className="text-xs font-bold text-neutral-400 bg-neutral-105 dark:bg-neutral-800 px-3 py-1.5 rounded-xl">
                    Target: {activeChapter.title}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Quick select quiz preferences */}
                  <div className="lg:col-span-4 space-y-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9C9C8B] block">Interactive Config</span>

                    <div className="bg-[#FAF9F5] dark:bg-[#1E1E19] p-4 rounded-xl border border-neutral-150 space-y-4">
                      {/* Chapter Select dropdown */}
                      <div>
                        <label className="block text-[9px] font-extrabold text-neutral-400 uppercase tracking-widest mb-1.5">Target Chapter</label>
                        <select
                          value={currentChapterIdx}
                          onChange={(e) => {
                            setCurrentChapterIdx(parseInt(e.target.value, 10));
                            handleChapterResetChoice();
                          }}
                          className="w-full bg-white dark:bg-[#25251F] border border-neutral-200 text-neutral-700 dark:text-[#E0E0D8] text-xs font-bold px-3 py-2 rounded-xl focus:outline-none focus:border-amber-500 cursor-pointer"
                        >
                          {BOOK_CHAPTERS.map((ch, idx) => (
                            <option key={ch.id} value={idx}>
                              {ch.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Revision Mode Selector */}
                      <div>
                        <label className="block text-[9px] font-extrabold text-neutral-400 uppercase tracking-widest mb-1.5">Revision Mode</label>
                        <div className="space-y-1.5">
                          {[
                            { id: 'mcq', label: 'MCQ Trivia Game' },
                            { id: 'trueFalse', label: 'Fact-Check: True/False' },
                            { id: 'essayPlan', label: 'PETAL Essay Sandbox' }
                          ].map(mode => (
                            <button
                              key={mode.id}
                              onClick={() => { setQuizMode(mode.id as any); handleChapterResetChoice(); }}
                              className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                                quizMode === mode.id 
                                  ? 'bg-[#386641] text-white border-[#386641]' 
                                  : 'bg-white dark:bg-[#2A2A22] text-[#5A5A40] border-neutral-200'
                              }`}
                            >
                              {mode.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Info Panel */}
                      <div className="text-[10px] text-neutral-400 font-medium leading-relaxed bg-white/50 p-2.5 rounded border border-neutral-100">
                        {quizMode === 'essayPlan' 
                          ? 'Prompt practice includes a 10/10 analytical exemplar to evaluate your outline.' 
                          : 'Change the mode in real-time. Practice repeatedly to memorise details!'
                        }
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Quiz Arena */}
                  <div className="lg:col-span-8">
                    {!isQuizActive ? (
                      <div className="bg-[#FAF9F5] dark:bg-[#1E1E18] p-6 rounded-2xl border-2 border-dashed border-neutral-200 text-center space-y-4">
                        <div className="text-4xl">⚡</div>
                        <div>
                          <h5 className="font-extrabold uppercase tracking-wide text-sm text-neutral-800 dark:text-neutral-200">Initialize Practice Session</h5>
                          <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">
                            Load interactive assessments for <em>{activeChapter.title}</em> in <strong>{quizMode === 'mcq' ? 'MCQ' : quizMode === 'trueFalse' ? 'True/False' : 'PETAL Builder'}</strong> mode to build confidence.
                          </p>
                        </div>
                        
                        {/* Question limitation picker */}
                        {quizMode !== 'essayPlan' && (
                          <div className="flex items-center justify-center gap-2 pt-2">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9C9C8B]">Question Limits:</span>
                            <div className="flex gap-1.5">
                              {[1, 2, 3].map(num => {
                                const maxAvailable = quizMode === 'mcq' ? activeChapter.mcq.length : activeChapter.trueFalse.length;
                                const isOk = num <= maxAvailable;
                                return (
                                  <button
                                    key={num}
                                    disabled={!isOk}
                                    onClick={() => setCustomQuestionCount(num)}
                                    className={`px-3 py-1 text-xs font-mono font-bold rounded-lg border transition-all ${
                                      !isOk ? 'opacity-30 cursor-not-allowed' :
                                      customQuestionCount === num ? 'bg-amber-500 text-white border-amber-500 shadow-sm' :
                                      'bg-white dark:bg-[#2A2A22] border-neutral-200'
                                    }`}
                                  >
                                    {num}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        <button
                          onClick={startCustomQuiz}
                          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                        >
                          Launch Revision Quiz Now
                        </button>
                      </div>
                    ) : (
                      // ACTIVE QUIZ PORT
                      <div className="bg-[#FAF9F5] dark:bg-[#1E1E18] p-5 rounded-2xl border-2 border-amber-500/20 dark:border-amber-500/10">
                        {/* Quiz Header */}
                        <div className="flex items-center justify-between border-b pb-3 mb-4">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 font-mono">
                            Revision Mode: {quizMode.toUpperCase()}
                          </span>
                          <button
                            onClick={handleChapterResetChoice}
                            className="text-[10px] font-extrabold text-[#B05B5B] hover:underline cursor-pointer"
                          >
                            Exit Quiz
                          </button>
                        </div>

                        {/* MODE 1: MCQ ACTIVE */}
                        {quizMode === 'mcq' && (() => {
                          const questions = activeChapter.mcq.slice(0, customQuestionCount);
                          const question = questions[currentQuestionIdx];
                          const isAnswered = selectedAnswers[currentQuestionIdx] !== undefined;
                          const chosenIdx = selectedAnswers[currentQuestionIdx];

                          if (quizFinished) {
                            return (
                              <div className="text-center py-6">
                                <div className="text-4xl mb-2">🏆</div>
                                <h6 className="font-extrabold text-neutral-800 dark:text-neutral-250 text-sm uppercase">Chapter Section Mastered!</h6>
                                <p className="text-xs text-neutral-400 mt-1">
                                  You scored <strong className="text-emerald-600 font-mono text-sm">{quizScore} / {questions.length}</strong> correct responses!
                                </p>
                                {quizScore === questions.length && (
                                  <div className="my-3 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-extrabold animate-pulse">
                                    <Sparkles className="w-3 h-3 fill-currentColor" /> PERFECT SCORE ACHIEVED
                                  </div>
                                )}
                                <div className="mt-4 flex justify-center gap-2">
                                  <button onClick={startCustomQuiz} className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer">
                                    Restart Test
                                  </button>
                                  <button onClick={handleChapterResetChoice} className="px-3 py-1.5 bg-white text-neutral-500 border border-neutral-200 text-xs font-bold rounded-lg cursor-pointer">
                                    Change Settings
                                  </button>
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div className="space-y-4">
                              <div className="flex justify-between items-center text-[10px] font-extrabold font-mono text-neutral-400">
                                <span>ITEM {currentQuestionIdx + 1} OF {questions.length}</span>
                                <span className="bg-[#FAF1E6] text-[#C08546] px-2 py-0.5 rounded">SCORE: {quizScore}</span>
                              </div>

                              <p className="font-serif font-bold text-neutral-800 dark:text-neutral-200 text-sm leading-relaxed">
                                {question.q}
                              </p>

                              <div className="space-y-2">
                                {question.options.map((opt, oIdx) => {
                                  const isCorrect = oIdx === question.answer;
                                  const isChosen = chosenIdx === oIdx;
                                  let btnStyle = "w-full text-left p-3 rounded-xl border text-xs font-semibold transition-all ";
                                  
                                  if (!isAnswered) {
                                    btnStyle += "bg-white dark:bg-[#25251F] border-neutral-200 hover:bg-neutral-50 cursor-pointer hover:translate-x-0.5";
                                  } else if (isCorrect) {
                                    btnStyle += "bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-[#1E2E23] dark:text-[#81C784] font-bold";
                                  } else if (isChosen) {
                                    btnStyle += "bg-red-50 border-red-500 text-red-700 dark:bg-[#2E1E1E] dark:text-[#E88B80] font-bold";
                                  } else {
                                    btnStyle += "bg-white dark:bg-[#25251F] text-neutral-400 border-neutral-200 opacity-40";
                                  }
                                  return (
                                    <button key={oIdx} disabled={isAnswered} onClick={() => handleChapterMcqAnswer(currentQuestionIdx, oIdx)} className={btnStyle}>
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>

                              {isAnswered && (
                                <div className="p-3 bg-white dark:bg-[#1A1A15] rounded-xl border border-neutral-200 mt-2">
                                  <p className="text-xs text-neutral-500 leading-relaxed">
                                    <span className="font-extrabold text-emerald-600 uppercase mr-1">Explanation:</span>
                                    {question.exp}
                                  </p>
                                </div>
                              )}

                              {isAnswered && (
                                <button
                                  onClick={() => handleChapterNext(questions.length)}
                                  className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-[#386641] hover:bg-[#2C5233] text-white font-extrabold text-xs rounded-xl"
                                >
                                  <span>{currentQuestionIdx === questions.length - 1 ? 'Finish Study' : 'Next Item'}</span>
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          );
                        })()}

                        {/* MODE 2: TRUE / FALSE ACTIVE */}
                        {quizMode === 'trueFalse' && (() => {
                          const questions = activeChapter.trueFalse.slice(0, customQuestionCount);
                          const question = questions[currentQuestionIdx];
                          const isAnswered = tfAnswers[currentQuestionIdx] !== undefined;
                          const chosenVal = tfAnswers[currentQuestionIdx];

                          if (quizFinished) {
                            return (
                              <div className="text-center py-6">
                                <div className="text-4xl mb-2">⚡</div>
                                <h6 className="font-extrabold text-neutral-800 dark:text-neutral-200 text-sm uppercase font-sans font-serif">Fact Checking Complete!</h6>
                                <p className="text-xs text-neutral-400 mt-1">
                                  You correctly evaluated <strong className="text-emerald-600 font-mono">{quizScore} / {questions.length}</strong> assertions.
                                </p>
                                <div className="mt-4 flex justify-center gap-2">
                                  <button onClick={startCustomQuiz} className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer">
                                    Repeat Test
                                  </button>
                                  <button onClick={handleChapterResetChoice} className="px-3 py-1.5 bg-white text-neutral-500 border border-neutral-200 text-xs font-bold rounded-lg cursor-pointer font-semibold">
                                    Settings
                                  </button>
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div className="space-y-4">
                              <div className="flex justify-between items-center text-[10px] font-extrabold font-mono text-neutral-400">
                                <span>ASSERTION {currentQuestionIdx + 1} OF {questions.length}</span>
                                <span className="bg-[#FAF1E6] text-[#C08546] px-2 py-0.5 rounded">SCORE: {quizScore}</span>
                              </div>

                              <p className="font-serif font-bold text-neutral-805 dark:text-neutral-200 text-sm leading-relaxed">
                                {question.q}
                              </p>

                              <div className="grid grid-cols-2 gap-3 pb-2">
                                {[{ val: true, label: 'True' }, { val: false, label: 'False' }].map(btn => {
                                  let isCorrect = btn.val === question.answer;
                                  let isChosen = chosenVal === btn.val;
                                  let tfStyle = "py-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ";
                                  
                                  if (!isAnswered) {
                                    tfStyle += "bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200";
                                  } else if (isCorrect) {
                                    tfStyle += "bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-[#1E2E23] dark:text-[#81C784] font-extrabold";
                                  } else if (isChosen) {
                                    tfStyle += "bg-red-50 border-red-500 text-red-700 dark:bg-[#2E1E1E] dark:text-[#E88B80] font-extrabold";
                                  } else {
                                    tfStyle += "bg-white text-neutral-400 border-neutral-200 opacity-40";
                                  }

                                  return (
                                    <button
                                      key={btn.label}
                                      disabled={isAnswered}
                                      onClick={() => handleChapterTfAnswer(currentQuestionIdx, btn.val)}
                                      className={tfStyle}
                                    >
                                      {btn.label}
                                    </button>
                                  );
                                })}
                              </div>

                              {isAnswered && (
                                <div className="p-3 bg-white dark:bg-[#1A1A15] rounded-xl border border-neutral-200">
                                  <p className="text-xs text-neutral-500 leading-relaxed">
                                    <span className="font-extrabold text-emerald-605 uppercase mr-1">Explanation:</span>
                                    {question.exp}
                                  </p>
                                </div>
                              )}

                              {isAnswered && (
                                <button
                                  onClick={() => handleChapterNext(questions.length)}
                                  className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-[#386641] hover:bg-[#2C5233] text-white font-extrabold text-xs rounded-xl"
                                >
                                  <span>{currentQuestionIdx === questions.length - 1 ? 'Finish Study' : 'Next Question'}</span>
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          );
                        })()}

                        {/* MODE 3: ESSAY BLUEPRINT ACTIVE */}
                        {quizMode === 'essayPlan' && (
                          <div className="space-y-4">
                            <div className="p-4 bg-amber-50/60 dark:bg-[#29221B] rounded-xl border border-amber-200/50">
                              <span className="text-[9px] font-extrabold text-[#D4A373] uppercase tracking-wider block mb-1">
                                High-Yield Essay Prompt Question
                              </span>
                              <p className="font-serif text-sm font-bold text-neutral-700 dark:text-neutral-200 leading-relaxed">
                                {activeChapter.essayPrompt}
                              </p>
                            </div>

                            <div className="space-y-1.5">
                              <div className="flex justify-between items-center">
                                <label className="text-[9px] font-extrabold text-neutral-400 uppercase tracking-widest flex items-center gap-1">
                                  <PenTool className="w-3.5 h-3.5 text-emerald-600" /> Draft Your Essay Blueprint (PETAL Guide)
                                </label>
                                <span className="text-[9px] text-neutral-400 font-mono">{studentEssayPlan.length} CHARS</span>
                              </div>
                              <textarea
                                value={studentEssayPlan}
                                onChange={(e) => setStudentEssayPlan(e.target.value)}
                                placeholder="P: Write your topic sentence argument directly here...&#10;E/T: Cite the key chapter quotes and tools...&#10;A: Analyze cognitive dissonance and grief...&#10;L: Tie argument back to prompt."
                                rows={4}
                                className="w-full bg-white dark:bg-[#1E1E19] border border-neutral-200 rounded-xl p-3 text-xs font-mono focus:outline-none focus:border-emerald-500 leading-relaxed text-neutral-700 dark:text-[#ECECE4]"
                              />
                            </div>

                            <div className="flex gap-2">
                              <button
                                onClick={() => setShowExemplarPlan(!showExemplarPlan)}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white dark:bg-[#25251F] border-2 border-emerald-600 text-[#386641] dark:text-[#81C784] font-extrabold text-xs rounded-xl transition-all cursor-pointer"
                              >
                                <Eye className="w-4 h-4" />
                                <span>{showExemplarPlan ? 'Hide 10/10 Exemplar' : 'Compare with 10/10 Exemplar'}</span>
                              </button>
                              <button
                                onClick={handleChapterResetChoice}
                                className="px-4 py-2 bg-neutral-150 rounded-xl text-xs font-bold text-neutral-600 cursor-pointer"
                              >
                                Reset Mode
                              </button>
                            </div>

                            {/* EXEMPLAR COMPARISON */}
                            {showExemplarPlan && (
                              <div className="p-4 bg-white dark:bg-[#151512] rounded-xl border-2 border-emerald-500/30 relative space-y-3 animate-in fade-in zoom-in-95 mt-3">
                                <button
                                  onClick={() => {
                                    const textBuild = `PROMPT: ${activeChapter.essayPrompt}\n\nPOINT:\n${activeChapter.exemplarPlan.point}\n\nEVIDENCE & TECH 1:\n${activeChapter.exemplarPlan.eta1}\n\nEVIDENCE & TECH 2:\n${activeChapter.exemplarPlan.eta2}\n\nLINK:\n${activeChapter.exemplarPlan.link}`;
                                    navigator.clipboard.writeText(textBuild);
                                    setCopiedExemplar(true);
                                    setTimeout(() => setCopiedExemplar(false), 2000);
                                  }}
                                  className="absolute top-3.5 right-3.5 flex items-center gap-1 px-2 py-1 text-[9px] font-extrabold text-neutral-400 bg-neutral-50 dark:bg-neutral-800 rounded border hover:text-[#386641]"
                                >
                                  {copiedExemplar ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                                  <span>{copiedExemplar ? 'COPIED EXCELLENCE' : 'COPY SCHOLAR BLUEPRINT'}</span>
                                </button>

                                <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#386641] dark:text-[#81C784]">
                                  HIGH-SCORING STUDENT EXEMPLAR BLUEPRINT
                                </span>

                                <div className="space-y-3 pt-2 text-xs leading-relaxed font-semibold">
                                  <div>
                                    <span className="text-[#386641] block text-[10px] uppercase tracking-wider font-extrabold">Point (P)</span>
                                    <p className="text-neutral-550 dark:text-neutral-300 font-normal bg-[#FAF9F5] dark:bg-[#1C1C17] p-2 rounded-lg border border-neutral-100">
                                      {activeChapter.exemplarPlan.point}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-[#C08546] block text-[10px] uppercase tracking-wider font-extrabold">Evidence & Technique 1 (E/T)</span>
                                    <p className="text-neutral-550 dark:text-neutral-300 font-normal bg-[#FAF9F5] dark:bg-[#1C1C17] p-2 rounded-lg border border-neutral-100">
                                      {activeChapter.exemplarPlan.eta1}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-purple-600 block text-[10px] uppercase tracking-wider font-extrabold">Evidence & Technique 2 (E/T)</span>
                                    <p className="text-neutral-550 dark:text-neutral-300 font-normal bg-[#FAF9F5] dark:bg-[#1C1C17] p-2 rounded-lg border border-neutral-100">
                                      {activeChapter.exemplarPlan.eta2}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-sky-600 block text-[10px] uppercase tracking-wider font-extrabold">Link (L)</span>
                                    <p className="text-neutral-550 dark:text-neutral-300 font-normal bg-[#FAF9F5] dark:bg-[#1C1C17] p-2 rounded-lg border border-neutral-100">
                                      {activeChapter.exemplarPlan.link}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                          </div>
                        )}

                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PET-AE-TAL WRITING LAB */}
          {englishNavTab === 'petaetal' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                
                {/* Header with dual views selector */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E5E5DB]/60 dark:border-[#3A3A30]/60 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-xl text-purple-500"><PenTool className="w-5 h-5" /></span>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 font-serif leading-tight">PET-AE-TAL Writing Lab</h3>
                      <p className="text-xs text-neutral-400 mt-0.5">Dual-mode interactive analytical engine</p>
                    </div>
                  </div>

                  <div className="flex bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl self-stretch sm:self-auto uppercase font-extrabold font-mono text-[10px]">
                    <button
                      onClick={() => setPetaetalView('spaced')}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        petaetalView === 'spaced'
                          ? 'bg-white dark:bg-[#25251F] text-purple-700 shadow-sm'
                          : 'text-neutral-400 hover:text-neutral-600'
                      }`}
                    >
                      Spaced Breakdown
                    </button>
                    <button
                      onClick={() => setPetaetalView('full')}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        petaetalView === 'full'
                          ? 'bg-white dark:bg-[#25251F] text-purple-700 shadow-sm'
                          : 'text-neutral-400 hover:text-neutral-600'
                      }`}
                    >
                      Full Cohesive Flow
                    </button>
                  </div>
                </div>

                {/* Question Display card */}
                <div className="p-4 bg-purple-50/20 dark:bg-[#271E2B]/10 rounded-xl border border-purple-100 dark:border-purple-900/30 mb-5 relative group">
                  <span className="text-[10px] font-extrabold text-purple-600 dark:text-purple-300 uppercase tracking-widest block mb-1 font-mono">
                    Official Half-Yearly Essay Prompt Practice
                  </span>
                  <p className="text-neutral-750 dark:text-neutral-200 font-serif font-bold text-sm leading-relaxed select-text">
                    {petaetal.question}
                  </p>
                </div>

                {/* Dual Column workspace */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Color-coded steps interactive details */}
                  <div className="lg:col-span-6 space-y-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9C9C8B] block">Interactive Step Index</span>
                    <p className="text-xs text-neutral-400">Click on any paragraph step below to isolate and analyze its functional purpose in analytical essays.</p>
                    
                    <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                      {PETAL_BREAKDOWN.map((block, idx) => {
                        const isActiveHighlight = activePetalStep === idx;
                        return (
                          <div
                            key={idx}
                            onClick={() => setActivePetalStep(isActiveHighlight ? null : idx)}
                            className={`p-3 border-l-4 rounded-r-lg cursor-pointer transition-all ${
                              isActiveHighlight
                                ? `shadow-sm translate-x-1 ${block.borderClass} ${block.bgClass}`
                                : 'bg-white dark:bg-[#20201B] border-neutral-200 hover:border-neutral-400'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`${block.badgeBg} text-white font-mono font-bold text-[9px] px-1.5 py-0.5 rounded`}>
                                {block.step}
                              </span>
                              <span className="text-xs font-bold text-[#4A4A40] dark:text-[#EAE6D8]">
                                {block.name}
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-400 font-semibold leading-relaxed">
                              {block.desc}
                            </p>
                            
                            {isActiveHighlight && (
                              <div className="mt-2 text-[11px] bg-white/70 dark:bg-[#1E1E18]/70 p-2 rounded border border-neutral-100 animate-in slide-in-from-top-2 duration-150">
                                <span className="font-extrabold text-[#C08546] mr-1">Sentence Analysis:</span>
                                <span className="text-neutral-550 dark:text-neutral-300 font-normal leading-relaxed">{block.sentence}</span>
                                {block.quoteDetail && (
                                  <div className="mt-1.5 pt-1.5 border-t border-dashed">
                                    <span className="font-extrabold text-purple-600 dark:text-[#CF8FE4] uppercase mr-1">Identified Technique:</span>
                                    <span className="font-bold text-neutral-600 dark:text-neutral-300 bg-neutral-50 px-1.5 py-0.5 rounded">{block.quoteDetail}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Visualizer Output (Spaced vs Cohesive with highlights) */}
                  <div className="lg:col-span-6">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9C9C8B] block mb-3">Live Essay Visualiser</span>

                    {petaetalView === 'spaced' ? (
                      <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
                        {PETAL_BREAKDOWN.map((block, idx) => (
                          <div 
                            key={idx}
                            className={`p-4 border-l-4 rounded-r-xl transition-all ${block.borderClass} ${block.bgClass}`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 mb-2">
                              <span className={`${block.badgeBg} text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded`}>
                                {block.step}
                              </span>
                              <span className="font-extrabold text-xs text-neutral-700 dark:text-neutral-200 uppercase tracking-wide">
                                {block.name}
                              </span>
                              <span className="text-[10px] text-neutral-400 font-medium">
                                — {block.desc}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans font-medium select-text">
                              {block.sentence}
                            </p>
                            {block.quoteDetail && (
                              <div className="mt-3 text-[11px] flex flex-col gap-1 bg-white/70 dark:bg-[#151512]/50 p-2.5 rounded-lg border border-[#E5E5DB]/30">
                                <div>
                                  <span className="font-extrabold text-[#C08546] uppercase mr-1">Key Technique:</span>
                                  <span className="font-bold text-neutral-600 dark:text-neutral-305 bg-neutral-50 dark:bg-neutral-800 px-1.5 py-0.5 rounded border">{block.quoteDetail}</span>
                                </div>
                                {block.colorLabel && (
                                  <p className="text-neutral-405 italic leading-relaxed mt-1">
                                    {block.colorLabel}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-[#FAF9F5] dark:bg-[#20201B] rounded-xl border-2 border-dashed border-neutral-200 p-5 shadow-inner">
                        <span className="text-[9px] font-mono font-extrabold uppercase text-purple-600 dark:text-purple-300 block mb-3">Cohesive Integrated Paragraph Flow</span>
                        <div className="text-sm leading-relaxed space-y-4">
                          <p className="font-serif text-[14.5px] leading-loose text-justify select-text selection:bg-[#F2E8CF]">
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">Patrick Ness demonstrates that storytelling is a powerful psychological tool that forces characters to confront unbearable truths about themselves. </span>
                            <span className="text-teal-600 dark:text-teal-400 font-bold">This is evident in Conor, whose deep denial about his mother's terminal illness isolates him until the Monster forces him to engage with complex internal narratives. </span>
                            <span className="text-amber-700 dark:text-[#E5B585] font-extrabold">The Monster tells him, &quot;Stories are wild creatures. When you let them loose, who knows what havoc they might wreak?&quot; </span>
                            <span className="text-purple-600 dark:text-[#CF8FE4] font-bold">This metaphor highlights that the stories are not mere fairytales, but dangerous reflections of Conor's own subconscious that will violently dismantle his denial. The unpredictability of these stories reflects Conor's lack of control over his mother's impending death. </span>
                            <span className="text-rose-600 dark:text-[#FF9C9C] font-extrabold">Furthermore, the Monster's stories lack clear &quot;good guys,&quot; forcing Conor to admit his conflicting desire for his mother's suffering to end, culminating in his confession: &quot;I want it to be over!&quot; </span>
                            <span className="text-[#B97A57] dark:text-[#E2A67C] font-bold">The stories strip away his defensive isolation, allowing him to accept his complex grief without guilt. </span>
                            <span className="text-sky-600 dark:text-sky-400 font-bold">Ultimately, storytelling is depicted not as an escape from reality, but as a destructive yet necessary mechanism for Conor to confront and survive his profound grief.</span>
                          </p>
                        </div>
                        
                        <div className="mt-5 pt-3 border-t border-neutral-200 flex flex-wrap gap-x-3.5 gap-y-1.5 text-[9px] text-[#8B8B7A] dark:text-[#A0A096] font-extrabold uppercase font-mono">
                          <div className="flex items-center gap-1.5"><span className="w-2 rounded-full h-2 bg-emerald-500 inline-block"></span> P (Point)</div>
                          <div className="flex items-center gap-1.5"><span className="w-2 rounded-full h-2 bg-teal-500 inline-block"></span> E (Elaborate)</div>
                          <div className="flex items-center gap-1.5"><span className="w-2 rounded-full h-2 bg-amber-500 inline-block"></span> T (Quote 1)</div>
                          <div className="flex items-center gap-1.5"><span className="w-2 rounded-full h-2 bg-purple-500 inline-block"></span> A (Analyze 1)</div>
                          <div className="flex items-center gap-1.5"><span className="w-2 rounded-full h-2 bg-rose-500 inline-block"></span> E/T (Quote 2)</div>
                          <div className="flex items-center gap-1.5"><span className="w-2 rounded-full h-2 bg-[#B97A57] inline-block"></span> A (Analyze 2)</div>
                          <div className="flex items-center gap-1.5"><span className="w-2 rounded-full h-2 bg-sky-500 inline-block"></span> L (Link)</div>
                        </div>
                      </div>
                    )}

                  </div>

                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CORE MEMORABLE BOOK QUOTES */}
          {englishNavTab === 'quotes' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                
                {/* Header */}
                <div className="border-b border-[#E5E5DB]/60 dark:border-[#3A3A30]/60 pb-3 mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-rose-50 dark:bg-rose-950/40 rounded-xl text-rose-500"><Quote className="w-5 h-5" /></span>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 font-serif leading-tight">Elite Memorable Quotes</h3>
                      <p className="text-xs text-neutral-400 mt-0.5">High-yielding essay evidence cards</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4A373] bg-[#D4A373]/10 dark:bg-amber-900/30 px-3 py-1 rounded-full font-mono">
                    2 Key Cards to Learn for Exam Excellence
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {MEMORABLE_QUOTES.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="bg-[#FAF9F5] dark:bg-[#1E1E18] p-5 rounded-2xl border-2 border-[#DFDFD3] dark:border-[#3A3A30] relative group hover:border-[#C08546] hover:-translate-y-0.5 transition-all shadow-sm"
                    >
                      {/* Copy Action Button */}
                      <button
                        onClick={() => copyToClipboard(item.quote, idx)}
                        className="absolute top-4 right-4 p-1.5 bg-white dark:bg-[#20201B] rounded-lg border border-neutral-200 text-neutral-400 hover:text-emerald-600 transition-all cursor-pointer shadow-sm active:scale-95 text-xs font-bold"
                        title="Copy Quote to Clipboard"
                      >
                        {copiedQuoteIdx === idx ? (
                          <span className="flex items-center gap-1.5 text-green-600 font-extrabold text-[10px] uppercase tracking-wider">
                            <Check className="w-3.5 h-3.5" /> Copied
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider">
                            <Copy className="w-3 h-3" /> Copy Quote
                          </span>
                        )}
                      </button>

                      {/* Card Content */}
                      <div className="space-y-4 pr-2">
                        <div className="flex items-center gap-1.5">
                          <Bookmark className="w-4 h-4 text-[#D4A373]" />
                          <span className="text-[10px] font-mono font-extrabold uppercase text-[#D4A373] tracking-wider">
                            {item.chapter} • {item.speaker}
                          </span>
                        </div>

                        {/* Quote display block */}
                        <div className="p-3.5 bg-white dark:bg-[#12120C] rounded-xl border border-neutral-150 font-serif relative">
                          <p className="text-[#3A3A34] dark:text-[#ECECE4] font-bold text-xs leading-relaxed italic select-all select-text">
                            &quot;{item.quote}&quot;
                          </p>
                        </div>

                        {/* Techniques list */}
                        <div>
                          <strong className="text-[9px] uppercase tracking-wider text-[#A06C3E] bg-[#D4A373]/10 px-2 py-0.5 rounded-md inline-block mb-1 font-mono">
                            Literary Techniques
                          </strong>
                          <p className="text-xs font-bold text-[#4A4A40] dark:text-neutral-300">
                            {item.techniques.join(', ')}
                          </p>
                        </div>

                        {/* Analysis detail */}
                        <div>
                          <strong className="text-[9px] uppercase tracking-widest text-neutral-400 block mb-1">Critical Analysis Usage</strong>
                          <p className="text-xs text-neutral-550 dark:text-neutral-400 leading-relaxed font-medium">
                            {item.analysis}
                          </p>
                        </div>

                        {/* Usage tips container */}
                        <div className="p-3 bg-emerald-50/20 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-990 font-medium text-xs text-[#386641] dark:text-[#81C784]">
                          <span className="font-extrabold block text-[10px] uppercase tracking-wider mb-1">🎓 High-Impact Exam Usage Tip</span>
                          <p className="leading-relaxed font-semibold">
                            {item.usageTip}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

          {/* TAB 7: GLOBAL SUBJECT MCQ TRIVIA */}
          {englishNavTab === 'mcq' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1A] rounded-2xl p-6 border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm">
                
                {/* Header */}
                <div className="border-b border-[#E5E5DB]/60 dark:border-[#3A3A30]/60 pb-3 mb-5 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-teal-50 dark:bg-teal-950/40 rounded-xl text-teal-500"><HelpCircle className="w-5 h-5" /></span>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 font-serif leading-tight">Comprehensive Subject Trivia</h3>
                      <p className="text-xs text-neutral-400 mt-0.5">Test your comprehensive knowledge of themes, motifs, and context</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      id="reset-english-trivia-btn"
                      onClick={() => {
                        setMcqAnswers({});
                        window.dispatchEvent(new CustomEvent('study-dopamine-achieved', {
                          detail: {
                            type: 'click',
                            xpReward: 0,
                            coinReward: 0,
                            message: 'Trivia Board Reset! 🔄'
                          }
                        }));
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-900/30 text-xs font-extrabold rounded-xl text-red-650 dark:text-red-400 transition-all hover:scale-[1.02] border-2 border-red-200 dark:border-red-900/40 cursor-pointer shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                      <span>Reset Trivia Board</span>
                    </button>
                    <span className="text-[10px] font-mono font-extrabold bg-teal-50 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-full shrink-0">
                      Syllabus Check
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {englishMcq.map((mcq, qIdx) => (
                    <div key={qIdx} className="bg-[#FAFBF9] dark:bg-[#1D201D] p-5 rounded-2xl border border-neutral-150 shadow-sm space-y-4">
                      
                      {/* Item index */}
                      <div className="flex items-center justify-between border-b border-dashed border-neutral-200 pb-2">
                        <span className="text-[10px] font-mono font-extrabold text-teal-600 block uppercase">QUESTION {qIdx + 1} OF {englishMcq.length}</span>
                        {mcqAnswers[qIdx] !== undefined && (
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wider">
                            ANSWERED
                          </span>
                        )}
                      </div>

                      <p className="font-bold text-neutral-800 dark:text-neutral-200 text-sm leading-relaxed">
                        {mcq.q}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {mcq.options.map((opt, oIdx) => {
                          const isSelected = mcqAnswers[qIdx] === oIdx;
                          const isCorrect = mcq.answer === oIdx;
                          const hasAnswered = mcqAnswers[qIdx] !== undefined;
                          
                          let btnClass = "w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ";
                          if (!hasAnswered) {
                            btnClass += "bg-white border-neutral-200 hover:bg-neutral-5" +
                                        "0 hover:translate-x-0.5 text-neutral-700 dark:bg-[#25251F] dark:text-[#CBD5E0] dark:border-[#3A3A30]";
                          } else if (isCorrect) {
                            btnClass += "bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-[#1E2E23] dark:text-[#81C784] font-extrabold";
                          } else if (isSelected) {
                            btnClass += "bg-red-50 border-red-500 text-red-700 dark:bg-[#2E1E1E] dark:text-[#E88B80] font-extrabold";
                          } else {
                            btnClass += "bg-white text-neutral-400 border-neutral-200 dark:bg-neutral-900 opacity-40";
                          }
                          
                          return (
                            <button
                              key={oIdx}
                              disabled={hasAnswered}
                              onClick={() => handleMcq(qIdx, oIdx)}
                              className={btnClass}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {mcqAnswers[qIdx] !== undefined && (
                        <div className="p-3 bg-white dark:bg-[#151512] rounded-xl border border-neutral-150 animate-in fade-in duration-200">
                          <p className="text-xs text-neutral-500 leading-relaxed font-medium">
                            <span className="font-extrabold text-emerald-600 uppercase mr-1.5">Model feedback explanation:</span> 
                            {mcq.exp}
                          </p>
                        </div>
                      )}

                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

          {/* Quick study feedback footer card inside Right canvas */}
          <div className="mt-8 bg-gradient-to-r from-emerald-800 to-teal-800 dark:from-[#203323] dark:to-[#192D29] p-6 rounded-3xl text-white shadow-md relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-5 transform scale-150"><Shuffle className="w-48 h-48" /></div>
            <div className="relative z-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-base">Write & Learn: Dynamic Tutor Feedback</h4>
                <p className="text-teal-100 dark:text-neutral-300 text-xs font-medium max-w-xl">
                  Draft a custom PETAETAL paragraph for the isolation prompt, or compose responses to Unseen Poetry. Submit them anytime, and I'll review and grade them to polish your assessment quality!
                </p>
              </div>
              <div className="shrink-0 flex justify-center">
                <button
                  onClick={() => setEnglishNavTab('petaetal')}
                  className="px-5 py-2.5 bg-[#FAF9F5] hover:bg-neutral-100 text-emerald-800 text-xs font-extrabold rounded-2xl shadow hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer uppercase tracking-wider font-mono flex items-center gap-1.5"
                >
                  <PenTool className="w-4 h-4 text-emerald-700" /> Open Writer Lab
                </button>
              </div>
            </div>
          </div>

        </main>

      </div>
    </div>
  );
}
