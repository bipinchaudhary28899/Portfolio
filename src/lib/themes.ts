/**
 * ═══════════════════════════════════════════════════════
 *  Adaptive Theme Engine - Single Source of Truth
 *  7 time-based palettes + manual override modes
 * ═══════════════════════════════════════════════════════
 */

export type TimeTheme =
  | 'early-morning'
  | 'mid-morning'
  | 'late-morning'
  | 'afternoon'
  | 'evening'
  | 'night'
  | 'late-night';

export type ThemeMode = 'auto' | 'light' | 'dark' | 'system';

export interface TimeThemeInfo {
  id: TimeTheme;
  label: string;
  emoji: string;
  timeRange: string;
  mood: string;
  isDark: boolean;
  hourStart: number; // inclusive
  hourEnd: number;   // exclusive
}

/* ── Time-theme metadata ────────────────────────────────────────────────── */
export const TIME_THEME_INFO: Record<TimeTheme, TimeThemeInfo> = {
  'early-morning': {
    id: 'early-morning',
    label: 'Early Morning',
    emoji: '🌄',
    timeRange: '4 - 7 AM',
    mood: 'Soft pastel sunrise',
    isDark: true,
    hourStart: 4,
    hourEnd: 7,
  },
  'mid-morning': {
    id: 'mid-morning',
    label: 'Mid Morning',
    emoji: '🌤️',
    timeRange: '7 - 10 AM',
    mood: 'Fresh bright energy',
    isDark: false,
    hourStart: 7,
    hourEnd: 10,
  },
  'late-morning': {
    id: 'late-morning',
    label: 'Late Morning',
    emoji: '☀️',
    timeRange: '10 AM - 12 PM',
    mood: 'Clean productive daylight',
    isDark: false,
    hourStart: 10,
    hourEnd: 12,
  },
  'afternoon': {
    id: 'afternoon',
    label: 'Afternoon',
    emoji: '🌞',
    timeRange: '12 - 5 PM',
    mood: 'Warm amber sunlight',
    isDark: false,
    hourStart: 12,
    hourEnd: 17,
  },
  'evening': {
    id: 'evening',
    label: 'Evening',
    emoji: '🌇',
    timeRange: '5 - 8 PM',
    mood: 'Golden sunset glow',
    isDark: true,
    hourStart: 17,
    hourEnd: 20,
  },
  'night': {
    id: 'night',
    label: 'Night',
    emoji: '🌃',
    timeRange: '8 PM - 12 AM',
    mood: 'Elegant indigo depths',
    isDark: true,
    hourStart: 20,
    hourEnd: 24,
  },
  'late-night': {
    id: 'late-night',
    label: 'Late Night',
    emoji: '🌌',
    timeRange: '12 - 4 AM',
    mood: 'Cyber neon minimal',
    isDark: true,
    hourStart: 0,
    hourEnd: 4,
  },
};

/** Ordered list for display purposes */
export const TIME_THEME_ORDER: TimeTheme[] = [
  'early-morning',
  'mid-morning',
  'late-morning',
  'afternoon',
  'evening',
  'night',
  'late-night',
];

/* ── Core logic ─────────────────────────────────────────────────────────── */

/**
 * Derives the time-based theme from the browser's local clock.
 * Uses `new Date().getHours()` which automatically honours the
 * visitor's own OS timezone - no hardcoding needed.
 */
export function getTimeTheme(): TimeTheme {
  const h = new Date().getHours();
  if (h >= 4  && h < 7)  return 'early-morning';
  if (h >= 7  && h < 10) return 'mid-morning';
  if (h >= 10 && h < 12) return 'late-morning';
  if (h >= 12 && h < 17) return 'afternoon';
  if (h >= 17 && h < 20) return 'evening';
  if (h >= 20)           return 'night';
  return 'late-night'; // 0-3 AM
}

/**
 * Resolves the user's chosen ThemeMode + OS dark preference
 * into the concrete `data-theme` string to set on <html>.
 */
export function resolveTheme(mode: ThemeMode, systemPrefersDark: boolean): string {
  switch (mode) {
    case 'light':  return 'light';
    case 'dark':   return 'dark';
    case 'system': return systemPrefersDark ? 'dark' : 'light';
    case 'auto':
    default:       return getTimeTheme();
  }
}

/**
 * Time-aware greeting for the current hour.
 */
export function getGreeting(): string {
  const h = new Date().getHours();
  if (h >= 4  && h < 7)  return 'Good early morning';
  if (h >= 7  && h < 12) return 'Good morning';
  if (h >= 12 && h < 17) return 'Good afternoon';
  if (h >= 17 && h < 21) return 'Good evening';
  return 'Good night';
}

/**
 * Returns milliseconds until the next hour boundary (+ 5 s buffer)
 * so the auto-switch timer fires reliably.
 */
export function msUntilNextHour(): number {
  const now  = new Date();
  const next = new Date(now);
  next.setHours(now.getHours() + 1, 0, 5, 0);
  return next.getTime() - now.getTime();
}

/** Returns the IANA timezone string of the browser, or empty string. */
export function getUserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return '';
  }
}

/**
 * Inline script string for injection into <head> - runs synchronously
 * before React hydrates to prevent flash of wrong theme.
 */
export const ANTI_FLASH_SCRIPT = `(function(){try{
  var m=localStorage.getItem('theme-mode')||'auto';
  var t;
  if(m==='light')t='light';
  else if(m==='dark')t='dark';
  else if(m==='system')t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';
  else{
    var h=new Date().getHours();
    if(h>=4&&h<7)t='early-morning';
    else if(h>=7&&h<10)t='mid-morning';
    else if(h>=10&&h<12)t='late-morning';
    else if(h>=12&&h<17)t='afternoon';
    else if(h>=17&&h<20)t='evening';
    else if(h>=20)t='night';
    else t='late-night';
  }
  document.documentElement.setAttribute('data-theme',t);
}catch(e){}})();`;
