import { BOARD_SIZE } from './types';
import type { Board, CellValue, Shape } from './types';
import { nextShapeId, randomShapeCells } from './shapes';

export function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, (): CellValue => null),
  );
}

export function createShape(colorCount: number): Shape {
  return {
    id: nextShapeId(),
    cells: randomShapeCells(),
    colorIndex: Math.floor(Math.random() * colorCount),
  };
}

export function createTray(colorCount: number): [Shape, Shape, Shape] {
  return [createShape(colorCount), createShape(colorCount), createShape(colorCount)];
}

/** Can `shape` be placed with its origin cell at (row, col)? */
export function canPlaceShapeAt(board: Board, shape: Shape, row: number, col: number): boolean {
  for (const [dr, dc] of shape.cells) {
    const r = row + dr;
    const c = col + dc;
    if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE) return false;
    if (board[r][c] !== null) return false;
  }
  return true;
}

/** Does `shape` fit anywhere at all on the board? */
export function canPlaceShapeAnywhere(board: Board, shape: Shape): boolean {
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (canPlaceShapeAt(board, shape, r, c)) return true;
    }
  }
  return false;
}

export function shapeBounds(shape: Shape): { rows: number; cols: number } {
  let maxRow = 0;
  let maxCol = 0;
  for (const [r, c] of shape.cells) {
    if (r > maxRow) maxRow = r;
    if (c > maxCol) maxCol = c;
  }
  return { rows: maxRow + 1, cols: maxCol + 1 };
}

export function isGameOver(board: Board, tray: (Shape | null)[]): boolean {
  for (const shape of tray) {
    if (shape && canPlaceShapeAnywhere(board, shape)) return false;
  }
  return true;
}

export function placeShape(board: Board, shape: Shape, row: number, col: number): Board {
  const next = board.map((r) => r.slice());
  for (const [dr, dc] of shape.cells) {
    next[row + dr][col + dc] = { colorIndex: shape.colorIndex };
  }
  return next;
}

export function findFullLines(board: Board): { rows: number[]; cols: number[] } {
  const rows: number[] = [];
  const cols: number[] = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    if (board[r].every((cell) => cell !== null)) rows.push(r);
  }
  for (let c = 0; c < BOARD_SIZE; c++) {
    let full = true;
    for (let r = 0; r < BOARD_SIZE; r++) {
      if (board[r][c] === null) {
        full = false;
        break;
      }
    }
    if (full) cols.push(c);
  }
  return { rows, cols };
}

export function clearLines(board: Board, rows: number[], cols: number[]): Board {
  if (rows.length === 0 && cols.length === 0) return board;
  const rowSet = new Set(rows);
  const colSet = new Set(cols);
  return board.map((row, r) =>
    row.map((cell, c) => (rowSet.has(r) || colSet.has(c) ? null : cell)),
  );
}

const PLACE_POINTS_PER_CELL = 2;
const LINE_CLEAR_BASE = 10;

/** Score for placing a shape (before any line clears). */
export function scoreForPlacement(cellCount: number): number {
  return cellCount * PLACE_POINTS_PER_CELL;
}

/**
 * Score for clearing lines in a single move, factoring in the number of
 * simultaneous lines and the current combo streak. Mechanically neutral
 * across themes — this is pure scoring math, no visuals involved.
 */
export function scoreForClear(lineCount: number, combo: number): number {
  if (lineCount === 0) return 0;
  const base = lineCount * LINE_CLEAR_BASE;
  const multiLineBonus = lineCount > 1 ? (lineCount - 1) * LINE_CLEAR_BASE : 0;
  const comboMultiplier = 1 + combo * 0.5;
  return Math.round((base + multiLineBonus) * comboMultiplier);
}
