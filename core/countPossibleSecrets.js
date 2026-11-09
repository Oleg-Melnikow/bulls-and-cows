import { BASES } from '../staticData.js';
import { memoize } from '../utils/memoize.js';
import { calculatePermutations } from '../utils/calculatePermutations.js';
export const countPossibleSecrets = memoize((length, base) => {
    const baseNumber = BASES[base];
    return calculatePermutations(length, baseNumber);
});
//# sourceMappingURL=countPossibleSecrets.js.map