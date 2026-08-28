import type { GameTheme } from './types';

export const THEMES: GameTheme[] = [
  {
    id: 'classic',
    name: 'Classic',
    unlockScore: 0,
    background: {
      gradient: ['#f3efe7', '#e7e0d2'],
      decor: 'none',
    },
    board: {
      background: '#ffffff',
      border: '#d8cfbd',
      emptyCell: '#f1ece1',
      emptyCellBorder: '#e2d9c6',
      gridLine: '#e2d9c6',
    },
    blocks: {
      colors: ['#4f8ef7', '#f7a23d', '#4fc373', '#f4d13d', '#a768e0', '#f0564f'],
      borderRadius: 8,
      glow: 0.08,
      highlight: 0.35,
      material: 'matte',
    },
    effects: {
      clearColor: '#fffdf4',
      particleType: 'square',
      comboColor: '#f7a23d',
    },
    ui: {
      text: '#3a3327',
      secondaryText: '#8a8171',
      accent: '#4f8ef7',
      accentSoft: '#dbe9ff',
      panelBackground: '#ffffffcc',
      panelBorder: '#e2d9c6',
    },
  },
];

export const DEFAULT_THEME_ID = 'classic';

export function getThemeById(id: string): GameTheme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

/** Score-based automatic theme progression, in ascending order of unlockScore. */
export function themeForScore(score: number): GameTheme {
  let chosen = THEMES[0];
  for (const theme of THEMES) {
    if (score >= theme.unlockScore) chosen = theme;
  }
  return chosen;
}
