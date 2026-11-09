import { createDOMElement } from '../utils/createDOMElement.js';
import { createLeaderboardRow } from './leaderboard/leaderboardRow.js';
import { createTableHeader } from './leaderboard/tableHeader.js';
export const renderLeaderboard = (records) => {
    const container = createDOMElement('div', { className: 'leaderboard-section' });
    const title = createDOMElement('h4', { textContent: '🏆 Таблица рекордов игры' });
    container.append(title);
    if (records.length === 0) {
        const noRecords = createDOMElement('p', {
            className: 'no-records',
            textContent: 'Рекордов пока нет. Сделайте свою первую победную попытку!',
        });
        container.append(noRecords);
        return container;
    }
    const table = createDOMElement('div', { className: 'leaderboard-table' });
    const rows = records.map((record, index) => createLeaderboardRow(record, index));
    table.append(createTableHeader(), ...rows);
    container.append(table);
    return container;
};
//# sourceMappingURL=renderLeaderboard.js.map