import { Base, GameViewProps } from '../types/types.js';
import { createDOMElement } from '../utils/createDOMElement.js';
import { formatTime } from '../utils/formatTime.js';
import { createGameHeader } from './gamePage/gameHeader.js';
import { createHistorySection } from './gamePage/historySection.js';
import { createVictoryBlock } from './gamePage/victoryBlock.js';

export const renderGameScreen = (props: GameViewProps): HTMLElement => {
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

  controlsRow.append(input, submitButton);
  inputGroup.append(label, controlsRow);

  card.append(header);

  if (isWon) {
    const timeScore = endTime && startTime ? formatTime(endTime - startTime) : 0;
    const scoreMessage = `Попытки: ${attempts.length}, Secret: ${secret}, Время: ${timeScore}`;
    card.append(createVictoryBlock(props.onReset, scoreMessage));
  }

  card.append(inputGroup, historySection);
  container.append(card);

  if (!props.isWon) {
    const handleAction = (): void => {
      const attemptsLog = container.querySelector('#attempts-log');
      attemptsLog?.scrollIntoView({ behavior: 'smooth', block: 'end' });

      const value = input.value.trim();
      if (value.length > 0) {
        props.onMakeGuess(value);
        input.value = '';
      }
    };

    submitButton.addEventListener('click', handleAction);
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') handleAction();
    });
  }

  return container;
};
