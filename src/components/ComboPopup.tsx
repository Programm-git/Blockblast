import { useEffect, useMemo, useState } from 'react';
import type { ClearEvent } from '../game/useGameEngine';
import type { GameTheme } from '../theme/types';
import './ComboPopup.css';

interface ComboPopupProps {
  event: ClearEvent | null;
  theme: GameTheme;
}

const SECRET_RARE_TEXTS = ['CHAIN_07', 'SYSTEM OVERLOAD'];

function padCombo(n: number): string {
  return String(n).padStart(2, '0');
}

export function ComboPopup({ event, theme }: ComboPopupProps) {
  const [visible, setVisible] = useState(false);
  const isSecret = theme.rarity === 'secret';

  useEffect(() => {
    if (!event) return;
    setVisible(true);
    const t = window.setTimeout(() => setVisible(false), 900);
    return () => window.clearTimeout(t);
  }, [event]);

  // Rare alternate flavor text at very high combos in the secret theme —
  // computed once per event, not on every render, so it doesn't flicker.
  const secretAltText = useMemo(() => {
    if (!event || event.combo < 8) return null;
    return Math.random() < 0.35 ? SECRET_RARE_TEXTS[Math.floor(Math.random() * SECRET_RARE_TEXTS.length)] : null;
  }, [event]);

  if (!event || !visible) return null;

  return (
    <div className={`combo-popup ${isSecret ? 'combo-popup--secret' : ''}`} style={{ color: theme.effects.comboColor }}>
      <div className="combo-popup-score">+{event.gainedScore}</div>
      {event.combo > 1 && (
        <div className="combo-popup-combo">
          {isSecret ? secretAltText ?? `COMBO_${padCombo(event.combo)}` : `COMBO ×${event.combo}`}
        </div>
      )}
      {event.lineCount > 1 && (
        <div className="combo-popup-lines">{isSecret ? `${event.lineCount}_LINES_CLEARED` : `${event.lineCount} LINES`}</div>
      )}
    </div>
  );
}
