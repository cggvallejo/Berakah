import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '..', 'public', 'images');
const outputFile = path.join(__dirname, '..', 'src', 'data', 'products.js');

const DESCRIPTORS = {
  weaving: ["tejido artesanal de yute", "trama orgánica", "urdimbre de fibra natural", "trenzado a mano"],
  texture: ["acabado rústico elegante", "textura táctil premium", "superficie con carácter", "esencia matérica"],
  details: ["forro interior de alta calidad", "cierre reforzado", "detalles en cuero sintético", "herrajes metálicos"],
  vibe: ["esencia del México contemporáneo", "lujo consciente", "botín de artesanía fina", "toque de distinción"],
  use: ["perfecto para el día a día", "ideal para ocasiones especiales", "un básico de fondo de armario", "tu compañero de viaje ideal"]
};

function generateDescription(name, category) {
  const w = DESCRIPTORS.weaving[Math.floor(Math.random() * DESCRIPTORS.weaving.length)];
  const t = DESCRIPTORS.texture[Math.floor(Math.random() * DESCRIPTORS.texture.length)];
  const d = DESCRIPTORS.details[Math.floor(Math.random() * DESCRIPTORS.details.length)];
  const v = DESCRIPTORS.vibe[Math.floor(Math.random() * DESCRIPTORS.vibe.length)];
  
  return `Una pieza maestra de ${w} con ${t}. Este diseño de ${category.toLowerCase()} cuenta con ${d}, capturando la ${v}.`;
}

function getCategory(filename) {
  const name = filename.toLowerCase();
  if (name.includes('monedero') || name.includes('muñequera')) return 'Esenciales';
  if (name.includes('celular') || name.includes('porta_celular')) return 'Portacelulares';
  if (name.includes('mochila')) return 'Mochilas';
  if (name.includes('bandolera') || name.includes('cilindro') || name.includes('doble cierre')) return 'Bandoleras';
  return 'Bolsas';
}

function getPrice(category) {
  if (category === 'Esenciales') return 180 + Math.floor(Math.random() * 120);
  if (category === 'Portacelulares') return 280 + Math.floor(Math.random() * 170);
  if (category === 'Bandoleras') return 520 + Math.floor(Math.random() * 180);
  if (category === 'Mochilas') return 650 + Math.floor(Math.random() * 200);
  return 580 + Math.floor(Math.random() * 220); // Bolsas
}

function getFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('md5');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

const files = fs.readdirSync(imagesDir).filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i));

const seenHashes = new Set();
const uniqueFiles = [];

files.forEach(file => {
  const fullPath = path.join(imagesDir, file);
  const hash = getFileHash(fullPath);
  if (!seenHashes.has(hash)) {
    seenHashes.add(hash);
    uniqueFiles.push(file);
  }
});

const products = uniqueFiles.map(file => {
  const category = getCategory(file);
  const baseName = file.replace(/(_[a-f0-9]+)?\.(jpg|jpeg|png|webp)$/i, '').replace(/_/g, ' ');
  return {
    id: crypto.randomUUID(),
    name: baseName.charAt(0).toUpperCase() + baseName.slice(1),
    category: category,
    image: `/images/${file}`,
    price: getPrice(category),
    description: generateDescription(baseName, category)
  };
});

// Rename variants if needed
const finalProducts = [];
const seenNames = new Set();

products.forEach(p => {
  const key = `${p.name}-${p.category}`;
  if (!seenNames.has(key)) {
    seenNames.add(key);
    finalProducts.push(p);
  } else {
      const count = finalProducts.filter(item => item.name.startsWith(p.name)).length;
      p.name = `${p.name} - Variante ${count + 1}`;
      finalProducts.push(p);
  }
});

const content = `export const products = ${JSON.stringify(finalProducts, null, 2)};`;

fs.writeFileSync(outputFile, content);
console.log(`Generated ${finalProducts.length} unique products (removed ${files.length - finalProducts.length} duplicates).`);
