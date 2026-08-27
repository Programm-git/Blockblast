import { useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { Shape } from '../game/types';
import { shapeBounds } from '../game/engine';
import type { GameTheme } from '../theme/types';
import { Block } from './Block';
import './TrayPiece.css';

interface TrayPieceProps {
  shape: Shape | null;
  theme: GameTheme;
  isDragging: boolean;
  disabled: boolean;
  onDragStart: (shape: Shape, event: ReactPointerEvent<HTMLDivElement>) => void;
  onDragMove: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onDragEnd: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onDragCancel: () => void;
}

const CELL_PX = 26;

export function TrayPiece({ shape, theme, isDragging, disabled, onDragStart, onDragMove, onDragEnd, onDragCancel }: TrayPieceProps) {
  // Tracks the pointer actively captured by this element, synchronously and
  // independent of React's render cycle. The `isDragging` prop only updates
  // after a re-render, so gating pointermove/pointerup on it can lose events
  // that arrive before that render commits (e.g. a fast drag-and-release) —
  // the drop would silently do nothing. This ref can't lag.
  const activePointerId = useRef<number | null>(null);

  if (!shape) {
    return <div className="tray-piece tray-piece--empty" aria-hidden="true" />;
  }

  const { rows, cols } = shapeBounds(shape);
  const filled = new Set(shape.cells.map(([r, c]) => `${r}:${c}`));

  const gridCells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const has = filled.has(`${r}:${c}`);
      gridCells.push(
        <div className="tray-piece-cell" key={`${r}:${c}`}>
          {has && <Block theme={theme} colorIndex={shape.colorIndex} variant="tray" />}
        </div>,
      );
    }
  }

  return (
    <div
      className={`tray-piece ${isDragging ? 'tray-piece--dragging' : ''}`}
      onPointerDown={(e) => {
        if (disabled) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        activePointerId.current = e.pointerId;
        onDragStart(shape, e);
      }}
      onPointerMove={(e) => {
        if (activePointerId.current === e.pointerId) onDragMove(e);
      }}
      onPointerUp={(e) => {
        if (activePointerId.current === e.pointerId) {
          activePointerId.current = null;
          if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
          }
          onDragEnd(e);
        }
      }}
      onPointerCancel={(e) => {
        // A cancel means the browser aborted the gesture (lost focus, a
        // system gesture took over, capture bookkeeping hiccuped) — it is
        // never a deliberate drop, so never attempt a placement from it;
        // just release capture and let the piece spring back to the tray.
        if (activePointerId.current === e.pointerId) {
          activePointerId.current = null;
          if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
          }
          onDragCancel();
        }
      }}
    >
      <div
        className="tray-piece-grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${CELL_PX}px)`,
          gridTemplateRows: `repeat(${rows}, ${CELL_PX}px)`,
        }}
      >
        {gridCells}
      </div>
    </div>
  );
}

export { CELL_PX as TRAY_CELL_PX };
