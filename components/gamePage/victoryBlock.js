import { createDOMElement } from '../../utils/createDOMElement.js';
export function createVictoryBlock(onReset, score) {
    const victoryBlock = createDOMElement('div', { className: 'victory-message' });
    const victoryTitle = createDOMElement('h4', { textContent: '🎉 Победа! Вы угадали число!' });
    const victoryScore = createDOMElement('h4', { textContent: score });
    const newGameButton = createDOMElement('button', {
        id: 'new-game-btn',
        className: 'btn-primary',
        textContent: 'Новая игра',
    });
    newGameButton.addEventListener('click', onReset);
    victoryBlock.append(victoryTitle, victoryScore, newGameButton);
    return victoryBlock;
}
//# sourceMappingURL=victoryBlock.js.map