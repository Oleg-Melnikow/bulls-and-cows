import { describe, it, expect } from '@jest/globals';
import { Base } from '../types/types.js';
import { generateSecret } from '../core/generateSecret.js';

describe('generateSecret', () => {
  it('should generate expected secret using a mocked deterministic random function', () => {
    let callCount = 0;
    const mockValues = [0.0, 0.15, 0.25, 0.35];
    const mockRandom = (): number => mockValues[callCount++];

    const secret = generateSecret(4, Base.Dec, mockRandom);

    expect(secret).toBe('0123');
    expect(secret.length).toBe(4);
  });

  it('should guarantee that all generated characters are strictly unique', () => {
    const secret = generateSecret(4, Base.Dec);
    const uniqueChars = new Set(secret.split(''));

    expect(uniqueChars.size).toBe(4);
  });

  it('should retry character generation if the random function returns a duplicate index', () => {
    let callCount = 0;
    const mockValues = [0.0, 0.1, 0.6];
    const mockRandom = (): number => mockValues[callCount++];

    const secret = generateSecret(2, Base.Bin, mockRandom);

    expect(secret).toBe('01');
    expect(secret.length).toBe(2);
  });

  it('should withstand long streams of identical random indices and still succeed', () => {
    let callCount = 0;
    const stream = [0.0, 0.0, 0.0, 0.0, 0.0, 0.6];
    const mockRandom = (): number => stream[callCount++];

    const secret = generateSecret(2, Base.Bin, mockRandom);
    expect(secret).toBe('01');
  });

  it('should correctly handle maximum allowed limits and return valid hex chars', () => {
    const secret = generateSecret(6, Base.Hex);
    expect(secret.length).toBe(6);

    const hexRegex = /^[0-9a-f]{6}$/;
    expect(hexRegex.test(secret)).toBe(true);
  });

  it('should return an empty string for length 0 and single character for length 1', () => {
    const mockRandom = (): number => 0.0;
    expect(generateSecret(0, Base.Dec, mockRandom)).toBe('');
    expect(generateSecret(1, Base.Dec, mockRandom)).toBe('0');
  });

  it('should return an empty string if requested length exceeds alphabet capacity', () => {
    expect(generateSecret(3, Base.Bin)).toBe('');
  });

  it('should return an empty string defensively if length is negative or non-integer', () => {
    expect(generateSecret(-3, Base.Dec)).toBe('');
    expect(generateSecret(3.5, Base.Dec)).toBe('');
  });
});
