import { Base, CharValidator } from '../types/types.js';
import { isSingleChar } from '../utils/isSingleChar.js';

const ALPHABETS: Readonly<Record<Base, ReadonlySet<string>>> = Object.freeze({
  [Base.Bin]: new Set('01'),
  [Base.Oct]: new Set('01234567'),
  [Base.Dec]: new Set('0123456789'),
  [Base.Hex]: new Set('0123456789abcdef'),
});

export const createDigitValidator = (base: Base): CharValidator => {
  const alphabet = ALPHABETS[base];

  return (char: string): boolean => {
    if (!isSingleChar(char)) {
      return false;
    }

    return alphabet.has(char.toLowerCase());
  };
};
