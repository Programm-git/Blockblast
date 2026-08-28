import { useState } from 'react';
import './App.css';
import { ThemeProvider, useTheme, readBestScore } from './theme/ThemeContext';
import { themeToCssVars } from './theme/cssVars';
import { useReducedMotion } from './hooks/useReducedMotion';
import { BackgroundDecor } from './components/BackgroundDecor';
import { SecretOverlay } from './components/SecretOverlay';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { ThemeIndexScreen } from './components/ThemeIndexScreen';

type Screen = 'start' | 'game' | 'index';

function AppShell() {
  const { theme } = useTheme();
  const reducedMotion = useReducedMotion();
  const [screen, setScreen] = useState<Screen>('start');
  const [best, setBest] = useState(() => readBestScore());
  const isSecret = theme.rarity === 'secret';

  return (
    <div className="app-root" style={themeToCssVars(theme)}>
      {isSecret ? <SecretOverlay reducedMotion={reducedMotion} /> : <BackgroundDecor theme={theme} reducedMotion={reducedMotion} />}
      <div className="app-screen">
        {screen === 'start' && (
          <StartScreen theme={theme} best={best} onPlay={() => setScreen('game')} onIndex={() => setScreen('index')} />
        )}
        {screen === 'index' && <ThemeIndexScreen onBack={() => setScreen('start')} />}
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
