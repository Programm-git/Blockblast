import type { Shape } from '../game/types';
import { shapeBounds } from '../game/engine';
import type { GameTheme } from '../theme/types';
import { Block } from './Block';
import './DragGhost.css';

interface DragGhostProps {
  shape: Shape;
  theme: GameTheme;
  x: number;
  y: number;
  cellPx: number;
  valid: boolean;
}

export function DragGhost({ shape, theme, x, y, cellPx, valid }: DragGhostProps) {
  const { rows, cols } = shapeBounds(shape);
  const filled = new Set(shape.cells.map(([r, c]) => `${r}:${c}`));

  const gridCells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const has = filled.has(`${r}:${c}`);
      gridCells.push(
        <div className="drag-ghost-cell" key={`${r}:${c}`}>
          {has && <Block theme={theme} colorIndex={shape.colorIndex} variant={valid ? 'placed' : 'ghost-invalid'} />}
        </div>,
      );
    }
  }

  return (
    <div
      className="drag-ghost"
      style={{
        left: x - (cols * cellPx) / 2,
        top: y - (rows * cellPx) / 2,
        width: cols * cellPx,
        height: rows * cellPx,
      }}
    >
      <div
        className="drag-ghost-grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${cellPx}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellPx}px)`,
        }}
      >
        {gridCells}
      </div>
    </div>
  );
}
