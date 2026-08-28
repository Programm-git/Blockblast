import { useCallback, useRef, useState } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { getThemeById } from '../theme/themes';
import { RARITY_LABEL, RARITY_WHEEL_WEIGHT } from '../theme/rarity';
import type { Rarity } from '../theme/types';
import './Wheel.css';

const SEGMENT_COLORS: Record<Rarity, string> = {
  common: '#8fa8bf',
  rare: '#4f8ef7',
  epic: '#a768e0',
  mythic: '#ff6fa5',
  legendary: '#f4c542',
  secret: '#00f7ff',
};

const WHEEL_RARITIES: Rarity[] = ['common', 'rare', 'epic', 'mythic', 'legendary'];

export function Wheel() {
  const { spin, wheelExhausted } = useTheme();
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [result, setResult] = useState<{ name: string; rarity: Rarity } | null>(null);
  const spinCount = useRef(0);

  const handleSpin = useCallback(() => {
    if (spinning || wheelExhausted) return;
    setSpinning(true);
    setResult(null);
    spinCount.current += 1;
    const extraTurns = 4 + Math.floor(Math.random() * 3);
    const randomOffset = Math.random() * 360;
    setAngle((prev) => prev + extraTurns * 360 + randomOffset);

    window.setTimeout(() => {
      const wonId = spin();
      setSpinning(false);
      if (wonId) {
        const won = getThemeById(wonId);
        setResult({ name: won.name, rarity: won.rarity });
      }
    }, 2200);
  }, [spin, spinning, wheelExhausted]);

  const segmentAngle = 360 / WHEEL_RARITIES.length;
  const gradient = WHEEL_RARITIES.map((r, i) => `${SEGMENT_COLORS[r]} ${i * segmentAngle}deg ${(i + 1) * segmentAngle}deg`).join(', ');

  return (
    <div className="wheel-section">
      <h2 className="wheel-title">GLÜCKSRAD</h2>
      <div className="wheel-wrap">
        <div className="wheel-pointer" />
        <div
          className="wheel-disc"
          style={{
            background: `conic-gradient(${gradient})`,
            transform: `rotate(${angle}deg)`,
            transition: spinning ? 'transform 2.1s cubic-bezier(0.15, 0.8, 0.15, 1)' : 'none',
          }}
        >
          {WHEEL_RARITIES.map((r, i) => (
            <span
              key={r}
              className="wheel-label"
              style={{ transform: `rotate(${i * segmentAngle + segmentAngle / 2}deg)` }}
            >
              {RARITY_LABEL[r].toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      <button className="btn btn--primary" onClick={handleSpin} disabled={spinning || wheelExhausted}>
        {wheelExhausted ? 'ALLE FREIGESCHALTET' : spinning ? 'DREHT...' : 'DREHEN'}
      </button>

      {result && (
        <div className="wheel-result" style={{ color: SEGMENT_COLORS[result.rarity] }}>
          <span className="wheel-result-rarity">{RARITY_LABEL[result.rarity].toUpperCase()}</span>
          <span className="wheel-result-name">{result.name}</span>
          <span className="wheel-result-sub">freigeschaltet!</span>
        </div>
      )}

      <div className="wheel-odds">
        {WHEEL_RARITIES.map((r) => (
          <span key={r} style={{ color: SEGMENT_COLORS[r] }}>
            {RARITY_LABEL[r]} {RARITY_WHEEL_WEIGHT[r]}%
          </span>
        ))}
      </div>
    </div>
  );
}
