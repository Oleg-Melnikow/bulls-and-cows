import { GameState, GuessPayload } from '../types/types.js';

export const startGame = (state: GameState, secret: string, startTime: number): GameState => {
  return Object.freeze({
    ...state,
    isSettingsPhase: false,
    secret,
    startTime,
    endTime: null,
    isWon: false,
    attempts: Object.freeze([]),
  });
};

export const makeGuess = (state: GameState, payload: GuessPayload): GameState => {
  if (state.isWon) {
    return state;
  }

  const { attempt, currentTime } = payload;
  const isWonRound = attempt.bulls === state.settings.length;

  return Object.freeze({
    ...state,
    isWon: isWonRound,
    endTime: isWonRound ? currentTime : state.endTime,
    attempts: Object.freeze([...state.attempts, attempt]),
  });
};

export const resetToSettings = (state: GameState): GameState => {
  return Object.freeze({
    ...state,
    isSettingsPhase: true,
    secret: '',
    startTime: null,
    endTime: null,
    isWon: false,
    attempts: Object.freeze([]),
  });
};
