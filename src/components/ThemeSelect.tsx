import type { GameTheme } from '../theme/types';
import './ThemeSelect.css';

interface ThemeSelectProps {
  themes: GameTheme[];
  activeId: string;
  isUnlocked: (id: string) => boolean;
  onSelect: (id: string) => void;
  onBack: () => void;
  mode: 'manual' | 'auto';
  onSetMode: (mode: 'manual' | 'auto') => void;
}

export function ThemeSelect({ themes, activeId, isUnlocked, onSelect, onBack, mode, onSetMode }: ThemeSelectProps) {
  return (
    <div className="theme-select">
      <div className="theme-select-header">
        <button className="btn btn--ghost btn--small" onClick={onBack}>
          ← ZURÜCK
        </button>
        <h2>THEMENWELTEN</h2>
      </div>

      <div className="theme-mode-toggle">
        <button
          className={`mode-btn ${mode === 'auto' ? 'mode-btn--active' : ''}`}
          onClick={() => onSetMode('auto')}
        >
          AUTOMATISCH
        </button>
        <button
          className={`mode-btn ${mode === 'manual' ? 'mode-btn--active' : ''}`}
          onClick={() => onSetMode('manual')}
        >
          MANUELL
        </button>
      </div>

      <div className="theme-grid">
        {themes.map((theme) => {
          const unlocked = isUnlocked(theme.id);
          const active = theme.id === activeId;
          return (
            <button
              key={theme.id}
              className={`theme-card ${active ? 'theme-card--active' : ''} ${!unlocked ? 'theme-card--locked' : ''}`}
              onClick={() => {
                if (unlocked) {
                  onSetMode('manual');
                  onSelect(theme.id);
                }
              }}
              disabled={!unlocked}
              style={{
                background: `linear-gradient(160deg, ${theme.background.gradient[0]}, ${theme.background.gradient[theme.background.gradient.length - 1]})`,
              }}
            >
              <div className="theme-card-board" style={{ background: theme.board.background, borderColor: theme.board.border }}>
                {theme.blocks.colors.slice(0, 3).map((c, i) => (
                  <span key={i} className="theme-card-swatch" style={{ background: c, borderRadius: theme.blocks.borderRadius * 0.6 }} />
                ))}
              </div>
              <div className="theme-card-name">{theme.name.toUpperCase()}</div>
              {!unlocked && <div className="theme-card-lock">🔒 {theme.unlockScore.toLocaleString('de-DE')} Pkt.</div>}
              {active && <div className="theme-card-active-badge">AKTIV</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
