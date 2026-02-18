import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { TicketCGLogo } from './TicketCGLogo';

const BADGES = [
  { text: 'QR Code securise', icon: 'QR' },
  { text: 'Mobile Money', icon: 'MM' },
];

const Badge = ({ text, icon, delay, localFrame, fps }) => {
  const adjustedFrame = Math.max(0, localFrame - delay);

  const slideX = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 14, stiffness: 180, mass: 1 },
    from: -400,
    to: 0,
  });

  const opacity = interpolate(
    adjustedFrame,
    [0, 12],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  // Bordure lumineuse animee
  const borderGlow = interpolate(
    adjustedFrame,
    [0, 20, 40, 60],
    [0, 1, 0.6, 0.8],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  return (
    <div
      style={{
        transform: `translateX(${slideX}px)`,
        opacity,
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        backgroundColor: '#1E3A8A',
        border: `2px solid rgba(96, 165, 250, ${0.3 + borderGlow * 0.7})`,
        borderRadius: '16px',
        padding: '18px 32px',
        marginBottom: '16px',
        boxShadow: `
          0 0 ${borderGlow * 20}px rgba(96,165,250,0.4),
          0 0 ${borderGlow * 40}px rgba(30,64,175,0.2),
          inset 0 1px 0 rgba(255,255,255,0.1)
        `,
      }}
    >
      {/* Icone */}
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '10px',
          backgroundColor: 'rgba(59,130,246,0.2)',
          border: '1.5px solid #3B82F6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          fontSize: '12px',
          color: '#60A5FA',
          letterSpacing: '0.5px',
        }}
      >
        {icon}
      </div>

      <span
        style={{
          fontFamily: "'Inter', 'Arial', sans-serif",
          fontWeight: 700,
          fontSize: '38px',
          color: '#FFFFFF',
          letterSpacing: '-0.3px',
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const Scene3Solution = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  // Logo zoom-in spring
  const logoScale = spring({
    frame: localFrame,
    fps,
    config: { damping: 16, stiffness: 200, mass: 0.8 },
    from: 0,
    to: 1,
  });

  // Glow du logo
  const logoGlow = interpolate(
    localFrame,
    [0, 25, 50, 120],
    [0, 1, 0.7, 0.5],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  // Texte sous le logo
  const subtitleOpacity = spring({
    frame: Math.max(0, localFrame - 20),
    fps,
    config: { damping: 15, stiffness: 150 },
    from: 0,
    to: 1,
  });

  // Glow texte bleu
  const textGlow = interpolate(
    Math.max(0, localFrame - 20),
    [0, 30, 60],
    [0, 1, 0.7],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  const sceneOpacity = interpolate(
    localFrame,
    [0, 8, 340, 360],
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
        padding: '0 50px',
        gap: '32px',
      }}
    >
      {/* Logo TicketCG */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <TicketCGLogo scale={0.85} glowIntensity={logoGlow} />

        {/* Sous-titre avec glow bleu */}
        <div
          style={{
            opacity: subtitleOpacity,
            fontFamily: "'Inter', 'Arial', sans-serif",
            fontWeight: 700,
            fontSize: '42px',
            color: '#60A5FA',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            textShadow: `
              0 0 ${textGlow * 20}px rgba(96,165,250,0.8),
              0 0 ${textGlow * 40}px rgba(30,64,175,0.5)
            `,
          }}
        >
          La billetterie du Congo
        </div>
      </div>

      {/* Badges */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%',
          maxWidth: '560px',
        }}
      >
        {BADGES.map((badge, i) => (
          <Badge
            key={i}
            text={badge.text}
            icon={badge.icon}
            delay={60 + i * 30}
            localFrame={localFrame}
            fps={fps}
          />
        ))}
      </div>
    </div>
  );
};
