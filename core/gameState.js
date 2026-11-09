export const startGame = (state, secret, startTime) => {
    return Object.freeze({
        ...state,
        isSettingsPhase: false,
        secret,
        startTime,
        endTime: null,
        isWon: false,
        attempts: Object.freeze([]),
    });
};
export const makeGuess = (state, payload) => {
    if (state.isWon) {
        return state;
    }
    const { attempt, currentTime } = payload;
    const isWonRound = attempt.bulls === state.settings.length;
    return Object.freeze({
        ...state,
        isWon: isWonRound,
        endTime: isWonRound ? currentTime : state.endTime,
        attempts: Object.freeze([...state.attempts, attempt]),
    });
};
export const resetToSettings = (state) => {
    return Object.freeze({
        ...state,
        isSettingsPhase: true,
        secret: '',
        startTime: null,
        endTime: null,
        isWon: false,
        attempts: Object.freeze([]),
    });
};
//# sourceMappingURL=gameState.js.map