export type Rarity = 'common' | 'rare' | 'epic' | 'mythic' | 'legendary' | 'secret';

export type ParticleType =
  | 'square'
  | 'bubble'
  | 'spark'
  | 'leaf'
  | 'crystal'
  | 'star'
  | 'petal'
  | 'glow'
  | 'sand'
  | 'feather'
  | 'ember'
  | 'rune'
  | 'pixel'
  | 'ripple'
  | 'lightning'
  | 'mineral'
  | 'binary';

export type DecorType =
  | 'none'
  | 'bubbles'
  | 'snow'
  | 'stars'
  | 'leaves'
  | 'petals'
  | 'clouds'
  | 'embers'
  | 'sand'
  | 'aurora'
  | 'lightning'
  | 'fireflies'
  | 'runes'
  | 'gears'
  | 'sparkle'
  | 'ash'
  | 'nebula'
  | 'glitch';

export type MaterialType =
  | 'matte'
  | 'glossy'
  | 'crystal'
  | 'glow'
  | 'glass'
  | 'metal'
  | 'marble'
  | 'obsidian'
  | 'wood'
  | 'holo'
  | 'obsidian'
  | 'secret';

/** How a theme is obtained. Gameplay never depends on this. */
export type UnlockRule =
  | { type: 'start' }
  | { type: 'wheel' }
  | { type: 'secret' };

export interface GameTheme {
  id: string;
  name: string;
  rarity: Rarity;
  unlock: UnlockRule;
  background: {
    /** CSS gradient stops, top to bottom. 2-4 stops. */
    gradient: string[];
    /** Decorative background motif shown subtly, intensity scaled by rarity. */
    decor: DecorType;
    /** Parallax background layers for higher rarities (epic+). 0 = none. */
    layers: number;
  };
  board: {
    background: string;
    border: string;
    emptyCell: string;
    emptyCellBorder: string;
    gridLine: string;
  };
  blocks: {
    colors: string[];
    borderRadius: number;
    /** 0-1, how strong the glow/outer light effect is (already rarity-scaled). */
    glow: number;
    /** 0-1, how strong the top highlight sheen is. */
    highlight: number;
    material: MaterialType;
  };
  effects: {
    clearColor: string;
    particleType: ParticleType;
    comboColor: string;
  };
  ui: {
    text: string;
    secondaryText: string;
    accent: string;
    accentSoft: string;
    panelBackground: string;
    panelBorder: string;
  };
}
