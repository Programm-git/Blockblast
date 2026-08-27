import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { DEFAULT_THEME_ID, THEMES, getThemeById } from './themes';
import type { GameTheme } from './types';

export type ThemeMode = 'manual' | 'auto';

interface ThemeContextValue {
  theme: GameTheme;
  themeId: string;
  mode: ThemeMode;
  isTransitioning: boolean;
  allThemes: GameTheme[];
  unlockedIds: Set<string>;
  setTheme: (id: string) => void;
  nextTheme: () => void;
  setMode: (mode: ThemeMode) => void;
  /** Called by the score-driven auto system; only applied when safe (no drag/animation in flight). */
  requestAutoThemeForScore: (score: number) => void;
  isUnlocked: (id: string) => boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'blockblast:themeId';
const MODE_KEY = 'blockblast:themeMode';
const BEST_KEY = 'blockblast:bestScore';

function readStoredTheme(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_THEME_ID;
  } catch {
    return DEFAULT_THEME_ID;
  }
}

function readStoredMode(): ThemeMode {
  try {
    return (localStorage.getItem(MODE_KEY) as ThemeMode) ?? 'auto';
  } catch {
    return 'auto';
  }
}

export function readBestScore(): number {
  try {
    return Number(localStorage.getItem(BEST_KEY) ?? 0);
  } catch {
    return 0;
  }
}

export function writeBestScore(score: number) {
  try {
    localStorage.setItem(BEST_KEY, String(score));
  } catch {
    // ignore storage failures (private mode, quota, etc.)
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState(() => readStoredTheme());
  const [mode, setModeState] = useState<ThemeMode>(() => readStoredMode());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimer = useRef<number | null>(null);

  const applyTheme = useCallback((id: string) => {
    setIsTransitioning(true);
    setThemeId(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // ignore
    }
    if (transitionTimer.current) window.clearTimeout(transitionTimer.current);
    transitionTimer.current = window.setTimeout(() => setIsTransitioning(false), 550);
  }, []);

  const setTheme = useCallback(
    (id: string) => {
      applyTheme(id);
    },
    [applyTheme],
  );

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    try {
      localStorage.setItem(MODE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const nextTheme = useCallback(() => {
    const idx = THEMES.findIndex((t) => t.id === themeId);
    const next = THEMES[(idx + 1) % THEMES.length];
    applyTheme(next.id);
  }, [themeId, applyTheme]);

  // All themes are unlocked in this first version; the score gate is kept
  // for future unlock UI without touching gameplay.
  const unlockedIds = useMemo(() => new Set(THEMES.map((t) => t.id)), []);
  const isUnlocked = useCallback((id: string) => unlockedIds.has(id), [unlockedIds]);

  const requestAutoThemeForScore = useCallback(
    (score: number) => {
      if (mode !== 'auto') return;
      let candidate = THEMES[0];
      for (const t of THEMES) {
        if (score >= t.unlockScore && unlockedIds.has(t.id)) candidate = t;
      }
      if (candidate.id !== themeId) applyTheme(candidate.id);
    },
    [mode, themeId, applyTheme, unlockedIds],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: getThemeById(themeId),
      themeId,
      mode,
      isTransitioning,
      allThemes: THEMES,
      unlockedIds,
      setTheme,
      nextTheme,
      setMode,
      requestAutoThemeForScore,
      isUnlocked,
    }),
    [themeId, mode, isTransitioning, unlockedIds, setTheme, nextTheme, setMode, requestAutoThemeForScore, isUnlocked],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
