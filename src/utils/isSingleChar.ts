export const isSingleChar = (char: unknown): char is string => {
  return typeof char === 'string' && char.length === 1;
};
