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
}

const CELL_PX = 26;

export function TrayPiece({ shape, theme, isDragging, disabled, onDragStart, onDragMove, onDragEnd }: TrayPieceProps) {
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
        onDragStart(shape, e);
      }}
      onPointerMove={(e) => {
        if (isDragging) onDragMove(e);
      }}
      onPointerUp={(e) => {
        if (isDragging) onDragEnd(e);
      }}
      onPointerCancel={(e) => {
        if (isDragging) onDragEnd(e);
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
