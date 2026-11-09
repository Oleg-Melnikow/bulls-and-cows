import { Base } from '../types/types.js';
/**
 * Фабричная функция экрана настроек, созданная без использования innerHTML.
 * Элементы собираются как нативные DOM-узлы с полной безопасностью типов.
 */
export const renderSettingsScreen = (props) => {
    const container = document.createElement('div');
    container.className = 'settings-screen';
    const card = document.createElement('div');
    card.className = 'settings-card';
    const title = document.createElement('h2');
    title.textContent = 'Настройки игры';
    card.appendChild(title);
    // --- ГРУППА: СИСТЕМА СЧИСЛЕНИЯ ---
    const baseGroup = document.createElement('div');
    baseGroup.className = 'control-group';
    const baseLabel = document.createElement('label');
    baseLabel.setAttribute('for', 'base-select');
    baseLabel.textContent = 'Система счисления:';
    baseGroup.appendChild(baseLabel);
    const baseSelect = document.createElement('select');
    baseSelect.id = 'base-select';
    const baseOptionsData = Object.freeze([
        { value: Base.Bin, text: 'Binary (2)' },
        { value: Base.Oct, text: 'Octal (8)' },
        { value: Base.Dec, text: 'Decimal (10)' },
        { value: Base.Hex, text: 'Hexadecimal (16)' },
    ]);
    baseOptionsData.forEach(({ value, text }) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        baseSelect.appendChild(option);
    });
    baseGroup.appendChild(baseSelect);
    card.appendChild(baseGroup);
    // --- ГРУППА: ДЛИНА ЧИСЛА ---
    const lengthGroup = document.createElement('div');
    lengthGroup.className = 'control-group';
    const lengthLabel = document.createElement('label');
    lengthLabel.setAttribute('for', 'length-select');
    lengthLabel.textContent = 'Длина числа:';
    lengthGroup.appendChild(lengthLabel);
    const lengthSelect = document.createElement('select');
    lengthSelect.id = 'length-select';
    const lengthValues = [];
    lengthValues.forEach((value) => {
        const option = document.createElement('option');
        option.value = String(value);
        option.textContent = `${value} цифры`;
        if (value === 6)
            option.textContent = '6 цифр'; // Стилистическое уточнение
        lengthSelect.appendChild(option);
    });
    lengthGroup.appendChild(lengthSelect);
    card.appendChild(lengthGroup);
    // --- КНОПКА СТАРТА ---
    const startButton = document.createElement('button');
    startButton.id = 'start-game-btn';
    startButton.className = 'btn-primary';
    startButton.textContent = 'Начать раунд';
    card.appendChild(startButton);
    container.appendChild(card);
    // --- ИНИЦИАЛИЗАЦИЯ И РЕАКТИВНАЯ ЛОГИКА ---
    baseSelect.value = props.currentBase;
    lengthSelect.value = String(props.currentLength);
    /**
     * Управляет доступностью опций длины в зависимости от выбранного алфавита.
     */
    const updateAvailableLengths = (selectedBase) => {
        Array.from(lengthSelect.options).forEach((option) => {
            const optionLength = Number(option.value);
            if (selectedBase === Base.Bin) {
                const isLength2 = optionLength === 2;
                option.disabled = !isLength2;
                if (!isLength2 && option.selected) {
                    lengthSelect.value = '2';
                }
            }
            else {
                option.disabled = false;
            }
        });
    };
    updateAvailableLengths(props.currentBase);
    baseSelect.addEventListener('change', () => {
        updateAvailableLengths(baseSelect.value);
    });
    startButton.addEventListener('click', () => {
        props.onStartGame(Number(lengthSelect.value), baseSelect.value);
    });
    return container;
};
//# sourceMappingURL=settingsScreen.js.map