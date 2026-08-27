import './ScoreBar.css';

interface ScoreBarProps {
  score: number;
  best: number;
  onMenu: () => void;
}

export function ScoreBar({ score, best, onMenu }: ScoreBarProps) {
  return (
    <div className="score-bar">
      <button className="score-bar-menu" onClick={onMenu} aria-label="Menu">
        ☰
      </button>
      <div className="score-bar-scores">
        <div className="score-box score-box--main">
          <span className="score-label">SCORE</span>
          <span className="score-value">{score.toLocaleString('de-DE')}</span>
        </div>
        <div className="score-box">
          <span className="score-label">BEST</span>
          <span className="score-value">{best.toLocaleString('de-DE')}</span>
        </div>
      </div>
    </div>
  );
}
