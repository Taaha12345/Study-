import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Minimize2, Maximize2, Sparkles, Coffee, Flame, Bell, BellOff, X, CheckCircle } from 'lucide-react';

interface PomodoroTimerProps {
  onSessionComplete?: (durationMinutes: number) => void;
}

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export function PomodoroTimer({ onSessionComplete }: PomodoroTimerProps) {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [focusGoal, setFocusGoal] = useState('');
  const [showGoalInput, setShowGoalInput] = useState(true);
  const [completedSessions, setCompletedSessions] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const modeDurations: Record<TimerMode, number> = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  // Web Audio Synth for a pleasant chime
  const playChimeSound = () => {
    if (isMuted) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;

      const playTone = (freq: number, startTime: number, duration: number, type: 'sine' | 'triangle' = 'sine') => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, startTime);
        
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      // Play a beautiful, soothing major arpeggio chime
      playTone(523.25, now, 1.2, 'sine'); // C5
      playTone(659.25, now + 0.15, 1.2, 'sine'); // E5
      playTone(783.99, now + 0.3, 1.5, 'sine'); // G5
      playTone(1046.50, now + 0.45, 1.8, 'sine'); // C6
      
    } catch (err) {
      console.warn("Audio context block or failed to play:", err);
    }
  };

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsActive(false);
            playChimeSound();
            
            // Handle session wrap
            if (mode === 'focus') {
              setCompletedSessions(prevCount => prevCount + 1);
              if (onSessionComplete) {
                onSessionComplete(Math.round(modeDurations.focus / 60));
              }
            }
            
            // Auto-switch mode
            if (mode === 'focus') {
              setMode('shortBreak');
              return modeDurations.shortBreak;
            } else {
              setMode('focus');
              return modeDurations.focus;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, mode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = (newMode?: TimerMode) => {
    const targetMode = newMode || mode;
    setIsActive(false);
    setMode(targetMode);
    setTimeLeft(modeDurations[targetMode]);
  };

  const handleModeChange = (newMode: TimerMode) => {
    resetTimer(newMode);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalDuration = modeDurations[mode];
  const percentageCompleted = ((totalDuration - timeLeft) / totalDuration) * 100;
  
  // Circumference for SVG progress circle
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentageCompleted / 100) * circumference;

  return (
    <>
      {/* Floating Minimized Pill version */}
      {isMinimized && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-3 bgGradient-to-br bg-white dark:bg-[#1E1E18] text-[#4A4A40] dark:text-[#E0E0D8] p-3 rounded-full border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-xl hover:shadow-2xl transition-all cursor-pointer group"
          >
            {/* Tiny progress ring */}
            <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="16"
                  cy="16"
                  r="13"
                  className="stroke-[#F2F0EA] dark:stroke-[#2E2E25]"
                  strokeWidth="2.5"
                  fill="transparent"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="13"
                  className={`transition-all duration-300 ${
                    mode === 'focus' 
                      ? 'stroke-[#386641] dark:stroke-[#81C784]' 
                      : 'stroke-[#D4A373] dark:stroke-[#BC6C25]'
                  }`}
                  strokeWidth="3.5"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 13}
                  strokeDashoffset={2 * Math.PI * 13 - (percentageCompleted / 100) * (2 * Math.PI * 13)}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-[9px] font-mono font-bold">
                {Math.floor(timeLeft / 60)}
              </span>
            </div>

            <div className="flex flex-col text-left pr-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B8B7A] dark:text-[#A0A096]">
                {mode === 'focus' ? 'Focus Session' : 'Break'}
              </span>
              <span className="text-xs font-bold font-mono">
                {formatTime(timeLeft)}
              </span>
            </div>

            <div className="w-8 h-8 rounded-full bg-[#F2F0EA] dark:bg-[#2A2A22] flex items-center justify-center text-[#5A5A40] dark:text-[#EAE6D8] group-hover:scale-110 transition-transform">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      )}

      {/* Main Container */}
      {!isMinimized && (
        <div className="bg-white dark:bg-[#2A2A22] border-2 border-[#E5E5DB] dark:border-[#3A3A30] rounded-3xl p-6 shadow-sm mb-8 animate-in fade-in duration-300 relative overflow-hidden">
          {/* Subtle glowing focus decoration */}
          {isActive && mode === 'focus' && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E8E65] to-[#386641] dark:from-[#3E5D42] dark:to-[#5E8E65] animate-pulse" />
          )}

          {/* Quick Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xl">⏳</span>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#4A4A40] dark:text-[#EAE6D8] flex items-center gap-1.5">
                  Focus Timer
                  {completedSessions > 0 && (
                    <span className="bg-[#386641]/10 text-[#386641] dark:bg-[#81C784]/15 dark:text-[#81C784] text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1">
                      <Flame className="w-3 h-3 fill-current" /> {completedSessions}
                    </span>
                  )}
                </h3>
                <p className="text-[11px] text-[#8B8B7A] dark:text-[#A0A096]">Boost focus with interval study</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded-xl border transition-all ${
                  isMuted 
                    ? 'border-[#E5E5DB] dark:border-[#3A3A30] text-[#A0A096] bg-[#F9F9F6] dark:bg-[#22221A]' 
                    : 'border-[#DAE3C5] dark:border-[#4A402A] text-[#386641] dark:text-[#81C784] bg-[#F2F8F2] dark:bg-[#1E2E21]'
                }`}
                title={isMuted ? "Unmute alarm" : "Mute alarm"}
              >
                {isMuted ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMinimized(true)}
                className="p-2 rounded-xl border border-[#E5E5DB] dark:border-[#3A3A30] text-[#8B8B7A] hover:text-[#4A4A40] dark:hover:text-[#E0E0D8] hover:bg-[#F5F5EC] dark:hover:bg-[#2A2A22] transition-colors"
                title="Minimize layout"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mode Selector Row */}
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#F7F5F0] dark:bg-[#1E1E18] rounded-2xl mb-6">
            {(['focus', 'shortBreak', 'longBreak'] as TimerMode[]).map((m) => {
              const label = m === 'focus' ? 'Study (25m)' : m === 'shortBreak' ? 'Short Break' : 'Long Break';
              const isSelected = mode === m;
              return (
                <button
                  key={m}
                  onClick={() => handleModeChange(m)}
                  className={`py-2 text-[11px] sm:text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-[#2A2A22] text-[#4A4A40] dark:text-[#EAE6D8] shadow-sm'
                      : 'text-[#8B8B7A] dark:text-[#A0A096] hover:text-[#4A4A40] dark:hover:text-[#E0E0D8]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 justify-around">
            {/* Visual Circular Timer */}
            <div className="relative w-44 h-44 flex items-center justify-center select-none shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="88"
                  cy="88"
                  r={radius}
                  className="stroke-[#F2F0EA] dark:stroke-[#1E1E18]"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="88"
                  cy="88"
                  r={radius}
                  className={`transition-all duration-300 ${
                    mode === 'focus' 
                      ? 'stroke-[#386641] dark:stroke-[#81C784]' 
                      : 'stroke-[#D4A373] dark:stroke-[#BC6C25]'
                  }`}
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              
              {/* Central Time Indicators */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[11px] uppercase tracking-widest font-bold text-[#8B8B7A] dark:text-[#A0A096]">
                  {mode === 'focus' ? 'Focus' : 'Break'}
                </span>
                <span id="pomodoro-time-display" className="text-3xl font-bold font-mono tracking-tight text-[#4A4A40] dark:text-[#EAE6D8] my-1">
                  {formatTime(timeLeft)}
                </span>
                {isActive ? (
                  <span className="text-[10px] text-[#386641] dark:text-[#81C784] font-medium flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 animate-spin duration-3000" /> ticking
                  </span>
                ) : (
                  <span className="text-[10px] text-[#8B8B7A] dark:text-[#A0A096]">paused</span>
                )}
              </div>
            </div>

            {/* Task Context Focus & Quick Controls Block */}
            <div className="flex-1 w-full space-y-4">
              {/* Study Mode Motivation Input */}
              <div className="bg-[#FBFBF8] dark:bg-[#1E1E18] p-4 rounded-2xl border border-[#E5E5DB] dark:border-[#33332A]">
                {showGoalInput ? (
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#8B8B7A] dark:text-[#A0A096]">
                      What are you mastering in this session?
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Algebra equations, Science variables..."
                        value={focusGoal}
                        onChange={(e) => setFocusGoal(e.target.value)}
                        className="flex-1 bg-white dark:bg-[#2A2A22] border border-[#E5E5DB] dark:border-[#3A3A30] rounded-xl px-3 py-1.5 text-xs text-[#4A4A40] dark:text-[#E0E0D8] focus:outline-none focus:border-[#386641] dark:focus:border-[#81C784]"
                      />
                      <button
                        onClick={() => focusGoal && setShowGoalInput(false)}
                        className="px-3 py-1.5 bg-[#5A5A40] text-white font-bold rounded-xl text-xs hover:bg-[#4A4A30] transition-colors"
                      >
                        Set
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#386641] dark:text-[#81C784] shrink-0" />
                      <div>
                        <p className="text-[10px] text-[#8B8B7A] dark:text-[#A0A096] font-bold uppercase tracking-widest leading-none">Session Goal</p>
                        <p className="text-xs font-semibold text-[#4A4A40] dark:text-[#E0E0D8] mt-0.5">{focusGoal}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowGoalInput(true)}
                      className="text-[10px] font-bold text-[#8B8B7A] hover:text-[#4A4A40] dark:hover:text-[#EAE6D8] underline"
                    >
                      Change
                    </button>
                  </div>
                )}
              </div>

              {/* Controls Grid */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleTimer}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-sm ${
                    isActive
                      ? 'bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200'
                      : 'bg-[#386641] hover:bg-[#2F5435] text-white dark:bg-[#4A6635] dark:hover:bg-[#3D542B]'
                  }`}
                >
                  {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isActive ? 'Pause Session' : 'Start Focus'}</span>
                </button>

                <button
                  onClick={() => resetTimer()}
                  className="p-3 bg-[#F7F5F0] hover:bg-[#EAE8E2] dark:bg-[#1E1E18] dark:hover:bg-[#25251F] border border-[#E5E5DB] dark:border-[#33332A] text-[#8B8B7A] hover:text-[#4A4A40] dark:hover:text-[#E0E0D8] rounded-2xl transition-all hover:scale-105"
                  title="Reset timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Study Mode Chime Indicator notice */}
              <p className="text-[11px] text-[#8B8B7A] dark:text-[#A0A096] text-center md:text-left leading-normal">
                💡 <span className="font-semibold text-[#6A6A5E] dark:text-[#BCBCAE]">Tip:</span> Toggle to ब्रेक mode during rest. Minimize the timer to read lessons and formulas comfortably.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
