import { useEffect, useRef, useState } from 'react';
import { BOARD_SIZE } from '../game/types';
import type { ClearEvent } from '../game/useGameEngine';
import type { GameTheme } from '../theme/types';
import './LegendaryExoticClearFX.css';

type FxShape = 'ring' | 'burst' | 'wave' | 'beam' | 'glitch' | 'scan' | 'spiral' | 'crack' | 'bolt';

interface FxConfig {
  shape: FxShape;
  color: string;
  color2: string;
}

/** Only Legendary/Exotic themes get a board-level "hero moment" reaction on
 *  a big clear — everything else relies on its (rarity-scaled) particle
 *  burst from ParticleLayer. Shape + color pair is chosen per theme so
 *  themes read as genuinely different kinds of effect, not just recolors of
 *  one generic burst. */
const FX_CONFIG: Partial<Record<string, FxConfig>> = {
  blackhole: { shape: 'ring', color: '#00f7ff', color2: '#a855f7' },
  quantum: { shape: 'burst', color: '#4fe0ff', color2: '#ffffff' },
  liquidchrome: { shape: 'wave', color: '#c9ccd6', color2: '#4fe0ff' },
  prism: { shape: 'beam', color: '#ff6f6f', color2: '#4fe0ff' },
  glitchexotic: { shape: 'glitch', color: '#00e5ff', color2: '#ff2fd4' },
  zerogravity: { shape: 'burst', color: '#4f8ef7', color2: '#ff6fc4' },
  darkmatter: { shape: 'wave', color: '#a855f7', color2: '#dc143c' },
  holographic: { shape: 'scan', color: '#4fe0ff', color2: '#a855f7' },
  eclipse: { shape: 'ring', color: '#f4c542', color2: '#fff6e0' },
  infinity: { shape: 'ring', color: '#4fe0ff', color2: '#7f5cef' },
  galaxycore: { shape: 'spiral', color: '#c67fef', color2: '#4fe0ff' },
  heavenearth: { shape: 'beam', color: '#e8b23e', color2: '#ffffff' },
  infernokingdom: { shape: 'wave', color: '#ff5a1e', color2: '#ffb23e' },
  cosmicocean: { shape: 'wave', color: '#4fe0d0', color2: '#4f8ef7' },
  goldenempire: { shape: 'burst', color: '#e8b23e', color2: '#fff6e0' },
  worldtree: { shape: 'beam', color: '#5fe0a0', color2: '#e8b23e' },
  dimensionalrift: { shape: 'crack', color: '#ff4ecb', color2: '#4fe0ff' },
  godstorm: { shape: 'bolt', color: '#ffd75e', color2: '#9fd6ff' },
  eternalicepalace: { shape: 'wave', color: '#ffffff', color2: '#4fc0e0' },
  universe: { shape: 'burst', color: '#ffffff', color2: '#c67fef' },
};

const HERO_LINES = 3;
const HERO_COMBO = 5;
const MEDIUM_LINES = 2;
const MEDIUM_COMBO = 3;

interface LegendaryExoticClearFXProps {
  event: ClearEvent | null;
  theme: GameTheme;
  reducedMotion: boolean;
}

export function LegendaryExoticClearFX({ event, theme, reducedMotion }: LegendaryExoticClearFXProps) {
  const [active, setActive] = useState<{ key: number; tier: 'medium' | 'hero'; box: { top: number; left: number; width: number; height: number } } | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current);
    if (!event || reducedMotion) return;
    const config = FX_CONFIG[theme.id];
    if (!config) return;

    const tier = event.lineCount >= HERO_LINES || event.combo >= HERO_COMBO ? 'hero' : event.lineCount >= MEDIUM_LINES || event.combo >= MEDIUM_COMBO ? 'medium' : null;
    if (!tier) return;

    let minR = BOARD_SIZE, maxR = 0, minC = BOARD_SIZE, maxC = 0;
    for (const [r, c] of event.cells) {
      if (r < minR) minR = r;
      if (r > maxR) maxR = r;
      if (c < minC) minC = c;
      if (c > maxC) maxC = c;
    }
    const box = {
      top: (minR / BOARD_SIZE) * 100,
      left: (minC / BOARD_SIZE) * 100,
      width: ((maxC - minC + 1) / BOARD_SIZE) * 100,
      height: ((maxR - minR + 1) / BOARD_SIZE) * 100,
    };

    setActive({ key: event.key, tier, box });
    timer.current = window.setTimeout(() => setActive(null), tier === 'hero' ? 850 : 650);
  }, [event, theme, reducedMotion]);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  if (!active) return null;
  const config = FX_CONFIG[theme.id];
  if (!config) return null;

  return (
    <div
      key={active.key}
      className={`clearfx clearfx--${config.shape} clearfx--${active.tier}`}
      style={{
        top: `${active.box.top}%`,
        left: `${active.box.left}%`,
        width: `${active.box.width}%`,
        height: `${active.box.height}%`,
        // @ts-expect-error custom properties
        '--fx-color': config.color,
        '--fx-color2': config.color2,
      }}
      aria-hidden="true"
    />
  );
}
