export const calculatePermutations = (currentLength: number, currentBaseNumber: number): number => {
  if (currentLength < 0) return 0;
  if (currentLength === 0) return 1;
  if (currentLength > currentBaseNumber) return 0;

  return currentBaseNumber * calculatePermutations(currentLength - 1, currentBaseNumber - 1);
};
