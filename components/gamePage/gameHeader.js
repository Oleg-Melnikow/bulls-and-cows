import { createDOMElement } from '../../utils/createDOMElement.js';
export function createGameHeader(base, length) {
    const header = createDOMElement('div', { className: 'game-header' });
    const title = createDOMElement('h3', { textContent: 'Раунд активен' });
    const metaInfo = createDOMElement('p', {
        className: 'meta-info',
        textContent: `Режим: ${base.toUpperCase()} | Длина числа: ${length}`,
    });
    header.append(title, metaInfo);
    return header;
}
//# sourceMappingURL=gameHeader.js.map