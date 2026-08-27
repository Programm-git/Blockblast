import { memo } from 'react';
import type { CSSProperties } from 'react';
import type { GameTheme } from '../theme/types';
import './Block.css';

interface BlockProps {
  theme: GameTheme;
  colorIndex: number;
  /** Visual state modifiers, purely cosmetic. */
  variant?: 'placed' | 'ghost-valid' | 'ghost-invalid' | 'clearing' | 'tray';
}

function BlockImpl({ theme, colorIndex, variant = 'placed' }: BlockProps) {
  const color = theme.blocks.colors[colorIndex % theme.blocks.colors.length];
  const style: CSSProperties & Record<string, string> = {
    '--block-color': color,
  };
  return (
    <div
      className={`block block--${theme.blocks.material} block--${variant}`}
      style={style}
      aria-hidden="true"
    />
  );
}

export const Block = memo(BlockImpl);
