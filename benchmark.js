import { performance } from 'perf_hooks';

const items = Array.from({ length: 100 }, (_, i) => ({ price: i * 10 }));

function calcWithoutMemo() {
  return items.reduce((acc, i) => acc + (i.price || 850), 0);
}

const ITERATIONS = 1_000_000;

const start = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  calcWithoutMemo();
}
const end = performance.now();

console.log(`Without memo (recalculated ${ITERATIONS} times): ${(end - start).toFixed(2)} ms`);

// With memo, we just return the cached value
const cachedTotal = calcWithoutMemo();
const startMemo = performance.now();
let total = 0;
for (let i = 0; i < ITERATIONS; i++) {
  total = cachedTotal;
}
const endMemo = performance.now();

console.log(`With memo (cached value accessed ${ITERATIONS} times): ${(endMemo - startMemo).toFixed(2)} ms`);
