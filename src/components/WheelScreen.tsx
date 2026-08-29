import { Wheel } from './Wheel';
import { StreakCalendar } from './StreakCalendar';
import './WheelScreen.css';

interface WheelScreenProps {
  onBack: () => void;
}

export function WheelScreen({ onBack }: WheelScreenProps) {
  return (
    <div className="wheel-screen">
      <button className="btn btn--ghost btn--small wheel-screen-back" onClick={onBack}>
        ← ZURÜCK
      </button>
      <Wheel />
      <StreakCalendar />
    </div>
  );
}
