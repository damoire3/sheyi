// Génère une mélodie douce originale (sans droits d'auteur) : ambiance.wav
// Lancer avec : node scripts/make-music.mjs
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, '..', 'public', 'assets', 'music');
mkdirSync(outDir, { recursive: true });

const SR = 22050;          // fréquence d'échantillonnage
const BPM = 70;
const beat = 60 / BPM;     // durée d'une noire en secondes

// 4 mesures : accords (pad) + mélodie (4 noires par mesure)
const bars = [
  { chord: [220.0, 261.63, 329.63], mel: [440.0, 523.25, 659.25, 523.25] }, // Am
  { chord: [174.61, 220.0, 261.63], mel: [698.46, 659.25, 523.25, 440.0] }, // F
  { chord: [130.81, 196.0, 261.63], mel: [392.0, 523.25, 659.25, 783.99] }, // C
  { chord: [196.0, 246.94, 293.66], mel: [783.99, 659.25, 587.33, 493.88] } // G
];
const REPEATS = 4;
const barLen = 4 * beat;
const total = bars.length * barLen * REPEATS + 2;
const N = Math.floor(total * SR);
const buf = new Float32Array(N);

function addTone(startSec, durSec, freq, amp) {
  const start = Math.floor(startSec * SR);
  const len = Math.floor(durSec * SR);
  const attack = Math.floor(0.03 * SR);
  for (let i = 0; i < len && start + i < N; i++) {
    const t = i / SR;
    let env = 1;
    if (i < attack) env = i / attack;
    env *= Math.exp(-2.2 * (i / len)); // décroissance douce
    const s =
      Math.sin(2 * Math.PI * freq * t) +
      0.25 * Math.sin(2 * Math.PI * freq * 2 * t) +
      0.08 * Math.sin(2 * Math.PI * freq * 3 * t);
    buf[start + i] += amp * env * s;
  }
}

let time = 0;
for (let r = 0; r < REPEATS; r++) {
  for (const bar of bars) {
    // Pad : accords tenus sur toute la mesure
    for (const f of bar.chord) addTone(time, barLen * 0.98, f, 0.07);
    // Mélodie : une note par noire, légèrement détachée
    bar.mel.forEach((f, i) => addTone(time + i * beat, beat * 0.9, f, 0.22));
    time += barLen;
  }
}

// Fondus d'entrée et de sortie pour une boucle propre
const fade = Math.floor(1.5 * SR);
let peak = 0;
for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(buf[i]));
for (let i = 0; i < N; i++) {
  let g = 0.7 / (peak || 1);
  if (i < fade) g *= i / fade;
  if (i > N - fade) g *= (N - i) / fade;
  buf[i] *= g;
}

// Écriture WAV PCM 16 bits mono
const dataBytes = N * 2;
const out = Buffer.alloc(44 + dataBytes);
out.write('RIFF', 0);
out.writeUInt32LE(36 + dataBytes, 4);
out.write('WAVE', 8);
out.write('fmt ', 12);
out.writeUInt32LE(16, 16);
out.writeUInt16LE(1, 20);          // PCM
out.writeUInt16LE(1, 22);          // mono
out.writeUInt32LE(SR, 24);
out.writeUInt32LE(SR * 2, 28);
out.writeUInt16LE(2, 32);
out.writeUInt16LE(16, 34);
out.write('data', 36);
out.writeUInt32LE(dataBytes, 40);
for (let i = 0; i < N; i++) {
  const v = Math.max(-1, Math.min(1, buf[i]));
  out.writeInt16LE(Math.round(v * 32767), 44 + i * 2);
}

const file = join(outDir, 'ambiance.wav');
writeFileSync(file, out);
console.log('Mélodie créée :', file, `(${Math.round(total)} s)`);
