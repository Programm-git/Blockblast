import { useCallback, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { useGameEngine } from '../game/useGameEngine';
import { canPlaceShapeAt, shapeBounds } from '../game/engine';
import { BOARD_SIZE } from '../game/types';
import type { Shape } from '../game/types';
import { useTheme } from '../theme/ThemeContext';
import { getClearDurationMs } from '../theme/themeBuilder';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Board } from './Board';
import type { GhostPreview } from './Board';
import { Tray } from './Tray';
import { DragGhost } from './DragGhost';
import { ScoreBar } from './ScoreBar';
import { ComboPopup } from './ComboPopup';
import { ParticleLayer } from './ParticleLayer';
import { GameOverScreen } from './GameOverScreen';

interface GameScreenProps {
  onMenu: () => void;
}

const FINGER_OFFSET_Y = 70;

interface DragState {
  shape: Shape;
  x: number;
  y: number;
}

export function GameScreen({ onMenu }: GameScreenProps) {
  const { theme, onMoveSettled } = useTheme();
  const reducedMotion = useReducedMotion();
  const boardRef = useRef<HTMLDivElement | null>(null);
  const [drag, setDrag] = useState<DragState | null>(null);

  const { state, placePiece, reset } = useGameEngine(
    theme.blocks.colors.length,
    onMoveSettled,
    getClearDurationMs(theme.blocks.material),
  );

  const computeTargetOrigin = useCallback((shape: Shape, clientX: number, clientY: number) => {
    const el = boardRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const cellSize = rect.width / BOARD_SIZE;
    const adjustedY = clientY - FINGER_OFFSET_Y;
    const { rows, cols } = shapeBounds(shape);
    const centerRow = Math.floor((rows - 1) / 2);
    const centerCol = Math.floor((cols - 1) / 2);
    const pointerCol = Math.floor((clientX - rect.left) / cellSize);
    const pointerRow = Math.floor((adjustedY - rect.top) / cellSize);
    return { row: pointerRow - centerRow, col: pointerCol - centerCol };
  }, []);

  const handleDragStart = useCallback((shape: Shape, e: ReactPointerEvent<HTMLDivElement>) => {
    setDrag({ shape, x: e.clientX, y: e.clientY });
  }, []);

  const handleDragMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    setDrag((prev) => (prev ? { ...prev, x: e.clientX, y: e.clientY } : prev));
  }, []);

  const handleDragEnd = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      // Read the in-flight drag directly instead of inside setDrag's updater:
      // updater functions must be pure, and calling placePiece (another
      // setState) from within one runs it twice under StrictMode's dev-only
      // double-invoke check, occasionally dropping or duplicating the move.
      if (drag) {
        const target = computeTargetOrigin(drag.shape, e.clientX, e.clientY);
        if (target) {
          placePiece(drag.shape.id, target.row, target.col);
        }
      }
      setDrag(null);
    },
    [drag, computeTargetOrigin, placePiece],
  );

  const handleDragCancel = useCallback(() => {
    setDrag(null);
  }, []);

  let ghost: GhostPreview | null = null;
  if (drag) {
    const target = computeTargetOrigin(drag.shape, drag.x, drag.y);
    if (target) {
      const valid = canPlaceShapeAt(state.board, drag.shape, target.row, target.col);
      ghost = {
        cells: drag.shape.cells.map(([r, c]) => [target.row + r, target.col + c] as [number, number]),
        valid,
        colorIndex: drag.shape.colorIndex,
      };
    }
  }

  const dragValid = ghost?.valid ?? false;
  const cellPx = boardRef.current ? boardRef.current.getBoundingClientRect().width / BOARD_SIZE : 40;

  return (
    <div className="game-screen">
      <ScoreBar score={state.score} best={state.best} onMenu={onMenu} isSecret={theme.rarity === 'secret'} />

      <div className="game-board-area">
        <Board ref={boardRef} theme={theme} board={state.board} ghost={ghost} clearingCells={state.clearingCells} />
        <ParticleLayer event={state.lastClearEvent} theme={theme} reducedMotion={reducedMotion} />
        <ComboPopup event={state.lastClearEvent} theme={theme} />
      </div>

      <Tray
        tray={state.tray}
        theme={theme}
        draggingShapeId={drag?.shape.id ?? null}
        disabled={state.isGameOver}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      />

      {drag && (
        <DragGhost shape={drag.shape} theme={theme} x={drag.x} y={drag.y - FINGER_OFFSET_Y} cellPx={cellPx} valid={dragValid} />
      )}

      {state.isGameOver && (
        <GameOverScreen theme={theme} score={state.score} best={state.best} onRestart={reset} onMenu={onMenu} />
      )}
    </div>
  );
}
