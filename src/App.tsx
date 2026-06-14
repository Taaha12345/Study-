import { useState, useEffect, useRef } from 'react';
import { BookOpen, AlertTriangle, Lightbulb, BrainCircuit, Hash, Dices, PenTool, Gamepad2, Search, Moon, Sun, Book, PieChart, Calculator, Compass, Microscope, Landmark, ChevronLeft, ChevronRight, Timer, FileDown, Trash2, Copy, Minimize2, Plus, Minus, Target, Award, Sparkles, Flame, Coins, RotateCcw } from 'lucide-react';
import { TabState } from './types';
import { AlgebraNotes } from './components/AlgebraNotes';
import { ProbabilityNotes } from './components/ProbabilityNotes';
import { MistakesNotes } from './components/MistakesNotes';
import { StudyTips } from './components/StudyTips';
import { Flashcards } from './components/Flashcards';
import { Practice } from './components/Practice';
import { Quiz } from './components/Quiz';
import { SearchResults } from './components/SearchResults';
import { EnglishNotes } from './components/EnglishNotes';
import { AnglesNotes } from './components/AnglesNotes';
import { IntegersNotes } from './components/IntegersNotes';
import { DataNotes } from './components/DataNotes';

import { HistoryNotes } from './components/HistoryNotes';
import { ScienceNotes } from './components/ScienceNotes';
import { PomodoroTimer } from './components/PomodoroTimer';
import { DopamineBoosters } from './components/DopamineBoosters';
import { playChiptuneSound, getRankByXp } from './utils/dopamineHelper';

const SUBJECT_TOPICS: Record<string, string[]> = {
  algebra: [
    "Algebra Vocabulary",
    "Indices & Powers",
    "Combining Like Terms",
    "Solving Equations",
    "Worded Phrases Translation"
  ],
  probability: [
    "Definition of Probability",
    "The Basic Ratio Formula",
    "AND / OR Compound Rules",
    "Complementary & Expected Frequency"
  ],
  angles: [
    "Types of Angles",
    "Point & Line Rules",
    "Parallel Lines & Transversals"
  ],
  integers: [
    "Directed Numbers in Real Life",
    "The Cartesian Plane Co-ordinates",
    "Integer Addition & Subtraction",
    "Integer Multiplication & Division",
    "BODMAS order of operations",
    "Prime Numbers & Index Form"
  ],
  data: [
    "Nominal vs Ordinal Categorical Data",
    "Discrete vs Continuous Numerical Data",
    "Measures of Center & Spread (Mean/Median/Mode/Range)",
    "Creating & Reading Histograms",
    "Stem-and-Leaf & Dot Plots"
  ],
  english: [
    "Key Exam Outcomes & Structure",
    "Unseen Poetry Devices & Themes",
    "PEEL/PETAL Paragraph Writing",
    "A Monster Calls Analysis"
  ],
  science: [
    "Lab Safety & Equipment Drawing",
    "Independent & Dependent Variables",
    "Astronomy: Geocentric vs Heliocentric",
    "Earth & Moon Motions (Seasons, Eclipses)",
    "Balanced vs Unbalanced Forces",
    "Friction, Gravity & Magnetism"
  ],
  history: [
    "History Fundamentals & Chronology",
    "Primary vs Secondary Sources",
    "Archaeology Methods & Site Conservation",
    "Ancient Egypt Nile, Pharaoh, and Social Structure"
  ]
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabState>('algebra');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Dopamine Progression States
  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem('study_xp');
    const parsed = parseInt(saved || '0', 10);
    return isNaN(parsed) ? 0 : parsed;
  });
  const [coins, setCoins] = useState<number>(() => {
    const saved = localStorage.getItem('study_gold');
    const parsed = parseInt(saved || '50', 10);
    return isNaN(parsed) ? 50 : parsed;
  });
  const [soundsEnabled, setSoundsEnabled] = useState<boolean>(() => localStorage.getItem('mastery_sounds_enabled') !== 'false');
  const [activeAvatar, setActiveAvatar] = useState<string>(() => localStorage.getItem('study_active_avatar') || '⭐');
  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem('study_streak_count');
    const parsed = parseInt(saved || '1', 10);
    return isNaN(parsed) ? 1 : parsed;
  });
  const [unlockedItems, setUnlockedItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('study_unlocked_items');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [claimedAchievements, setClaimedAchievements] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('study_claimed_achievements');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [activeTheme, setActiveTheme] = useState<string>(() => localStorage.getItem('study_active_theme') || 'default');
  const [floatingPopups, setFloatingPopups] = useState<{ id: number; text: string; x: number; y: number; type: string }[]>([]);

  const getTodayString = () => {
    const d = new Date();
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  };

  // Synchronize documents visual class theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-emerald', 'theme-galactic');
    if (activeTheme === 'theme-emerald') {
      root.classList.add('theme-emerald');
    } else if (activeTheme === 'theme-galactic') {
      root.classList.add('theme-galactic');
    }
  }, [activeTheme]);

  // Synchronize dopamine state across tabs & triggers
  useEffect(() => {
    const handleDopamineEvent = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail) return;

      const { type, xpReward, coinReward, message } = detail;

      // Update state
      if (xpReward > 0) {
        setXp(prev => {
          const next = prev + xpReward;
          localStorage.setItem('study_xp', next.toString());
          return next;
        });
      }
      if (coinReward > 0) {
        setCoins(prev => {
          const next = prev + coinReward;
          localStorage.setItem('study_gold', next.toString());
          return next;
        });
      }

      // Check for theme switches or avatar selection
      setTimeout(() => {
        const savedAvatar = localStorage.getItem('study_active_avatar') || '⭐';
        setActiveAvatar(savedAvatar);
        
        const savedSound = localStorage.getItem('mastery_sounds_enabled') !== 'false';
        setSoundsEnabled(savedSound);
        
        const savedTheme = localStorage.getItem('study_active_theme') || 'default';
        setActiveTheme(savedTheme);

        try {
          const savedUnlocked = localStorage.getItem('study_unlocked_items');
          if (savedUnlocked) setUnlockedItems(JSON.parse(savedUnlocked));
          
          const savedClaimed = localStorage.getItem('study_claimed_achievements');
          if (savedClaimed) setClaimedAchievements(JSON.parse(savedClaimed));
        } catch {
          // ignore
        }
      }, 50);

      // Play sound
      const savedSound = localStorage.getItem('mastery_sounds_enabled') !== 'false';
      if (savedSound) {
        playChiptuneSound(type);
      }

      // Spawn popups
      const popupId = Date.now() + Math.random();
      const popupText = `${message || ''} ${xpReward > 0 ? `+${xpReward} XP ` : ''}${coinReward > 0 ? `+${coinReward} Gold 💰` : ''}`;
      
      // Floating random position (centered cluster)
      const randX = 30 + Math.random() * 40; // 30% to 70% width
      const randY = 40 + Math.random() * 20; // 40% to 60% height
      
      setFloatingPopups(prev => [
        ...prev,
        { id: popupId, text: popupText, x: randX, y: randY, type }
      ]);

      setTimeout(() => {
        setFloatingPopups(prev => prev.filter(p => p.id !== popupId));
      }, 1800);

      // Maintain streak activity date
      const today = getTodayString();
      localStorage.setItem('study_last_active_date', today);
    };

    window.addEventListener('study-dopamine-achieved', handleDopamineEvent);
    return () => window.removeEventListener('study-dopamine-achieved', handleDopamineEvent);
  }, []);

  // Update streak on mount
  useEffect(() => {
    const today = getTodayString();
    const lastActive = localStorage.getItem('study_last_active_date');
    if (lastActive) {
      if (lastActive !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = `${yesterday.getFullYear()}-${(yesterday.getMonth() + 1).toString().padStart(2, '0')}-${yesterday.getDate().toString().padStart(2, '0')}`;
        
        if (lastActive === yesterdayString) {
          const newStreak = streak + 1;
          setStreak(newStreak);
          localStorage.setItem('study_streak_count', newStreak.toString());
          // Award gold coins for continuing streak
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('study-dopamine-achieved', {
              detail: {
                type: 'goal_achieved',
                xpReward: 30,
                coinReward: 20,
                message: `Daily Streak Kept! 🔥 ${newStreak} Days!`
              }
            }));
          }, 600);
        } else {
          setStreak(1);
          localStorage.setItem('study_streak_count', '1');
        }
        localStorage.setItem('study_last_active_date', today);
      }
    } else {
      localStorage.setItem('study_last_active_date', today);
      localStorage.setItem('study_streak_count', '1');
    }
  }, []);

  const handleResetDopamine = () => {
    localStorage.setItem('study_xp', '0');
    localStorage.setItem('study_gold', '50');
    localStorage.setItem('study_streak_count', '1');
    localStorage.setItem('study_active_avatar', '⭐');
    localStorage.setItem('study_active_theme', 'default');
    localStorage.setItem('study_unlocked_items', '[]');
    localStorage.setItem('study_claimed_achievements', '[]');
    localStorage.removeItem('study_goal_achieved_dates');

    setXp(0);
    setCoins(50);
    setStreak(1);
    setActiveAvatar('⭐');
    setActiveTheme('default');
    setUnlockedItems([]);
    setClaimedAchievements([]);

    const root = document.documentElement;
    root.classList.remove('theme-emerald', 'theme-galactic');

    const popupId = Date.now() + Math.random();
    setFloatingPopups(prev => [
      ...prev,
      { id: popupId, text: 'Systems Refreshed & Reset! 🌟🔄', x: 50, y: 50, type: 'goal_achieved' }
    ]);
    setTimeout(() => {
      setFloatingPopups(prev => prev.filter(p => p.id !== popupId));
    }, 1800);

    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass && soundsEnabled) {
        const ctx = new AudioCtxClass();
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch {
      // safe fallback
    }
  };

  const [resetKey, setResetKey] = useState(0);
  const [isNavBarExpanded, setIsNavBarExpanded] = useState(false);
  const [scratchpadSize, setScratchpadSize] = useState<'normal' | 'expanded'>('normal');

  const handleMasterResetAllProgress = () => {
    if (window.confirm("Are you sure you want to completely RESET & REFRESH all study progress, tasks, lists, and interactive content? This will reset all scores, quizzes, checklists, input values, and set completed topics across all tabs (Algebra, English, Science, HSIE, etc.) to 0%!")) {
      setCompletedTopics([]);
      setCompletionDates({});
      setScratchpadText('');
      setScratchpadChecklist([false, false, false, false, false]);
      setResetKey(prev => prev + 1);
      
      localStorage.setItem('mastery_completed_topics', '[]');
      localStorage.setItem('mastery_completion_dates', '{}');
      localStorage.removeItem('mastery_scratchpad_text');
      localStorage.setItem('mastery_scratchpad_checklist', JSON.stringify([false, false, false, false, false]));
      
      // Clear individual sub-module persistent keys
      try {
        localStorage.removeItem('completedPoints');
        localStorage.removeItem('algebra-mcq-data');
        localStorage.removeItem('probability-scenarios');
        localStorage.removeItem('integers-quiz');
        localStorage.removeItem('angles-progress');
        localStorage.removeItem('scenarios_completed');
        
        const keysToRemove = [
          'essay_draft_content', 'english_trivia_answered', 'english_quiz_progress',
          'science_experiment_log', 'science_quiz_results', 'history_sources_activity',
          'algebra_notes_inputs', 'practice_progress', 'quiz_scores', 'flashcard_streak'
        ];
        keysToRemove.forEach(k => localStorage.removeItem(k));
      } catch (e) {}

      // Play sound
      try {
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtxClass && soundsEnabled) {
          const ctx = new AudioCtxClass();
          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          osc.connect(gainNode);
          gainNode.connect(ctx.destination);
          osc.frequency.setValueAtTime(330, ctx.currentTime);
          gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        }
      } catch {}

      // Dispatch dopamine notification
      window.dispatchEvent(new CustomEvent('study-dopamine-achieved', {
        detail: {
          type: 'goal_achieved',
          xpReward: 0,
          coinReward: 0,
          message: 'All chapters (Algebra, English, Science, History) & study items have been refreshed! 🔄⚡'
        }
      }));
    }
  };

  const [completedTopics, setCompletedTopics] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mastery_completed_topics');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completionDates, setCompletionDates] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('mastery_completion_dates');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [dailyGoal, setDailyGoal] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('mastery_daily_goal');
      return saved ? parseInt(saved, 10) : 3;
    } catch {
      return 3;
    }
  });

  const [showScratchpad, setShowScratchpad] = useState(false);
  const [scratchpadText, setScratchpadText] = useState(() => {
    return localStorage.getItem('mastery_scratchpad_text') || '';
  });

  const [scratchpadTab, setScratchpadTab] = useState<'write' | 'techniques' | 'formulas' | 'templates' | 'checklist'>('write');
  const [scratchpadChecklist, setScratchpadChecklist] = useState<boolean[]>(() => {
    try {
      const saved = localStorage.getItem('mastery_scratchpad_checklist');
      return saved ? JSON.parse(saved) : [false, false, false, false, false];
    } catch {
      return [false, false, false, false, false];
    }
  });

  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('mastery_scratchpad_checklist', JSON.stringify(scratchpadChecklist));
  }, [scratchpadChecklist]);

  useEffect(() => {
    localStorage.setItem('mastery_completed_topics', JSON.stringify(completedTopics));
  }, [completedTopics]);

  useEffect(() => {
    localStorage.setItem('mastery_completion_dates', JSON.stringify(completionDates));
  }, [completionDates]);

  useEffect(() => {
    localStorage.setItem('mastery_daily_goal', dailyGoal.toString());
  }, [dailyGoal]);

  useEffect(() => {
    localStorage.setItem('mastery_scratchpad_text', scratchpadText);
  }, [scratchpadText]);

  // Monitor daily goal milestone to trigger a celebratory dopamine explosion
  useEffect(() => {
    const todayStr = getTodayString();
    const completedTodayCount = Object.values(completionDates).filter(date => date === todayStr).length;
    if (completedTodayCount >= dailyGoal && dailyGoal > 0) {
      const achievedDatesStr = localStorage.getItem('study_goal_achieved_dates') || '[]';
      try {
        const achievedDates = JSON.parse(achievedDatesStr);
        if (!achievedDates.includes(todayStr)) {
          achievedDates.push(todayStr);
          localStorage.setItem('study_goal_achieved_dates', JSON.stringify(achievedDates));
          
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('study-dopamine-achieved', {
              detail: {
                type: 'goal_achieved',
                xpReward: 100,
                coinReward: 50,
                message: `Study Target Hit for Today! 🌟🎉`
              }
            }));
          }, 300);
        }
      } catch (e) {
        // secure fallback
      }
    }
  }, [completionDates, dailyGoal]);

  const getSubjectProgress = (subjectId: string) => {
    const topics = SUBJECT_TOPICS[subjectId] || [];
    if (topics.length === 0) return 0;
    const completedCount = topics.filter(topic => completedTopics.includes(`${subjectId}:${topic}`)).length;
    return Math.round((completedCount / topics.length) * 100);
  };

  const toggleTopicCompleted = (subjectId: string, topicName: string) => {
    const key = `${subjectId}:${topicName}`;
    const todayStr = getTodayString();
    
    setCompletedTopics(prev => {
      const exists = prev.includes(key);
      const nextTopics = exists ? prev.filter(k => k !== key) : [...prev, key];
      
      if (!exists) {
        // Emit positive reinforcement event on checked
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('study-dopamine-achieved', {
            detail: {
              type: 'success',
              xpReward: 30,
              coinReward: 15,
              message: `Subtopic Mastered: "${topicName}"! 🏆`
            }
          }));
        }, 50);
      }

      setCompletionDates(prevDates => {
        const nextDates = { ...prevDates };
        if (exists) {
          delete nextDates[key];
        } else {
          nextDates[key] = todayStr;
        }
        return nextDates;
      });
      
      return nextTopics;
    });
  };

  const handleExportReport = () => {
    let report = `==================================================\n`;
    report += `            STUDENT MASTERY REVISION REPORT       \n`;
    report += `            Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} \n`;
    report += `==================================================\n\n`;

    Object.keys(SUBJECT_TOPICS).forEach((subjectId) => {
      const subjectName = subjectId.charAt(0).toUpperCase() + subjectId.slice(1);
      const percent = getSubjectProgress(subjectId);
      const topics = SUBJECT_TOPICS[subjectId] || [];
      const completedList = topics.filter(t => completedTopics.includes(`${subjectId}:${t}`));
      
      report += `▶ SUBJECT: ${subjectName} (${percent}% Completed)\n`;
      report += `  Progress: [${completedList.length}/${topics.length} Sections Done]\n`;
      report += `  ------------------------------------------------\n`;
      
      topics.forEach((topic) => {
        const isComp = completedTopics.includes(`${subjectId}:${topic}`);
        report += `  [${isComp ? '✓ COMPLETE' : '  PENDING '}]  ${topic}\n`;
      });
      report += `\n`;
    });

    // Add general stats
    const totalTopicsCount = Object.values(SUBJECT_TOPICS).reduce((acc, list) => acc + list.length, 0);
    const totalCompletedCount = completedTopics.length;
    const overallProgress = Math.round((totalCompletedCount / totalTopicsCount) * 100) || 0;

    report += `==================================================\n`;
    report += `OVERALL REVISION PROGRESS: ${overallProgress}% (${totalCompletedCount}/${totalTopicsCount} total subtopics mastered)\n`;
    report += `Keep up the excellent learning! 🚀\n`;
    report += `==================================================\n`;

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Year-7-Mastery-Study-Report-${new Date().toISOString().slice(0, 10)}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (navRef.current) {
        if (e.deltaY !== 0) {
          e.preventDefault();
          navRef.current.scrollLeft += e.deltaY;
        }
      }
    };

    const navElement = navRef.current;
    if (navElement) {
      navElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (navElement) {
        navElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const scrollNav = (direction: 'left' | 'right') => {
    if (navRef.current) {
      const scrollAmount = 250;
      navRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderProgressBadge = (subjectId: string) => {
    const percent = getSubjectProgress(subjectId);
    if (percent === 0) return null;
    const isActive = activeTab === subjectId && !searchQuery;
    return (
      <span className={`text-[9px] font-bold ml-1 px-1 py-0.5 rounded transition-all duration-300 shrink-0 ${
        isActive 
          ? 'bg-[#386641]/15 text-[#305937] dark:bg-white/20 dark:text-[#EAE6D8]' 
          : 'bg-black/25 text-white/95'
      }`}>
        {percent}%
      </span>
    );
  };

  const renderContent = () => {
    if (searchQuery.trim() !== '') {
      return <SearchResults query={searchQuery} />;
    }

    switch (activeTab) {
      case 'algebra': return <AlgebraNotes key={`algebra-${resetKey}`} />;
      case 'probability': return <ProbabilityNotes key={`probability-${resetKey}`} />;
      case 'angles': return <AnglesNotes key={`angles-${resetKey}`} />;
      case 'integers': return <IntegersNotes key={`integers-${resetKey}`} />;
      case 'data': return <DataNotes key={`data-${resetKey}`} />;
      case 'science': return <ScienceNotes key={`science-${resetKey}`} />;
      case 'history': return <HistoryNotes key={`history-${resetKey}`} />;
      case 'mistakes': return <MistakesNotes key={`mistakes-${resetKey}`} />;
      case 'tips': return <StudyTips key={`tips-${resetKey}`} />;
      case 'flashcards': return <Flashcards key={`flashcards-${resetKey}`} />;
      case 'practice': return <Practice key={`practice-${resetKey}`} />;
      case 'quiz': return <Quiz key={`quiz-${resetKey}`} />;
      case 'english': return <EnglishNotes key={`english-${resetKey}`} />;
      case 'boosters': return (
        <DopamineBoosters 
          key={`boosters-${resetKey}`}
          xp={xp}
          setXp={setXp}
          coins={coins}
          setCoins={setCoins}
          soundsEnabled={soundsEnabled}
          setSoundsEnabled={setSoundsEnabled}
          activeAvatar={activeAvatar}
          setActiveAvatar={setActiveAvatar}
          unlockedItems={unlockedItems}
          setUnlockedItems={setUnlockedItems}
          claimedAchievements={claimedAchievements}
          setClaimedAchievements={setClaimedAchievements}
          activeTheme={activeTheme}
          setActiveTheme={setActiveTheme}
          streak={streak}
          setStreak={setStreak}
          onReset={handleResetDopamine}
        />
      );
      default: return <AlgebraNotes key={`algebra-${resetKey}`} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] dark:bg-[#1E1E18] text-[#4A4A40] dark:text-[#E0E0D8] font-sans selection:bg-[#E5E5DB] dark:selection:bg-[#3A3A30] transition-colors duration-300">
      
      {/* Top Navigation / Header */}
      <header className="bg-[#5A5A40] dark:bg-[#161612] text-white shadow-md sticky top-0 z-20 transition-colors duration-300 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 md:py-5 flex flex-col xl:flex-row xl:items-center justify-between gap-4 xl:gap-8">
            <div className="flex justify-between items-center w-full xl:w-auto shrink-0">
              <div className="flex items-center gap-3 w-full">
                <div className="bg-white/20 dark:bg-white/10 p-2 rounded-xl flex items-center justify-center shrink-0">
                  <BrainCircuit className="text-white dark:text-[#EAE6D8] w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="flex-1 truncate">
                  <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5 truncate">
                    Mastery <span className="font-light opacity-90 hidden sm:inline">Hub</span>
                  </h1>
                  <p className="text-[9px] sm:text-[10px] text-white/70 font-bold mt-0.5 uppercase tracking-widest truncate">Year 7 • Math & English</p>
                </div>

                {/* Dashboard Stats Panel (Always Visible) */}
                <div 
                  onClick={() => { setActiveTab('boosters'); setSearchQuery(''); }}
                  className="hidden sm:flex items-center gap-2 cursor-pointer hover:opacity-90 active:scale-95 transition-all select-none"
                  title="Open Dopamine Rewards & Shop"
                >
                  <div className="bg-amber-500/20 px-3 py-1 rounded-xl border border-amber-500/20 flex items-center gap-1 shadow-inner">
                    <span className="text-sm">💰</span>
                    <span className="text-xs font-mono font-extrabold text-amber-300">{coins}</span>
                  </div>
                  <div className="bg-orange-500/20 px-3 py-1 rounded-xl border border-orange-500/25 flex items-center gap-1 shadow-inner">
                    <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 animate-pulse" />
                    <span className="text-xs font-mono font-extrabold text-orange-300">{streak}d</span>
                  </div>
                  <div className="bg-blue-500/20 px-3 py-1 rounded-xl border border-blue-500/20 flex items-center gap-1 shadow-inner">
                    <span className="text-xs">{activeAvatar}</span>
                    <span className="text-[10px] font-black text-blue-200">LVL {Math.floor(xp / 100) + 1}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 ml-4 shrink-0">
                {/* HIGHLY NOTICEABLE MASTER RESET FOR ALGEBRA & SUBJECTS - MOBILE */}
                <button
                  onClick={handleMasterResetAllProgress}
                  className="xl:hidden flex items-center justify-center p-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white transition-all border border-red-500 hover:scale-105 active:scale-95 shadow-md shrink-0"
                  title="RESET & REFRESH ALL SUBJECT PROGRESS"
                  id="mobile-master-reset-progress-btn"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                <button 
                  onClick={() => setShowTimer(!showTimer)}
                  className={`xl:hidden p-2 rounded-xl transition-all border ${
                    showTimer 
                      ? 'bg-white text-[#5A5A40] dark:bg-[#2A2A22] dark:text-[#EAE6D8] border-[#DFDFD3] dark:border-[#3A3A30] shadow-sm' 
                      : 'bg-white/10 text-white hover:bg-white/20 border-white/5'
                  }`}
                  aria-label="Toggle Study Timer"
                  title="Study Timer"
                >
                  <Timer className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="xl:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors shrink-0"
                  aria-label="Toggle Dark Mode"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <div className="w-full xl:w-[calc(100%-250px)] flex flex-col gap-2 shrink-0">
              {/* Expand and Reset controls inside the header navigation row */}
              <div className="flex items-center justify-between gap-3 bg-black/25 dark:bg-black/40 px-3.5 py-2 rounded-2xl text-xs text-white/95 border border-white/5 select-none shrink-0 shadow-sm">
                <div className="flex items-center gap-2 font-black uppercase tracking-wider text-[10px]">
                  <span>📚 COURSE STUDY BOARD</span>
                  {isNavBarExpanded && (
                    <span className="bg-[#81C784]/20 text-[#81C784] text-[8px] px-2 py-0.5 rounded-md border border-[#81C784]/30 font-bold">GRID VIEW</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsNavBarExpanded(!isNavBarExpanded)}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase font-black tracking-wider bg-white/10 hover:bg-white/20 active:scale-95 rounded-lg border border-white/10 transition-all cursor-pointer shadow-sm"
                    title="Toggle grid map or scroll row structure for upper subjects bar"
                  >
                    <span>{isNavBarExpanded ? "Collapse Subjects ⇡" : "Expand Subjects ↕"}</span>
                  </button>

                  <button
                    onClick={handleMasterResetAllProgress}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase font-black bg-gradient-to-r from-red-650 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white active:scale-95 rounded-lg border-b-2 border-red-700 transition-all cursor-pointer shadow-md"
                    title="COMPLETELY RESET & REFRESH COURSE STUDY PROGRESS FOR ALL SUBJECTS"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Progress 🔄</span>
                  </button>
                </div>
              </div>

              <div className={`relative group ${isNavBarExpanded ? '' : 'overflow-hidden flex items-center'}`}>
                {!isNavBarExpanded && (
                  <button 
                    onClick={() => scrollNav('left')}
                    className="hidden xl:flex absolute left-0 z-10 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 backdrop-blur-sm shadow-md"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                
                <nav 
                  ref={navRef}
                  className={`scrollbar-hide ${isNavBarExpanded ? 'w-full flex flex-wrap gap-2 md:gap-3 bg-black/10 dark:bg-black/30 p-2.5 rounded-2xl border border-white/5' : 'w-full overflow-x-auto pb-3 -mb-3 flex items-center gap-2 md:gap-3 snap-x touch-pan-x scroll-smooth'}`}
                >
                {/* Math Group */}
                <div className="flex items-center p-1 bg-black/10 dark:bg-black/30 rounded-[14px] shrink-0 snap-start border border-white/5">
                  <button 
                    onClick={() => { setActiveTab('algebra'); setSearchQuery(''); }}
                    className={`flex items-center gap-2 px-3 py-2 sm:py-2.5 rounded-xl transition-all ${activeTab === 'algebra' && !searchQuery ? 'bg-white text-[#5A5A40] dark:bg-[#2A2A22] dark:text-[#EAE6D8] font-bold shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white font-medium'}`}
                  >
                    <Hash className="w-4 h-4 hidden sm:block" />
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1">
                      Algebra {renderProgressBadge('algebra')}
                    </span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab('probability'); setSearchQuery(''); }}
                    className={`flex items-center gap-2 px-3 py-2 sm:py-2.5 rounded-xl transition-all ${activeTab === 'probability' && !searchQuery ? 'bg-white text-[#5A5A40] dark:bg-[#2A2A22] dark:text-[#EAE6D8] font-bold shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white font-medium'}`}
                  >
                    <Dices className="w-4 h-4 hidden sm:block" />
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1">
                      Probability {renderProgressBadge('probability')}
                    </span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab('angles'); setSearchQuery(''); }}
                    className={`flex items-center gap-2 px-3 py-2 sm:py-2.5 rounded-xl transition-all ${activeTab === 'angles' && !searchQuery ? 'bg-white text-[#5A5A40] dark:bg-[#2A2A22] dark:text-[#EAE6D8] font-bold shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white font-medium'}`}
                  >
                    <Compass className="w-4 h-4 hidden sm:block" />
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1">
                      Angles {renderProgressBadge('angles')}
                    </span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab('integers'); setSearchQuery(''); }}
                    className={`flex items-center gap-2 px-3 py-2 sm:py-2.5 rounded-xl transition-all ${activeTab === 'integers' && !searchQuery ? 'bg-white text-[#5A5A40] dark:bg-[#2A2A22] dark:text-[#EAE6D8] font-bold shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white font-medium'}`}
                  >
                    <Calculator className="w-4 h-4 hidden sm:block" />
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1">
                      Integers {renderProgressBadge('integers')}
                    </span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab('data'); setSearchQuery(''); }}
                    className={`flex items-center gap-2 px-3 py-2 sm:py-2.5 rounded-xl transition-all ${activeTab === 'data' && !searchQuery ? 'bg-white text-[#5A5A40] dark:bg-[#2A2A22] dark:text-[#EAE6D8] font-bold shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white font-medium'}`}
                  >
                    <PieChart className="w-4 h-4 hidden sm:block" />
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1">
                      Data {renderProgressBadge('data')}
                    </span>
                  </button>
                </div>

                {/* Other Subjects Group */}
                <div className="flex items-center p-1 bg-black/10 dark:bg-black/30 rounded-[14px] shrink-0 snap-start border border-white/5">
                  <button 
                    onClick={() => { setActiveTab('english'); setSearchQuery(''); }}
                    className={`flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl transition-all ${activeTab === 'english' && !searchQuery ? 'bg-white text-[#5A5A40] dark:bg-[#2A2A22] dark:text-[#EAE6D8] font-bold shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white font-medium'}`}
                  >
                    <Book className="w-4 h-4 hidden sm:block" />
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1">
                      English {renderProgressBadge('english')}
                    </span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab('science'); setSearchQuery(''); }}
                    className={`flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl transition-all ${activeTab === 'science' && !searchQuery ? 'bg-white text-[#5A5A40] dark:bg-[#2A2A22] dark:text-[#EAE6D8] font-bold shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white font-medium'}`}
                  >
                    <Microscope className="w-4 h-4 hidden sm:block" />
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1">
                      Science {renderProgressBadge('science')}
                    </span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab('history'); setSearchQuery(''); }}
                    className={`flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl transition-all ${activeTab === 'history' && !searchQuery ? 'bg-white text-[#5A5A40] dark:bg-[#2A2A22] dark:text-[#EAE6D8] font-bold shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white font-medium'}`}
                  >
                    <Landmark className="w-4 h-4 hidden sm:block" />
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1">
                      History {renderProgressBadge('history')}
                    </span>
                  </button>
                </div>

                {/* Study Group */}
                <div className="flex items-center p-1 bg-black/10 dark:bg-black/30 rounded-[14px] shrink-0 snap-start border border-white/5">
                  <button 
                    onClick={() => { setActiveTab('mistakes'); setSearchQuery(''); }}
                    className={`flex items-center gap-2 px-3 py-2 sm:py-2.5 rounded-xl transition-all ${activeTab === 'mistakes' && !searchQuery ? 'bg-white text-[#5A5A40] dark:bg-[#2A2A22] dark:text-[#EAE6D8] font-bold shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white font-medium'}`}
                  >
                    <AlertTriangle className="w-4 h-4 hidden sm:block" />
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider">Mistakes</span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab('tips'); setSearchQuery(''); }}
                    className={`flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl transition-all ${activeTab === 'tips' && !searchQuery ? 'bg-white text-[#5A5A40] dark:bg-[#2A2A22] dark:text-[#EAE6D8] font-bold shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white font-medium'}`}
                  >
                    <Lightbulb className="w-4 h-4 hidden sm:block" />
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider">Tips</span>
                  </button>
                </div>

                {/* Interactive Group */}
                <div className="flex items-center gap-2 shrink-0 snap-start pl-1">
                  <button 
                    onClick={() => { setActiveTab('practice'); setSearchQuery(''); }}
                    className={`flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl transition-all ${activeTab === 'practice' && !searchQuery ? 'bg-[#D4A373] dark:bg-[#BC6C25] text-[#4A4A40] dark:text-[#EAE6D8] font-bold shadow-md' : 'bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 font-medium'}`}
                  >
                    <PenTool className="w-4 h-4 hidden sm:block" />
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider">Practice</span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab('flashcards'); setSearchQuery(''); }}
                    className={`flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl transition-all ${activeTab === 'flashcards' && !searchQuery ? 'bg-[#D4A373] dark:bg-[#BC6C25] text-[#4A4A40] dark:text-[#EAE6D8] font-bold shadow-md' : 'bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 font-medium'}`}
                  >
                    <BookOpen className="w-4 h-4 hidden sm:block" />
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider">Cards</span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab('quiz'); setSearchQuery(''); }}
                    className={`flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl transition-all ${activeTab === 'quiz' && !searchQuery ? 'bg-[#386641] dark:bg-[#4A6635] text-white font-bold shadow-md' : 'bg-[#386641]/40 border border-[#386641]/50 text-white/90 hover:bg-[#386641]/60 font-medium'}`}
                  >
                    <Gamepad2 className="w-4 h-4 hidden sm:block" />
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider">Quiz</span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab('boosters'); setSearchQuery(''); }}
                    className={`flex items-center gap-3 px-4 py-2 sm:py-2.5 rounded-xl transition-all ${activeTab === 'boosters' && !searchQuery ? 'bg-amber-600 dark:bg-amber-700 text-white font-black shadow-md scale-105' : 'bg-amber-500/15 border border-amber-500/25 text-amber-200 hover:bg-amber-500/25 font-bold animate-pulse'}`}
                  >
                    <Sparkles className="w-4 h-4 hidden sm:block text-yellow-300" />
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider text-amber-100 flex items-center gap-1">Shop 🎁</span>
                  </button>
                </div>
              </nav>

              {!isNavBarExpanded && (
                <button 
                  onClick={() => scrollNav('right')}
                  className="hidden xl:flex absolute right-0 z-10 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 backdrop-blur-sm shadow-md"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

              <div className="flex items-center gap-2 shrink-0 md:ml-4">
                {/* HIGHLY NOTICEABLE MASTER RESET FOR ALGEBRA & SUBJECTS - DESKTOP */}
                <button
                  onClick={handleMasterResetAllProgress}
                  className="flex items-center gap-2 px-3.5 py-3 rounded-xl bg-gradient-to-r from-red-650 to-rose-650 hover:from-red-700 hover:to-rose-750 text-white font-black hover:scale-[1.03] active:scale-95 shadow-md border-b-2 border-red-750 transition-all cursor-pointer shrink-0"
                  title="RESET & REFRESH ALL ALGEBRAS & SYLLABUS SUBJECT PROGRESS"
                  id="desktop-master-reset-progress-btn"
                >
                  <RotateCcw className="w-4 h-4 text-white" />
                  <span className="text-xs uppercase tracking-widest font-extrabold text-white">Reset Coursework</span>
                </button>

                <button 
                  onClick={() => setShowTimer(!showTimer)}
                  className={`flex items-center gap-2 p-3 rounded-xl transition-all border ${
                    showTimer 
                      ? 'bg-white text-[#5A5A40] dark:bg-[#2A2A22] dark:text-[#EAE6D8] border-[#DFDFD3] dark:border-[#3A3A30] font-bold shadow-md' 
                      : 'bg-white/10 text-white hover:bg-white/20 border-white/10 font-semibold'
                  }`}
                  aria-label="Toggle Study Timer"
                  title="Toggle Study Timer"
                >
                  <Timer className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-wider">Study Timer</span>
                </button>

                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
                  aria-label="Toggle Dark Mode"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-[#EAE6D8]" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className={`mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 transition-all duration-300 ${['algebra', 'probability', 'angles', 'integers', 'data', 'english', 'science', 'history'].includes(activeTab) ? 'max-w-7xl' : 'max-w-4xl'}`}>
        {showTimer && (
          <PomodoroTimer />
        )}

        {/* Daily Study Goal Tracker Widget */}
        <div className="mb-8 bg-white dark:bg-[#2A2A22] p-5 sm:p-6 rounded-[28px] border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm animate-in fade-in duration-300 relative overflow-hidden">
          {/* Subtle green overlay when target achieved */}
          {(() => {
            const todayStr = getTodayString();
            const completedTodayCount = Object.values(completionDates).filter(date => date === todayStr).length;
            const isGoalReached = completedTodayCount >= dailyGoal;
            return (
              <>
                {isGoalReached && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#386641]/5 to-[#81C784]/5 pointer-events-none dark:from-[#3E5D42]/10 dark:to-[#5E8E65]/10 animate-fade-in" />
                )}
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-2xl shrink-0 transition-all ${isGoalReached ? 'bg-[#386641]/10 text-[#386641] dark:bg-[#81C784]/20 dark:text-[#81C784] scale-105' : 'bg-[#F2F0EA] dark:bg-[#1E1E18] text-[#5A5A40] dark:text-[#EAE6D8]'}`}>
                      {isGoalReached ? <Award className="w-5 h-5 animate-bounce" /> : <Target className="w-5 h-5 animate-pulse" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-[#4A4A40] dark:text-[#EAE6D8] flex items-center gap-1.5">
                        Daily Study Goal 
                        {isGoalReached && (
                          <span className="text-[10px] bg-[#386641] text-white dark:bg-[#81C784] dark:text-neutral-900 font-bold px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                            <Sparkles className="w-3 h-3 fill-white dark:fill-neutral-900" /> Completed
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096] mt-0.5 selection:bg-neutral-200">
                        {isGoalReached 
                          ? "Incredible job! You've checked off your mastery target for today! 🎉🔥" 
                          : `Almost there! Complete ${dailyGoal - completedTodayCount} more subtopic${(dailyGoal - completedTodayCount) === 1 ? '' : 's'} to hit today's goal! 🌟`
                        }
                      </p>
                    </div>
                  </div>

                  {/* Goal Increment Selector */}
                  <div className="flex items-center gap-3 self-end sm:self-auto bg-[#F7F5F0] dark:bg-[#1E1E18] px-3 py-1.5 rounded-xl border border-[#E5E5DB] dark:border-[#33332A]">
                    <span className="text-xs font-semibold text-[#8B8B7A] dark:text-[#A0A096] select-none">Target:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDailyGoal(prev => Math.max(1, prev - 1))}
                        className="p-1 rounded-md bg-white hover:bg-[#EAE8E2] dark:bg-[#2A2A22] dark:hover:bg-[#33332A] text-[#5A5A40] dark:text-[#EAE6D8] hover:scale-105 active:scale-95 transition-all shadow-sm border border-[#E5E5DB] dark:border-[#3A3A30] cursor-pointer"
                        title="Lower goal by 1"
                        aria-label="Lower goal target"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-extrabold font-mono text-[#4A4A40] dark:text-[#EAE6D8] min-w-[14px] text-center select-none">
                        {dailyGoal}
                      </span>
                      <button
                        onClick={() => setDailyGoal(prev => Math.min(20, prev + 1))}
                        className="p-1 rounded-md bg-white hover:bg-[#EAE8E2] dark:bg-[#2A2A22] dark:hover:bg-[#33332A] text-[#5A5A40] dark:text-[#EAE6D8] hover:scale-105 active:scale-95 transition-all shadow-sm border border-[#E5E5DB] dark:border-[#3A3A30] cursor-pointer"
                        title="Raise goal by 1"
                        aria-label="Raise goal target"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tracking Progress Gauge */}
                <div className="mt-5 relative z-10">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B8B7A] dark:text-[#A0A096]">
                      Today's progress
                    </span>
                    <div className="text-right font-mono text-xs font-extrabold text-[#4A4A40] dark:text-[#EAE6D8]">
                      <span className={isGoalReached ? "text-[#386641] dark:text-[#81C784]" : "text-[#5E8E65] dark:text-[#81C784]"}>
                        {completedTodayCount}
                      </span>
                      <span className="text-[#8B8B7A] dark:text-[#A0A096]"> / {dailyGoal}</span>
                      <span className="ml-1.5 text-[10px] text-[#8B8B7A] dark:text-[#A0A096] font-normal font-sans">
                        ({Math.min(100, Math.round((completedTodayCount / dailyGoal) * 100))}% completed)
                      </span>
                    </div>
                  </div>

                  {/* Progress sliding line bar container */}
                  <div className="w-full h-3 bg-[#F2F0EA] dark:bg-[#1E1E18] rounded-full overflow-hidden border border-[#E5E5DB]/30 dark:border-transparent">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ease-out ${
                        isGoalReached 
                          ? 'bg-gradient-to-r from-[#5E8E65] to-[#386641] dark:from-[#4E6F40] dark:to-[#81C784]'
                          : 'bg-gradient-to-r from-[#D4A373] to-[#BC6C25]'
                      }`}
                      style={{ width: `${Math.min(100, (completedTodayCount / dailyGoal) * 100)}%` }}
                    />
                  </div>
                </div>
              </>
            );
          })()}
        </div>

        <div className="mb-8 relative max-w-xl mx-auto md:mx-0">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-[#8B8B7A] dark:text-[#A0A096]" />
            <input 
              type="text" 
              placeholder="Search notes, mistakes, and practice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-[#2A2A22] border-2 border-[#E5E5DB] dark:border-[#3A3A30] rounded-2xl py-3 pl-12 pr-4 text-[#4A4A40] dark:text-[#E0E0D8] placeholder:text-[#8B8B7A] dark:placeholder:text-[#A0A096] focus:outline-none focus:border-[#5A5A40] dark:focus:border-[#EAE6D8] transition-colors shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 text-xs font-bold text-[#8B8B7A] dark:text-[#A0A096] hover:text-[#5A5A40] dark:hover:text-[#EAE6D8] uppercase tracking-widest"
              >
                Clear
              </button>
            )}
          </div>
        </div>
        {!searchQuery && SUBJECT_TOPICS[activeTab] && (
          <div className="mb-8 bg-white dark:bg-[#2A2A22] p-6 rounded-[28px] border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#5A5A40] dark:text-[#EAE6D8] flex items-center gap-2">
                  <span>🎯</span> {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Study Progress
                </h3>
                <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096] mt-0.5">
                  Check off the revision sections you have mastered under this topic!
                </p>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 self-stretch sm:self-auto justify-between sm:justify-end shrink-0">
                <button
                  onClick={handleExportReport}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF9F5] hover:bg-[#F2F0EA] dark:bg-[#1E1E18] dark:hover:bg-[#25251F] border border-[#DFDFD3] dark:border-[#3A3A30] text-[#5A5A40] dark:text-[#EAE6D8] text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer hover:scale-[1.01]"
                  title="Export Progress Report as TXT"
                >
                  <FileDown className="w-3.5 h-3.5 text-[#386641] dark:text-[#81C784]" />
                  <span>Export Report</span>
                </button>
                <div className="text-right shrink-0">
                  <span className="text-lg sm:text-xl font-bold font-mono text-[#386641] dark:text-[#81C784]">
                    {getSubjectProgress(activeTab)}%
                  </span>
                  <span className="text-xs text-[#8B8B7A] dark:text-[#A0A096] ml-1">
                    ({SUBJECT_TOPICS[activeTab].filter(t => completedTopics.includes(`${activeTab}:${t}`)).length}/{SUBJECT_TOPICS[activeTab].length} completed)
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-[#F2F0EA] dark:bg-[#1E1E18] rounded-full overflow-hidden mb-5">
              <div 
                className="h-full bg-neutral-400 dark:bg-neutral-650 bg-gradient-to-r from-[#5E8E65] to-[#386641] dark:from-[#3E5D42] dark:to-[#5E8E65] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${getSubjectProgress(activeTab)}%` }}
              />
            </div>

            {/* Topics List Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUBJECT_TOPICS[activeTab].map((topic) => {
                const isCompleted = completedTopics.includes(`${activeTab}:${topic}`);
                return (
                  <button
                    key={topic}
                    onClick={() => toggleTopicCompleted(activeTab, topic)}
                    className={`flex items-start text-left gap-3 p-3.5 rounded-2xl border transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer ${
                      isCompleted 
                        ? 'bg-[#F2E8CF]/40 dark:bg-[#322F24] border-[#DAE3C5] dark:border-[#4A402A] text-[#386641] dark:text-[#EAE6D8]' 
                        : 'bg-[#FBFBF8] dark:bg-[#25251F] border-[#E5E5DB] dark:border-[#33332A] hover:bg-[#F5F5EC] dark:hover:bg-[#2A2A22] text-[#4A4A40] dark:text-[#E0E0D8]'
                    }`}
                  >
                    <div className={`mt-0.5 w-[18px] h-[18px] rounded flex items-center justify-center shrink-0 border-2 transition-all ${
                      isCompleted
                        ? 'bg-[#386641] dark:bg-[#4A6635] border-[#386641] dark:border-[#4A6635]'
                        : 'border-[#A0A08A] dark:border-[#6A6A5E]'
                    }`}>
                      {isCompleted && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-xs font-semibold leading-normal ${isCompleted ? 'line-through opacity-75' : ''}`}>
                      {topic}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {renderContent()}
      </main>
      <div className="fixed bottom-6 left-6 z-40">
        {!showScratchpad && (
          <button
            onClick={() => setShowScratchpad(true)}
            className="flex items-center gap-2 bg-[#5A5A40] hover:bg-[#4A4A30] dark:bg-[#3E3E34] dark:hover:bg-[#4C4C42] border-2 border-[#E5E5DB] dark:border-[#3A3A30] text-white p-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            title="Open Quick Scratchpad"
          >
            <PenTool className="w-5 h-5 text-[#EAE6D8]" />
            <span className="text-xs font-bold font-sans uppercase tracking-wider pr-1 hidden sm:inline">Scratchpad</span>
          </button>
        )}
      </div>

      {/* Quick Scratchpad Card */}
      {showScratchpad && (
        <div className={`fixed bottom-6 left-6 z-40 bg-white dark:bg-[#1E1E18] border-2 border-[#E5E5DB] dark:border-[#3A3A30] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 flex flex-col transition-all duration-300 ${
          scratchpadSize === 'expanded' 
            ? 'w-11/12 sm:w-[700px] h-[650px] max-h-[85vh]' 
            : 'w-92 sm:w-[480px] h-[500px] max-h-[500px]'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#FAF9F5] dark:bg-[#151510] border-b border-[#E5E5DB] dark:border-[#2D2D25] shrink-0 gap-3">
            <div className="flex items-center gap-2 truncate">
              <span className="text-base shrink-0">📝</span>
              <div className="truncate">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#8B8B7A] dark:text-[#A0A096] block font-mono">WORKSPACE companion</span>
                <span className="text-xs font-black text-[#5A5A40] dark:text-[#EAE6D8] truncate block">Study Notes & Syllabus Forge</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              {/* CLEAR/RESET BUTTON - EXTREMELY VISIBLE RED BUTTON */}
              <button
                id="scratchpad-header-clear-btn"
                onClick={() => {
                  if (window.confirm("Do you want to completely clear and reset the Scratchpad Notepad text? All draft lines will be deleted.")) {
                    setScratchpadText('');
                  }
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-[10px] rounded-lg uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-95"
                title="Reset/Delete all text in notepad editor"
              >
                <span>🧹 Reset Editor</span>
              </button>
              
              <button
                id="scratchpad-header-copy-btn"
                onClick={() => {
                  if (scratchpadText) {
                    navigator.clipboard.writeText(scratchpadText);
                    setCopySuccess(true);
                    setTimeout(() => setCopySuccess(false), 2000);
                  }
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700 text-[#4A4A40] dark:text-white font-extrabold text-[10px] rounded-lg uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-95"
                title="Copy all draft"
              >
                {copySuccess ? <span className="text-green-600 dark:text-green-400 font-bold">Copied!</span> : <span>📋 Copy</span>}
              </button>

              {/* EXPAND HEIGHT & WIDTH BUTTON */}
              <button
                id="scratchpad-header-expand-btn"
                onClick={() => setScratchpadSize(p => p === 'normal' ? 'expanded' : 'normal')}
                className="p-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-[#25251E] text-[#8B8B7A] dark:text-[#A0A096] hover:text-[#5A5A40] dark:hover:text-[#E0E0D8] rounded-lg transition-all cursor-pointer"
                title={scratchpadSize === 'normal' ? "Expand scratchpad size" : "Shrink scratchpad size"}
              >
                {scratchpadSize === 'normal' ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4m12 4V4h-4M4 16v4h4m12-4v4h-4" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 4v4H4m12-4v4h4M8 20v-4H4m12 4v-4h4" />
                  </svg>
                )}
              </button>

              <button
                id="scratchpad-header-minimize-btn"
                onClick={() => setShowScratchpad(false)}
                className="p-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-[#25251E] text-[#8B8B7A] dark:text-[#A0A096] hover:text-[#5A5A40] dark:hover:text-[#E0E0D8] rounded-lg transition-all cursor-pointer"
                title="Minimize panel"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Tabs Bar */}
          <div className="flex border-b border-[#E5E5DB] dark:border-[#2D2D25] bg-[#FAF9F5]/40 dark:bg-[#1E1E18] text-xs shrink-0 select-none overflow-x-auto scrollbar-none divide-x divide-[#E5E5DB] dark:divide-[#2D2D25]">
            <button
              onClick={() => setScratchpadTab('write')}
              className={`flex-1 py-2 px-1 text-center font-extrabold transition-all cursor-pointer min-w-[70px] whitespace-nowrap ${
                scratchpadTab === 'write' 
                  ? 'bg-white dark:bg-[#272720] text-[#5A5A40] dark:text-[#EAE6D8] border-b-2 border-[#5A5A40] dark:border-[#A7C890]' 
                  : 'text-[#8B8B7A] hover:bg-[#F5F4EE] dark:hover:bg-white/5'
              }`}
            >
              📝 Notepad
            </button>
            <button
              onClick={() => setScratchpadTab('techniques')}
              className={`flex-1 py-2 px-1 text-center font-extrabold transition-all cursor-pointer min-w-[80px] whitespace-nowrap ${
                scratchpadTab === 'techniques' 
                  ? 'bg-white dark:bg-[#272720] text-purple-600 dark:text-purple-300 border-b-2 border-purple-600 dark:border-purple-400' 
                  : 'text-[#8B8B7A] hover:bg-[#F5F4EE] dark:hover:bg-white/5'
              }`}
            >
              🎨 Techniques
            </button>
            <button
              onClick={() => setScratchpadTab('formulas')}
              className={`flex-1 py-2 px-1 text-center font-extrabold transition-all cursor-pointer min-w-[75px] whitespace-nowrap ${
                scratchpadTab === 'formulas' 
                  ? 'bg-white dark:bg-[#272720] text-teal-600 dark:text-teal-300 border-b-2 border-teal-600 dark:border-teal-400' 
                  : 'text-[#8B8B7A] hover:bg-[#F5F4EE] dark:hover:bg-white/5'
              }`}
            >
              📐 Formulas
            </button>
            <button
              onClick={() => setScratchpadTab('templates')}
              className={`flex-1 py-2 px-1 text-center font-extrabold transition-all cursor-pointer min-w-[75px] whitespace-nowrap ${
                scratchpadTab === 'templates' 
                  ? 'bg-white dark:bg-[#272720] text-[#BC6C25] dark:text-[#EAE6D8] border-b-2 border-[#BC6C25] dark:border-[#D4A373]' 
                  : 'text-[#8B8B7A] hover:bg-[#F5F4EE] dark:hover:bg-white/5'
              }`}
            >
              📁 Outlines
            </button>
            <button
              onClick={() => setScratchpadTab('checklist')}
              className={`flex-1 py-2 px-1 text-center font-extrabold transition-all cursor-pointer min-w-[75px] whitespace-nowrap ${
                scratchpadTab === 'checklist' 
                  ? 'bg-white dark:bg-[#272720] text-[#386641] dark:text-[#EAE6D8] border-b-2 border-[#386641] dark:border-[#A7C890]' 
                  : 'text-[#8B8B7A] hover:bg-[#F5F4EE] dark:hover:bg-white/5'
              }`}
            >
              🎯 Checklist
            </button>
          </div>
          
          {/* Content Area */}
          <div className="p-3.5 overflow-y-auto flex-1">
            {scratchpadTab === 'write' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                {/* Instant Quote inserts for Conor (A Monster Calls exam) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pb-2.5">
                  <div className="bg-[#FAF9F5] dark:bg-[#26261F] p-2.5 rounded-xl border border-[#E5E5DB] dark:border-[#3A3A30]">
                    <p className="text-[10px] font-black uppercase tracking-wider text-[#BC6C25] dark:text-[#D4A373] mb-1.5 flex items-center justify-between">
                      <span>🖤 English Analysis (Tragics)</span>
                      <span className="text-[9px] italic text-[#8B8B7A] font-normal lowercase">insert</span>
                    </p>
                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={() => {
                          const quote = `"Stories are wild creatures. When you let them loose, who knows what havoc they might wreak?" (Metaphor/Personification)`;
                          setScratchpadText(prev => prev ? prev + "\n" + quote : quote);
                        }}
                        className="text-left bg-white hover:bg-[#F2ECE1] dark:bg-[#1E1E18] dark:hover:bg-[#2F2F24] p-2 rounded-lg border border-neutral-100 hover:border-[#D4A373]/30 dark:border-[#2D2D24] text-[10px] font-medium text-[#4A4A40] dark:text-[#D4D0C4] cursor-pointer transition-colors leading-snug"
                      >
                        <strong className="text-amber-600 block">[Theme 1] Tragic Illusion</strong>
                        "Stories are wild creatures..."
                      </button>
                      <button
                        onClick={() => {
                          const quote = `Conor's confession: "I want it to be over!" (High Modality dialogue & climax)`;
                          setScratchpadText(prev => prev ? prev + "\n" + quote : quote);
                        }}
                        className="text-left bg-white hover:bg-[#F2ECE1] dark:bg-[#1E1E18] dark:hover:bg-[#2F2F24] p-2 rounded-lg border border-neutral-100 hover:border-[#D4A373]/30 dark:border-[#2D2D24] text-[10px] font-medium text-[#4A4A40] dark:text-[#D4D0C4] cursor-pointer transition-colors leading-snug"
                      >
                        <strong className="text-pink-600 block">[Theme 2] High Modality</strong>
                        "I want it to be over!"
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#EAF5EC] dark:bg-[#1C2C20] p-2.5 rounded-xl border border-[#C5E3CE] dark:border-[#2E4835]">
                    <p className="text-[10px] font-black uppercase tracking-wider text-[#2D6A4E] dark:text-[#74C69D] mb-1.5 flex items-center justify-between">
                      <span>🌱 Hope, Healing & Wisdom</span>
                      <span className="text-[9px] italic text-[#40916C] font-normal lowercase">insert</span>
                    </p>
                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={() => {
                          const quote = `"The yew tree was not a monster of destruction, but of ancient medicine and wild healing." (Metaphor of Hope)`;
                          setScratchpadText(prev => prev ? prev + "\n" + quote : quote);
                        }}
                        className="text-left bg-white hover:bg-[#D8F3DC] dark:bg-[#151510] dark:hover:bg-[#1F3325] p-2 rounded-lg border border-neutral-100 hover:border-[#2D6A4F]/30 dark:border-[#203623] text-[10px] font-medium text-[#2D6A4F] dark:text-[#D2F5DC] cursor-pointer transition-colors leading-snug"
                      >
                        <strong className="text-emerald-700 dark:text-emerald-400 block">[Theme 3] Growth & Recovery</strong>
                        "The tree is ancient medicine & healing..."
                      </button>
                      <button
                        onClick={() => {
                          const quote = `"You write your life not with words, but with positive actions, empathy and resilient belief." (Empowerment Statement)`;
                          setScratchpadText(prev => prev ? prev + "\n" + quote : quote);
                        }}
                        className="text-left bg-white hover:bg-[#D8F3DC] dark:bg-[#151510] dark:hover:bg-[#1F3325] p-2 rounded-lg border border-neutral-100 hover:border-[#2D6A4F]/30 dark:border-[#203623] text-[10px] font-medium text-[#2D6A4F] dark:text-[#D2F5DC] cursor-pointer transition-colors leading-snug"
                      >
                        <strong className="text-[#386641] dark:text-[#81C784] block">[Theme 4] Empowered Action</strong>
                        "You write your life with positive actions..."
                      </button>
                    </div>
                  </div>
                </div>

                <textarea
                  value={scratchpadText}
                  onChange={(e) => setScratchpadText(e.target.value)}
                  placeholder="Jot down formulas, ideas, quotes, or draft your PETAL paragraphs here for tomorrow's exam!..."
                  rows={6}
                  className="w-full bg-[#FAF9F5] dark:bg-[#1A1A14] border border-[#E5E5DB] dark:border-[#33332A] rounded-xl p-3 text-xs font-mono text-[#4A4A40] dark:text-[#EAE6D8] focus:outline-none focus:border-[#5A5A40] dark:focus:border-[#81C784] resize-none leading-relaxed shadow-inner"
                />

                <div className="flex items-center justify-between px-1 text-[9px] text-[#8B8B7A] dark:text-[#A0A096] font-medium font-mono">
                  <div className="flex items-center gap-2">
                    <span>Saved automatically</span>
                    <button
                      onClick={() => {
                        if (window.confirm("Do you want to completely clear and reset the text?")) {
                          setScratchpadText('');
                        }
                      }}
                      className="text-red-500 hover:text-red-600 font-extrabold uppercase hover:underline cursor-pointer"
                    >
                      Clear Editor text
                    </button>
                  </div>
                  <span className="bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-full">
                    {scratchpadText.trim() === '' ? 0 : scratchpadText.trim().split(/\s+/).length} words / {scratchpadText.length} chars
                  </span>
                </div>
              </div>
            )}

            {scratchpadTab === 'techniques' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="bg-purple-500/5 p-2 rounded-xl border border-purple-500/10 mb-1">
                  <p className="text-[11px] text-purple-700 dark:text-purple-300 font-extrabold uppercase tracking-wide">
                    🏆 English Technique Glossary
                  </p>
                  <p className="text-[10px] text-[#8B8B7A] dark:text-[#A0A096] leading-tight mt-0.5">
                    Click "Insert" to add the analysis scaffolding directly at the bottom of your notepad text!
                  </p>
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {[
                    {
                      name: "Metaphor",
                      desc: "Directly equates two unlike things to discover a key truth under the surface.",
                      sample: "Stories are wild creatures. When you let them loose, who knows what havoc they might wreak?",
                      snippet: `\n[TECHNIQUE - Metaphor]: Patrick Ness directly compares stories to "wild creatures" to signal that uncontrollable subconscious truths cannot be locked away indefinitely.`
                    },
                    {
                      name: "Personification",
                      desc: "Giving human traits/protectiveness to environment objects.",
                      sample: "The yew tree stands in the graveyard, watching over Conor like an ancient giant.",
                      snippet: `\n[TECHNIQUE - Personification]: Personification grants the yew tree conscious intention, representing Conor's desperate need for a powerful protective protector.`
                    },
                    {
                      name: "High Modality Dialogue",
                      desc: "Certainty words or strong, urgent sentences demonstrating absolute core truths.",
                      sample: "I want it to be over! (Conor's pivotal climactic scream)",
                      snippet: `\n[TECHNIQUE - High Modality Dialogue]: Conor's climactic dialogue confession "I want it to be over!" uses raw high modality, breaking his isolation and emotional denial.`
                    },
                    {
                      name: "Symbolism",
                      desc: "Objects carrying symbolic abstract weight.",
                      sample: "The clock stopping exactly at 12:07 AM.",
                      snippet: `\n[TECHNIQUE - Symbolism]: The clocks stopping exactly at '12:07' acts as visual symbolism representing the exact moment Conor's suppression gives way to truth.`
                    },
                    {
                      name: "Sensory Imagery",
                      desc: "Appeals directly to the body to evoke real mood and isolation feelings.",
                      sample: "The cold wind howling around the kitchen window.",
                      snippet: `\n[TECHNIQUE - Imagery]: Sensory imagery of the roaring winter and dark soil builds a viscous, emotional environment representing Conor's private suffering.`
                    }
                  ].map((tech) => (
                    <div key={tech.name} className="bg-[#FAF9F5] dark:bg-[#20201A] p-2.5 rounded-xl border border-[#E5E5DB] dark:border-[#3A3A30] text-[11px] flex flex-col gap-1.5 transition-colors hover:border-purple-300">
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-purple-800 dark:text-purple-300">{tech.name}</span>
                        <button
                          onClick={() => {
                            setScratchpadText(prev => prev ? prev + tech.snippet : tech.snippet.trim());
                            try {
                              const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
                              if (AudioCtxClass && soundsEnabled) {
                                const ctx = new AudioCtxClass();
                                const osc = ctx.createOscillator();
                                const gainNode = ctx.createGain();
                                osc.connect(gainNode);
                                gainNode.connect(ctx.destination);
                                osc.frequency.setValueAtTime(659.25, ctx.currentTime);
                                gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
                                gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
                                osc.start();
                                osc.stop(ctx.currentTime + 0.1);
                              }
                            } catch { }
                          }}
                          className="px-2 py-0.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-[9px] rounded uppercase cursor-pointer"
                        >
                          + Insert
                        </button>
                      </div>
                      <p className="text-[#8B8B7A] dark:text-[#A0A096] text-[10px] leading-relaxed">{tech.desc}</p>
                      <div className="p-1 px-2 bg-white dark:bg-[#151510] border border-neutral-100 dark:border-neutral-800 rounded italic text-[9px] text-[#BC6C25] font-mono whitespace-pre-wrap">
                        {tech.sample}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {scratchpadTab === 'formulas' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="bg-teal-500/5 p-2 rounded-xl border border-teal-500/10 mb-1">
                  <p className="text-[11px] text-teal-700 dark:text-teal-300 font-extrabold uppercase tracking-wide">
                    📐 Year 7 Syllabus Formula Deck
                  </p>
                  <p className="text-[10px] text-[#8B8B7A] dark:text-[#A0A096] leading-tight mt-0.5">
                    Pre-defined formulas for your Maths and Science studies. Add to draft instantly.
                  </p>
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {[
                    {
                      category: "Algebra Rules",
                      items: [
                        { name: "Distributive Law", rule: "a(b + c) = ab + ac", notes: "Multiply term outside by both terms inside", snippet: "\n// Distributive Law: a(b+c) = ab + ac" },
                        { name: "Equation Balance", rule: "LHS = RHS  (Do same of each side)", notes: "Add/Sub/Mult/Div identical sums to isolate variable", snippet: "\n// Balancing: Make identical operations to both LHS & RHS" }
                      ]
                    },
                    {
                      category: "Probability & Chance",
                      items: [
                        { name: "Syllabus Chance formula", rule: "P(E) = Fav Outcomes / Total Outcomes", notes: "Must sum out between 0 and 1 inclusive", snippet: "\n// Probability P(E) = (Favourable Outcomes) / (Total Outcomes)" },
                        { name: "Complement rule", rule: "P(A) + P(Not A) = 1", notes: "Use 1 - P(A) to find chance of non-occurrence", snippet: "\n// Complement formula: P(A) + P(not A) = 1" }
                      ]
                    },
                    {
                      category: "Geometry Angles",
                      items: [
                        { name: "Straight Line", rule: "Angles sum to 180°", notes: "Adjacent angles on straight lines are supplementary", snippet: "\n// Angle Sum Rule: Straight Line = 180°" },
                        { name: "Triangle Interior", rule: "Angles sum to 180°", notes: "Interior sum on any triangle = 180°", snippet: "\n// Interior Sum: Triangle = 180°" },
                        { name: "Full Revolution", rule: "Angles at a point sum to 360°", notes: "Complete revolution surrounding any point", snippet: "\n// Revolution Sum Surrounding a point = 360°" }
                      ]
                    },
                    {
                      category: "Science Process",
                      items: [
                        { name: "Variables Scheme", rule: "IV (Change) | DV (Measure) | CV (Fixed)", notes: "Ensure fair test by fixing all Controlled variables", snippet: "\n// Scientific Variables: IV (Changed), DV (Measured), CV (Constant)" }
                      ]
                    }
                  ].map((cat) => (
                    <div key={cat.category} className="bg-[#FAF9F5] dark:bg-[#20201A] p-2.5 rounded-xl border border-[#E5E5DB] dark:border-[#3A3A30] text-[11px] flex flex-col gap-1.5 hover:border-teal-300">
                      <span className="font-extrabold text-teal-800 dark:text-teal-300 block border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-1 uppercase text-[9px] tracking-wider font-mono">{cat.category}</span>
                      <div className="space-y-1.5">
                        {cat.items.map((it) => (
                          <div key={it.name} className="p-1 px-2 border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-[#151510] rounded-lg flex items-center justify-between gap-2">
                            <div className="truncate text-[10px]">
                              <strong className="text-neutral-700 dark:text-[#EAE6D8] block text-[9px]">{it.name}</strong>
                              <code className="text-teal-600 dark:text-teal-400 font-mono text-[9px]">{it.rule}</code>
                              <span className="block text-[8px] text-[#8B8B7A] dark:text-[#A0A096] truncate">{it.notes}</span>
                            </div>
                            <button
                              onClick={() => {
                                setScratchpadText(prev => prev ? prev + it.snippet : it.snippet.trim());
                                try {
                                  const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
                                  if (AudioCtxClass && soundsEnabled) {
                                    const ctx = new AudioCtxClass();
                                    const osc = ctx.createOscillator();
                                    const gainNode = ctx.createGain();
                                    osc.connect(gainNode);
                                    gainNode.connect(ctx.destination);
                                    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
                                    gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
                                    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
                                    osc.start();
                                    osc.stop(ctx.currentTime + 0.1);
                                  }
                                } catch { }
                              }}
                              className="px-1.5 py-0.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-[8px] rounded uppercase cursor-pointer"
                            >
                              + Add
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {scratchpadTab === 'templates' && (
              <div className="space-y-2.5 animate-in fade-in duration-200">
                <p className="text-[11px] text-[#8B8B7A] dark:text-[#A0A096] leading-relaxed mb-1">
                  Load interactive curriculum templates with one click to kickstart exam writing:
                </p>
                
                {[
                  {
                    name: "📝 PET-AE-TAL Essay Draft",
                    desc: "Conor's complete analysis frame for 'A Monster Calls'. Includes our tomorrow exam quotes!",
                    content: `[POINT] Patrick Ness demonstrates storytelling forces characters to confront unbearable truths about themselves...
[ELABORATE] Conor's denial about his mother's illness isolates him from teachers and peers...
[QUOTE 1 Checkpoint] The Monster states, "Stories are wild creatures. When you let them loose, who knows what havoc they might wreak?" (Metaphor)
[ANALYSE 1] This shows stories reflect unstoppable subconscious truths that break his isolation...
[QUOTE 2 Checkpoint] Conor's climactic confession: "I want it to be over!" (High Modality dialogue)
[ANALYSE 2] This represents Conor admitting his suppressed guilt, allowing him to accept severe grief...
[LINK] Storytelling acts as a psychological mechanism to survive and accept profound grief.`
                  },
                  {
                    name: "📐 Maths Equation Sandbox",
                    desc: "Algebra revision structure with LHS/RHS validation scaffolding.",
                    content: `/* --- YEAR 7 MATHS EXAM RESOLVER --- */
Problem to solve: 
Step 1 (Expand/Group terms):
Step 2 (Isolate expression):
Step 3 (Divide/Simplify both sides):
LHS = 
RHS = 
Final Variable Check: x = `
                  },
                  {
                    name: "🧪 Science Experiment Builder",
                    desc: "Syllabus standard scaffolding to define Variables, Hypotheses and Methods.",
                    content: `Aim: To observe the effect of [IV] on [DV].
Independent Variable (Changed): 
Dependent Variable (Measured): 
Controlled Variables (Unchanged): 
Hypothesis: If [Independent] increases, [Dependent] will... because...`
                  },
                  {
                    name: "💬 Key Literary Quotes Slot",
                    desc: "Pre-seeds your workspace with quote placeholders and analytical headers.",
                    content: `[QUOTE 1]: "Stories are wild creatures. When you let them loose, who knows what havoc they might wreak?"
- Literary Technique: Metaphor & Personification
- Analysis Notes: Storytelling untangles Conor's isolation, addressing raw repressed truth.

[QUOTE 2]: "I want it to be over!"
- Literary Technique: High Modality dialogue / cathartic confrontation
- Analysis Notes: Forces Conor to confess secret shame and integrate into true identity.`
                  }
                ].map((tpl) => (
                  <button
                    key={tpl.name}
                    onClick={() => {
                      if (scratchpadText && !window.confirm("Overwrite current text with this template?")) {
                        return;
                      }
                      setScratchpadText(tpl.content);
                      setScratchpadTab('write');
                      
                      // Trigger chiptune audio
                      try {
                        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
                        if (AudioCtxClass && soundsEnabled) {
                          const ctx = new AudioCtxClass();
                          const osc = ctx.createOscillator();
                          const gainNode = ctx.createGain();
                          osc.connect(gainNode);
                          gainNode.connect(ctx.destination);
                          osc.frequency.setValueAtTime(587.33, ctx.currentTime);
                          gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
                          gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
                          osc.start();
                          osc.stop(ctx.currentTime + 0.15);
                        }
                      } catch {
                        // safe fallback
                      }
                    }}
                    className="w-full text-left bg-[#FAF9F5] hover:bg-[#F2ECE1] dark:bg-[#20201A] dark:hover:bg-[#2C2C22] p-3 rounded-xl border border-[#E5E5DB] dark:border-[#3A3A30] transition-all hover:scale-[1.01] flex flex-col gap-0.5 cursor-pointer text-xs"
                  >
                    <span className="font-extrabold text-[#5A5A40] dark:text-[#EAE6D8]">{tpl.name}</span>
                    <span className="text-[10px] text-[#8B8B7A] dark:text-[#A0A096] leading-relaxed select-text">{tpl.desc}</span>
                  </button>
                ))}
              </div>
            )}

            {scratchpadTab === 'checklist' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="bg-[#386641]/5 p-3 rounded-xl border border-[#386641]/10 text-center">
                  <p className="text-[10px] uppercase font-mono font-black text-[#386641] dark:text-[#A7C890] tracking-widest">
                    PETAL PARAGRAPH COMPLIANCE
                  </p>
                  <p className="text-xs font-bold text-[#5A5A40] dark:text-[#D4D0C4] mt-1">
                    Checked Components: {scratchpadChecklist.filter(Boolean).length} / 5
                  </p>
                  <div className="w-full bg-[#E5E5DB] dark:bg-[#323229] h-2 rounded-full overflow-hidden mt-2">
                    <div 
                      className="bg-[#386641] dark:bg-[#A7C890] h-full transition-all duration-300"
                      style={{ width: `${(scratchpadChecklist.filter(Boolean).length / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  {[
                    "Point (Clear answer statement answering the exact exam question)",
                    "Elaborate (Add context / prepare the upcoming quote)",
                    "Technique + Quote (Stories Metaphor / 'I want details...')",
                    "Analyse (Analyse structural effect and reader feelings)",
                    "Link (Final sentence connecting back to the thesis directly)"
                  ].map((item, idx) => (
                    <label 
                      key={idx} 
                      className="flex items-start gap-2.5 text-[11px] font-medium text-[#4A4A40] dark:text-[#E0E0D8] select-none cursor-pointer hover:bg-neutral-50 dark:hover:bg-white/5 p-1.5 rounded-lg transition-colors"
                    >
                      <input 
                        type="checkbox"
                        checked={scratchpadChecklist[idx]}
                        onChange={(e) => {
                          const updated = [...scratchpadChecklist];
                          updated[idx] = e.target.checked;
                          setScratchpadChecklist(updated);

                          // Trigger chiptune tick
                          if (e.target.checked) {
                            try {
                              const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
                              if (AudioCtxClass && soundsEnabled) {
                                const ctx = new AudioCtxClass();
                                const osc = ctx.createOscillator();
                                const gainNode = ctx.createGain();
                                osc.connect(gainNode);
                                gainNode.connect(ctx.destination);
                                osc.frequency.setValueAtTime(880, ctx.currentTime);
                                gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
                                gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
                                osc.start();
                                osc.stop(ctx.currentTime + 0.1);
                              }
                            } catch {
                              // safe fallback
                            }
                          }
                        }}
                        className="mt-0.5 accent-[#386641] shrink-0 cursor-pointer"
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>

                {scratchpadChecklist.every(Boolean) && (
                  <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-yellow-950/20 dark:to-transparent border border-amber-200 dark:border-yellow-900/30 p-3 rounded-xl text-center text-[10px] text-amber-800 dark:text-amber-400 font-bold animate-pulse">
                    🏆 Essay Readiness Confirmed! Your PET-AE-TAL paragraph structure is robust and complete. Go crush tomorrow's test!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Sparkles & Dopamine Indicators Overlay */}
      {floatingPopups.map((pop) => (
        <div
          key={pop.id}
          className="fixed pointer-events-none select-none z-50 px-4 py-2 font-black tracking-tight text-xs rounded-[18px] shadow-xl border whitespace-nowrap bg-white dark:bg-[#1A1A14]"
          style={{
            left: `${pop.x}%`,
            top: `${pop.y}%`,
            transform: 'translate(-50%, -50%)',
            borderColor: pop.type === 'goal_achieved' ? '#F59E0B' : pop.type === 'fail' ? '#EF4444' : '#10B981',
            color: pop.type === 'goal_achieved' ? '#D97706' : pop.type === 'fail' ? '#B91C1C' : '#047857',
            animation: 'dopamineFloatUp 1.8s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards'
          }}
        >
          {pop.type === 'goal_achieved' ? '👑 ' : pop.type === 'fail' ? '⚠️ ' : '⭐ '}
          {pop.text}
        </div>
      ))}

      <style>{`
        @keyframes dopamineFloatUp {
          0% {
            opacity: 0;
            transform: translate(-50%, 0) scale(0.85);
          }
          15% {
            opacity: 1;
            transform: translate(-50%, -25px) scale(1.15);
          }
          45% {
            opacity: 1;
            transform: translate(-50%, -60px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -150px) scale(0.9);
          }
        }
      `}</style>
      
    </div>
  );
}
