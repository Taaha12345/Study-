import React, { useState, useEffect } from 'react';
import { Award, Sparkles, ShoppingBag, Volume2, VolumeX, CheckCircle, Trash2, AlertTriangle } from 'lucide-react';
import { playChiptuneSound, celebrateDopamine, DOPAMINE_SHOP_ITEMS, ShopItem, getRankByXp, getNextRankProgress } from '../utils/dopamineHelper';

// Static collection of school revision puns for lighthearted study relief
const STUDY_PUNS = [
  { q: "Why did the student wear glasses to math class?", a: "To improve di-vision! 🤓" },
  { q: "And why was the fraction skeleton sad?", a: "Because it didn't have a common denominator! 💀" },
  { q: "What did the triangle say to the circle?", a: "You're completely pointless! 📐" },
  { q: "Why was the parallel lines angle relationship so sad?", a: "They had so much in common but they will never meet! 💔" },
  { q: "What's a prime number's favorite spot for a barbecue?", a: "The composite-site! 🍔" },
  { q: "What did English students say to the hyperbole?", a: "I have told you a million times not to exaggerate! 📣" },
  { q: "Why did the scientific independent variable feel powerful?", a: "Because it didn't rely on anybody else! 🧪" },
  { q: "How did the archaeologists celebrate Nile soil discoveries?", a: "They dig the pharaoh vibes! 🏺" }
];

export interface DopamineBoostersProps {
  key?: any;
  xp: number;
  setXp: React.Dispatch<React.SetStateAction<number>>;
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  soundsEnabled: boolean;
  setSoundsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  activeAvatar: string;
  setActiveAvatar: React.Dispatch<React.SetStateAction<string>>;
  unlockedItems: string[];
  setUnlockedItems: React.Dispatch<React.SetStateAction<string[]>>;
  claimedAchievements: string[];
  setClaimedAchievements: React.Dispatch<React.SetStateAction<string[]>>;
  activeTheme: string;
  setActiveTheme: React.Dispatch<React.SetStateAction<string>>;
  streak: number;
  setStreak: React.Dispatch<React.SetStateAction<number>>;
  onReset: () => void;
}

export function DopamineBoosters({
  xp,
  setXp,
  coins,
  setCoins,
  soundsEnabled,
  setSoundsEnabled,
  activeAvatar,
  setActiveAvatar,
  unlockedItems,
  setUnlockedItems,
  claimedAchievements,
  setClaimedAchievements,
  activeTheme,
  setActiveTheme,
  streak,
  setStreak,
  onReset
}: DopamineBoostersProps) {
  const [selectedPunIdx, setSelectedPunIdx] = useState<number>(0);
  const [showPunAnswer, setShowPunAnswer] = useState<boolean>(false);
  const [showConfirmReset, setShowConfirmReset] = useState<boolean>(false);

  // Read completed topics count securely
  const completedTopicsCount = (() => {
    try {
      return JSON.parse(localStorage.getItem('mastery_completed_topics') || '[]').length;
    } catch {
      return 0;
    }
  })();

  // Custom interactive achievement targets for Stage 4 students
  const achievements = [
    {
      id: 'first_step',
      title: 'First Step to Glory',
      desc: 'Master at least 1 subtopic section in the subject tracker',
      target: 1,
      current: completedTopicsCount,
      xpReward: 100,
      coinReward: 50,
      icon: '🚀'
    },
    {
      id: 'subtopics_champion',
      title: 'Subtopics Commander',
      desc: 'Master 5 or more subtopic sections across any subject',
      target: 5,
      current: completedTopicsCount,
      xpReward: 300,
      coinReward: 200,
      icon: '🛡️'
    },
    {
      id: 'master_study',
      title: 'Polymath Prodigy',
      desc: 'Master 10 subtopic sections for ultimate Year 7 syllabus proficiency',
      target: 10,
      current: completedTopicsCount,
      xpReward: 600,
      coinReward: 400,
      icon: '🔱'
    },
    {
      id: 'study_fidget',
      title: 'Attention Catalyst',
      desc: 'Unlock at least 2 rewards from the gold coin shop',
      target: 2,
      current: unlockedItems.length,
      xpReward: 200,
      coinReward: 150,
      icon: '✨'
    },
    {
      id: 'xp_marathon',
      title: 'Warp Speed Thinker',
      desc: 'Gather 500 total Experience Points (XP)',
      target: 500,
      current: xp,
      xpReward: 250,
      coinReward: 200,
      icon: '⚡'
    }
  ];

  const currentRank = getRankByXp(xp);
  const nextRankProgress = getNextRankProgress(xp);

  const toggleSound = () => {
    const nextVal = !soundsEnabled;
    setSoundsEnabled(nextVal);
    localStorage.setItem('mastery_sounds_enabled', nextVal.toString());
    
    // Play sound using context if it was enabled
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass && nextVal) {
        const ctx = new AudioCtxClass();
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch {
      // safe fallback
    }
  };

  const handleClaimAchievement = (achId: string, xpRew: number, coinRew: number) => {
    if (claimedAchievements.includes(achId)) return;
    
    setXp(prev => {
      const next = prev + xpRew;
      localStorage.setItem('study_xp', next.toString());
      return next;
    });
    setCoins(prev => {
      const next = prev + coinRew;
      localStorage.setItem('study_gold', next.toString());
      return next;
    });
    setClaimedAchievements(prev => {
      const next = [...prev, achId];
      localStorage.setItem('study_claimed_achievements', JSON.stringify(next));
      return next;
    });
    
    playChiptuneSound('level_up');
    celebrateDopamine({
      type: 'level_up',
      xpReward: xpRew,
      coinReward: coinRew,
      message: `Claimed Achievement Milestone! 🎉`
    });
  };

  const buyShopItem = (item: ShopItem) => {
    if (coins < item.cost) {
      playChiptuneSound('fail');
      return;
    }
    
    setCoins(prev => {
      const next = prev - item.cost;
      localStorage.setItem('study_gold', next.toString());
      return next;
    });
    
    setUnlockedItems(prev => {
      const next = [...prev, item.id];
      localStorage.setItem('study_unlocked_items', JSON.stringify(next));
      return next;
    });
    
    if (item.type === 'avatar') {
      setActiveAvatar(item.icon);
      localStorage.setItem('study_active_avatar', item.icon);
    } else if (item.type === 'theme' && item.payload) {
      setActiveTheme(item.payload);
      localStorage.setItem('study_active_theme', item.payload);
    }
    
    playChiptuneSound('purchase');
    celebrateDopamine({
      type: 'purchase',
      xpReward: 20,
      coinReward: 0,
      message: `Unlocked: ${item.name}! `
    });
    
    setXp(prev => {
      const next = prev + 20;
      localStorage.setItem('study_xp', next.toString());
      return next;
    });
  };

  const equipAvatar = (iconString: string) => {
    setActiveAvatar(iconString);
    localStorage.setItem('study_active_avatar', iconString);
    playChiptuneSound('click');
  };

  const equipTheme = (themePayload: string) => {
    setActiveTheme(themePayload);
    localStorage.setItem('study_active_theme', themePayload);
    playChiptuneSound('click');
  };

  // Sound soundboard notes play frequency array for custom stress relief synthesizer!
  const noteFrequencies: { name: string; freq: number; c: string }[] = [
    { name: 'Do 🔴', freq: 261.63, c: 'bg-red-500 hover:bg-red-600' },
    { name: 'Re 🟠', freq: 293.66, c: 'bg-orange-500 hover:bg-orange-600' },
    { name: 'Mi 🟡', freq: 329.63, c: 'bg-yellow-500 hover:bg-yellow-600' },
    { name: 'Fa 🟢', freq: 349.23, c: 'bg-green-500 hover:bg-green-600' },
    { name: 'So 🔵', freq: 392.00, c: 'bg-blue-500 hover:bg-blue-600' },
    { name: 'La 🟣', freq: 440.00, c: 'bg-indigo-500 hover:bg-indigo-600' },
    { name: 'Ti 🌸', freq: 493.88, c: 'bg-pink-500 hover:bg-pink-600' },
    { name: 'Do+ 🌟', freq: 523.25, c: 'bg-emerald-500 hover:bg-emerald-600' }
  ];

  const triggerSynthNote = (freq: number) => {
    try {
      if (!soundsEnabled) return;
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // safe fallback
    }
  };

  const rollNewPun = () => {
    playChiptuneSound('click');
    setShowPunAnswer(false);
    const options = STUDY_PUNS.filter((_, i) => i !== selectedPunIdx);
    const rand = options[Math.floor(Math.random() * options.length)];
    const actIdx = STUDY_PUNS.indexOf(rand);
    setSelectedPunIdx(actIdx >= 0 ? actIdx : 0);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 py-4 pb-16" id="dopamine-booster-container">
      
      {/* Sound Check & Dynamic XP Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="dopamine-header-grid">
        
        {/* Scholar Rank Stat Overview */}
        <div className="lg:col-span-2 bg-[#FAF9F5] dark:bg-[#1E1E18] p-6 rounded-[28px] border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm flex flex-col justify-between relative overflow-hidden" id="scholar-rank-card">
          <div className="absolute right-4 top-4 text-6xl opacity-10 select-none pointer-events-none filter grayscale">📖</div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3.5xl p-2.5 bg-[#F2ECE1] dark:bg-[#2A2A22] rounded-2xl select-none">{activeAvatar}</span>
              <div>
                <span className="text-[10px] font-black tracking-widest text-[#8B8B7A] dark:text-[#A0A096] uppercase bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded-full">{currentRank.badge} Level {Math.floor(xp / 100) + 1} Scholar</span>
                <h4 className="font-extrabold text-lg text-[#5A5A40] dark:text-[#EAE6D8] mt-1">{currentRank.title}</h4>
              </div>
            </div>

            {/* Progress indicator to next Scholar tier */}
            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#8B8B7A] dark:text-[#A0A096]">XP Level Progress</span>
                <span className="font-mono font-bold text-[#4A4A40] dark:text-[#E0E0D8]">{xp} / {nextRankProgress.xpRequired} XP</span>
              </div>
              <div className="w-full bg-[#E5E5DB] dark:bg-[#323229] h-3.5 rounded-full overflow-hidden border border-[#D5D5CB] dark:border-transparent">
                <div 
                  className="bg-gradient-to-r from-[#D4A373] to-[#BC6C25] dark:from-[#3E5D42] dark:to-[#81C784] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min(100, nextRankProgress.progress)}%` }}
                />
              </div>
              <p className="text-[10px] text-[#8B8B7A] dark:text-[#A0A096] italic text-right">
                Next Rank: <strong className="font-semibold">{nextRankProgress.nextTitle}</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between col-span-2 pt-6 border-t border-[#E5E5DB]/60 dark:border-[#3A3A30]/50 mt-6 gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">💰</span>
              <span className="text-sm font-bold text-[#5A5A40] dark:text-[#EAE6D8]">Study Balance:</span>
              <span className="text-lg font-mono font-black text-[#D4A373] dark:text-[#D4A373]">{coins} Gold</span>
            </div>
            
            <button 
              id="toggle-booster-sounds"
              onClick={toggleSound}
              className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
                soundsEnabled 
                  ? 'bg-[#386641]/10 text-[#386641] dark:bg-[#81C784]/20 dark:text-[#81C784] hover:bg-[#386641]/20' 
                  : 'bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 hover:bg-orange-500/20'
              }`}
            >
              {soundsEnabled ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              <span>{soundsEnabled ? "Audio Active (Web Synth)" : "Audio Muted"}</span>
            </button>
          </div>
        </div>

        {/* Fidget sound generator mini board */}
        <div className="bg-white dark:bg-[#20201A] p-6 rounded-[28px] border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm flex flex-col justify-between" id="fidget-synth-container">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-[#4A4A40] dark:text-[#EAE6D8] flex items-center gap-2">
              <span className="text-lg">🎹</span> Attention Booster Soundboard
            </h3>
            <p className="text-[11px] text-[#8B8B7A] dark:text-[#A0A096] leading-relaxed mt-1">
              Fidget buffer tool! Tap note tiles below to compose tiny chiptunes during intervals for healthy brain stimulation.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-4" id="note-board-grid">
            {noteFrequencies.map((n) => (
              <button
                key={n.name}
                id={`synth-note-${n.name.replace(/\s+/g, '')}`}
                onClick={() => triggerSynthNote(n.freq)}
                className={`py-3 rounded-xl text-center text-[10px] font-bold text-white transition-all transform active:scale-95 cursor-pointer shadow-sm hover:brightness-105 active:brightness-90 ${n.c}`}
              >
                {n.name}
              </button>
            ))}
          </div>
          
          <span className="text-[9px] text-[#8B8B7A] dark:text-[#A0A096] text-center italic mt-3 select-none flex items-center justify-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-[#D4A373]" /> Audio generated synthetically using your web processor!
          </span>
        </div>

      </div>

      {/* Rewards Store Section */}
      <div className="bg-white dark:bg-[#2A2A22] p-6 sm:p-8 rounded-[28px] border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm" id="gold-items-store">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-6 mb-6">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-[#5A5A40] dark:text-[#EAE6D8] flex items-center gap-2.5">
              <ShoppingBag className="text-[#386641] dark:text-[#81C784] w-5 h-5" /> Gold Coin Study Store
            </h3>
            <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096]">
              Redeem study gold earned by checking off subtopics and answering practices for custom avatars and workspace visual themes.
            </p>
          </div>
          <div className="bg-[#FAF9F5] dark:bg-[#1A1A14] px-4 py-2 rounded-2xl border border-[#E5E5DB] dark:border-[#2D2D24] flex items-center gap-2 self-start sm:self-auto font-mono text-xs font-bold text-[#4A4A40] dark:text-[#EAE6D8]">
            <span>Your Wallet:</span>
            <span className="text-amber-500 font-extrabold text-base" id="booster-wallet-balance">💰 {coins}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" id="store-items-grid">
          {DOPAMINE_SHOP_ITEMS.map((item) => {
            const isUnlocked = unlockedItems.includes(item.id);
            const canAfford = coins >= item.cost;
            const isEquippedAvatar = activeAvatar === item.icon && item.type === 'avatar';
            const isEquippedTheme = activeTheme === item.payload && item.type === 'theme';
            
            return (
              <div 
                key={item.id} 
                className={`flex flex-col justify-between p-4.5 rounded-[22px] border-2 transition-all ${
                  isEquippedAvatar || isEquippedTheme
                    ? 'bg-[#F2E8CF]/30 dark:bg-[#1F251E] border-[#386641] dark:border-[#4A6635]'
                    : isUnlocked
                      ? 'bg-[#FAF9F5] dark:bg-[#20201A] border-[#E5E5DB] dark:border-[#323229]'
                      : 'bg-white dark:bg-[#25251E] border-[#E5E5DB] dark:border-[#33332A] shadow-sm hover:border-[#D4A373]/50'
                }`}
                id={`shop-item-${item.id}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-3xl p-2 bg-[#FBFBF8] dark:bg-[#1E1E18] rounded-xl shadow-inner border border-neutral-100 dark:border-neutral-800 shrink-0 select-none">{item.icon}</span>
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      item.type === 'avatar' 
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' 
                        : item.type === 'theme' 
                          ? 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400' 
                          : 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
                    }`}>
                      {item.type}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm text-[#4A4A40] dark:text-[#E0E0D8]">{item.name}</h4>
                  <p className="text-[11px] text-[#8B8B7A] dark:text-[#A0A096] mt-1.5 leading-relaxed">{item.desc}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-dashed border-[#E5E5DB] dark:border-[#3A3A30]">
                  {isEquippedAvatar || isEquippedTheme ? (
                    <div className="w-full text-center py-1.5 text-xs font-bold text-[#386641] dark:text-[#81C784] flex items-center justify-center gap-1 bg-[#386641]/10 dark:bg-[#81C784]/20 rounded-xl">
                      <CheckCircle className="w-3.5 h-3.5" /> Equipped
                    </div>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => item.type === 'avatar' ? equipAvatar(item.icon) : item.payload && equipTheme(item.payload)}
                      className="w-full bg-[#FAF9F5] hover:bg-[#F0EEE6] dark:bg-[#323229] dark:hover:bg-[#3D3D32] border border-[#D5D5CB] dark:border-[#4A4A40] text-[#5A5A40] dark:text-[#E0E0E8] py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer hover:scale-[1.01]"
                    >
                      Equip Item
                    </button>
                  ) : (
                    <button
                      disabled={!canAfford}
                      onClick={() => buyShopItem(item)}
                      className={`w-full py-1.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        canAfford
                          ? 'bg-[#5A5A40] text-white hover:bg-[#4A4A30] dark:bg-[#E0E0D8] dark:text-[#20201A] hover:scale-[1.02]'
                          : 'bg-[#F2F0EA] dark:bg-[#33332C] text-[#A0A08E] border border-neutral-100 dark:border-transparent cursor-not-allowed'
                      }`}
                    >
                      💰 {item.cost} Gold
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements Milestones & Reset Console Component */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6" id="achievements-and-puns-section">
        
        {/* Achievements list */}
        <div className="lg:col-span-3 bg-white dark:bg-[#20201A] p-6 rounded-[28px] border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm space-y-4" id="achievements-console">
          <div className="border-b border-[#E5E5DB]/70 dark:border-[#3A3A30]/80 pb-4 mb-4">
            <h3 className="font-extrabold text-[#4A4A40] dark:text-[#EAE6D8] text-base flex items-center gap-2">
              <Award className="text-[#D4A373] w-5 h-5" /> Syllabus Revision Achievements
            </h3>
            <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096] mt-0.5">Claim large XP bundles and coin drops when you fulfill syllabus goals.</p>
          </div>

          <div className="space-y-3.5">
            {achievements.map((ach) => {
              const isClaimed = claimedAchievements.includes(ach.id);
              const isFulfilled = ach.current >= ach.target;
              
              return (
                <div 
                  key={ach.id} 
                  className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                    isClaimed 
                      ? 'bg-[#FAF9F5] dark:bg-[#1A1A14] border-neutral-200/50 dark:border-neutral-900 opacity-60' 
                      : isFulfilled 
                        ? 'bg-[#F2E8CF]/40 dark:bg-[#293221] border-[#386641]/40 border-l-4 border-l-[#386641] dark:border-l-[#81C784]'
                        : 'bg-[#FBFBF8] dark:bg-[#25251E] border-[#EBF5E9]/10'
                  }`}
                  id={`achievement-row-${ach.id}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 bg-[#FAF9F5] dark:bg-[#1A1A14] rounded-xl select-none">{ach.icon}</span>
                    <div className="space-y-0.5">
                      <h4 className="font-extrabold text-xs text-[#4A4A40] dark:text-[#EAE6D8]">{ach.title}</h4>
                      <p className="text-[10px] text-[#8B8B7A] dark:text-[#A0A096] leading-relaxed max-w-sm">{ach.desc}</p>
                      
                      {/* Linear fractional tracker */}
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#8B8B7A] dark:text-[#A0A096] pt-1">
                        <span className="font-mono bg-[#EFA]/10 px-1 rounded text-neutral-500 whitespace-nowrap">{Math.min(ach.target, ach.current)} / {ach.target}</span>
                        <div className="w-20 bg-neutral-100 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-green-600 h-full transition-all duration-350"
                            style={{ width: `${Math.min(100, (ach.current / ach.target) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    {isClaimed ? (
                      <span className="text-[9px] font-black uppercase text-[#8B8B7A] dark:text-[#A0A096] bg-neutral-200/50 dark:bg-neutral-800 py-1 px-2.5 rounded-full">Collected</span>
                    ) : isFulfilled ? (
                      <button
                        onClick={() => handleClaimAchievement(ach.id, ach.xpReward, ach.coinReward)}
                        className="bg-[#386641] hover:bg-[#2D5233] text-white py-1 px-3.5 rounded-xl text-[10px] font-bold hover:scale-105 active:scale-95 transition-all text-center shrink-0 cursor-pointer shadow-md"
                      >
                        Claim 🎁
                      </button>
                    ) : (
                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-mono tracking-normal font-black text-[#D4A373] bg-[#E5E5DB]/30 dark:bg-[#3A3A30]/50 py-1 px-2.5 rounded-full">
                          +{ach.xpReward} XP
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Study puns and jokes generator for micro-breaks */}
        <div className="lg:col-span-2 bg-[#FAF9F5] dark:bg-[#1E1E18] p-6 rounded-[28px] border-2 border-[#E5E5DB] dark:border-[#3A3A30] shadow-sm flex flex-col justify-between" id="jokes-break-card">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E5DB]/70 dark:border-[#3A3A30]/80">
              <h3 className="font-extrabold text-[#4A4A40] dark:text-[#EAE6D8] text-base flex items-center gap-1.5">
                🃏 Unlocked Study Puns & Breaking Cards
              </h3>
              <span className="text-[9px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full">Silly Fun</span>
            </div>
            
            <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096] mt-4 leading-normal">
              Keep things playful! Breaks help secure vocabulary memory. Let's see some math or science jokes:
            </p>

            <div className="bg-white dark:bg-[#25251E] p-4.5 rounded-2xl border border-[#E5E5DB] dark:border-[#4A4A40] mt-4 text-center space-y-3.5 shadow-inner" id="pun-card-board">
              <p className="text-xs font-black text-[#8B8B7A] dark:text-[#A0A096] tracking-wider uppercase">Pun Card #{selectedPunIdx+1}</p>
              <p className="text-sm font-bold text-[#4A4A40] dark:text-[#EAE6D8]">{STUDY_PUNS[selectedPunIdx].q}</p>
              
              {showPunAnswer ? (
                <p className="text-xs font-black text-[#386641] dark:text-[#81C784] animate-in zoom-in duration-200">
                  {STUDY_PUNS[selectedPunIdx].a}
                </p>
              ) : (
                <button
                  id="reveal-joke-answer-btn"
                  onClick={() => { playChiptuneSound('click'); setShowPunAnswer(true); }}
                  className="bg-[#E5E5DB]/50 hover:bg-[#D5D5CB]/60 dark:bg-[#3A3A30] dark:hover:bg-[#45453B] text-[#5A5A40] dark:text-[#EAE6D8] font-bold border border-transparent hover:border-[#D5D5CB]/20 px-4 py-1.5 rounded-xl text-[10px] uppercase cursor-pointer"
                >
                  Reveal Joke Answer
                </button>
              )}
            </div>
          </div>

          <button
            id="roll-new-joke-btn"
            onClick={rollNewPun}
            className="w-full bg-[#5A5A40] text-white dark:bg-[#EAE6D8] dark:text-[#20201A] py-2 text-xs font-bold rounded-xl mt-6 transition-all shadow-sm hover:opacity-90 hover:scale-[1.01] cursor-pointer"
          >
            Next Joke / Card
          </button>
        </div>

      </div>

      {/* Safety System Reset Panel */}
      <div className="bg-[#FAF9F5] dark:bg-[#1E1E18] p-6 rounded-[28px] border-2 border-red-200/60 dark:border-red-950/40 shadow-sm" id="safety-reset-panel">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-extrabold text-[#B91C1C] dark:text-[#EF4444] text-sm sm:text-base flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" /> System Reset Options / Bug Fixer
            </h4>
            <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096] max-w-2xl">
              Are you experiencing score inconsistencies, outdated avatar settings, or other rewards system bugs? Reset your progression levels, streak stats, unlocked inventory, and gold coin balance back to standard factory defaults instantly.
            </p>
          </div>

          <div className="shrink-0">
            {showConfirmReset ? (
              <div className="flex flex-wrap items-center gap-2 animate-in slide-in-from-right duration-200">
                <p className="text-xs font-bold text-red-600 dark:text-red-400">Are you absolutely sure?</p>
                <div className="flex gap-2">
                  <button
                    id="confirm-reset-btn"
                    onClick={() => {
                      onReset();
                      setShowConfirmReset(false);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 px-3 rounded-lg text-xs transition-all cursor-pointer shadow-sm"
                  >
                    Yes, Reset Everything
                  </button>
                  <button
                    onClick={() => setShowConfirmReset(false)}
                    className="bg-[#EBF5E9] dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold py-1.5 px-3 rounded-lg text-xs cursor-pointer border border-[#D5D5CB]/30"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                id="trigger-system-reset-btn"
                onClick={() => {
                  playChiptuneSound('click');
                  setShowConfirmReset(true);
                }}
                className="bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/35 border-2 border-red-200/50 hover:border-red-300 dark:border-red-900/30 flex items-center gap-1.5 font-bold py-2 px-4 rounded-xl text-xs transition-all cursor-pointer"
              >
                <Trash2 className="w-4 h-4 text-red-500" /> Reset Study Gold & Rank
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
export default DopamineBoosters;
