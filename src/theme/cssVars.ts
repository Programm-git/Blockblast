import type { CSSProperties } from 'react';
import type { GameTheme } from './types';

export type ThemeCSSVars = CSSProperties & Record<string, string | number>;

export function themeToCssVars(theme: GameTheme): ThemeCSSVars {
  const bg = theme.background.gradient;
  return {
    '--bg-1': bg[0],
    '--bg-2': bg[1],
    '--bg-3': bg[2] ?? bg[1],
    '--board-bg': theme.board.background,
    '--board-border': theme.board.border,
    '--cell-empty': theme.board.emptyCell,
    '--cell-empty-border': theme.board.emptyCellBorder,
    '--grid-line': theme.board.gridLine,
    '--block-radius': `${theme.blocks.borderRadius}px`,
    '--block-glow': theme.blocks.glow,
    '--block-highlight': theme.blocks.highlight,
    '--clear-color': theme.effects.clearColor,
    '--combo-color': theme.effects.comboColor,
    '--ui-text': theme.ui.text,
    '--ui-secondary': theme.ui.secondaryText,
    '--accent': theme.ui.accent,
    '--accent-soft': theme.ui.accentSoft,
    '--panel-bg': theme.ui.panelBackground,
    '--panel-border': theme.ui.panelBorder,
  };
}
