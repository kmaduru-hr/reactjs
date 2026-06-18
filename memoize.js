function add(a, b) {
  console.log("Computing...");
  return a + b;
}

const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

const memoizedAdd = memoize(add);

console.log(memoizedAdd(2, 3)); // "Computing..." then 5
console.log(memoizedAdd(2, 3)); // just 5 (cached, no "Computing...")
