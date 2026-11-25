import React from 'react';
import { useLocation } from 'react-router-dom';

// Decorative floating stone swatches shown behind/over every public page.
const IMAGES = [
  'amazonite-posedian-quartzite', 'amber-patagonia-quartzite', 'blue-dune-gold-granite',
  'crystalo-gold', 'envy-green-quartzite', 'fusion-blue-quartzite', 'havana-blue-quartzite',
  'lava-oro-fire-quartzite', 'mango-fusion-quartzite', 'monalisa-granite', 'red-bull-quartzite',
  'taj-quartzite', 'tempest-gray-quartzite', 'verde-savana-quartzite',
];

// left %, top %, size px, duration s, delay s, rotation deg
const SCALE = 2.2; // increase to make the stones bigger

const LAYOUT = [
  [4, 10, 120, 22, 0, -12], [88, 6, 150, 28, -6, 10], [14, 38, 90, 19, -3, 8],
  [80, 30, 110, 25, -10, -8], [3, 62, 140, 30, -14, 14], [90, 58, 100, 21, -5, -14],
  [22, 82, 130, 27, -9, 6], [70, 86, 120, 24, -2, -10], [48, 4, 80, 20, -8, 12],
  [55, 48, 70, 23, -12, -6], [35, 20, 70, 26, -4, 16], [65, 68, 90, 29, -16, -4],
  [94, 84, 90, 22, -7, 9], [40, 92, 100, 31, -11, -9],
];

const FloatingStones = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith('/admin')) return null;
  return (
    <div className="floating-stones" aria-hidden="true">
      {LAYOUT.map(([left, top, size, dur, delay, rot], i) => (
        <img
          key={i}
          src={`/images/inventory/${IMAGES[i % IMAGES.length]}.jpg`}
          alt=""
          loading="lazy"
          decoding="async"
          style={{
            left: `${left}%`, top: `${top}%`, width: size * SCALE, height: size * SCALE,
            '--rot': `${rot}deg`, animationDuration: `${dur}s`, animationDelay: `${delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingStones;
