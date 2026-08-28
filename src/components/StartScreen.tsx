import type { GameTheme } from '../theme/types';
import './StartScreen.css';

interface StartScreenProps {
  theme: GameTheme;
  best: number;
  onPlay: () => void;
  onIndex: () => void;
}

const DECOR_SHAPES = [
  { top: '12%', left: '10%', size: 46, rot: -12, colorSlot: 0 },
  { top: '20%', left: '78%', size: 34, rot: 18, colorSlot: 2 },
  { top: '68%', left: '14%', size: 30, rot: 8, colorSlot: 4 },
  { top: '74%', left: '80%', size: 42, rot: -20, colorSlot: 1 },
  { top: '46%', left: '4%', size: 22, rot: 30, colorSlot: 3 },
  { top: '40%', left: '90%', size: 26, rot: -10, colorSlot: 5 },
];

export function StartScreen({ theme, best, onPlay, onIndex }: StartScreenProps) {
  return (
    <div className="start-screen">
      <div className="start-decor" aria-hidden="true">
        {DECOR_SHAPES.map((s, i) => (
          <div
            key={i}
            className="start-decor-block"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              transform: `rotate(${s.rot}deg)`,
              background: theme.blocks.colors[s.colorSlot % theme.blocks.colors.length],
              borderRadius: theme.blocks.borderRadius,
            }}
          />
        ))}
      </div>

      <div className="start-content">
        <h1 className="start-title">BLOCK PUZZLE</h1>
        <div className="start-theme-name" style={{ color: theme.ui.accent }}>
          {theme.name.toUpperCase()}
        </div>

        <div className="start-best">
          <span className="start-best-label">BEST</span>
          <span className="start-best-value">{best.toLocaleString('de-DE')}</span>
        </div>

        <button className="btn btn--primary btn--big" onClick={onPlay}>
          SPIELEN
        </button>
        <button className="btn btn--ghost" onClick={onIndex}>
          INDEX
        </button>
      </div>
    </div>
  );
}
