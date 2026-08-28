import type { Rarity } from './types';

export const RARITY_ORDER: Rarity[] = ['common', 'rare', 'epic', 'mythic', 'legendary', 'secret'];

export const RARITY_LABEL: Record<Rarity, string> = {
  common: 'Common',
  rare: 'Rare',
  epic: 'Epic',
  mythic: 'Mythic',
  legendary: 'Legendary',
  secret: 'Secret',
};

/** How many of each rarity exist, driving the wheel's odds. */
export const RARITY_COUNT: Record<Rarity, number> = {
  common: 10,
  rare: 10,
  epic: 10,
  mythic: 10,
  legendary: 10,
  secret: 1,
};

/** Relative pick weight per rarity *tier* on the wheel (not per-theme). */
export const RARITY_WHEEL_WEIGHT: Record<Rarity, number> = {
  common: 40,
  rare: 30,
  epic: 15,
  mythic: 10,
  legendary: 5,
  secret: 1,
};

/**
 * Purely cosmetic intensity multipliers applied on top of each theme's own
 * data — this is what makes the *same kind* of effect (glow, particle count,
 * background motion) escalate from Common to Legendary without hand-tuning
 * every single theme. Gameplay never reads any of this.
 */
export interface RarityIntensity {
  glowMul: number;
  highlightMul: number;
  particleCountMul: number;
  decorCountMul: number;
  /** >1 = faster/livelier background motion, <1 = calmer. */
  animSpeedMul: number;
  boardFrame: 'plain' | 'accent' | 'glow' | 'ornate' | 'premium';
}

export const RARITY_INTENSITY: Record<Rarity, RarityIntensity> = {
  common: { glowMul: 0.6, highlightMul: 0.9, particleCountMul: 0.6, decorCountMul: 0.5, animSpeedMul: 0.85, boardFrame: 'plain' },
  rare: { glowMul: 0.85, highlightMul: 1, particleCountMul: 0.85, decorCountMul: 0.8, animSpeedMul: 1, boardFrame: 'accent' },
  epic: { glowMul: 1.15, highlightMul: 1.1, particleCountMul: 1.2, decorCountMul: 1.15, animSpeedMul: 1.2, boardFrame: 'glow' },
  mythic: { glowMul: 1.4, highlightMul: 1.2, particleCountMul: 1.5, decorCountMul: 1.35, animSpeedMul: 1.35, boardFrame: 'ornate' },
  legendary: { glowMul: 1.7, highlightMul: 1.3, particleCountMul: 1.9, decorCountMul: 1.6, animSpeedMul: 1.5, boardFrame: 'premium' },
  secret: { glowMul: 1, highlightMul: 1, particleCountMul: 1, decorCountMul: 1, animSpeedMul: 1, boardFrame: 'premium' },
};

export function rarityIndex(rarity: Rarity): number {
  return RARITY_ORDER.indexOf(rarity);
}
