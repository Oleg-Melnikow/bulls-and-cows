import { Base } from './types/types.js';

export const BASES: Readonly<Record<Base, number>> = Object.freeze({
  [Base.Bin]: 2,
  [Base.Oct]: 8,
  [Base.Dec]: 10,
  [Base.Hex]: 16,
});

export const ALPHABETS: Readonly<Record<Base, ReadonlySet<string>>> = Object.freeze({
  [Base.Bin]: new Set('01'),
  [Base.Oct]: new Set('01234567'),
  [Base.Dec]: new Set('0123456789'),
  [Base.Hex]: new Set('0123456789abcdef'),
});

export interface OptionData {
  readonly value: Base;
  readonly text: string;
}

export const BASE_OPTIONS: readonly OptionData[] = Object.freeze([
  { value: Base.Bin, text: 'Binary (2)' },
  { value: Base.Oct, text: 'Octal (8)' },
  { value: Base.Dec, text: 'Decimal (10)' },
  { value: Base.Hex, text: 'Hexadecimal (16)' },
]);

export const LENGTH_OPTIONS: readonly number[] = Object.freeze([2, 3, 4, 5, 6]);
