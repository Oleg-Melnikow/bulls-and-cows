import { Base } from '../types/types.js';
import { BASES } from '../staticData.js';
import { memoize } from '../utils/memoize.js';
import { calculatePermutations } from '../utils/calculatePermutations.js';

export const countPossibleSecrets = memoize((length: number, base: Base): number => {
  const baseNumber = BASES[base];
  return calculatePermutations(length, baseNumber);
});
