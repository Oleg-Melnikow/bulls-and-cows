interface GuessResult {
  readonly bulls: number;
  readonly cows: number;
}

enum Base {
  Bin = 'bin',
  Oct = 'oct',
  Dec = 'dec',
  Hex = 'hex',
}

type CharValidator = (char: string) => boolean;

export { GuessResult, Base, CharValidator };
