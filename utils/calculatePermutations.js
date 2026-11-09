export const calculatePermutations = (currentLength, currentBaseNumber) => {
    if (currentLength < 0)
        return 0;
    if (currentLength === 0)
        return 1;
    if (currentLength > currentBaseNumber)
        return 0;
    return currentBaseNumber * calculatePermutations(currentLength - 1, currentBaseNumber - 1);
};
//# sourceMappingURL=calculatePermutations.js.map