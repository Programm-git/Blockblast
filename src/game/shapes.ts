import type { Coord } from './types';

// Each entry is a set of relative [row, col] offsets, normalized to start at (0,0).
export const SHAPE_LIBRARY: Coord[][] = [
  // single
  [[0, 0]],
  // domino
  [[0, 0], [0, 1]],
  [[0, 0], [1, 0]],
  // tromino straight
  [[0, 0], [0, 1], [0, 2]],
  [[0, 0], [1, 0], [2, 0]],
  // tromino L
  [[0, 0], [1, 0], [1, 1]],
  [[0, 0], [0, 1], [1, 0]],
  [[0, 1], [1, 0], [1, 1]],
  [[0, 0], [0, 1], [1, 1]],
  // tetromino square
  [[0, 0], [0, 1], [1, 0], [1, 1]],
  // tetromino line
  [[0, 0], [0, 1], [0, 2], [0, 3]],
  [[0, 0], [1, 0], [2, 0], [3, 0]],
  // tetromino L
  [[0, 0], [1, 0], [2, 0], [2, 1]],
  [[0, 0], [0, 1], [1, 0], [2, 0]],
  [[0, 0], [0, 1], [1, 1], [2, 1]],
  [[2, 0], [2, 1], [1, 1], [0, 1]],
  // tetromino J-ish / S / Z variants
  [[0, 0], [0, 1], [0, 2], [1, 0]],
  [[0, 0], [0, 1], [0, 2], [1, 2]],
  [[1, 0], [1, 1], [1, 2], [0, 0]],
  [[1, 0], [1, 1], [1, 2], [0, 2]],
  // tetromino T
  [[0, 0], [0, 1], [0, 2], [1, 1]],
  [[1, 0], [1, 1], [1, 2], [0, 1]],
  [[0, 0], [1, 0], [2, 0], [1, 1]],
  [[0, 1], [1, 1], [2, 1], [1, 0]],
  // pentomino plus / big square
  [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]],
  [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]],
  // 3x3 square
  [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]],
  // L pentomino
  [[0, 0], [1, 0], [2, 0], [3, 0], [3, 1]],
  [[0, 0], [0, 1], [1, 0], [2, 0], [3, 0]],
  // corner big
  [[0, 0], [0, 1], [0, 2], [1, 0], [2, 0]],
  [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]],
  [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]],
  [[0, 2], [1, 2], [2, 2], [2, 1], [2, 0]],
];

let idCounter = 0;
export function nextShapeId(): string {
  idCounter += 1;
  return `shape-${idCounter}-${Date.now()}`;
}

export function randomShapeCells(): Coord[] {
  const template = SHAPE_LIBRARY[Math.floor(Math.random() * SHAPE_LIBRARY.length)];
  return template.map(([r, c]) => [r, c]);
}
