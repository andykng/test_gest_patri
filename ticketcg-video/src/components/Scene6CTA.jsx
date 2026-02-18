import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { TicketCGLogo } from './TicketCGLogo';

const KEYWORDS = ['Gratuit.', 'Simple.', 'Congolais.'];

export const Scene6CTA = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  // Fond pulse lent entre noir et bleu tres fonce
  const bgBlue = interpolate(
    Math.sin((localFrame / fps) * Math.PI * 0.8),
    [-1, 1],
    [0, 0.08],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  // Texte URL apparait
  const urlScale = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 160 },
    from: 0.5,
    to: 1,
  });

  const urlOpacity = spring({
    frame: localFrame,
    fps,
    config: { damping: 16, stiffness: 140 },
    from: 0,
    to: 1,
  });

  // Ligne underline bleue
  const lineProgress = interpolate(
    Math.max(0, localFrame - 20),
    [0, 50],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  // Glow de l'URL
  const urlGlow = interpolate(
    Math.sin((localFrame / fps) * Math.PI * 1.2),
    [-1, 1],
    [0.6, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  // Keywords entrent un par un
  const keywords = KEYWORDS.map((kw, i) => {
    const delay = 35 + i * 20;
    const kwOpacity = spring({
      frame: Math.max(0, localFrame - delay),
      fps,
      config: { damping: 15, stiffness: 130 },
      from: 0,
      to: 1,
    });
    return { text: kw, opacity: kwOpacity };
  });

  // Watermark logo
  const logoOpacity = interpolate(
    Math.max(0, localFrame - 60),
    [0, 30],
    [0, 0.35],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  const sceneOpacity = interpolate(
    localFrame,
    [0, 10],
    [0, 1],
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
        backgroundColor: `rgba(10, 20, 60, ${bgBlue})`,
        padding: '0 40px',
        gap: '0',
      }}
    >
      {/* Cercle lumineux de fond */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(30,64,175,${bgBlue * 3}) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* URL principale */}
      <div
        style={{
          transform: `scale(${urlScale})`,
          opacity: urlOpacity,
          textAlign: 'center',
          marginBottom: '8px',
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', 'Arial Black', sans-serif",
            fontWeight: 900,
            fontSize: '96px',
            color: '#FFFFFF',
            letterSpacing: '-2px',
            lineHeight: 1,
            textShadow: `
              0 0 ${urlGlow * 30}px rgba(255,255,255,0.3),
              0 0 ${urlGlow * 60}px rgba(30,64,175,0.4),
              0 4px 30px rgba(0,0,0,0.5)
            `,
          }}
        >
          ticketcg.com
        </div>
      </div>

      {/* Ligne underline bleue animee */}
      <div
        style={{
          width: '680px',
          height: '4px',
          borderRadius: '2px',
          backgroundColor: 'rgba(30,64,175,0.2)',
          marginBottom: '48px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${lineProgress * 100}%`,
            background: 'linear-gradient(90deg, #1E40AF, #60A5FA, #3B82F6)',
            borderRadius: '2px',
            boxShadow: '0 0 20px rgba(59,130,246,0.8), 0 0 40px rgba(30,64,175,0.4)',
          }}
        />
        {/* Etincelle en bout de ligne */}
        {lineProgress < 1 && lineProgress > 0 && (
          <div
            style={{
              position: 'absolute',
              left: `${lineProgress * 100}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 0 20px #60A5FA, 0 0 40px #3B82F6',
            }}
          />
        )}
      </div>

      {/* Trois mots clés */}
      <div
        style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
        }}
      >
        {keywords.map((kw, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span
              style={{
                fontFamily: "'Inter', 'Arial', sans-serif",
                fontWeight: 700,
                fontSize: '36px',
                color: i === 2 ? '#60A5FA' : '#FFFFFF',
                opacity: kw.opacity,
                letterSpacing: '0.5px',
                textShadow: i === 2
                  ? '0 0 20px rgba(96,165,250,0.6)'
                  : 'none',
              }}
            >
              {kw.text}
            </span>
            {i < 2 && (
              <span
                style={{
                  color: 'rgba(255,255,255,0.2)',
                  fontSize: '36px',
                  opacity: kw.opacity,
                }}
              >
                ·
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Watermark logo en bas */}
      <div
        style={{
          position: 'absolute',
          bottom: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: logoOpacity,
        }}
      >
        <TicketCGLogo scale={0.32} glowIntensity={0} />
      </div>
    </div>
  );
};
