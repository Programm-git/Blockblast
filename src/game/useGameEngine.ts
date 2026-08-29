import { useCallback, useRef, useState } from 'react';
import { BOARD_SIZE } from './types';
import type { Board, Shape } from './types';
import {
  canPlaceShapeAt,
  createEmptyBoard,
  createTray,
  clearLines,
  findFullLines,
  isGameOver as computeIsGameOver,
  placeShape,
  scoreForClear,
  scoreForPlacement,
} from './engine';
import { readBestScore, writeBestScore } from '../theme/ThemeContext';
import { DEFAULT_CLEAR_MS } from '../theme/themeBuilder';

export interface ClearEvent {
  key: number;
  rows: number[];
  cols: number[];
  lineCount: number;
  combo: number;
  gainedScore: number;
  /** Board-space cell coordinates that were cleared, for particle placement. */
  cells: Array<[number, number]>;
}

export interface GameEngineState {
  board: Board;
  tray: (Shape | null)[];
  score: number;
  best: number;
  combo: number;
  isGameOver: boolean;
  clearingCells: Set<string> | null;
  lastClearEvent: ClearEvent | null;
}

function cellKey(r: number, c: number): string {
  return `${r}:${c}`;
}

function makeInitialState(colorCount: number): GameEngineState {
  const board = createEmptyBoard();
  const tray = createTray(colorCount);
  return {
    board,
    tray,
    score: 0,
    best: readBestScore(),
    combo: 0,
    isGameOver: false,
    clearingCells: null,
    lastClearEvent: null,
  };
}

export interface MoveSettledInfo {
  score: number;
  lineCount: number;
  combo: number;
}

export function useGameEngine(
  colorCount: number,
  onMoveSettled?: (info: MoveSettledInfo) => void,
  clearAnimationMs: number = DEFAULT_CLEAR_MS,
) {
  const [state, setState] = useState<GameEngineState>(() => makeInitialState(colorCount));
  const clearTimer = useRef<number | null>(null);
  const eventCounter = useRef(0);

  const reset = useCallback(() => {
    if (clearTimer.current) window.clearTimeout(clearTimer.current);
    setState(makeInitialState(colorCount));
  }, [colorCount]);

  const canPlace = useCallback(
    (shape: Shape, row: number, col: number) => canPlaceShapeAt(state.board, shape, row, col),
    [state.board],
  );

  const placePiece = useCallback(
    (shapeId: string, row: number, col: number): boolean => {
      let didPlace = false;
      setState((prev) => {
        if (prev.isGameOver || prev.clearingCells) return prev;
        const shapeIndex = prev.tray.findIndex((s) => s?.id === shapeId);
        if (shapeIndex === -1) return prev;
        const shape = prev.tray[shapeIndex]!;
        if (!canPlaceShapeAt(prev.board, shape, row, col)) return prev;

        didPlace = true;
        const boardAfterPlace = placeShape(prev.board, shape, row, col);
        const placementScore = scoreForPlacement(shape.cells.length);
        const nextTray = prev.tray.slice();
        nextTray[shapeIndex] = null;

        const { rows, cols } = findFullLines(boardAfterPlace);

        if (rows.length === 0 && cols.length === 0) {
          const filledTray = nextTray.every((s) => s === null) ? createTray(colorCount) : nextTray;
          const nextScore = prev.score + placementScore;
          const gameOver = computeIsGameOver(boardAfterPlace, filledTray);
          const nextBest = Math.max(prev.best, nextScore);
          if (nextBest !== prev.best) writeBestScore(nextBest);
          onMoveSettled?.({ score: nextScore, lineCount: 0, combo: 0 });
          return {
            ...prev,
            board: boardAfterPlace,
            tray: filledTray,
            score: nextScore,
            combo: 0,
            best: nextBest,
            isGameOver: gameOver,
            clearingCells: null,
            lastClearEvent: null,
          };
        }

        const clearing = new Set<string>();
        const cells: Array<[number, number]> = [];
        for (let r = 0; r < BOARD_SIZE; r++) {
          for (let c = 0; c < BOARD_SIZE; c++) {
            if (rows.includes(r) || cols.includes(c)) {
              if (boardAfterPlace[r][c] !== null) {
                clearing.add(cellKey(r, c));
                cells.push([r, c]);
              }
            }
          }
        }

        const lineCount = rows.length + cols.length;
        const gainedScore = scoreForClear(lineCount, prev.combo);
        eventCounter.current += 1;
        const clearEvent: ClearEvent = {
          key: eventCounter.current,
          rows,
          cols,
          lineCount,
          combo: prev.combo + 1,
          gainedScore,
          cells,
        };

        const intermediateScore = prev.score + placementScore;
        const nextBest = Math.max(prev.best, intermediateScore);
        if (nextBest !== prev.best) writeBestScore(nextBest);

        if (clearTimer.current) window.clearTimeout(clearTimer.current);
        clearTimer.current = window.setTimeout(() => {
          setState((cur) => {
            const boardCleared = clearLines(boardAfterPlace, rows, cols);
            const filledTray = nextTray.every((s) => s === null) ? createTray(colorCount) : nextTray;
            const finalScore = cur.score + gainedScore;
            const gameOver = computeIsGameOver(boardCleared, filledTray);
            const finalBest = Math.max(cur.best, finalScore);
            if (finalBest !== cur.best) writeBestScore(finalBest);
            onMoveSettled?.({ score: finalScore, lineCount: clearEvent.lineCount, combo: clearEvent.combo });
            return {
              ...cur,
              board: boardCleared,
              tray: filledTray,
              score: finalScore,
              combo: clearEvent.combo,
              best: finalBest,
              isGameOver: gameOver,
              clearingCells: null,
              lastClearEvent: clearEvent,
            };
          });
        }, clearAnimationMs);

        return {
          ...prev,
          board: boardAfterPlace,
          tray: nextTray,
          score: intermediateScore,
          best: nextBest,
          clearingCells: clearing,
        };
      });
      return didPlace;
    },
    [colorCount, onMoveSettled, clearAnimationMs],
  );

  // Permanent game-over watchdog: recomputed fresh from board+tray on every
  // render rather than cached in state and pushed via an effect. A separate
  // effect that calls setState reacts to the placement that already caused
  // it, one render late, and layering that extra render/commit cycle onto
  // pointer-capture timing during a drag caused it to occasionally break
  // (browsers firing pointercancel with the drop mid-flight). Deriving it
  // during render is a pure computation with no such side channel, and it
  // can never miss a state change since it isn't cached at all — it's the
  // single, always-current source of truth for "no move is possible any
  // more", independent of whether the placement code path itself checked.
  const isGameOver = state.clearingCells ? state.isGameOver : computeIsGameOver(state.board, state.tray);
  const exposedState = isGameOver === state.isGameOver ? state : { ...state, isGameOver };

  return { state: exposedState, canPlace, placePiece, reset };
}
