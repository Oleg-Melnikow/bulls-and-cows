import { Base, CharValidator } from '../types/types.js';

export const createDigitValidator = (base: Base): CharValidator => {
  void base;
  return (char: string): boolean => {
    void char;
    return false;
  };
};
