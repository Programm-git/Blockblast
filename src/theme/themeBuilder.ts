import type { DecorType, GameTheme, MaterialType, ParticleType, Rarity, UnlockRule } from './types';
import { RARITY_INTENSITY } from './rarity';
import { darken, lighten, withAlpha } from './colorUtils';

export interface CompactTheme {
  id: string;
  name: string;
  rarity: Rarity;
  unlock: UnlockRule;
  /** 2-4 gradient stops, top to bottom. */
  bg: string[];
  /** Board panel base color. */
  surface: string;
  /** UI/board accent color. */
  accent: string;
  /** Exactly 6 block colors. */
  blocks: string[];
  decor: DecorType;
  material: MaterialType;
  particle: ParticleType;
  /** true = light text on a dark surface, false = dark text on a light surface. */
  dark: boolean;
}

const MATERIAL_RADIUS: Record<MaterialType, number> = {
  matte: 8,
  glossy: 10,
  glass: 10,
  crystal: 6,
  glow: 8,
  metal: 8,
  marble: 8,
  wood: 6,
  holo: 10,
  obsidian: 6,
  secret: 6,
};

const MATERIAL_BASE_GLOW: Record<MaterialType, number> = {
  matte: 0.05,
  glossy: 0.12,
  glass: 0.3,
  crystal: 0.35,
  glow: 0.55,
  metal: 0.18,
  marble: 0.15,
  wood: 0.08,
  holo: 0.5,
  obsidian: 0.4,
  secret: 0.45,
};

function layersForRarity(rarity: Rarity): number {
  switch (rarity) {
    case 'common':
      return 0;
    case 'rare':
      return 1;
    case 'epic':
      return 2;
    case 'mythic':
      return 3;
    case 'legendary':
      return 3;
    default:
      return 0;
  }
}

export function buildTheme(data: CompactTheme): GameTheme {
  const intensity = RARITY_INTENSITY[data.rarity];
  const { dark, surface, accent } = data;

  const emptyCell = dark ? lighten(surface, 0.07) : darken(surface, 0.04);
  const emptyCellBorder = dark ? lighten(surface, 0.14) : darken(surface, 0.09);

  const text = dark ? '#f5f2ff' : darken(accent, 0.62);
  const secondaryText = dark ? lighten(surface, 0.42) : darken(accent, 0.32);

  return {
    id: data.id,
    name: data.name,
    rarity: data.rarity,
    unlock: data.unlock,
    background: {
      gradient: data.bg,
      decor: data.decor,
      layers: layersForRarity(data.rarity),
    },
    board: {
      background: surface,
      border: accent,
      emptyCell,
      emptyCellBorder,
      gridLine: emptyCellBorder,
    },
    blocks: {
      colors: data.blocks,
      borderRadius: MATERIAL_RADIUS[data.material],
      glow: Math.min(1, MATERIAL_BASE_GLOW[data.material] * intensity.glowMul),
      highlight: Math.min(1, 0.4 * intensity.highlightMul),
      material: data.material,
    },
    effects: {
      clearColor: lighten(accent, dark ? 0.3 : 0.15),
      particleType: data.particle,
      comboColor: accent,
    },
    ui: {
      text,
      secondaryText,
      accent,
      accentSoft: dark ? withAlpha(lighten(surface, 0.1), 1) : withAlpha(lighten(accent, 0.75), 1),
      panelBackground: dark ? withAlpha(darken(surface, 0.02), 0.86) : withAlpha(lighten(surface, 0.04), 0.8),
      panelBorder: accent,
    },
  };
}
