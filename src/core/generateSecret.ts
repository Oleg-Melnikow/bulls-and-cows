import { Base } from '../types/types.js';

type RandomGenerator = () => number;

export const generateSecret = (
  length: number,
  base: Base,
  randomFn: RandomGenerator = Math.random
): string => {
  void length;
  void base;
  void randomFn;
  return '-';
};
