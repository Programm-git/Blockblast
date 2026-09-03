import { useCallback, useMemo, useRef, useState } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { getThemeById } from '../theme/themes';
import { RARITY_LABEL, RARITY_WHEEL_WEIGHT, WHEEL_RARITIES } from '../theme/rarity';
import type { Rarity } from '../theme/types';
import './Wheel.css';

const SEGMENT_COLORS: Record<Rarity, string> = {
  common: '#9fb4c8',
  rare: '#4f8ef7',
  epic: '#a768e0',
  mythic: '#ff6fa5',
  legendary: '#f4c542',
  exotic: '#c75af6',
  secret: '#00f7ff',
  // Unused by the wheel itself (Streak is excluded via WHEEL_RARITIES below)
  // — present only so this stays a total Record<Rarity, string>.
  streak: '#ff8a3d',
};

/** Exotic's wheel slice sweeps cyan -> violet -> pink instead of a flat
 *  fill, so it visibly stands apart from Legendary's solid gold even on
 *  the wheel itself (spec: distinct in kind, not just "more gold"). */
const EXOTIC_SWEEP = ['#00f7ff', '#a855f7', '#ff6fc4'];

interface Segment {
  rarity: Rarity;
  start: number;
  end: number;
}

function buildSegments(): Segment[] {
  const total = WHEEL_RARITIES.reduce((sum, r) => sum + RARITY_WHEEL_WEIGHT[r], 0);
  let cursor = 0;
  return WHEEL_RARITIES.map((rarity) => {
    const span = (RARITY_WHEEL_WEIGHT[rarity] / total) * 360;
    const seg: Segment = { rarity, start: cursor, end: cursor + span };
    cursor += span;
    return seg;
  });
}

const BULB_COUNT = 16;

export function Wheel() {
  const { spin, wheelExhausted } = useTheme();
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [result, setResult] = useState<{ name: string | null; rarity: Rarity } | null>(null);
  const angleRef = useRef(0);
  const pendingResult = useRef<{ name: string | null; rarity: Rarity } | null>(null);

  const segments = useMemo(() => buildSegments(), []);
  const bulbs = useMemo(() => Array.from({ length: BULB_COUNT }, (_, i) => (i / BULB_COUNT) * 360), []);

  const handleSpin = useCallback(() => {
    if (spinning || wheelExhausted) return;

    // Decide the actual prize first, then aim the wheel's rotation at that
    // exact segment — the animation must always land where the result says.
    // A roll can land on a rarity that's already fully unlocked (themeId
    // null) — a genuine miss, shown as such rather than silently awarding
    // something from a different tier (that's what used to make Legendary+
    // a guaranteed hit once every Common/Rare/Epic/Mythic was gone).
    const rolled = spin();
    if (!rolled) return;
    const wonName = rolled.themeId ? getThemeById(rolled.themeId).name : null;
    pendingResult.current = { name: wonName, rarity: rolled.rarity };

    setSpinning(true);
    setResult(null);

    const seg = segments.find((s) => s.rarity === rolled.rarity)!;
    const span = seg.end - seg.start;
    const jitter = (Math.random() - 0.5) * (span * 0.6);
    const targetWithinSegment = (seg.start + seg.end) / 2 + jitter;
    // The disc rotates clockwise by `angle`; the pointer is fixed at the
    // top (0deg). A point at local angle θ (clockwise from the disc's own
    // top) sits under the pointer once the disc's total rotation, mod 360,
    // equals (360 - θ).
    const desiredFinalMod = (360 - targetWithinSegment + 360) % 360;
    const currentMod = ((angleRef.current % 360) + 360) % 360;
    const extraTurns = 5 + Math.floor(Math.random() * 3);
    const delta = extraTurns * 360 + ((desiredFinalMod - currentMod + 360) % 360);

    const nextAngle = angleRef.current + delta;
    angleRef.current = nextAngle;
    setAngle(nextAngle);

    window.setTimeout(() => {
      setSpinning(false);
      setResult(pendingResult.current);
    }, 3200);
  }, [spin, spinning, wheelExhausted, segments]);

  const gradient = segments
    .map((s) => {
      if (s.rarity !== 'exotic') return `${SEGMENT_COLORS[s.rarity]} ${s.start}deg ${s.end}deg`;
      const stops = EXOTIC_SWEEP.map((color, i) => {
        const t = i / (EXOTIC_SWEEP.length - 1);
        return `${color} ${s.start + (s.end - s.start) * t}deg`;
      });
      return stops.join(', ');
    })
    .join(', ');

  return (
    <div className="wheel-section">
      <h2 className="wheel-title">GLÜCKSRAD</h2>

      <div className={`wheel-wrap ${spinning ? 'wheel-wrap--spinning' : ''}`}>
        <div className="wheel-glow-ring" />
        <div className="wheel-bulb-ring">
          {bulbs.map((deg, i) => (
            <span key={i} className="wheel-bulb" style={{ transform: `rotate(${deg}deg) translateY(-118px)`, animationDelay: `${(i % 4) * 0.18}s` }} />
          ))}
        </div>
        <div className="wheel-pointer">
          <div className="wheel-pointer-gem" />
        </div>
        <div
          className="wheel-disc"
          style={{
            background: `conic-gradient(${gradient})`,
            transform: `rotate(${angle}deg)`,
            transition: spinning ? 'transform 3.1s cubic-bezier(0.1, 0.7, 0.1, 1)' : 'none',
          }}
        >
          {segments
            .filter((s) => s.end - s.start > 8)
            .map((s) => (
              <span
                key={s.rarity}
                className={`wheel-label wheel-label--${s.rarity}`}
                style={{ transform: `rotate(${(s.start + s.end) / 2}deg)` }}
              >
                {RARITY_LABEL[s.rarity].toUpperCase()}
              </span>
            ))}
          <div className="wheel-disc-sheen" />
        </div>
        <div className="wheel-hub">
          <div className="wheel-hub-inner" />
        </div>
      </div>

      <button className="wheel-spin-btn" onClick={handleSpin} disabled={spinning || wheelExhausted}>
        {wheelExhausted ? 'ALLE FREIGESCHALTET' : spinning ? 'DREHT...' : 'DREHEN'}
      </button>

      {result && (
        <div className={`wheel-result wheel-result--${result.rarity}`} style={{ color: SEGMENT_COLORS[result.rarity] }}>
          <span className="wheel-result-rarity">{RARITY_LABEL[result.rarity].toUpperCase()}</span>
          {result.name ? (
            <>
              <span className="wheel-result-name">{result.name}</span>
              <span className="wheel-result-sub">freigeschaltet!</span>
            </>
          ) : (
            <>
              <span className="wheel-result-name wheel-result-name--miss">Schon alles da</span>
              <span className="wheel-result-sub">kein neues Thema diesmal</span>
            </>
          )}
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
