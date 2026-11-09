import { BASE_OPTIONS, LENGTH_OPTIONS, OptionData } from '../staticData.js';
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

export function createSettingsScreen(): HTMLDivElement {
  const container = createDOMElement('div', { className: 'settings-screen' });
  const card = createDOMElement('div', { className: 'settings-card' });
  const title = createDOMElement('h2', { textContent: 'Настройки игры' });

  const baseSelect = createBaseSelect(BASE_OPTIONS);
  const baseGroup = createControlGroup('Система счисления:', baseSelect);

  const lengthSelect = createLengthSelect(LENGTH_OPTIONS);
  const lengthGroup = createControlGroup('Длина числа:', lengthSelect);

  const startButton = createStartButton();

  card.append(title, baseGroup, lengthGroup, startButton);
  container.append(card);

  return container;
}
