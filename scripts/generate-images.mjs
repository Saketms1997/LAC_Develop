// Generates unique placeholder stone textures (SVG) into public/images.
// Replace any generated file with real photography (same file name) or upload images in the admin panel.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');
mkdirSync(outDir, { recursive: true });

const SIZE = 800;

const svgWrap = (defs, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" preserveAspectRatio="xMidYMid slice"><defs>${defs}</defs>${body}</svg>`;

const ALPHA_FROM_RED = '0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0';

const marble = ({ base, vein, vein2 = vein, seed, freq = '0.004 0.009' }, v) => {
  const s = seed + v * 7;
  const defs = `
    <filter id="v1" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="5" seed="${s}"/>
      <feColorMatrix type="matrix" values="${ALPHA_FROM_RED}"/>
      <feComponentTransfer result="a"><feFuncA type="table" tableValues="0 0 0 0 0.9 0 0 0 0 0 0"/></feComponentTransfer>
      <feFlood flood-color="${vein}" result="c"/><feComposite in="c" in2="a" operator="in"/>
    </filter>
    <filter id="v2" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="4" seed="${s + 40}"/>
      <feColorMatrix type="matrix" values="${ALPHA_FROM_RED}"/>
      <feComponentTransfer result="a"><feFuncA type="table" tableValues="0 0 0 0 0 0.55 0 0 0 0 0"/></feComponentTransfer>
      <feFlood flood-color="${vein2}" result="c"/><feComposite in="c" in2="a" operator="in"/>
    </filter>
    <radialGradient id="g" cx="50%" cy="40%" r="80%"><stop offset="0" stop-color="#fff" stop-opacity="0.12"/><stop offset="1" stop-color="#000" stop-opacity="0.12"/></radialGradient>`;
  const body = `<g transform="rotate(${v * 35} ${SIZE / 2} ${SIZE / 2}) translate(${-v * 60} ${-v * 60}) scale(${1.2 + v * 0.25})">
    <rect x="-400" y="-400" width="${SIZE * 2}" height="${SIZE * 2}" fill="${base}"/>
    <rect x="-400" y="-400" width="${SIZE * 2}" height="${SIZE * 2}" filter="url(#v2)"/>
    <rect x="-400" y="-400" width="${SIZE * 2}" height="${SIZE * 2}" filter="url(#v1)"/></g>
    <rect width="${SIZE}" height="${SIZE}" fill="url(#g)"/>`;
  return svgWrap(defs, body);
};

const granite = ({ base, speck, speck2 = speck, seed, density = 0.55 }, v) => {
  const s = seed + v * 5;
  const threshold = (d) => {
    const t = Math.round((1 - d) * 10);
    return Array.from({ length: 12 }, (_, i) => (i >= t ? 1 : 0)).join(' ');
  };
  const layer = (id, f, color, d, sd) => `
    <filter id="${id}" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="${f}" numOctaves="2" seed="${sd}"/>
      <feColorMatrix type="matrix" values="${ALPHA_FROM_RED}"/>
      <feComponentTransfer result="a"><feFuncA type="discrete" tableValues="${threshold(d)}"/></feComponentTransfer>
      <feFlood flood-color="${color}" result="c"/><feComposite in="c" in2="a" operator="in"/>
    </filter>`;
  const defs =
    layer('s1', '0.55', speck, density * 0.45, s) +
    layer('s2', '0.9', speck2, density * 0.5, s + 9) +
    layer('s3', '0.035', speck2, density * 0.25, s + 21);
  const body = `<rect width="${SIZE}" height="${SIZE}" fill="${base}"/>
    <rect width="${SIZE}" height="${SIZE}" filter="url(#s3)" opacity="0.35"/>
    <rect width="${SIZE}" height="${SIZE}" filter="url(#s1)"/>
    <rect width="${SIZE}" height="${SIZE}" filter="url(#s2)"/>`;
  return svgWrap(defs, body);
};

const banded = ({ base, band, seed, freq = '0.002 0.05', pores = false }, v) => {
  const s = seed + v * 3;
  const defs = `
    <filter id="b" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="4" seed="${s}"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.4 0 0 0 -0.2" result="a"/>
      <feFlood flood-color="${band}" result="c"/><feComposite in="c" in2="a" operator="in"/>
    </filter>
    <filter id="p" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.07 0.3" numOctaves="2" seed="${s + 4}"/>
      <feColorMatrix type="matrix" values="${ALPHA_FROM_RED}"/>
      <feComponentTransfer result="a"><feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 1 1"/></feComponentTransfer>
      <feFlood flood-color="#000" flood-opacity="0.2" result="c"/><feComposite in="c" in2="a" operator="in"/>
    </filter>`;
  const rect = `x="-100" y="-100" width="${SIZE + 200}" height="${SIZE + 200}"`;
  const body = `<g transform="rotate(${v * 12} ${SIZE / 2} ${SIZE / 2}) scale(${1.1 + v * 0.2})">
    <rect ${rect} fill="${base}"/>
    <rect ${rect} filter="url(#b)"/>
    ${pores ? `<rect ${rect} filter="url(#p)" opacity="0.5"/>` : ''}</g>`;
  return svgWrap(defs, body);
};

const tiles = ({ base, tint, grout = '#bdb7ad', seed, count = 3 }, v) => {
  const n = count + v;
  const step = SIZE / n;
  const defs = `
    <filter id="t" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.02 0.03" numOctaves="3" seed="${seed + v}"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.9 0 0 0 -0.15" result="a"/>
      <feFlood flood-color="${tint}" result="c"/><feComposite in="c" in2="a" operator="in"/>
    </filter>`;
  let body = `<rect width="${SIZE}" height="${SIZE}" fill="${grout}"/>`;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const shade = 0.92 + ((r * 7 + c * 13 + seed) % 6) * 0.016;
      const attrs = `x="${c * step + 4}" y="${r * step + 4}" width="${step - 8}" height="${step - 8}"`;
      body += `<rect ${attrs} fill="${base}" opacity="${shade}"/><rect ${attrs} filter="url(#t)" opacity="0.55"/>`;
    }
  }
  return svgWrap(defs, body);
};

const builders = { marble, granite, banded, tiles };

const write = (name, spec, variant = 0) => {
  const { type, ...opts } = spec;
  writeFileSync(join(outDir, `${name}.svg`), builders[type](opts, variant));
};

const specs = {
  'statuario-white-marble': { type: 'marble', base: '#f5f4f2', vein: '#7f858f', vein2: '#c3c6cc', seed: 3 },
  'carrara-white-marble': { type: 'marble', base: '#eeeeec', vein: '#a3a8b0', vein2: '#d3d5d8', seed: 11, freq: '0.006 0.014' },
  'botticino-marble': { type: 'marble', base: '#dccaa6', vein: '#a98e5c', vein2: '#efe2c4', seed: 5, freq: '0.005 0.012' },
  'rajasthan-green-marble': { type: 'marble', base: '#2e5c45', vein: '#c4dfca', vein2: '#173a2a', seed: 8 },
  'black-marquina-marble': { type: 'marble', base: '#141414', vein: '#ece7dc', vein2: '#3a3a3a', seed: 2 },
  'onyx-marble': { type: 'marble', base: '#e9b968', vein: '#fff3d1', vein2: '#a5601c', seed: 14, freq: '0.003 0.02' },
  'black-galaxy-granite': { type: 'granite', base: '#0b0b0d', speck: '#d9ae4f', speck2: '#7d6a3a', seed: 21, density: 0.7 },
  'absolute-black-granite': { type: 'granite', base: '#08080a', speck: '#2e2e33', speck2: '#1a1a1d', seed: 31, density: 0.5 },
  'alaska-white-granite': { type: 'granite', base: '#e8e6e0', speck: '#5c616b', speck2: '#c19a73', seed: 41, density: 0.75 },
  'red-granite': { type: 'granite', base: '#7b1e20', speck: '#2a0b0c', speck2: '#e0a5a0', seed: 51, density: 0.65 },
  'brown-granite': { type: 'granite', base: '#4b2e1c', speck: '#cc9c66', speck2: '#1e100a', seed: 61, density: 0.65 },
  'teakwood-sandstone': { type: 'banded', base: '#c08f4e', band: '#7a4c20', seed: 71 },
  'travertine-stone': { type: 'banded', base: '#e0d2b6', band: '#b59c70', seed: 81, freq: '0.003 0.04', pores: true },
  'slate-stone': { type: 'banded', base: '#40474c', band: '#1c2124', seed: 91, freq: '0.004 0.03' },
  'quartzite-stone': { type: 'marble', base: '#d2d9d5', vein: '#6f9190', vein2: '#f4f7f5', seed: 17, freq: '0.007 0.011' },
  'vitrified-tiles-premium': { type: 'tiles', base: '#e9e4da', tint: '#c9bfa9', grout: '#c4bdb0', seed: 2 },
  'porcelain-tiles': { type: 'tiles', base: '#d9dadc', tint: '#8f949c', grout: '#a9acb1', seed: 4, count: 2 },
  'ceramic-tiles': { type: 'tiles', base: '#c0694a', tint: '#7d3a22', grout: '#e4d7c6', seed: 6, count: 4 },
  'quartz-surface': { type: 'granite', base: '#ece9e4', speck: '#9a9690', speck2: '#c9c4bb', seed: 101, density: 0.6 },
  'stone-slab-premium': { type: 'marble', base: '#d9d2c5', vein: '#6b5d50', vein2: '#efe9dd', seed: 23, freq: '0.005 0.01' },
  'kitchen-countertop-stone': { type: 'granite', base: '#2a2a2e', speck: '#c8c8cf', speck2: '#6c6c75', seed: 111, density: 0.6 },
};

// Each product gets a main image (<id>.svg) and two more gallery views.
for (const [id, spec] of Object.entries(specs)) {
  for (let v = 0; v < 3; v++) write(v === 0 ? id : `${id}-${v + 1}`, spec, v);
}

const projectSpecs = {
  'luxury-villa-jaipur': 'statuario-white-marble',
  'hotel-interior-delhi': 'botticino-marble',
  'commercial-plaza': 'alaska-white-granite',
  'kitchen-countertop': 'black-galaxy-granite',
  'bathroom-marble': 'carrara-white-marble',
  'staircase-marble': 'onyx-marble',
  'resort-flooring': 'travertine-stone',
  'office-renovation': 'slate-stone',
};
for (const [id, from] of Object.entries(projectSpecs)) {
  for (let v = 0; v < 2; v++) write(v === 0 ? `project-${id}` : `project-${id}-2`, specs[from], v + 1);
}

write('about', specs['carrara-white-marble'], 2);

console.log('Generated images in', outDir);
