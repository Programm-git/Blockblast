# Block Puzzle

Ein eigenständiges 8×8-Block-Puzzle-Spiel mit klarer, klassischer Mechanik und acht
deutlich unterschiedlichen, wechselnden Themenwelten (Classic, Ocean, Sunset, Forest,
Candy, Night, Ice, Space).

## Entwicklung

```bash
npm install
npm run dev      # Dev-Server
npm run build    # Produktions-Build (tsc -b && vite build)
npm run lint      # oxlint
```

## Architektur

- `src/game/` – reine, UI-unabhängige Spiellogik (Board, Formen, Platzierung,
  Linien-Clearing, Scoring/Combo). Kein Bezug zu Themes.
- `src/theme/` – zentrales Theme-System (`GameTheme`-Interface, `ThemeProvider`/
  `useTheme` als ThemeManager mit `setTheme`, `nextTheme`, automatischem
  score-basiertem Wechsel). Blöcke speichern nur einen `colorIndex`; die Farbe
  wird zur Laufzeit aus dem aktiven Theme aufgelöst.
- `src/components/` – Darstellung (Board, Tray, Drag-Ghost, Partikel, Score,
  Menüs). Themes verändern ausschließlich das Aussehen, nie die Mechanik.

Ein Theme-Wechsel wird nur nach einem vollständig abgeschlossenen Zug (inkl.
Clear-Animation) angewendet und blendet über CSS-Variablen sanft ein (~500 ms).
