import confetti from 'canvas-confetti';

export const triggerMumtazConfetti = () => {
  // Multistage colorful confetti burst
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#10b981', '#fbbf24', '#f59e0b', '#34d399', '#38bdf8', '#ffffff'],
  });

  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#10b981', '#fbbf24', '#ffffff'],
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#34d399', '#f59e0b', '#ffffff'],
    });
  }, 200);
};

export const triggerStarBurst = () => {
  confetti({
    particleCount: 35,
    spread: 45,
    origin: { y: 0.7 },
    colors: ['#fbbf24', '#f59e0b', '#fef08a'],
  });
};
