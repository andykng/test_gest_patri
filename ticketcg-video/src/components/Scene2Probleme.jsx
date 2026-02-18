import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

const LINES = [
  { text: "Files d'attente.", delay: 0 },
  { text: "Billets faux.", delay: 50 },
  { text: "Argent perdu.", delay: 100 },
];

const ProblemeLine = ({ text, delay, localFrame, fps }) => {
  const adjustedFrame = Math.max(0, localFrame - delay);

  // Chute depuis le haut avec spring physique
  const slideY = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 14, stiffness: 200, mass: 1 },
    from: -300,
    to: 0,
  });

  // Vibration au moment de l'impact
  const impactFrame = Math.max(0, adjustedFrame - 15);
  const vibration = interpolate(
    impactFrame,
    [0, 2, 4, 6, 8, 10],
    [0, -8, 6, -4, 2, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  // Pulse couleur puis disparition
  const SHOW_DURATION = 110;
  const pulseOpacity = interpolate(
    adjustedFrame,
    [0, 10, SHOW_DURATION - 20, SHOW_DURATION],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  // Pulse rouge
  const pulseScale = interpolate(
    impactFrame,
    [0, 5, 12, 18],
    [1, 1.06, 0.97, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  // Intensite glow rouge
  const glowIntensity = interpolate(
    impactFrame,
    [0, 3, 10, 20],
    [0, 1, 0.5, 0.2],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  return (
    <div
      style={{
        transform: `translateY(${slideY + vibration}px) scale(${pulseScale})`,
        opacity: pulseOpacity,
        marginBottom: '20px',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          fontFamily: "'Inter', 'Arial Black', sans-serif",
          fontWeight: 900,
          fontSize: '72px',
          color: '#EF4444',
          textShadow: `
            0 0 ${glowIntensity * 30}px rgba(239,68,68,0.9),
            0 0 ${glowIntensity * 60}px rgba(127,29,29,0.6),
            0 0 ${glowIntensity * 100}px rgba(127,29,29,0.3)
          `,
          letterSpacing: '-1px',
          display: 'block',
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const Scene2Probleme = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  const sceneOpacity = interpolate(
    localFrame,
    [0, 8, 220, 240],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: sceneOpacity,
        padding: '0 40px',
        overflow: 'hidden',
      }}
    >
      {LINES.map((line, i) => (
        <ProblemeLine
          key={i}
          text={line.text}
          delay={line.delay}
          localFrame={localFrame}
          fps={fps}
        />
      ))}
    </div>
  );
};
