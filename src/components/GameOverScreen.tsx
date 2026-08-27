import type { GameTheme } from '../theme/types';
import './GameOverScreen.css';

interface GameOverScreenProps {
  theme: GameTheme;
  score: number;
  best: number;
  onRestart: () => void;
  onMenu: () => void;
}

export function GameOverScreen({ theme, score, best, onRestart, onMenu }: GameOverScreenProps) {
  const isNewBest = score > 0 && score >= best;
  return (
    <div className="game-over-backdrop">
      <div className="game-over-card">
        {isNewBest && <div className="game-over-badge" style={{ color: theme.ui.accent }}>NEW BEST!</div>}
        <h2 className="game-over-title">GAME OVER</h2>
        <div className="game-over-score">{score.toLocaleString('de-DE')}</div>
        <div className="game-over-best">Best: {best.toLocaleString('de-DE')}</div>
        <div className="game-over-actions">
          <button className="btn btn--primary" onClick={onRestart}>
            NOCHMAL SPIELEN
          </button>
          <button className="btn btn--ghost" onClick={onMenu}>
            MENÜ
          </button>
        </div>
      </div>
    </div>
  );
}
