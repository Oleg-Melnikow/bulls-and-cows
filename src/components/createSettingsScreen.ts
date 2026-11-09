import { countPossibleSecrets } from '../core/countPossibleSecrets.js';
import { BASE_OPTIONS, LENGTH_OPTIONS, OptionData } from '../staticData.js';
import { Base, SettingsViewProps } from '../types/types.js';
import { createDOMElement } from '../utils/createDOMElement.js';

function createBaseSelect(options: readonly OptionData[]): HTMLSelectElement {
  const select = createDOMElement('select', { id: 'base-select' });
  const optionElements = options.map(({ value, text }) =>
    createDOMElement('option', { value, textContent: text })
  );

  select.append(...optionElements);
  return select;
}

function createLengthSelect(values: readonly number[]): HTMLSelectElement {
  const select = createDOMElement('select', { id: 'length-select' });
  const optionElements = values.map((value) =>
    createDOMElement('option', {
      value: String(value),
      textContent: String(value),
    })
  );

  select.append(...optionElements);
  return select;
}

function createControlGroup(labelText: string, selectElement: HTMLSelectElement): HTMLDivElement {
  const group = createDOMElement('div', { className: 'control-group' });
  const label = createDOMElement('label', {
    htmlFor: selectElement.id,
    textContent: labelText,
  });

  group.append(label, selectElement);
  return group;
}

function createStartButton(): HTMLButtonElement {
  return createDOMElement('button', {
    id: 'start-game-btn',
    className: 'btn-primary',
    textContent: 'Начать раунд',
  });
}

function updateSecret(length: number, base: Base, element: HTMLElement): void {
  const res = countPossibleSecrets(length, base);
  element.textContent = `Возможное количество секретных чисел: ${res}`;
}

export function createSettingsScreen(props: SettingsViewProps): HTMLDivElement {
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

  const updateAvailableLengths = (selectedBase: Base): void => {
    Array.from(lengthSelect.options).forEach((option) => {
      const optionLength = Number(option.value);

      if (selectedBase === Base.Bin) {
        const isLength2 = optionLength === 2;
        option.disabled = !isLength2;
        if (!isLength2 && option.selected) {
          lengthSelect.value = '2';
        }
      } else {
        option.disabled = false;
      }
    });
  };

  updateAvailableLengths(props.base);

  baseSelect.addEventListener('change', (e: Event): void => {
    const { value } = e.target as HTMLSelectElement;
    updateAvailableLengths(value as Base);
    updateSecret(+lengthSelect.value, value as Base, secretMessage);
  });

  lengthSelect.addEventListener('change', (e: Event): void => {
    const { value } = e.target as HTMLSelectElement;
    updateSecret(+value, baseSelect.value as Base, secretMessage);
  });

  startButton.addEventListener('click', () => {
    props.onStartGame(Number(lengthSelect.value), baseSelect.value as Base);
  });
  return container;
}
