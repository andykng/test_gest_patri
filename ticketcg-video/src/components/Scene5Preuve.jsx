import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

const TARGET_COUNT = 1247;

// Counter animé style odometer
const AnimatedCounter = ({ value, localFrame, fps }) => {
  const digits = value.toString().padStart(4, '0').split('');

  return (
    <div
      style={{
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
      }}
    >
      {digits.map((digit, i) => {
        // Chaque chiffre roule avec un leger decalage
        const digitDelay = i * 8;
        const adjustedFrame = Math.max(0, localFrame - digitDelay);

        const digitProgress = interpolate(
          adjustedFrame,
          [0, 80],
          [0, 1],
          { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
        );

        const currentDigit = Math.floor(parseInt(digit) * digitProgress);
        const rollOffset = interpolate(
          adjustedFrame % 6,
          [0, 3, 6],
          [0, -4, 0],
          { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
        );

        return (
          <div
            key={i}
            style={{
              width: '52px',
              height: '72px',
              backgroundColor: 'rgba(30,64,175,0.3)',
              border: '1px solid rgba(59,130,246,0.4)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', 'Arial Black', sans-serif",
                fontWeight: 900,
                fontSize: '42px',
                color: '#60A5FA',
                transform: `translateY(${rollOffset}px)`,
                display: 'block',
                textShadow: '0 0 20px rgba(96,165,250,0.6)',
              }}
            >
              {currentDigit}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// Mockup de telephone minimaliste
const PhoneMockup = ({ index, localFrame, fps, content }) => {
  const delay = index * 15;
  const adjustedFrame = Math.max(0, localFrame - delay);

  const opacity = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 15, stiffness: 150 },
    from: 0,
    to: 1,
  });

  const scale = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 14, stiffness: 160 },
    from: 0.7,
    to: 1,
  });

  return (
    <div
      style={{
        width: '180px',
        height: '300px',
        backgroundColor: '#0D1B3E',
        border: '2px solid rgba(30,64,175,0.5)',
        borderRadius: '20px',
        opacity,
        transform: `scale(${scale})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 12px',
        gap: '8px',
        boxShadow: '0 0 30px rgba(30,64,175,0.2)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Notch en haut */}
      <div
        style={{
          width: '60px',
          height: '6px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '3px',
          marginBottom: '4px',
        }}
      />

      {/* Header dashboard */}
      <div
        style={{
          width: '100%',
          height: '28px',
          backgroundColor: 'rgba(30,64,175,0.3)',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '8px',
        }}
      >
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3B82F6', marginRight: '6px' }} />
        <div style={{ width: '60px', height: '4px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '2px' }} />
      </div>

      {/* Contenu dynamique */}
      {content}
    </div>
  );
};

export const Scene5Preuve = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  // Counter animé
  const counterValue = Math.floor(
    interpolate(localFrame, [0, 180], [0, TARGET_COUNT], {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    })
  );

  const sceneOpacity = interpolate(
    localFrame,
    [0, 10, 220, 240],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  // Texte overlay
  const textOpacity = spring({
    frame: Math.max(0, localFrame - 20),
    fps,
    config: { damping: 15, stiffness: 120 },
    from: 0,
    to: 1,
  });

  // Barres de graphe animees
  const barHeights = [0.6, 0.8, 0.5, 0.9, 0.7, 1.0, 0.85].map((h, i) => {
    const delay = 20 + i * 10;
    const progress = interpolate(
      Math.max(0, localFrame - delay),
      [0, 60],
      [0, h],
      { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
    );
    return progress;
  });

  const phoneContents = [
    // Graphe de ventes
    <div key="graph" style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '100px', padding: '0 4px' }}>
        {barHeights.map((h, i) => (
          <div key={i} style={{
            flex: 1,
            height: `${h * 100}%`,
            backgroundColor: i === 5 ? '#3B82F6' : 'rgba(30,64,175,0.4)',
            borderRadius: '3px 3px 0 0',
            boxShadow: i === 5 ? '0 0 10px rgba(59,130,246,0.5)' : 'none',
          }} />
        ))}
      </div>
      <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px' }}>
        <div style={{ width: '20px', height: '4px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '2px' }} />
        <div style={{ width: '30px', height: '4px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '2px' }} />
      </div>
      <div style={{ padding: '6px', backgroundColor: 'rgba(59,130,246,0.1)', borderRadius: '6px', border: '1px solid rgba(59,130,246,0.2)' }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#60A5FA', fontWeight: 700 }}>
          +{Math.floor(counterValue / 10)} billets
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '8px', color: 'rgba(255,255,255,0.4)' }}>
          Aujourd'hui
        </div>
      </div>
    </div>,

    // Stats simples
    <div key="stats" style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {[
        { label: 'Ventes', value: counterValue, color: '#3B82F6' },
        { label: 'Revenue', value: `${Math.floor(counterValue * 2.5)}K`, color: '#10B981' },
        { label: 'Scans OK', value: '98%', color: '#60A5FA' },
      ].map((stat, i) => (
        <div key={i} style={{
          backgroundColor: 'rgba(30,64,175,0.15)',
          borderRadius: '6px',
          padding: '8px',
          border: '1px solid rgba(59,130,246,0.2)',
        }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', color: 'rgba(255,255,255,0.4)', marginBottom: '2px' }}>
            {stat.label}
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 900, color: stat.color }}>
            {stat.value}
          </div>
        </div>
      ))}
    </div>,

    // QR code mockup
    <div key="qr" style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <div style={{
        width: '110px', height: '110px',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '8px',
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '1px',
      }}>
        {Array.from({ length: 49 }, (_, i) => {
          const isCorner = (i < 7 && (i < 3 || i > 3)) || (i > 41 && (i % 7 < 3 || i % 7 > 3));
          const isRandom = Math.sin(i * 13.7) > 0.2;
          return (
            <div key={i} style={{
              backgroundColor: isRandom ? '#000' : '#fff',
              borderRadius: '1px',
            }} />
          );
        })}
      </div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', color: '#60A5FA', textAlign: 'center' }}>
        Billet securise
      </div>
      <div style={{
        backgroundColor: 'rgba(16,185,129,0.2)',
        border: '1px solid #10B981',
        borderRadius: '4px',
        padding: '4px 10px',
        fontFamily: 'Inter, sans-serif',
        fontSize: '10px',
        color: '#10B981',
        fontWeight: 700,
      }}>
        VALIDE
      </div>
    </div>,
  ];

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
        padding: '60px 30px',
        gap: '40px',
      }}
    >
      {/* Grille de phones */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        {phoneContents.map((content, i) => (
          <PhoneMockup
            key={i}
            index={i}
            localFrame={localFrame}
            fps={fps}
            content={content}
          />
        ))}
      </div>

      {/* Counter principal */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          opacity: textOpacity,
        }}
      >
        <AnimatedCounter value={counterValue} localFrame={localFrame} fps={fps} />

        <div
          style={{
            fontFamily: "'Inter', 'Arial', sans-serif",
            fontWeight: 400,
            fontSize: '22px',
            color: 'rgba(255,255,255,0.6)',
            textAlign: 'center',
            letterSpacing: '1px',
          }}
        >
          billets vendus
        </div>

        {/* Texte confiance */}
        <div
          style={{
            fontFamily: "'Inter', 'Arial', sans-serif",
            fontWeight: 600,
            fontSize: '28px',
            color: '#FFFFFF',
            textAlign: 'center',
            marginTop: '8px',
          }}
        >
          Des organisateurs leur font deja confiance
        </div>
      </div>
    </div>
  );
};
