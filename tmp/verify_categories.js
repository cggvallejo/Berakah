import { products } from './src/data/products.js';

const categoryCounts = {};
products.forEach(p => {
  categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
});

console.log(JSON.stringify(categoryCounts, null, 2));
console.log('Total products:', products.length);
