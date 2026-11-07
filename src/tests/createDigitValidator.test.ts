import { describe, it, expect } from '@jest/globals';
import { createDigitValidator } from '../core/createDigitValidator.js';
import { Base } from '../types/types.js';

describe('createDigitValidator', () => {
  it('should return a function predicate when called with a valid system base', () => {
    const validator = createDigitValidator(Base.Bin);
    expect(typeof validator).toBe('function');
  });

  it('should strictly validate binary characters', () => {
    const isBinChar = createDigitValidator(Base.Bin);

    expect(isBinChar('0')).toBe(true);
    expect(isBinChar('1')).toBe(true);
    expect(isBinChar('2')).toBe(false);
    expect(isBinChar('a')).toBe(false);
  });

  it('should strictly validate octal characters', () => {
    const isOctChar = createDigitValidator(Base.Oct);

    expect(isOctChar('0')).toBe(true);
    expect(isOctChar('7')).toBe(true);
    expect(isOctChar('8')).toBe(false);
    expect(isOctChar('9')).toBe(false);
  });

  it('should strictly validate decimal characters', () => {
    const isDecChar = createDigitValidator(Base.Dec);

    expect(isDecChar('5')).toBe(true);
    expect(isDecChar('0')).toBe(true);
    expect(isDecChar('9')).toBe(true);
    expect(isDecChar('a')).toBe(false);
    expect(isDecChar('-')).toBe(false);
  });

  it('should validate hex characters and be completely case-insensitive', () => {
    const isHexChar = createDigitValidator(Base.Hex);

    expect(isHexChar('0')).toBe(true);
    expect(isHexChar('9')).toBe(true);
    expect(isHexChar('a')).toBe(true);
    expect(isHexChar('A')).toBe(true);
    expect(isHexChar('f')).toBe(true);
    expect(isHexChar('F')).toBe(true);
    expect(isHexChar('g')).toBe(false);
    expect(isHexChar('G')).toBe(false);
  });

  it('should return false if a multi-character string or empty string is passed to the validator', () => {
    const isDecChar = createDigitValidator(Base.Dec);

    expect(isDecChar('12')).toBe(false);
    expect(isDecChar('')).toBe(false);
    expect(isDecChar(' ')).toBe(false);
    expect(isDecChar('\t')).toBe(false);
    expect(isDecChar('\n')).toBe(false);
  });

  it('should maintain independent state for different validator instances', () => {
    const isBinChar = createDigitValidator(Base.Bin);
    const isHexChar = createDigitValidator(Base.Hex);

    expect(isBinChar('a')).toBe(false);
    expect(isHexChar('a')).toBe(true);
    expect(isBinChar('1')).toBe(true);
    expect(isHexChar('1')).toBe(true);
  });

  it('should strictly reject lookalike Cyrillic characters in hex validation', () => {
    const isHexChar = createDigitValidator(Base.Hex);

    expect(isHexChar('A')).toBe(true);
    expect(isHexChar('А')).toBe(false);
    expect(isHexChar('В')).toBe(false);
  });
});
