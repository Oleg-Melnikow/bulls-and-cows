import { Base, GameState } from '../types/types.js';
import { startGame } from '../core/gameState.js';
import { generateSecret } from '../core/generateSecret.js';
import { createSettingsScreen } from './createSettingsScreen.js';

const createInitialState = (): GameState =>
  Object.freeze({
    isSettingsPhase: true,
    settings: Object.freeze({ length: 4, base: Base.Dec }),
    secret: '',
    startTime: null,
    endTime: null,
    isWon: false,
    attempts: Object.freeze([]),
  });

let globalState: GameState = createInitialState();

function onClickStartGame(
  selectedLength: number,
  selectedBase: Base,
  rootContainer: HTMLElement
): void {
  const generatedSecret = generateSecret(selectedLength, selectedBase);
  const startTime = Date.now();
  globalState = startGame(globalState, generatedSecret, startTime);
  globalState = Object.freeze({
    ...globalState,
    settings: Object.freeze({ length: selectedLength, base: selectedBase }),
  });
  renderApp(rootContainer);
}

export const renderApp = (rootContainer: HTMLElement): void => {
  while (rootContainer.firstChild) {
    rootContainer.removeChild(rootContainer.firstChild);
  }

  if (globalState.isSettingsPhase) {
    const { base, length } = globalState.settings;
    const settingsScreen = createSettingsScreen({
      length,
      base,
      onStartGame: (selectedLength: number, selectedBase: Base) =>
        onClickStartGame(selectedLength, selectedBase, rootContainer),
    });

    rootContainer.append(settingsScreen);
    return;
  }
};
