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
  // The clear animation's own CSS duration is a generic default; themes with
  // a bespoke, longer dissolve (see CLEAR_ANIMATION_MS) hold the board open
  // for that long too (getClearDurationMs drives the game engine's setTimeout
  // as well), so the animation itself must stretch to match rather than
  // finish early and sit invisible for the remainder.
  if (variant === 'clearing') {
    style.animationDuration = `${getClearDurationMs(theme)}ms`;
  }
  // block--theme-<id> is a no-op class for most themes; Block.css only
  // defines rules for it on the handful of Legendary/Exotic themes with a
  // bespoke clear or landing animation, so every other theme just falls
  // through to the generic material/variant styling untouched.
  return (
    <div
      className={`block block--${theme.blocks.material} block--${variant} block--theme-${theme.id}`}
      style={style}
      aria-hidden="true"
    />
  );
}

export const Block = memo(BlockImpl);
