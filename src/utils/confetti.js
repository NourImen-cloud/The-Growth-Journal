import confetti from 'canvas-confetti';

export function firePastelConfetti() {
  try {
    const count = 70;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#D8B4FE', '#F472B6', '#FDE047', '#A7F3D0', '#BAE6FD', '#FBCFE8'],
    };

    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.5),
      spread: 60,
      shapes: ['circle'],
      scalar: 1.1,
    });

    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.3),
      spread: 100,
      decay: 0.91,
      scalar: 0.9,
    });

    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.2),
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
  } catch {
    // Ignore if canvas isn't supported
  }
}
