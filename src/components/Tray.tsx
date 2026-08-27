import type { PointerEvent as ReactPointerEvent } from 'react';
import type { Shape } from '../game/types';
import type { GameTheme } from '../theme/types';
import { TrayPiece } from './TrayPiece';
import './Tray.css';

interface TrayProps {
  tray: (Shape | null)[];
  theme: GameTheme;
  draggingShapeId: string | null;
  disabled: boolean;
  onDragStart: (shape: Shape, event: ReactPointerEvent<HTMLDivElement>) => void;
  onDragMove: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onDragEnd: (event: ReactPointerEvent<HTMLDivElement>) => void;
}

export function Tray({ tray, theme, draggingShapeId, disabled, onDragStart, onDragMove, onDragEnd }: TrayProps) {
  return (
    <div className="tray">
      {tray.map((shape, i) => (
        <TrayPiece
          key={shape?.id ?? `empty-${i}`}
          shape={shape}
          theme={theme}
          isDragging={shape?.id === draggingShapeId}
          disabled={disabled}
          onDragStart={onDragStart}
          onDragMove={onDragMove}
          onDragEnd={onDragEnd}
        />
      ))}
    </div>
  );
}
