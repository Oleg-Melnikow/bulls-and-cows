import { Base, GameState } from '../types/types.js';
import { makeGuess, resetToSettings, startGame } from '../core/gameState.js';
import { generateSecret } from '../core/generateSecret.js';
import { createSettingsScreen } from './createSettingsScreen.js';
import { renderGameScreen } from './gameScreen.js';
import { isValidGuess } from '../core/isValidGuess.js';
import { evaluateGuess } from '../core/evaluateGuess.js';
import { getLeaderboard, saveRecord } from './leaderboard/leaderboardService.js';
import { renderLeaderboard } from './renderLeaderboard.js';

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
let lastSavedRoundKey: string | null = null;

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

function onClickMakeGuess(userGuess: string, root: HTMLElement): boolean {
  const isValid = isValidGuess(userGuess, globalState.settings.length, globalState.settings.base);

  if (!isValid) {
    return isValid;
  }

  const guessResult = evaluateGuess(globalState.secret, userGuess);

  globalState = makeGuess(globalState, {
    attempt: {
      guess: userGuess,
      bulls: guessResult.bulls,
      cows: guessResult.cows,
    },
    currentTime: Date.now(),
  });

  renderApp(root);
  return isValid;
}

export const renderApp = (rootContainer: HTMLElement): void => {
  while (rootContainer.firstChild) {
    rootContainer.removeChild(rootContainer.firstChild);
  }

  if (globalState.isWon && globalState.startTime && globalState.endTime) {
    const currentRoundKey = `${globalState.secret}-${globalState.attempts.length}-${globalState.startTime}`;

    if (lastSavedRoundKey !== currentRoundKey) {
      saveRecord({
        length: globalState.settings.length,
        base: globalState.settings.base,
        attemptsCount: globalState.attempts.length,
        duration: globalState.endTime - globalState.startTime,
      });

      lastSavedRoundKey = currentRoundKey;
    }
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

  const gameScreen = renderGameScreen({
    length: globalState.settings.length,
    base: globalState.settings.base,
    isWon: globalState.isWon,
    attempts: globalState.attempts,
    secret: globalState.secret,
    startTime: globalState.startTime,
    endTime: globalState.endTime,
    onMakeGuess: (userGuess: string) => onClickMakeGuess(userGuess, rootContainer),
    onReset: () => {
      globalState = resetToSettings(globalState);
      renderApp(rootContainer);
    },
  });

  const currentLeaderboardData = getLeaderboard();
  const leaderboardNode = renderLeaderboard(currentLeaderboardData);

  const gameCard = gameScreen.querySelector('.game-card');
  if (gameCard) {
    gameCard.appendChild(leaderboardNode);
  }

  rootContainer.appendChild(gameScreen);
};
