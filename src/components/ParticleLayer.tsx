import { useEffect, useRef, useState } from 'react';
import { BOARD_SIZE } from '../game/types';
import type { ClearEvent } from '../game/useGameEngine';
import type { GameTheme } from '../theme/types';
import { RARITY_INTENSITY } from '../theme/rarity';
import './ParticleLayer.css';

interface Particle {
  id: number;
  left: number;
  top: number;
  dx: number;
  dy: number;
  delay: number;
  color: string;
}

interface DataBit {
  id: number;
  left: number;
  top: number;
  char: string;
}

interface ParticleLayerProps {
  event: ClearEvent | null;
  theme: GameTheme;
  reducedMotion: boolean;
}

const BASE_MAX_PARTICLES = 22;

let particleId = 0;

export function ParticleLayer({ event, theme, reducedMotion }: ParticleLayerProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dataBits, setDataBits] = useState<DataBit[]>([]);
  const [flash, setFlash] = useState(false);
  const timers = useRef<number[]>([]);
  const isSecret = theme.rarity === 'secret';
  // Legendary/Exotic themes already carry a bespoke per-block clear animation
  // (Block.css) plus, on bigger clears, a board-level hero-moment overlay
  // (LegendaryExoticClearFX) — stacking the generic confetti burst on top of
  // those was a third animating system competing for the same frames during
  // exactly the busiest, showiest clears. The flash still plays; only the
  // per-cell particle spawn is skipped.
  const skipConfetti = theme.rarity === 'legendary' || theme.rarity === 'exotic';

  useEffect(() => {
    if (!event) return;
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];

    setFlash(true);
    const flashTimer = window.setTimeout(() => setFlash(false), isSecret ? 90 : 260);
    timers.current.push(flashTimer);

    if (reducedMotion || skipConfetti) return;

    if (isSecret) {
      const bits: DataBit[] = event.cells.slice(0, 20).map(([r, c], i) => {
        particleId += 1;
        return {
          id: particleId,
          left: ((c + 0.5) / BOARD_SIZE) * 100,
          top: ((r + 0.5) / BOARD_SIZE) * 100,
          char: i % 2 === 0 ? '1' : '0',
        };
      });
      setDataBits(bits);
      const t = window.setTimeout(() => setDataBits([]), 420);
      timers.current.push(t);
      return;
    }

    const intensity = RARITY_INTENSITY[theme.rarity];
    const maxParticles = Math.round(BASE_MAX_PARTICLES * intensity.particleCountMul);
    const step = Math.max(1, Math.ceil(event.cells.length / maxParticles));
    const next: Particle[] = [];
    event.cells.forEach(([r, c], i) => {
      if (i % step !== 0) return;
      const color = theme.blocks.colors[i % theme.blocks.colors.length];
      particleId += 1;
      next.push({
        id: particleId,
        left: ((c + 0.5) / BOARD_SIZE) * 100,
        top: ((r + 0.5) / BOARD_SIZE) * 100,
        dx: (Math.random() - 0.5) * 60,
        dy: -30 - Math.random() * 40,
        delay: Math.random() * 0.08,
        color,
      });
    });
    setParticles(next);
    const clearTimer = window.setTimeout(() => setParticles([]), 700 / intensity.animSpeedMul);
    timers.current.push(clearTimer);
  }, [event, theme, reducedMotion, isSecret, skipConfetti]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  if (isSecret) {
    return (
      <div className="particle-layer" aria-hidden="true">
        {flash && <div className="particle-flash particle-flash--secret" />}
        {event && flash && <div className="secret-clear-scanline" />}
        {dataBits.map((b) => (
          <span key={b.id} className="secret-data-bit" style={{ left: `${b.left}%`, top: `${b.top}%` }}>
            {b.char}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="particle-layer" aria-hidden="true">
      {flash && <div className="particle-flash" style={{ background: theme.effects.clearColor }} />}
      {particles.map((p) => (
        <span
          key={p.id}
          className={`particle particle--${theme.effects.particleType}`}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            // @ts-expect-error custom properties
            '--dx': `${p.dx}px`,
            '--dy': `${p.dy}px`,
            '--delay': `${p.delay}s`,
            '--particle-color': p.color,
          }}
        />
      ))}
    </div>
  );
}
