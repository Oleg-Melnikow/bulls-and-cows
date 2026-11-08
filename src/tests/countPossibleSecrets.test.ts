import { describe, it, expect } from '@jest/globals';
import { Base } from '../types/types.js';
import { countPossibleSecrets } from '../core/countPossibleSecrets.js';

describe('countPossibleSecrets', () => {
  it('should correctly calculate permutations for standard decimal system', () => {
    expect(countPossibleSecrets(4, Base.Dec)).toBe(5040);
  });

  it('should correctly calculate permutations for binary system', () => {
    expect(countPossibleSecrets(2, Base.Bin)).toBe(2);
  });

  it('should correctly calculate permutations for maximum hex constraints', () => {
    expect(countPossibleSecrets(6, Base.Hex)).toBe(5765760);
  });

  it('should return 1 when length is 0 (base case of recursion)', () => {
    expect(countPossibleSecrets(0, Base.Dec)).toBe(1);
  });

  it('should return 0 if requested length exceeds the system alphabet capacity', () => {
    expect(countPossibleSecrets(3, Base.Bin)).toBe(0);
    expect(countPossibleSecrets(5, Base.Bin)).toBe(0);
  });

  it('should return the total alphabet size when length is 1', () => {
    expect(countPossibleSecrets(1, Base.Bin)).toBe(2);
    expect(countPossibleSecrets(1, Base.Oct)).toBe(8);
    expect(countPossibleSecrets(1, Base.Dec)).toBe(10);
    expect(countPossibleSecrets(1, Base.Hex)).toBe(16);
  });

  it('should return 0 for negative lengths to prevent stack overflow', () => {
    expect(countPossibleSecrets(-1, Base.Dec)).toBe(0);
    expect(countPossibleSecrets(-5, Base.Hex)).toBe(0);
  });

  it('should memoize results and not re-evaluate for the same arguments', () => {
    const firstCall = countPossibleSecrets(4, Base.Dec);
    const secondCall = countPossibleSecrets(4, Base.Dec);

    expect(firstCall).toBe(secondCall);
    expect(firstCall).toBe(5040);
  });
});
