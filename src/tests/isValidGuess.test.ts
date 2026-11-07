import { describe, it, expect } from '@jest/globals';
import { Base } from '../types/types.js';
import { isValidGuess } from '../core/isValidGuess.js';

describe('isValidGuess (FIRST Principles)', () => {
  it('should return true for a completely valid decimal guess', () => {
    expect(isValidGuess('1234', 4, Base.Dec)).toBe(true);
    expect(isValidGuess('9876', 4, Base.Dec)).toBe(true);
  });

  it('should return false if the guess length does not match the required length', () => {
    expect(isValidGuess('123', 4, Base.Dec)).toBe(false);
    expect(isValidGuess('12345', 4, Base.Dec)).toBe(false);
  });

  it('should return false if the guess contains duplicate characters', () => {
    expect(isValidGuess('1123', 4, Base.Dec)).toBe(false);
    expect(isValidGuess('1232', 4, Base.Dec)).toBe(false);
  });

  it('should return false if guess contains characters outside the system alphabet', () => {
    expect(isValidGuess('12a4', 4, Base.Dec)).toBe(false);
    expect(isValidGuess('1023', 4, Base.Bin)).toBe(false);
    expect(isValidGuess('7812', 4, Base.Oct)).toBe(false);
  });

  it('should validate hex system correctly and treat different case chars as duplicates', () => {
    expect(isValidGuess('aB9f', 4, Base.Hex)).toBe(true);
    expect(isValidGuess('abG1', 4, Base.Hex)).toBe(false);
    expect(isValidGuess('aA12', 4, Base.Hex)).toBe(false);
  });

  it('should work correctly with binary system constraints (strict length 2)', () => {
    expect(isValidGuess('10', 2, Base.Bin)).toBe(true);
    expect(isValidGuess('01', 2, Base.Bin)).toBe(true);
    expect(isValidGuess('11', 2, Base.Bin)).toBe(false);
  });

  it('should return false for empty string input even if length is specified as 0', () => {
    expect(isValidGuess('', 0, Base.Dec)).toBe(false);
    expect(isValidGuess('', 4, Base.Dec)).toBe(false);
  });

  it('should return false if the guess contains valid digits but interspersed with spaces', () => {
    expect(isValidGuess('12 3', 4, Base.Dec)).toBe(false);
  });

  it('should correctly validate a maximum length guess (6 chars) in Hex', () => {
    expect(isValidGuess('abcdef', 6, Base.Hex)).toBe(true);
    expect(isValidGuess('abcdea', 6, Base.Hex)).toBe(false);
  });

  it('should return false if the requested validation length is out of game bounds', () => {
    expect(isValidGuess('12', -2, Base.Bin)).toBe(false);
    expect(isValidGuess('1234', 4.5, Base.Dec)).toBe(false);
  });
});
