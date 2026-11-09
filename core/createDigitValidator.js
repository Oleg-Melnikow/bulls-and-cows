import { isSingleChar } from '../utils/isSingleChar.js';
import { ALPHABETS } from '../staticData.js';
export const createDigitValidator = (base) => {
    const alphabet = ALPHABETS[base];
    return (char) => {
        if (!isSingleChar(char)) {
            return false;
        }
        return alphabet.has(char.toLowerCase());
    };
};
//# sourceMappingURL=createDigitValidator.js.map