import { createDOMElement } from '../../utils/createDOMElement.js';
import { formatTime } from '../../utils/formatTime.js';
export function createLeaderboardRow(record, index) {
    const row = createDOMElement('div', { className: 'leaderboard-row' });
    const cellRank = createDOMElement('span', {
        className: 'cell-rank',
        textContent: `#${index + 1}`,
    });
    const cellMode = createDOMElement('span', {
        className: 'cell-mode',
        textContent: `${record.base.toUpperCase()}-${record.length}`,
    });
    const cellAttempts = createDOMElement('span', {
        className: 'cell-attempts',
        textContent: String(record.attemptsCount),
    });
    const cellTime = createDOMElement('span', {
        className: 'cell-time',
        textContent: formatTime(record.duration),
    });
    row.append(cellRank, cellMode, cellAttempts, cellTime);
    return row;
}
//# sourceMappingURL=leaderboardRow.js.map