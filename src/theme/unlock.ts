import { THEMES, DEFAULT_THEME_ID, SECRET_THEME_ID } from './themes';
import { RARITY_WHEEL_WEIGHT } from './rarity';
import type { Rarity } from './types';

const UNLOCKED_KEY = 'blockblast:unlockedThemes';

export function readUnlockedIds(): Set<string> {
  try {
    const raw = localStorage.getItem(UNLOCKED_KEY);
    if (raw) {
      const arr = JSON.parse(raw) as string[];
      return new Set([DEFAULT_THEME_ID, ...arr]);
    }
  } catch {
    // ignore storage/parse failures
  }
  return new Set([DEFAULT_THEME_ID]);
}

export function writeUnlockedIds(ids: Set<string>) {
  try {
    localStorage.setItem(UNLOCKED_KEY, JSON.stringify([...ids]));
  } catch {
    // ignore storage failures (private mode, quota, etc.)
  }
}

/**
 * Picks a random still-locked theme for the wheel to award, weighted by
 * rarity tier (RARITY_WHEEL_WEIGHT) — including a slim 1% chance at the
 * Secret theme itself. The hidden in-game condition (checkSecretUnlock)
 * remains a second, independent way to earn it early. Returns null once
 * every wheel-eligible theme is already unlocked.
 */
export function spinWheel(unlockedIds: Set<string>): string | null {
  // Streak themes (like the starting theme) are never wheel-eligible — they
  // only unlock by hitting a play-streak milestone, so both are excluded
  // here rather than just 'start'.
  const wheelThemes = THEMES.filter((t) => t.unlock.type !== 'start' && t.unlock.type !== 'streak' && !unlockedIds.has(t.id));
  if (wheelThemes.length === 0) return null;

  const tiersPresent = new Set(wheelThemes.map((t) => t.rarity));
  const weighted: Array<{ rarity: Rarity; weight: number }> = [...tiersPresent].map((rarity) => ({
    rarity,
    weight: RARITY_WHEEL_WEIGHT[rarity],
  }));
  const totalWeight = weighted.reduce((sum, w) => sum + w.weight, 0);
  let roll = Math.random() * totalWeight;
  let chosenRarity: Rarity = weighted[0].rarity;
  for (const w of weighted) {
    if (roll < w.weight) {
      chosenRarity = w.rarity;
      break;
    }
    roll -= w.weight;
  }

  const pool = wheelThemes.filter((t) => t.rarity === chosenRarity);
  const winner = pool[Math.floor(Math.random() * pool.length)];
  return winner.id;
}

export function isWheelExhausted(unlockedIds: Set<string>): boolean {
  return THEMES.every((t) => t.unlock.type === 'start' || t.unlock.type === 'streak' || unlockedIds.has(t.id));
}

/**
 * Themes with a `{ type: 'streak', days }` unlock rule that the current
 * streak has reached but aren't unlocked yet. Purely a query — callers
 * decide what to do with the ids (ThemeContext unlocks them).
 */
export function checkStreakUnlocks(streakDays: number, unlockedIds: Set<string>): string[] {
  return THEMES.filter(
    (t) => t.unlock.type === 'streak' && streakDays >= t.unlock.days && !unlockedIds.has(t.id),
  ).map((t) => t.id);
}

/**
 * The Secret theme's unlock condition is deliberately not shown to the
 * player anywhere in the UI. Kept as a single, easily-changeable predicate
 * so the actual trigger can be swapped later without touching any other
 * system. Currently: clear 3+ lines in a single move, or reach combo x6 —
 * either is a rare, skill-adjacent feat rather than a score grind.
 */
export function checkSecretUnlock(moveInfo: { lineCount: number; combo: number }): boolean {
  return moveInfo.lineCount >= 3 || moveInfo.combo >= 6;
}

export { SECRET_THEME_ID };
