import { Base, CharValidator } from '../types/types.js';
import { isSingleChar } from '../utils/isSingleChar.js';
import { ALPHABETS } from '../staticData.js';

export const createDigitValidator = (base: Base): CharValidator => {
  const alphabet = ALPHABETS[base];

  return (char: string): boolean => {
    if (!isSingleChar(char)) {
      return false;
    }

    return alphabet.has(char.toLowerCase());
  };
};
