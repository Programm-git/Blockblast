import { useEffect, useState } from 'react';
import './SecretOverlay.css';

const PHRASES = ['YOU FOUND IT', '???', 'NOT FOUND', 'KEEP PLAYING', '01001011', 'YOU SHOULD NOT BE HERE'];

/**
 * The Secret theme's background is deliberately calm almost all the time —
 * this renders the rare, brief glitch text the spec calls for, on its own
 * long, randomized timer. It never affects layout or input.
 */
export function SecretOverlay({ reducedMotion }: { reducedMotion: boolean }) {
  const [phrase, setPhrase] = useState<{ text: string; left: number; top: number } | null>(null);

  useEffect(() => {
    if (reducedMotion) return;
    let timer: number;
    const scheduleNext = () => {
      const delay = 14000 + Math.random() * 22000;
      timer = window.setTimeout(() => {
        setPhrase({
          text: PHRASES[Math.floor(Math.random() * PHRASES.length)],
          left: 15 + Math.random() * 70,
          top: 20 + Math.random() * 55,
        });
        window.setTimeout(() => setPhrase(null), 550);
        scheduleNext();
      }, delay);
    };
    scheduleNext();
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <div className="secret-overlay" aria-hidden="true">
      <div className="secret-grid" />
      {phrase && (
        <span className="secret-phrase" style={{ left: `${phrase.left}%`, top: `${phrase.top}%` }}>
          {phrase.text}
        </span>
      )}
    </div>
  );
}
