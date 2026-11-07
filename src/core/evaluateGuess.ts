import { GuessResult } from '../types/types.js';

export const evaluateGuess = (secret: string, guess: string): GuessResult => {
  const [secretChars, guessChars] = [secret, guess].map((word) => word.toLowerCase().split(''));
  const secretSet = new Set(secretChars);

  const bulls = guessChars.filter((char, index) => char === secretChars[index]).length;
  const totalMatches = guessChars.filter((char) => secretSet.has(char)).length;

  const cows = totalMatches - bulls;

  return Object.freeze({ bulls, cows });
};
