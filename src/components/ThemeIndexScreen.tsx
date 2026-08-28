import { useTheme } from '../theme/ThemeContext';
import { RARITY_LABEL, RARITY_ORDER } from '../theme/rarity';
import { themesByRarity } from '../theme/themes';
import type { GameTheme, Rarity } from '../theme/types';
import './ThemeIndexScreen.css';

interface ThemeIndexScreenProps {
  onBack: () => void;
}

function IndexCard({ theme, unlocked, active, onSelect }: { theme: GameTheme; unlocked: boolean; active: boolean; onSelect: () => void }) {
  const isSecret = theme.rarity === 'secret';

  if (!unlocked) {
    if (isSecret) {
      return (
        <div className="index-card index-card--secret-locked">
          <div className="index-card-secret-glitch">???</div>
          <div className="index-card-name">SECRET</div>
          <div className="index-card-lock">LOCKED</div>
        </div>
      );
    }
    return (
      <div className={`index-card index-card--locked index-card--${theme.rarity}`}>
        <div className="index-card-silhouette" />
        <div className="index-card-name">{theme.name.toUpperCase()}</div>
        <div className="index-card-lock">🔒 LOCKED</div>
      </div>
    );
  }

  return (
    <button
      className={`index-card index-card--${theme.rarity} ${active ? 'index-card--active' : ''}`}
      onClick={onSelect}
      style={{ background: `linear-gradient(160deg, ${theme.background.gradient[0]}, ${theme.background.gradient[theme.background.gradient.length - 1]})` }}
    >
      {(theme.rarity === 'mythic' || theme.rarity === 'legendary') && <div className="index-card-shine" />}
      <div className="index-card-board" style={{ background: theme.board.background, borderColor: theme.board.border }}>
        {theme.blocks.colors.slice(0, 3).map((c, i) => (
          <span key={i} className="index-card-swatch" style={{ background: c, borderRadius: theme.blocks.borderRadius * 0.6 }} />
        ))}
      </div>
      <div className="index-card-name">{theme.name.toUpperCase()}</div>
      {active && <div className="index-card-active-badge">AKTIV</div>}
    </button>
  );
}

export function ThemeIndexScreen({ onBack }: ThemeIndexScreenProps) {
  const { themeId, isUnlocked, setTheme } = useTheme();
  const unlockedCount = RARITY_ORDER.reduce((sum, r) => sum + themesByRarity(r).filter((t) => isUnlocked(t.id)).length, 0);

  return (
    <div className="theme-index">
      <div className="theme-index-header">
        <button className="btn btn--ghost btn--small" onClick={onBack}>
          ← ZURÜCK
        </button>
        <h2>INDEX</h2>
        <span className="theme-index-count">{unlockedCount} / 51</span>
      </div>

      {RARITY_ORDER.map((rarity: Rarity) => (
        <section key={rarity} className="theme-index-section">
          <h3 className={`theme-index-section-title theme-index-section-title--${rarity}`}>{RARITY_LABEL[rarity].toUpperCase()}</h3>
          <div className="theme-index-grid">
            {themesByRarity(rarity).map((theme) => (
              <IndexCard
                key={theme.id}
                theme={theme}
                unlocked={isUnlocked(theme.id)}
                active={theme.id === themeId}
                onSelect={() => setTheme(theme.id)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
