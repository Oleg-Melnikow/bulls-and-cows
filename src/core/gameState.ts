import { GameState, GuessPayload } from '../types/types.js';

export const startGame = (state: GameState, secret: string, startTime: number): GameState => {
  void secret;
  void startTime;
  return state;
};

export const makeGuess = (state: GameState, payload: GuessPayload): GameState => {
  void payload;
  return state;
};

export const resetToSettings = (state: GameState): GameState => {
  return state;
};
