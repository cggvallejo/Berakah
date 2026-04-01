import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '..', 'public', 'images');

function getFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('md5');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

const files = fs.readdirSync(imagesDir);
const hashes = {};
const duplicates = [];

files.forEach(file => {
  const fullPath = path.join(imagesDir, file);
  if (fs.lstatSync(fullPath).isFile()) {
    const hash = getFileHash(fullPath);
    if (hashes[hash]) {
      duplicates.push({ original: hashes[hash], duplicate: file });
    } else {
      hashes[hash] = file;
    }
  }
});

console.log(JSON.stringify({
  totalFiles: files.length,
  uniqueFiles: Object.keys(hashes).length,
  duplicates: duplicates
}, null, 2));
