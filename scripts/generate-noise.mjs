/**
 * Genererar static/noise.png – samma grain-overlay som grunge-temat.
 *
 * Algoritmen (Box-Muller + gaussiskt brus) är härledd från
 * tailwindcss-noise © Riley (MIT). Vi genererar bilden EN gång och
 * servar den statiskt i stället för att dra in node-canvas (tung
 * native-dep, CI-risk). Parametrar = temats `noise-[67,22,25]`.
 *
 * Kör om vid behov:  node scripts/generate-noise.mjs
 */
import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';

const SIZE = 256;
const MEAN = 67;
const STD_DEV = 22;
const OPACITY = 25; // procent

function randnBm() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// RGBA-rådata med en filter-byte (0) per rad
const stride = SIZE * 4;
const raw = Buffer.alloc((stride + 1) * SIZE);
const alpha = Math.round(255 * (OPACITY / 100));
for (let y = 0; y < SIZE; y++) {
  const rowStart = y * (stride + 1);
  raw[rowStart] = 0; // filter: None
  for (let x = 0; x < SIZE; x++) {
    const z = randnBm();
    const p = Math.min(255, Math.max(0, Math.floor(z * STD_DEV + MEAN)));
    const i = rowStart + 1 + x * 4;
    raw[i] = p; raw[i + 1] = p; raw[i + 2] = p; raw[i + 3] = alpha;
  }
}

// --- minimal PNG-encoder (RGBA, 8-bit) ---
const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(SIZE, 0);
ihdr.writeUInt32BE(SIZE, 4);
ihdr[8] = 8;   // bit depth
ihdr[9] = 6;   // color type RGBA
ihdr[10] = 0;  // compression
ihdr[11] = 0;  // filter
ihdr[12] = 0;  // interlace

const png = Buffer.concat([
  sig,
  chunk('IHDR', ihdr),
  chunk('IDAT', deflateSync(raw)),
  chunk('IEND', Buffer.alloc(0)),
]);

writeFileSync(new URL('../static/noise.png', import.meta.url), png);
console.log(`static/noise.png skapad (${png.length} bytes, ${SIZE}x${SIZE}, mean=${MEAN} stdDev=${STD_DEV} opacity=${OPACITY}%)`);
