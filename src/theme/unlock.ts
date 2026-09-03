import { THEMES, DEFAULT_THEME_ID, SECRET_THEME_ID } from './themes';
import { RARITY_WHEEL_WEIGHT, WHEEL_RARITIES } from './rarity';
import type { Rarity } from './types';

export interface SpinResult {
  rarity: Rarity;
  /** The theme actually awarded, or null if this roll landed on a rarity
   *  tier that's already fully unlocked — a "miss": nothing is awarded, but
   *  the wheel still visibly lands on that rarity so the odds stay honest
   *  (see spinWheel). */
  themeId: string | null;
}

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
 * Rolls a rarity tier against the *fixed* wheel odds (RARITY_WHEEL_WEIGHT,
 * always summing to 100 across all wheel-eligible rarities), then picks a
 * random still-locked theme from that tier.
 *
 * The roll always uses the full fixed table — it never renormalizes over
 * only the tiers that still have something left. Renormalizing was the bug:
 * once every Common/Rare/Epic/Mythic theme was unlocked, their weight
 * silently piled onto the remaining tiers, making Legendary+ a *guaranteed*
 * hit instead of staying at its advertised 4.5%. Now a roll that lands on an
 * already-fully-unlocked tier is a genuine miss (themeId: null) — the wheel
 * still visibly lands on that rarity, but nothing is awarded — so Legendary
 * stays at 4.5% of all spins for as long as there's anything left to give
 * out anywhere, exactly like the odds legend says.
 *
 * Returns null only once every wheel-eligible theme (any rarity) is already
 * unlocked — there is nothing left for any roll to award.
 */
export function spinWheel(unlockedIds: Set<string>): SpinResult | null {
  // Streak themes (like the starting theme) are never wheel-eligible — they
  // only unlock by hitting a play-streak milestone, so both are excluded
  // here rather than just 'start'.
  const wheelThemes = THEMES.filter((t) => t.unlock.type !== 'start' && t.unlock.type !== 'streak' && !unlockedIds.has(t.id));
  if (wheelThemes.length === 0) return null;

  const totalWeight = WHEEL_RARITIES.reduce((sum, r) => sum + RARITY_WHEEL_WEIGHT[r], 0);
  let roll = Math.random() * totalWeight;
  let chosenRarity: Rarity = WHEEL_RARITIES[0];
  for (const rarity of WHEEL_RARITIES) {
    const weight = RARITY_WHEEL_WEIGHT[rarity];
    if (roll < weight) {
      chosenRarity = rarity;
      break;
    }
    roll -= weight;
  }

  const pool = wheelThemes.filter((t) => t.rarity === chosenRarity);
  const winner = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : null;
  return { rarity: chosenRarity, themeId: winner?.id ?? null };
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
