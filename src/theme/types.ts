export type ParticleType = 'square' | 'bubble' | 'spark' | 'leaf' | 'crystal' | 'star' | 'petal' | 'glow';

export interface GameTheme {
  id: string;
  name: string;
  /** Score threshold at which this theme unlocks automatically. 0 = always unlocked. */
  unlockScore: number;
  background: {
    /** CSS gradient stops, top to bottom. */
    gradient: [string, string] | [string, string, string];
    /** Decorative background motif shown very subtly. */
    decor: 'none' | 'bubbles' | 'snow' | 'stars' | 'leaves';
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
    /** 0-1, how strong the glow/outer light effect is. */
    glow: number;
    /** 0-1, how strong the top highlight sheen is. */
    highlight: number;
    /** Visual finish, purely cosmetic gradient/shine treatment. */
    material: 'matte' | 'glossy' | 'crystal' | 'glow' | 'glass';
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
