import { useEffect, useRef, useState } from 'react';
import { BOARD_SIZE } from '../game/types';
import type { ClearEvent } from '../game/useGameEngine';
import type { GameTheme } from '../theme/types';
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

interface ParticleLayerProps {
  event: ClearEvent | null;
  theme: GameTheme;
  reducedMotion: boolean;
}

const MAX_PARTICLES = 26;

let particleId = 0;

export function ParticleLayer({ event, theme, reducedMotion }: ParticleLayerProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [flash, setFlash] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!event) return;
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];

    setFlash(true);
    const flashTimer = window.setTimeout(() => setFlash(false), 260);
    timers.current.push(flashTimer);

    if (reducedMotion) return;

    const step = Math.max(1, Math.ceil(event.cells.length / MAX_PARTICLES));
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
    const clearTimer = window.setTimeout(() => setParticles([]), 700);
    timers.current.push(clearTimer);
  }, [event, theme, reducedMotion]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

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
