import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { DEFAULT_THEME_ID, THEMES, getThemeById } from './themes';
import { checkSecretUnlock, isWheelExhausted, readUnlockedIds, spinWheel, writeUnlockedIds } from './unlock';
import type { GameTheme } from './types';

interface MoveInfo {
  lineCount: number;
  combo: number;
}

interface ThemeContextValue {
  theme: GameTheme;
  themeId: string;
  isTransitioning: boolean;
  allThemes: GameTheme[];
  unlockedIds: Set<string>;
  isUnlocked: (id: string) => boolean;
  setTheme: (id: string) => void;
  /** Called after a move fully settles; rotates to the next unlocked theme
   *  when the move cleared at least one line, and silently checks the
   *  secret theme's hidden unlock condition. Never mid-drag or mid-animation. */
  onMoveSettled: (info: MoveInfo) => void;
  /** Spins the rarity-weighted wheel; returns the id of the newly unlocked
   *  theme, or null if every wheel-eligible theme is already unlocked. */
  spin: () => string | null;
  wheelExhausted: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'blockblast:themeId';
const BEST_KEY = 'blockblast:bestScore';

function readStoredTheme(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_THEME_ID;
  } catch {
    return DEFAULT_THEME_ID;
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
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(() => readUnlockedIds());
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
      if (!unlockedIds.has(id)) return;
      applyTheme(id);
    },
    [applyTheme, unlockedIds],
  );

  const unlock = useCallback((id: string) => {
    setUnlockedIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      writeUnlockedIds(next);
      return next;
    });
  }, []);

  const isUnlocked = useCallback((id: string) => unlockedIds.has(id), [unlockedIds]);

  const onMoveSettled = useCallback(
    ({ lineCount, combo }: MoveInfo) => {
      if (checkSecretUnlock({ lineCount, combo })) unlock('secret');

      if (lineCount <= 0) return;
      // Rotate to the next unlocked theme, in stable registry order, so the
      // world visibly changes each time a line is cleared.
      const unlockedInOrder = THEMES.filter((t) => unlockedIds.has(t.id));
      if (unlockedInOrder.length <= 1) return;
      const idx = unlockedInOrder.findIndex((t) => t.id === themeId);
      const next = unlockedInOrder[(idx + 1 + unlockedInOrder.length) % unlockedInOrder.length];
      if (next.id !== themeId) applyTheme(next.id);
    },
    [themeId, unlockedIds, applyTheme, unlock],
  );

  const spin = useCallback((): string | null => {
    const won = spinWheel(unlockedIds);
    if (won) unlock(won);
    return won;
  }, [unlockedIds, unlock]);

  const wheelExhausted = useMemo(() => isWheelExhausted(unlockedIds), [unlockedIds]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: getThemeById(themeId),
      themeId,
      isTransitioning,
      allThemes: THEMES,
      unlockedIds,
      isUnlocked,
      setTheme,
      onMoveSettled,
      spin,
      wheelExhausted,
    }),
    [themeId, isTransitioning, unlockedIds, isUnlocked, setTheme, onMoveSettled, spin, wheelExhausted],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
