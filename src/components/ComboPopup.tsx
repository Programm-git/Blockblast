import { useEffect, useState } from 'react';
import type { ClearEvent } from '../game/useGameEngine';
import type { GameTheme } from '../theme/types';
import './ComboPopup.css';

interface ComboPopupProps {
  event: ClearEvent | null;
  theme: GameTheme;
}

export function ComboPopup({ event, theme }: ComboPopupProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!event) return;
    setVisible(true);
    const t = window.setTimeout(() => setVisible(false), 900);
    return () => window.clearTimeout(t);
  }, [event]);

  if (!event || !visible) return null;

  return (
    <div className="combo-popup" style={{ color: theme.effects.comboColor }}>
      <div className="combo-popup-score">+{event.gainedScore}</div>
      {event.combo > 1 && <div className="combo-popup-combo">COMBO ×{event.combo}</div>}
      {event.lineCount > 1 && <div className="combo-popup-lines">{event.lineCount} LINES</div>}
    </div>
  );
}
