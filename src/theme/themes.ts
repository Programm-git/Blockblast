import type { GameTheme, Rarity } from './types';
import { THEME_DATA } from './themeData';
import { buildTheme } from './themeBuilder';

export const THEMES: GameTheme[] = THEME_DATA.map(buildTheme);

export const DEFAULT_THEME_ID = 'classic';
export const SECRET_THEME_ID = 'secret';

export function getThemeById(id: string): GameTheme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

export function themesByRarity(rarity: Rarity): GameTheme[] {
  return THEMES.filter((t) => t.rarity === rarity);
}
