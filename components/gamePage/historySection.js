import { createDOMElement } from '../../utils/createDOMElement.js';
import { createAttemptRow } from './attemptRow.js';
export function createHistorySection(attempts, targetLength) {
    const section = createDOMElement('div', { className: 'history-section' });
    const title = createDOMElement('h4', { textContent: 'История ходов' });
    const attemptsLog = createDOMElement('div', { id: 'attempts-log' });
    const rows = attempts.map((attempt, index) => createAttemptRow(attempt, index, targetLength));
    attemptsLog.append(...rows);
    section.append(title, attemptsLog);
    return section;
}
//# sourceMappingURL=historySection.js.map