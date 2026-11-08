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
