import { Base } from '../types/types.js';
import { ALPHABETS } from '../staticData.js';

export const generateSecret = (
  length: number,
  base: Base,
  random: () => number = Math.random
): string => {
  const alphabet = ALPHABETS[base];

  if (!Number.isInteger(length) || length < 0 || length > alphabet.size) {
    return '';
  }

  const digits = Array.from(alphabet);

  const buildSecret = (currentSecret: string): string => {
    if (currentSecret.length === length) {
      return currentSecret;
    }

    const randomIndex = Math.floor(random() * digits.length);
    const nextDigit = digits[randomIndex];

    return currentSecret.includes(nextDigit)
      ? buildSecret(currentSecret)
      : buildSecret(currentSecret + nextDigit);
  };

  return buildSecret('');
};
