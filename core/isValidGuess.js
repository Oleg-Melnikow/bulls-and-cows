import { createDigitValidator } from './createDigitValidator.js';
export const isValidGuess = (guess, length, base) => {
    if (!Number.isInteger(length) || length < 2 || length > 6) {
        return false;
    }
    if (guess.length !== length) {
        return false;
    }
    const normalizedGuess = guess.toLowerCase();
    const isCharValid = createDigitValidator(base);
    const allCharsValid = normalizedGuess.split('').every(isCharValid);
    if (!allCharsValid) {
        return false;
    }
    const uniqueChars = new Set(normalizedGuess);
    return uniqueChars.size === length;
};
//# sourceMappingURL=isValidGuess.js.map