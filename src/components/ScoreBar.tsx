import { useEffect, useRef, useState } from 'react';
import './ScoreBar.css';

interface ScoreBarProps {
  score: number;
  best: number;
  onMenu: () => void;
  isSecret?: boolean;
}

const GLITCH_CHARS = '#X01?';

function glitchText(value: string): string {
  const chars = value.split('');
  const idx = Math.floor(Math.random() * chars.length);
  if (/\d/.test(chars[idx])) {
    chars[idx] = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
  }
  return chars.join('');
}

/** Very sparingly flickers a digit or two of the score for a fraction of a
 *  second — a purely cosmetic Secret-theme touch, never affecting the value. */
function useOccasionalGlitch(text: string, active: boolean): string {
  const [display, setDisplay] = useState(text);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    setDisplay(text);
    if (!active) return;
    const scheduleNext = () => {
      const delay = 8000 + Math.random() * 14000;
      timer.current = window.setTimeout(() => {
        setDisplay(glitchText(text));
        window.setTimeout(() => setDisplay(text), 90);
        scheduleNext();
      }, delay);
    };
    scheduleNext();
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [text, active]);

  return display;
}

export function ScoreBar({ score, best, onMenu, isSecret }: ScoreBarProps) {
  const scoreText = score.toLocaleString('de-DE');
  const displayScore = useOccasionalGlitch(scoreText, Boolean(isSecret));

  return (
    <div className="score-bar">
      <button className="score-bar-menu" onClick={onMenu} aria-label="Menu">
        ☰
      </button>
      <div className="score-bar-scores">
        <div className="score-box score-box--main">
          <span className="score-label">SCORE</span>
          <span className="score-value">{displayScore}</span>
        </div>
        <div className="score-box">
          <span className="score-label">BEST</span>
          <span className="score-value">{best.toLocaleString('de-DE')}</span>
        </div>
      </div>
    </div>
  );
}
