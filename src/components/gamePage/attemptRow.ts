import { AttemptEntry } from '../../types/types.js';
import { createDOMElement } from '../../utils/createDOMElement.js';

export function createAttemptRow(
  attempt: AttemptEntry,
  index: number,
  targetLength: number
): HTMLDivElement {
  const row = createDOMElement('div', { className: 'attempt-row' });
  const cellNumber = createDOMElement('span', {
    className: 'cell-number',
    textContent: `#${index + 1}`,
  });
  const cellGuess = createDOMElement('span', {
    className: 'cell-guess',
    textContent: attempt.guess,
  });

  const isPerfectScore = attempt.bulls === targetLength;
  const resultClassName = isPerfectScore ? 'cell-result cell-result-victory' : 'cell-result';

  const cellResult = createDOMElement('span', {
    className: resultClassName,
    textContent: `${attempt.bulls} 🐂 | ${attempt.cows} 🐄`,
  });

  row.append(cellNumber, cellGuess, cellResult);
  return row;
}
