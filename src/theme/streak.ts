const PLAYED_DATES_KEY = 'blockblast:playedDates';

/** Local-time YYYY-MM-DD, so the streak follows the player's own calendar
 *  day rather than UTC. */
export function dateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function isWeekend(d: Date): boolean {
  const day = d.getDay();
  return day === 0 || day === 6;
}

export function readPlayedDates(): Set<string> {
  try {
    const raw = localStorage.getItem(PLAYED_DATES_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function writePlayedDates(dates: Set<string>) {
  try {
    localStorage.setItem(PLAYED_DATES_KEY, JSON.stringify([...dates]));
  } catch {
    // ignore storage failures (private mode, quota, etc.)
  }
}

/** Marks today as played. Idempotent — safe to call on every game session. */
export function recordPlayedToday(): void {
  const key = dateKey(new Date());
  const dates = readPlayedDates();
  if (dates.has(key)) return;
  dates.add(key);
  writePlayedDates(dates);
}

/** Consecutive-day play streak, counting backward from today. Weekend days
 *  with no recorded play are "frozen" — skipped without breaking the chain —
 *  since only a missed weekday actually ends the streak. If today hasn't
 *  been played yet, the count starts from yesterday instead (the day isn't
 *  over yet, so it can't have broken anything). */
export function computeStreak(playedDates: Set<string>, today: Date = new Date()): number {
  const cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (!playedDates.has(dateKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (true) {
    const key = dateKey(cursor);
    if (playedDates.has(key)) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }
    if (isWeekend(cursor)) {
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }
    break;
  }
  return streak;
}
