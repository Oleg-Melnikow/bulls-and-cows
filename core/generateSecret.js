import { ALPHABETS } from '../staticData.js';
export const generateSecret = (length, base, random = Math.random) => {
    const alphabet = ALPHABETS[base];
    if (!Number.isInteger(length) || length < 0 || length > alphabet.size) {
        return '';
    }
    const digits = Array.from(alphabet);
    const buildSecret = (currentSecret) => {
        if (currentSecret.length === length) {
            return currentSecret;
        }
        const randomIndex = Math.floor(random() * digits.length);
        const nextDigit = digits[randomIndex];
        return currentSecret.includes(nextDigit)
            ? buildSecret(currentSecret)
            : buildSecret(currentSecret + nextDigit);
    };
    return buildSecret('');
};
//# sourceMappingURL=generateSecret.js.map