import { memo } from 'react';
import type { CSSProperties } from 'react';
import type { GameTheme } from '../theme/types';
import { getClearDurationMs } from '../theme/themeBuilder';
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
  // The clear animation's own CSS duration is a generic default; when this
  // theme's material has a bespoke, longer dissolve (glitch, secret) the
  // game engine already holds the board open for that long (getClearDurationMs
  // drives its setTimeout too), so the animation itself must stretch to
  // match rather than finish early and sit invisible for the remainder.
  if (variant === 'clearing') {
    style.animationDuration = `${getClearDurationMs(theme.blocks.material)}ms`;
  }
  return (
    <div
      className={`block block--${theme.blocks.material} block--${variant}`}
      style={style}
      aria-hidden="true"
    />
  );
}

export const Block = memo(BlockImpl);
