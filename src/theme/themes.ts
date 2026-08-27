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
  {
    id: 'ocean',
    name: 'Ocean',
    unlockScore: 2000,
    background: {
      gradient: ['#062a4a', '#0f8f8a'],
      decor: 'bubbles',
    },
    board: {
      background: '#08355aaa',
      border: '#1fb7c9',
      emptyCell: '#0e4a73',
      emptyCellBorder: '#166a92',
      gridLine: '#166a92',
    },
    blocks: {
      colors: ['#3ad0e6', '#1fc6a4', '#3d8bf7', '#ff8a68', '#ffd35e', '#9b6bf2'],
      borderRadius: 10,
      glow: 0.35,
      highlight: 0.5,
      material: 'glass',
    },
    effects: {
      clearColor: '#8be9ff',
      particleType: 'bubble',
      comboColor: '#3ad0e6',
    },
    ui: {
      text: '#eaf8fb',
      secondaryText: '#9fd4de',
      accent: '#3ad0e6',
      accentSoft: '#0e4a73',
      panelBackground: '#08355add',
      panelBorder: '#1fb7c9',
    },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    unlockScore: 5000,
    background: {
      gradient: ['#ff8a5c', '#e05c8a', '#5b3b8c'],
      decor: 'none',
    },
    board: {
      background: '#4a2b5aaa',
      border: '#ffb37a',
      emptyCell: '#5c3468',
      emptyCellBorder: '#7a4a80',
      gridLine: '#7a4a80',
    },
    blocks: {
      colors: ['#ff9c4a', '#ffcf4a', '#ff6f9c', '#c76bef', '#ff5c5c', '#4ad6d1'],
      borderRadius: 10,
      glow: 0.3,
      highlight: 0.55,
      material: 'glossy',
    },
    effects: {
      clearColor: '#ffd98a',
      particleType: 'spark',
      comboColor: '#ffcf4a',
    },
    ui: {
      text: '#fff3e8',
      secondaryText: '#f0c9db',
      accent: '#ffcf4a',
      accentSoft: '#5c3468',
      panelBackground: '#4a2b5add',
      panelBorder: '#ffb37a',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    unlockScore: 8000,
    background: {
      gradient: ['#16301f', '#33502c'],
      decor: 'leaves',
    },
    board: {
      background: '#22381faa',
      border: '#5c8a4a',
      emptyCell: '#2c4527',
      emptyCellBorder: '#3e5c34',
      gridLine: '#3e5c34',
    },
    blocks: {
      colors: ['#5fb35a', '#a5d95c', '#f2d34e', '#f2914e', '#8a5a3c', '#4a90c9'],
      borderRadius: 8,
      glow: 0.12,
      highlight: 0.35,
      material: 'matte',
    },
    effects: {
      clearColor: '#c8f2a0',
      particleType: 'leaf',
      comboColor: '#5fb35a',
    },
    ui: {
      text: '#eaf4e2',
      secondaryText: '#a9c79c',
      accent: '#a5d95c',
      accentSoft: '#2c4527',
      panelBackground: '#22381fdd',
      panelBorder: '#5c8a4a',
    },
  },
  {
    id: 'candy',
    name: 'Candy',
    unlockScore: 12000,
    background: {
      gradient: ['#ffe3f1', '#e3f0ff'],
      decor: 'none',
    },
    board: {
      background: '#ffffff',
      border: '#f5c6e0',
      emptyCell: '#fdf1f7',
      emptyCellBorder: '#f7dcec',
      gridLine: '#f7dcec',
    },
    blocks: {
      colors: ['#ff6fa5', '#5fe0c0', '#b98cf0', '#ffd75e', '#5fc9ea', '#ffab7a'],
      borderRadius: 14,
      glow: 0.15,
      highlight: 0.6,
      material: 'glossy',
    },
    effects: {
      clearColor: '#ffe0f0',
      particleType: 'petal',
      comboColor: '#ff6fa5',
    },
    ui: {
      text: '#5a3452',
      secondaryText: '#a8829e',
      accent: '#ff6fa5',
      accentSoft: '#ffe3f1',
      panelBackground: '#ffffffcc',
      panelBorder: '#f5c6e0',
    },
  },
  {
    id: 'night',
    name: 'Night',
    unlockScore: 16000,
    background: {
      gradient: ['#10141f', '#1c2233'],
      decor: 'none',
    },
    board: {
      background: '#1a2032aa',
      border: '#3a4460',
      emptyCell: '#232a40',
      emptyCellBorder: '#323a54',
      gridLine: '#323a54',
    },
    blocks: {
      colors: ['#3de0d0', '#ff9d4a', '#4a8dff', '#4fd67a', '#b478f0', '#f2df4a'],
      borderRadius: 8,
      glow: 0.5,
      highlight: 0.4,
      material: 'glow',
    },
    effects: {
      clearColor: '#3de0d0',
      particleType: 'glow',
      comboColor: '#3de0d0',
    },
    ui: {
      text: '#e8ecfa',
      secondaryText: '#8a92b0',
      accent: '#3de0d0',
      accentSoft: '#232a40',
      panelBackground: '#1a2032dd',
      panelBorder: '#3a4460',
    },
  },
  {
    id: 'ice',
    name: 'Ice',
    unlockScore: 20000,
    background: {
      gradient: ['#eef6fb', '#cfe6f2'],
      decor: 'snow',
    },
    board: {
      background: '#ffffffcc',
      border: '#b9dcec',
      emptyCell: '#e7f3f9',
      emptyCellBorder: '#d3e9f2',
      gridLine: '#d3e9f2',
    },
    blocks: {
      colors: ['#7fd6ef', '#4fc0e0', '#9db8f2', '#b9a5f0', '#5f9ee0', '#c9d8e6'],
      borderRadius: 6,
      glow: 0.2,
      highlight: 0.6,
      material: 'crystal',
    },
    effects: {
      clearColor: '#ffffff',
      particleType: 'crystal',
      comboColor: '#7fd6ef',
    },
    ui: {
      text: '#274050',
      secondaryText: '#6d8fa0',
      accent: '#4fc0e0',
      accentSoft: '#e7f3f9',
      panelBackground: '#ffffffcc',
      panelBorder: '#b9dcec',
    },
  },
  {
    id: 'space',
    name: 'Space',
    unlockScore: 25000,
    background: {
      gradient: ['#05060f', '#141032'],
      decor: 'stars',
    },
    board: {
      background: '#12102aaa',
      border: '#4a3f8a',
      emptyCell: '#1a1638',
      emptyCellBorder: '#2b2450',
      gridLine: '#2b2450',
    },
    blocks: {
      colors: ['#4fe0ff', '#5f7cff', '#b478f0', '#ff6fc4', '#ff9d4a', '#5fe0a0'],
      borderRadius: 8,
      glow: 0.45,
      highlight: 0.45,
      material: 'glow',
    },
    effects: {
      clearColor: '#b478f0',
      particleType: 'star',
      comboColor: '#4fe0ff',
    },
    ui: {
      text: '#eae8fb',
      secondaryText: '#9088c0',
      accent: '#b478f0',
      accentSoft: '#1a1638',
      panelBackground: '#12102add',
      panelBorder: '#4a3f8a',
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
