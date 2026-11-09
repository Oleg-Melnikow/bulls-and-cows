export const memoize = <Args extends unknown[], Return>(
  fn: (...args: Args) => Return
): ((...args: Args) => Return) => {
  const cache = new Map<string, Return>();

  return (...args: Args): Return => {
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
