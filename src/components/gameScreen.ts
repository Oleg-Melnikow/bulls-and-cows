import { Base, GameViewProps } from '../types/types.js';
import { createDOMElement } from '../utils/createDOMElement.js';
import { createGameHeader } from './gamePage/gameHeader.js';

export const renderGameScreen = (props: GameViewProps): HTMLElement => {
  const { base, isWon, length } = props;
  const container = createDOMElement('div', { className: 'game-screen' });
  const card = createDOMElement('div', { className: 'game-card' });

  const header = createGameHeader(base, length);

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

  controlsRow.append(input, submitButton);
  inputGroup.append(label, controlsRow);

  card.append(header, inputGroup);

  container.append(card);

  return container;
};
