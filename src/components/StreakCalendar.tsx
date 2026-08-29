import { useMemo } from 'react';
import { computeStreak, dateKey, isWeekend, readPlayedDates } from '../theme/streak';
import './StreakCalendar.css';

const WEEKDAY_LABELS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const MONTH_LABELS = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

interface DayCell {
  date: Date | null;
  key: string;
}

function buildMonthGrid(year: number, month: number): DayCell[] {
  const first = new Date(year, month, 1);
  // Monday-first grid: JS getDay() is 0=Sunday..6=Saturday.
  const leadingBlanks = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: DayCell[] = [];
  for (let i = 0; i < leadingBlanks; i++) cells.push({ date: null, key: `blank-${i}` });
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    cells.push({ date, key: dateKey(date) });
  }
  return cells;
}

export function StreakCalendar() {
  const playedDates = useMemo(() => readPlayedDates(), []);
  const today = useMemo(() => new Date(), []);
  const streak = useMemo(() => computeStreak(playedDates, today), [playedDates, today]);
  const todayKey = dateKey(today);

  const cells = useMemo(() => buildMonthGrid(today.getFullYear(), today.getMonth()), [today]);

  return (
    <div className="streak-calendar">
      <div className="streak-badge">
        <span className="streak-badge-flame">🔥</span>
        <span className="streak-badge-count">{streak}</span>
        <span className="streak-badge-label">{streak === 1 ? 'TAG STREAK' : 'TAGE STREAK'}</span>
      </div>
      <div className="streak-badge-hint">Wochenenden werden eingefroren ❄️</div>

      <div className="calendar-panel">
        <div className="calendar-month">{MONTH_LABELS[today.getMonth()]} {today.getFullYear()}</div>
        <div className="calendar-grid calendar-grid--head">
          {WEEKDAY_LABELS.map((w) => (
            <span key={w} className="calendar-weekday">{w}</span>
          ))}
        </div>
        <div className="calendar-grid">
          {cells.map((cell) => {
            if (!cell.date) return <span key={cell.key} className="calendar-cell calendar-cell--blank" />;
            const played = playedDates.has(cell.key);
            const weekend = isWeekend(cell.date);
            const isToday = cell.key === todayKey;
            const isFuture = cell.date.getTime() > today.getTime() && cell.key !== todayKey;
            const classes = [
              'calendar-cell',
              played ? 'calendar-cell--played' : '',
              weekend ? 'calendar-cell--weekend' : '',
              isToday ? 'calendar-cell--today' : '',
              isFuture ? 'calendar-cell--future' : '',
            ].filter(Boolean).join(' ');
            return (
              <span key={cell.key} className={classes}>
                {cell.date.getDate()}
                {weekend && !played && !isFuture && <span className="calendar-cell-frost">❄</span>}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
