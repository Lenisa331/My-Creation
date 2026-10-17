// Web Audio API Synthesizer for instant, lag-free sound effects without network dependencies

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export const setSoundEnabled = (enabled: boolean) => {
  soundEnabled = enabled;
};

export const isSoundEnabled = () => soundEnabled;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const playClick = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.05);
};

export const playReveal = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  // Gentle harp / chime arpeggio (C5, E5, G5, C6)
  const notes = [523.25, 659.25, 783.99, 1046.50];
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.07);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + idx * 0.07);
    osc.stop(ctx.currentTime + idx * 0.07 + 0.45);
  });
};

export const playMumtazFanfare = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  // Joyful brass & chime fanfare: F4, A4, C5, F5, G5, A5
  const chords = [
    { freq: 349.23, delay: 0, dur: 0.2 },      // F4
    { freq: 440.00, delay: 0.12, dur: 0.2 },   // A4
    { freq: 523.25, delay: 0.24, dur: 0.2 },   // C5
    { freq: 698.46, delay: 0.36, dur: 0.4 },   // F5
    { freq: 880.00, delay: 0.48, dur: 0.7 },   // A5
    { freq: 1046.50, delay: 0.50, dur: 0.8 },  // C6
  ];

  chords.forEach((note) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(note.freq, ctx.currentTime + note.delay);

    gain.gain.setValueAtTime(0, ctx.currentTime + note.delay);
    gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + note.delay + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.delay + note.dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + note.delay);
    osc.stop(ctx.currentTime + note.delay + note.dur + 0.05);
  });
};

export const playJayyidSound = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [440, 554.37, 659.25]; // A major cheerful chord
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

    gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.1 + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + idx * 0.1);
    osc.stop(ctx.currentTime + idx * 0.1 + 0.4);
  });
};

export const playMurajaahSound = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  // Warm supportive chime (D4 to G4 peaceful resolution)
  const notes = [293.66, 392.00];
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);

    gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.15);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.15 + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + idx * 0.15);
    osc.stop(ctx.currentTime + idx * 0.15 + 0.45);
  });
};

export const playTick = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, ctx.currentTime);

  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.04);
};
