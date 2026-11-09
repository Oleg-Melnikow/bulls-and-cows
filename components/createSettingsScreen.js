import { countPossibleSecrets } from '../core/countPossibleSecrets.js';
import { BASE_OPTIONS, LENGTH_OPTIONS } from '../staticData.js';
import { Base } from '../types/types.js';
import { createDOMElement } from '../utils/createDOMElement.js';
function createBaseSelect(options) {
    const select = createDOMElement('select', { id: 'base-select' });
    const optionElements = options.map(({ value, text }) => createDOMElement('option', { value, textContent: text }));
    select.append(...optionElements);
    return select;
}
function createLengthSelect(values) {
    const select = createDOMElement('select', { id: 'length-select' });
    const optionElements = values.map((value) => createDOMElement('option', {
        value: String(value),
        textContent: String(value),
    }));
    select.append(...optionElements);
    return select;
}
function createControlGroup(labelText, selectElement) {
    const group = createDOMElement('div', { className: 'control-group' });
    const label = createDOMElement('label', {
        htmlFor: selectElement.id,
        textContent: labelText,
    });
    group.append(label, selectElement);
    return group;
}
function createStartButton() {
    return createDOMElement('button', {
        id: 'start-game-btn',
        className: 'btn-primary',
        textContent: 'Начать раунд',
    });
}
function updateSecret(length, base, element) {
    const res = countPossibleSecrets(length, base);
    element.textContent = `Возможное количество секретных чисел: ${res}`;
}
export function createSettingsScreen(props) {
    const container = createDOMElement('div', { className: 'settings-screen' });
    const card = createDOMElement('div', { className: 'settings-card' });
    const title = createDOMElement('h2', { textContent: 'Настройки игры' });
    const baseSelect = createBaseSelect(BASE_OPTIONS);
    const baseGroup = createControlGroup('Система счисления:', baseSelect);
    const lengthSelect = createLengthSelect(LENGTH_OPTIONS);
    const lengthGroup = createControlGroup('Длина числа:', lengthSelect);
    const secretMessage = createDOMElement('div', { className: 'secret-message' });
    const startButton = createStartButton();
    card.append(title, baseGroup, lengthGroup, secretMessage, startButton);
    container.append(card);
    baseSelect.value = props.base;
    lengthSelect.value = String(props.length);
    updateSecret(props.length, props.base, secretMessage);
    const updateAvailableLengths = (selectedBase) => {
        Array.from(lengthSelect.options).forEach((option) => {
            const optionLength = Number(option.value);
            if (selectedBase === Base.Bin) {
                const isLength2 = optionLength === 2;
                option.disabled = !isLength2;
                if (!isLength2 && option.selected) {
                    lengthSelect.value = '2';
                }
            }
            else {
                option.disabled = false;
            }
        });
    };
    updateAvailableLengths(props.base);
    baseSelect.addEventListener('change', (e) => {
        const { value } = e.target;
        updateAvailableLengths(value);
        updateSecret(+lengthSelect.value, value, secretMessage);
    });
    lengthSelect.addEventListener('change', (e) => {
        const { value } = e.target;
        updateSecret(+value, baseSelect.value, secretMessage);
    });
    startButton.addEventListener('click', () => {
        props.onStartGame(Number(lengthSelect.value), baseSelect.value);
    });
    return container;
}
//# sourceMappingURL=createSettingsScreen.js.map