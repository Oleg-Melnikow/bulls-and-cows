export interface GuessResult {
  readonly bulls: number;
  readonly cows: number;
}

export enum Base {
  Bin = 'bin',
  Oct = 'oct',
  Dec = 'dec',
  Hex = 'hex',
}

export type CharValidator = (char: string) => boolean;

export interface AttemptEntry {
  readonly guess: string;
  readonly bulls: number;
  readonly cows: number;
}

export interface GuessPayload {
  readonly attempt: AttemptEntry;
  readonly currentTime: number;
}

export interface GameSettings {
  readonly length: number;
  readonly base: Base;
}

export interface GameState {
  readonly isSettingsPhase: boolean;
  readonly settings: GameSettings;
  readonly secret: string;
  readonly startTime: number | null;
  readonly endTime: number | null;
  readonly isWon: boolean;
  readonly attempts: readonly AttemptEntry[];
}

export interface SettingsViewProps {
  readonly length: number;
  readonly base: Base;
  readonly onStartGame: (length: number, base: Base) => void;
}
