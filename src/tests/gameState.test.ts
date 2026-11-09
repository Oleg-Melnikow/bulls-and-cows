import { Base, GameState, GuessPayload } from '../types/types.js';
import { makeGuess, startGame, resetToSettings } from '../core/gameState.js';

describe('Game State', () => {
  const initialSettingsState: GameState = Object.freeze({
    isSettingsPhase: true,
    settings: Object.freeze({ length: 4, base: Base.Dec }),
    secret: '',
    startTime: null,
    endTime: null,
    isWon: false,
    attempts: Object.freeze([]),
  });

  const activeGameState: GameState = Object.freeze({
    isSettingsPhase: false,
    settings: Object.freeze({ length: 4, base: Base.Dec }),
    secret: '1234',
    startTime: 1000,
    endTime: null,
    isWon: false,
    attempts: Object.freeze([]),
  });

  it('startGame should activate game phase and store secret and startTime without mutation', () => {
    const nextState = startGame(initialSettingsState, '1234', 1000);

    expect(nextState.isSettingsPhase).toBe(false);
    expect(nextState.secret).toBe('1234');
    expect(nextState.startTime).toBe(1000);
    expect(nextState.attempts.length).toBe(0);

    expect(initialSettingsState.isSettingsPhase).toBe(true);
    expect(nextState).not.toBe(initialSettingsState);
  });

  it('makeGuess should append a new guess entry to the history immutably', () => {
    const payload: GuessPayload = {
      attempt: { guess: '5678', bulls: 1, cows: 1 },
      currentTime: 2000,
    };
    const nextState = makeGuess(activeGameState, payload);

    expect(nextState.attempts.length).toBe(1);
    expect(nextState.attempts[0]).toEqual({ guess: '5678', bulls: 1, cows: 1 });
    expect(nextState.isWon).toBe(false);
    expect(nextState.endTime).toBeNull();

    expect(activeGameState.attempts.length).toBe(0);
    expect(nextState.attempts).not.toBe(activeGameState.attempts);
  });

  it('makeGuess should transition to won state and freeze endTime when bulls equal length', () => {
    const payload: GuessPayload = {
      attempt: { guess: '5678', bulls: 4, cows: 0 },
      currentTime: 5000,
    };
    const nextState = makeGuess(activeGameState, payload);

    expect(nextState.isWon).toBe(true);
    expect(nextState.endTime).toBe(5000);
    expect(nextState.attempts.length).toBe(1);
  });

  it('makeGuess should ignore any operations if the round is already won', () => {
    const wonState: GameState = Object.freeze({
      ...activeGameState,
      isWon: true,
      endTime: 5000,
      attempts: Object.freeze([{ guess: '1234', bulls: 4, cows: 0 }]),
    });

    const payload: GuessPayload = {
      attempt: { guess: '0000', bulls: 0, cows: 0 },
      currentTime: 6000,
    };

    const nextState = makeGuess(wonState, payload);

    expect(nextState.attempts.length).toBe(1);
    expect(nextState.attempts[0].guess).toBe('1234');
    expect(nextState).toBe(wonState);
  });

  it('resetToSettings should wipe current round state and return to settings phase', () => {
    const completedState: GameState = Object.freeze({
      ...activeGameState,
      isWon: true,
      endTime: 5000,
      attempts: Object.freeze([{ guess: '1234', bulls: 4, cows: 0 }]),
    });

    const nextState = resetToSettings(completedState);
    expect(nextState).toEqual(initialSettingsState);
  });
});
