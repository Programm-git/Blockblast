import { useState } from 'react';
import './App.css';
import { ThemeProvider, useTheme, readBestScore } from './theme/ThemeContext';
import { themeToCssVars } from './theme/cssVars';
import { useReducedMotion } from './hooks/useReducedMotion';
import { BackgroundDecor } from './components/BackgroundDecor';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';

type Screen = 'start' | 'game';

function AppShell() {
  const { theme } = useTheme();
  const reducedMotion = useReducedMotion();
  const [screen, setScreen] = useState<Screen>('start');
  const [best, setBest] = useState(() => readBestScore());

  return (
    <div className="app-root" style={themeToCssVars(theme)}>
      <BackgroundDecor theme={theme} reducedMotion={reducedMotion} />
      <div className="app-screen">
        {screen === 'start' && (
          <StartScreen theme={theme} best={best} onPlay={() => setScreen('game')} />
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
