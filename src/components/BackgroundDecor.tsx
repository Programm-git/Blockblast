import { useMemo } from 'react';
import type { GameTheme } from '../theme/types';
import { RARITY_INTENSITY } from '../theme/rarity';
import './BackgroundDecor.css';

interface BackgroundDecorProps {
  theme: GameTheme;
  reducedMotion: boolean;
}

const PARTICLE_DECORS = new Set([
  'bubbles', 'snow', 'leaves', 'petals', 'embers', 'sand', 'fireflies', 'ash', 'runes', 'sparkle', 'stars',
]);
const WAVE_DECORS = new Set(['aurora', 'nebula', 'clouds']);
const FLASH_DECORS = new Set(['lightning', 'glitch']);
/** Streak themes fly their milestone number around the background instead of
 *  an abstract particle, so the day count itself is the decor. */
const DIGIT_DECOR_LABEL: Partial<Record<string, string>> = {
  streak7: '7',
  streak14: '14',
  streak31: '31',
};

const BASE_COUNT = 9;

export function BackgroundDecor({ theme, reducedMotion }: BackgroundDecorProps) {
  const decor = theme.background.decor;
  const intensity = RARITY_INTENSITY[theme.rarity];
  const count = Math.min(22, Math.round(BASE_COUNT * intensity.decorCountMul));

  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 97 + 13) % 100,
        top: (i * 53 + 7) % 100,
        size: 6 + ((i * 37) % 18),
        duration: (14 + ((i * 23) % 16)) / intensity.animSpeedMul,
        delay: -((i * 7) % 14),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, intensity.animSpeedMul],
  );

  if (decor === 'none') return null;

  const digitLabel = DIGIT_DECOR_LABEL[decor];
  if (digitLabel) {
    return (
      <div className="bg-decor bg-decor--digits" aria-hidden="true">
        {items.map((item) => (
          <span
            key={item.id}
            className="bg-decor-digit"
            style={{
              left: `${item.left}%`,
              fontSize: item.size + 18,
              animationDuration: reducedMotion ? '0s' : `${item.duration}s`,
              animationDelay: `${item.delay}s`,
              animationPlayState: reducedMotion ? 'paused' : 'running',
            }}
          >
            {digitLabel}
          </span>
        ))}
      </div>
    );
  }

  if (PARTICLE_DECORS.has(decor)) {
    return (
      <div className={`bg-decor bg-decor--${decor}`} aria-hidden="true">
        {items.map((item) => (
          <span
            key={item.id}
            className="bg-decor-item"
            style={{
              left: `${item.left}%`,
              top: decor === 'stars' || decor === 'sparkle' ? `${item.top}%` : undefined,
              width: item.size,
              height: item.size,
              animationDuration: reducedMotion ? '0s' : `${item.duration}s`,
              animationDelay: `${item.delay}s`,
              animationPlayState: reducedMotion ? 'paused' : 'running',
            }}
          />
        ))}
      </div>
    );
  }

  if (WAVE_DECORS.has(decor)) {
    const blobCount = decor === 'clouds' ? 4 : 3;
    return (
      <div className={`bg-decor bg-decor--${decor}`} aria-hidden="true">
        {Array.from({ length: blobCount }, (_, i) => (
          <span
            key={i}
            className="bg-decor-blob"
            style={{
              left: `${(i * 41 + 8) % 100}%`,
              top: `${(i * 29 + 5) % 70}%`,
              animationDuration: reducedMotion ? '0s' : `${(26 + i * 6) / intensity.animSpeedMul}s`,
              animationDelay: `${-i * 5}s`,
              animationPlayState: reducedMotion ? 'paused' : 'running',
            }}
          />
        ))}
      </div>
    );
  }

  if (FLASH_DECORS.has(decor)) {
    if (reducedMotion) return null;
    return (
      <div className={`bg-decor bg-decor--${decor}`} aria-hidden="true">
        <span className="bg-decor-flash" style={{ animationDuration: `${7 / intensity.animSpeedMul}s` }} />
      </div>
    );
  }

  if (decor === 'gears') {
    return (
      <div className="bg-decor bg-decor--gears" aria-hidden="true">
        <span className="bg-decor-gear" style={{ animationDuration: reducedMotion ? '0s' : `${40 / intensity.animSpeedMul}s`, left: '10%', top: '15%' }} />
        <span className="bg-decor-gear bg-decor-gear--rev" style={{ animationDuration: reducedMotion ? '0s' : `${55 / intensity.animSpeedMul}s`, right: '8%', bottom: '10%' }} />
      </div>
    );
  }

  return null;
}
