const STORAGE_KEY = 'bulls_cows_leaderboard_v2';
export const getLeaderboard = () => {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData)
        return Object.freeze([]);
    const parsed = JSON.parse(rawData);
    const sorted = [...parsed].sort((a, b) => {
        if (a.attemptsCount !== b.attemptsCount) {
            return a.attemptsCount - b.attemptsCount;
        }
        return a.duration - b.duration;
    });
    return Object.freeze(sorted);
};
export const saveRecord = (entry) => {
    const currentRecords = getLeaderboard();
    const newEntry = Object.freeze({
        ...entry,
        date: new Date().toLocaleDateString(),
    });
    const updatedRecords = [...currentRecords, newEntry];
    const top10Records = updatedRecords
        .sort((a, b) => {
        if (a.attemptsCount !== b.attemptsCount)
            return a.attemptsCount - b.attemptsCount;
        return a.duration - b.duration;
    })
        .slice(0, 10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(top10Records));
    return Object.freeze(top10Records);
};
//# sourceMappingURL=leaderboardService.js.map