import { useMemo } from 'react';
import type { GameTheme } from '../theme/types';
import './BackgroundDecor.css';

interface BackgroundDecorProps {
  theme: GameTheme;
  reducedMotion: boolean;
}

const COUNT = 10;

export function BackgroundDecor({ theme, reducedMotion }: BackgroundDecorProps) {
  const items = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        id: i,
        left: (i * 97 + 13) % 100,
        size: 6 + ((i * 37) % 18),
        duration: 14 + ((i * 23) % 16),
        delay: -((i * 7) % 14),
      })),
    [],
  );

  const decor = theme.background.decor;
  if (decor === 'none') return null;

  return (
    <div className={`bg-decor bg-decor--${decor}`} aria-hidden="true">
      {items.map((item) => (
        <span
          key={item.id}
          className="bg-decor-item"
          style={{
            left: `${item.left}%`,
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
