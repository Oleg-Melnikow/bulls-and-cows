import { createDOMElement } from '../../utils/createDOMElement.js';

export function createTableHeader(): HTMLDivElement {
  const headerRow = createDOMElement('div', { className: 'leaderboard-row header-row' });
  const headers = ['Место', 'Режим', 'Попытки', 'Время'];

  const cells = headers.map((text) => createDOMElement('span', { textContent: text }));
  headerRow.append(...cells);

  return headerRow;
}
