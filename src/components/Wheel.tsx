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
const SEGMENT_ANGLE = 360 / WHEEL_RARITIES.length;

export function Wheel() {
  const { spin, wheelExhausted } = useTheme();
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [result, setResult] = useState<{ name: string; rarity: Rarity } | null>(null);
  const angleRef = useRef(0);
  const pendingResult = useRef<{ name: string; rarity: Rarity } | null>(null);

  const handleSpin = useCallback(() => {
    if (spinning || wheelExhausted) return;

    // Decide the actual prize first, then aim the wheel's rotation at that
    // exact segment — previously the spin angle was picked independently of
    // the result, so the wheel could visibly land on the wrong rarity.
    const wonId = spin();
    if (!wonId) return;
    const won = getThemeById(wonId);
    pendingResult.current = { name: won.name, rarity: won.rarity };

    setSpinning(true);
    setResult(null);

    const segmentIndex = WHEEL_RARITIES.indexOf(won.rarity);
    const segmentCenter = segmentIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    const jitter = (Math.random() - 0.5) * (SEGMENT_ANGLE * 0.6);
    const targetWithinSegment = segmentCenter + jitter;
    // The disc rotates clockwise by `angle`; the pointer is fixed at the
    // top (0deg). A segment centered at `targetWithinSegment` (measured
    // clockwise from the disc's own top) sits under the pointer once the
    // disc's total rotation, mod 360, equals (360 - targetWithinSegment).
    const desiredFinalMod = (360 - targetWithinSegment + 360) % 360;
    const currentMod = ((angleRef.current % 360) + 360) % 360;
    const extraTurns = 4 + Math.floor(Math.random() * 3);
    const delta = extraTurns * 360 + ((desiredFinalMod - currentMod + 360) % 360);

    const nextAngle = angleRef.current + delta;
    angleRef.current = nextAngle;
    setAngle(nextAngle);

    window.setTimeout(() => {
      setSpinning(false);
      setResult(pendingResult.current);
    }, 2200);
  }, [spin, spinning, wheelExhausted]);

  const gradient = WHEEL_RARITIES.map((r, i) => `${SEGMENT_COLORS[r]} ${i * SEGMENT_ANGLE}deg ${(i + 1) * SEGMENT_ANGLE}deg`).join(', ');

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
              style={{ transform: `rotate(${i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2}deg)` }}
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
