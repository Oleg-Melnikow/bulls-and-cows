import { Base } from '../types/types.js';
import { memoize } from '../utils/memoize.js';
import { calculatePermutations } from '../utils/calculatePermutations.js';

const BASES: Readonly<Record<Base, number>> = Object.freeze({
  [Base.Bin]: 2,
  [Base.Oct]: 8,
  [Base.Dec]: 10,
  [Base.Hex]: 16,
});

export const countPossibleSecrets = memoize((length: number, base: Base): number => {
  const baseNumber = BASES[base];
  return calculatePermutations(length, baseNumber);
});
