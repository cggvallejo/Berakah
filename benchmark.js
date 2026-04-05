import { performance } from 'perf_hooks';

const CATEGORIES = ['Bandoleras', 'Bolsas', 'Mochilas', 'Portacelulares', 'Esenciales'];

// Generate a large number of products for benchmarking
const numProducts = 10000;
const products = [];
for (let i = 0; i < numProducts; i++) {
  products.push({
    id: String(i),
    price: Math.floor(Math.random() * 1000),
    category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]
  });
}

function runOld() {
  const totalProducts = products.length;
  const categoryCount = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = products.filter(p => p.category === cat).length;
    return acc;
  }, {});
  const avgPrice = Math.round(products.reduce((s, p) => s + p.price, 0) / products.length);
  return { totalProducts, categoryCount, avgPrice };
}

function runNew() {
  const total = products.length;
  const catCount = CATEGORIES.reduce((acc, cat) => { acc[cat] = 0; return acc; }, {});

  if (total === 0) {
    return { totalProducts: 0, categoryCount: catCount, avgPrice: 0 };
  }

  let sumPrice = 0;
  for (let i = 0; i < total; i++) {
    const p = products[i];
    sumPrice += (p.price || 0);
    if (catCount[p.category] !== undefined) {
      catCount[p.category]++;
    }
  }

  return {
    totalProducts: total,
    categoryCount: catCount,
    avgPrice: Math.round(sumPrice / total)
  };
}

// Warmup
for (let i = 0; i < 100; i++) {
  runOld();
  runNew();
}

let startOld = performance.now();
for (let i = 0; i < 1000; i++) {
  runOld();
}
let endOld = performance.now();

let startNew = performance.now();
for (let i = 0; i < 1000; i++) {
  runNew();
}
let endNew = performance.now();

console.log('Old logic time:', endOld - startOld, 'ms');
console.log('New logic time:', endNew - startNew, 'ms');
