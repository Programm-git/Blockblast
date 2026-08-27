import { useState } from 'react';
import './App.css';
import { ThemeProvider, useTheme, readBestScore } from './theme/ThemeContext';
import { themeToCssVars } from './theme/cssVars';
import { useReducedMotion } from './hooks/useReducedMotion';
import { BackgroundDecor } from './components/BackgroundDecor';
import { StartScreen } from './components/StartScreen';
import { ThemeSelect } from './components/ThemeSelect';
import { GameScreen } from './components/GameScreen';

type Screen = 'start' | 'themes' | 'game';

function AppShell() {
  const { theme, themeId, allThemes, isUnlocked, setTheme, mode, setMode } = useTheme();
  const reducedMotion = useReducedMotion();
  const [screen, setScreen] = useState<Screen>('start');
  const [best, setBest] = useState(() => readBestScore());

  return (
    <div className="app-root" style={themeToCssVars(theme)}>
      <BackgroundDecor theme={theme} reducedMotion={reducedMotion} />
      <div className="app-screen">
        {screen === 'start' && (
          <StartScreen
            theme={theme}
            best={best}
            onPlay={() => setScreen('game')}
            onThemes={() => setScreen('themes')}
          />
        )}
        {screen === 'themes' && (
          <ThemeSelect
            themes={allThemes}
            activeId={themeId}
            isUnlocked={isUnlocked}
            onSelect={setTheme}
            onBack={() => setScreen('start')}
            mode={mode}
            onSetMode={setMode}
          />
        )}
        {screen === 'game' && (
          <GameScreen
            onMenu={() => {
              setBest(readBestScore());
              setScreen('start');
            }}
          />
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}

export default App;
