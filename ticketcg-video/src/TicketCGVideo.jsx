import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { Scene1Accroche } from './components/Scene1Accroche';
import { Scene2Probleme } from './components/Scene2Probleme';
import { Scene3Solution } from './components/Scene3Solution';
import { Scene4Processus } from './components/Scene4Processus';
import { Scene5Preuve } from './components/Scene5Preuve';
import { Scene6CTA } from './components/Scene6CTA';

// Timecodes en frames @ 60fps
// Scene 1: 0s-3s    → frames 0-180
// Scene 2: 3s-7s    → frames 180-420
// Scene 3: 7s-13s   → frames 420-780
// Scene 4: 13s-21s  → frames 780-1260
// Scene 5: 21s-25s  → frames 1260-1500
// Scene 6: 25s-30s  → frames 1500-1800

const SCENES = [
  { Component: Scene1Accroche,  start: 0,    end: 180  },
  { Component: Scene2Probleme,  start: 180,  end: 420  },
  { Component: Scene3Solution,  start: 420,  end: 780  },
  { Component: Scene4Processus, start: 780,  end: 1260 },
  { Component: Scene5Preuve,    start: 1260, end: 1500 },
  { Component: Scene6CTA,       start: 1500, end: 1800 },
];

export const TicketCGVideo = () => {
  const frame = useCurrentFrame();

  // Determine quelle(s) scene(s) afficher
  const activeScenes = SCENES.filter(
    ({ start, end }) => frame >= start && frame <= end
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#0A0A0F',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', 'Arial', sans-serif",
      }}
    >
      {/* Bruit de grain subtil pour look cinematographique */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.03, pointerEvents: 'none' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            seed={frame % 10}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
          pointerEvents: 'none',
          zIndex: 50,
        }}
      />

      {/* Scenes */}
      {activeScenes.map(({ Component, start }, i) => (
        <Component key={start} startFrame={start} />
      ))}
    </div>
  );
};
