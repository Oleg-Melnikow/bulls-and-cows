import { describe, it, expect } from '@jest/globals';
import { evaluateGuess } from '../core/evaluateGuess.js';

describe('evaluateGuess', () => {
  it('should correctly calculate mixed bulls and cows for standard decimal input', () => {
    const result = evaluateGuess('4821', '1832');
    expect(result).toEqual({ bulls: 1, cows: 2 });
  });

  it('should return zeros when there are absolutely no matching digits', () => {
    const result = evaluateGuess('1234', '5678');
    expect(result).toEqual({ bulls: 0, cows: 0 });
  });

  it('should return maximum bulls and zero cows when guess matches secret exactly', () => {
    const result = evaluateGuess('4821', '4821');
    expect(result).toEqual({ bulls: 4, cows: 0 });
  });

  it('should return maximum cows and zero bulls for a full cyclic shift of unique digits', () => {
    const result = evaluateGuess('1234', '2341');
    expect(result).toEqual({ bulls: 0, cows: 4 });
  });

  it('should work correctly with binary system bounds (strict length of 2)', () => {
    const result = evaluateGuess('10', '01');
    expect(result).toEqual({ bulls: 0, cows: 2 });
  });

  it('should be completely case-insensitive for hexadecimal characters', () => {
    const result = evaluateGuess('1a3F', '1A2b');
    expect(result).toEqual({ bulls: 2, cows: 0 });
  });

  it('should correctly handle the maximum allowed game length (6 digits) in Hex system', () => {
    const result = evaluateGuess('abcdef', 'fbcdea');
    expect(result).toEqual({ bulls: 4, cows: 2 });
  });

  it('does not modify the input data', () => {
    const [secret, guess] = ['0793', '3790'];
    const result = evaluateGuess(secret, guess);
    expect(result).toEqual({ bulls: 2, cows: 2 });
    expect(secret).toBe('0793');
    expect(guess).toBe('3790');
  });
});
