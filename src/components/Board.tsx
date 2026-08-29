import { forwardRef } from 'react';
import type { Board as BoardModel } from '../game/types';
import { BOARD_SIZE } from '../game/types';
import type { GameTheme } from '../theme/types';
import { RARITY_INTENSITY } from '../theme/rarity';
import { Block } from './Block';
import './Board.css';

export interface GhostPreview {
  cells: Array<[number, number]>;
  valid: boolean;
  colorIndex: number;
}

interface BoardProps {
  theme: GameTheme;
  board: BoardModel;
  ghost: GhostPreview | null;
  clearingCells: Set<string> | null;
}

function cellKey(r: number, c: number): string {
  return `${r}:${c}`;
}

export const Board = forwardRef<HTMLDivElement, BoardProps>(function Board(
  { theme, board, ghost, clearingCells },
  ref,
) {
  const ghostSet = new Set(ghost?.cells.map(([r, c]) => cellKey(r, c)));

  const cells = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const key = cellKey(r, c);
      const value = board[r][c];
      const isClearing = clearingCells?.has(key) ?? false;
      const isGhost = ghostSet.has(key);
      cells.push(
        <div className="board-cell" key={key}>
          <div className="board-cell-empty" />
          {value && (
            <Block theme={theme} colorIndex={value.colorIndex} variant={isClearing ? 'clearing' : 'placed'} />
          )}
          {isGhost && !value && ghost && (
            <Block theme={theme} colorIndex={ghost.colorIndex} variant={ghost.valid ? 'ghost-valid' : 'ghost-invalid'} />
          )}
        </div>,
      );
    }
  }

  const frame = RARITY_INTENSITY[theme.rarity].boardFrame;
  const isSecret = theme.rarity === 'secret';

  return (
    <div className={`board-outer board-outer--${frame} ${isSecret ? 'board-outer--secret' : ''}`} ref={ref}>
      {frame === 'premium' && <div className="board-outer-glow" aria-hidden="true" />}
      {frame === 'exotic' && <div className="board-outer-glow board-outer-glow--exotic" aria-hidden="true" />}
      {frame === 'streak' && <div className="board-outer-glow board-outer-glow--streak" aria-hidden="true" />}
      <div className="board-grid">{cells}</div>
      {isSecret && <div className="board-secret-scanline" aria-hidden="true" />}
    </div>
  );
});
