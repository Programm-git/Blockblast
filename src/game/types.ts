export type Coord = [row: number, col: number];

export interface Shape {
  id: string;
  cells: Coord[];
  colorIndex: number;
}

export type CellValue = { colorIndex: number } | null;

export type Board = CellValue[][];

export const BOARD_SIZE = 8;

export interface PlacementResult {
  board: Board;
  clearedRows: number[];
  clearedCols: number[];
  placedCells: number;
}

export interface GameState {
  board: Board;
  tray: (Shape | null)[];
  score: number;
  best: number;
  combo: number;
  isGameOver: boolean;
}
