import { createDigitValidator } from '../core/createDigitValidator.js';
import { Base } from '../types/types.js';
import { createDOMElement } from '../utils/createDOMElement.js';
import { formatTime } from '../utils/formatTime.js';
import { createGameHeader } from './gamePage/gameHeader.js';
import { createHistorySection } from './gamePage/historySection.js';
import { createVictoryBlock } from './gamePage/victoryBlock.js';
export const renderGameScreen = (props) => {
    const { attempts, base, isWon, length, secret, startTime, endTime } = props;
    const container = createDOMElement('div', { className: 'game-screen' });
    const card = createDOMElement('div', { className: 'game-card' });
    const header = createGameHeader(base, length);
    const historySection = createHistorySection(attempts, length);
    const inputGroup = createDOMElement('div', { className: 'input-group' });
    const label = createDOMElement('label', {
        htmlFor: 'guess-input',
        textContent: 'Введите вашу попытку:',
    });
    const controlsRow = createDOMElement('div', { className: 'controls-row' });
    const defaultPlaceholder = '01234'.slice(0, length);
    const input = createDOMElement('input', {
        id: 'guess-input',
        type: 'text',
        maxLength: length,
        placeholder: `Например: ${base === Base.Hex ? 'a1b2' : defaultPlaceholder}`,
        disabled: isWon,
    });
    const submitButton = createDOMElement('button', {
        id: 'submit-guess-btn',
        className: 'btn-secondary',
        textContent: 'Проверить',
        disabled: isWon,
    });
    const errorBlock = createDOMElement('div', { className: 'error-message' });
    controlsRow.append(input, submitButton);
    inputGroup.append(label, controlsRow, errorBlock);
    card.append(header);
    if (isWon) {
        const timeScore = endTime && startTime ? formatTime(endTime - startTime) : 0;
        const scoreMessage = `Попытки: ${attempts.length}, Secret: ${secret}, Время: ${timeScore}`;
        card.append(createVictoryBlock(props.onReset, scoreMessage));
    }
    card.append(inputGroup, historySection);
    container.append(card);
    if (!isWon) {
        const showError = (message) => {
            errorBlock.textContent = message;
            input.classList.add('input-error');
            input.select();
        };
        const clearError = () => {
            errorBlock.textContent = '';
            input.classList.remove('input-error');
        };
        const handleAction = () => {
            const value = input.value.trim();
            if (value.length === 0)
                return;
            const isDuplicate = props.attempts.some((attempt) => attempt.guess.toLowerCase() === value.toLowerCase());
            if (isDuplicate) {
                showError(`Вы уже вводили комбинацию "${value}"`);
                return;
            }
            clearError();
            const isValid = props.onMakeGuess(value);
            if (!isValid) {
                showError(`Неверный ввод! Число должно содержать ровно ${length} ` +
                    `уникальных символов, допустимых в системе ${base.toUpperCase()}.`);
                return;
            }
            clearError();
            input.value = '';
        };
        const isCharValid = createDigitValidator(props.base);
        input.addEventListener('beforeinput', (event) => {
            const nextChar = event.data;
            if (nextChar && nextChar.length === 1) {
                if (!isCharValid(nextChar)) {
                    event.preventDefault();
                }
            }
        });
        input.addEventListener('input', () => {
            const filteredValue = input.value.split('').filter(isCharValid).join('');
            if (input.value !== filteredValue) {
                input.value = filteredValue;
            }
        });
        input.addEventListener('input', clearError);
        submitButton.addEventListener('click', handleAction);
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter')
                handleAction();
        });
    }
    return container;
};
//# sourceMappingURL=gameScreen.js.map