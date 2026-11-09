export const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        const cachedResult = cache.get(key);
        if (cachedResult !== undefined) {
            return cachedResult;
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};
//# sourceMappingURL=memoize.js.map