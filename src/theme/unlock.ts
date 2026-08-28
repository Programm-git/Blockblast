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
 * rarity tier (RARITY_WHEEL_WEIGHT). The secret theme is never on the
 * wheel — it has its own hidden unlock path. Returns null once every
 * wheel-eligible theme is already unlocked.
 */
export function spinWheel(unlockedIds: Set<string>): string | null {
  const wheelThemes = THEMES.filter((t) => t.unlock.type === 'wheel' && !unlockedIds.has(t.id));
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
  return THEMES.every((t) => t.unlock.type !== 'wheel' || unlockedIds.has(t.id));
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
