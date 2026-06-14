// Procedural Web Audio API sound synthesizer and gamified systems
// Keeps the study app lightweight, sandboxed-safe, and self-contained.

export interface ShopItem {
  id: string;
  name: string;
  desc: string;
  cost: number;
  icon: string;
  type: 'avatar' | 'theme' | 'powerup';
  achievementRequirement?: string;
  payload?: string; // used for custom styles or themes
}

export const DOPAMINE_SHOP_ITEMS: ShopItem[] = [
  {
    id: 'avatar_euler',
    name: 'Euler Octagon Avatar',
    desc: 'Adopt the badge of Leonhard Euler, the king of algebraic networks!',
    cost: 150,
    icon: '⬡',
    type: 'avatar'
  },
  {
    id: 'avatar_einstein',
    name: 'Einstein Proton Avatar',
    desc: 'Unleash nuclear physics energy in your daily revisions.',
    cost: 300,
    icon: '⚛️',
    type: 'avatar'
  },
  {
    id: 'avatar_hypatia',
    name: 'Hypatia Asterisk Avatar',
    desc: 'Honor Hypatia of Alexandria, the pristine solar geometric scholar.',
    cost: 450,
    icon: '✴️',
    type: 'avatar'
  },
  {
    id: 'avatar_shakespeare',
    name: 'Royal Shakespeare Quill',
    desc: 'Equip the gold-leaf pen of English literary genius.',
    cost: 500,
    icon: '✒️',
    type: 'avatar'
  },
  {
    id: 'avatar_pharaoh',
    name: 'Golden Pharaoh Crown',
    desc: 'Unlock the historical divine status of ancient Egyptian pharaohs.',
    cost: 600,
    icon: '👑',
    type: 'avatar'
  },
  {
    id: 'avatar_einstein_gold',
    name: 'Aura of Isaac Newton',
    desc: 'The apple that shattered gravity itself. Extremely prestigious!',
    cost: 1000,
    icon: '🍎',
    type: 'avatar'
  },
  {
    id: 'custom_cur_emerald',
    name: 'Emerald Pulsing Theme',
    desc: 'Transforms your core accent system into deep rainforest teal.',
    cost: 200,
    icon: '🟢',
    type: 'theme',
    payload: 'theme-emerald'
  },
  {
    id: 'custom_cur_space',
    name: 'Cosmic Stellar Nebula Theme',
    desc: 'Envelops the revision space in dark galactic starry indigo accents.',
    cost: 400,
    icon: '🌌',
    type: 'theme',
    payload: 'theme-galactic'
  },
  {
    id: 'time_buffer_boost',
    name: 'Coffee Spark Mug',
    desc: 'Decorative study buddy to increase your mental energy bar.',
    cost: 100,
    icon: '☕',
    type: 'powerup'
  },
  {
    id: 'dopamine_unlocked_meme',
    name: 'Euler Math Meme pack',
    desc: 'Unlocks exclusive secret math puns and humorous study cards.',
    cost: 250,
    icon: '🃏',
    type: 'powerup'
  }
];

export const STUDENT_RANKS = [
  { minXp: 0, title: 'Study Recruit', badge: '🌱' },
  { minXp: 100, title: 'Revision Novice', badge: '🪵' },
  { minXp: 300, title: 'Equation Apprentice', badge: '🧪' },
  { minXp: 600, title: 'Scholar of Stage 4', badge: '📜' },
  { minXp: 1000, title: 'Calculus Knight', badge: '🛡️' },
  { minXp: 1500, title: 'The NESA Mastermind', badge: '🏅' },
  { minXp: 2200, title: 'Infinite Polymath', badge: '🌌' }
];

export function getRankByXp(xp: number) {
  let matched = STUDENT_RANKS[0];
  for (const rank of STUDENT_RANKS) {
    if (xp >= rank.minXp) {
      matched = rank;
    } else {
      break;
    }
  }
  return matched;
}

export function getNextRankProgress(xp: number) {
  const currentRankIndex = STUDENT_RANKS.findIndex(r => r.title === getRankByXp(xp).title);
  if (currentRankIndex === STUDENT_RANKS.length - 1) {
    return { nextTitle: 'Maximum Rank Reached', xpRequired: xp, progress: 100 };
  }
  const nextRank = STUDENT_RANKS[currentRankIndex + 1];
  const currentRankMin = STUDENT_RANKS[currentRankIndex].minXp;
  const rankRange = nextRank.minXp - currentRankMin;
  const currentXpInRange = xp - currentRankMin;
  const progressPercent = Math.min(100, Math.round((currentXpInRange / rankRange) * 100));
  return {
    nextTitle: nextRank.title,
    xpRequired: nextRank.minXp,
    progress: progressPercent
  };
}

// Low-level Web Audio synthesizer engine
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    // Standard and vendor prefixed support
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  // Resume context if suspended (common browser security constraint)
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Triggers sound synthesizers procedurally
 */
export function playChiptuneSound(type: 'success' | 'fail' | 'level_up' | 'goal_achieved' | 'purchase' | 'click') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const savedSoundSetting = localStorage.getItem('mastery_sounds_enabled');
    if (savedSoundSetting === 'false') return;

    const playTone = (freq: number, duration: number, typeStr: OscillatorType = 'sine', startTimeOffset: number = 0) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = typeStr;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startTimeOffset);
      
      // Gentle volume dropoff (decay) to prevent clicking pops
      gainNode.gain.setValueAtTime(0.15, ctx.currentTime + startTimeOffset);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startTimeOffset + duration);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(ctx.currentTime + startTimeOffset);
      osc.stop(ctx.currentTime + startTimeOffset + duration);
    };

    if (type === 'click') {
      playTone(600, 0.05, 'sine');
    } else if (type === 'success') {
      // Ascending short pleasant chime chord (triads)
      playTone(523.25, 0.15, 'triangle', 0); // C5
      playTone(659.25, 0.15, 'triangle', 0.06); // E5
      playTone(783.99, 0.25, 'triangle', 0.12); // G5
    } else if (type === 'fail') {
      // Descending flat buzz
      playTone(220.00, 0.2, 'sawtooth', 0); // A3
      playTone(196.00, 0.35, 'sawtooth', 0.1); // G3
    } else if (type === 'purchase') {
      // Cash register ding + coin drop sound
      playTone(987.77, 0.1, 'sine', 0); // B5
      playTone(1318.51, 0.3, 'sine', 0.05); // E6
      playTone(1975.53, 0.15, 'triangle', 0.12); // B6
    } else if (type === 'level_up') {
      // Grand celebratory major arpeggio
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C4-E4-G4-C5-E5-G5-C6
      notes.forEach((freq, idx) => {
        playTone(freq, 0.3, 'sine', idx * 0.08);
      });
    } else if (type === 'goal_achieved') {
      // Fast victory fanfare
      playTone(440.00, 0.1, 'triangle', 0); // A4
      playTone(440.00, 0.1, 'triangle', 0.08); // A4
      playTone(440.00, 0.1, 'triangle', 0.16); // A4
      playTone(554.37, 0.2, 'triangle', 0.24); // C#5
      playTone(659.25, 0.4, 'triangle', 0.36); // E5
    }
  } catch (err) {
    console.warn('Web Audio playback failed in this safe environment:', err);
  }
}

/**
 * Fires a custom study interaction celebration event across the application
 */
export function celebrateDopamine(detail: {
  type: 'success' | 'fail' | 'level_up' | 'goal_achieved' | 'purchase';
  xpReward: number;
  coinReward: number;
  message: string;
}) {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('study-dopamine-achieved', { detail });
    window.dispatchEvent(event);
  }
}
