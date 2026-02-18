import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

const STEPS = [
  { num: 1, text: "Cree ton evenement" },
  { num: 2, text: "Partage le lien" },
  { num: 3, text: "Recois via Mobile Money" },
  { num: 4, text: "Scanne a l'entree" },
];

const STEP_DURATION = 90; // frames par etape (1.5s @ 60fps)
const TRANSITION_DURATION = 12; // frames de transition slash

const SlashTransition = ({ progress }) => {
  // Slash diagonal cinematographique
  const clipX = interpolate(progress, [0, 1], [-200, 1280], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -100,
          left: clipX - 200,
          width: '400px',
          height: '2200px',
          background: 'linear-gradient(90deg, transparent, rgba(30,64,175,0.4) 30%, rgba(30,64,175,0.8) 50%, rgba(30,64,175,0.4) 70%, transparent)',
          transform: 'rotate(15deg)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

const StepDisplay = ({ step, localFrame, fps, isActive }) => {
  // Pulse du numero
  const pulseScale = interpolate(
    localFrame % 60,
    [0, 15, 30, 45, 60],
    [1, 1.08, 1, 1.04, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  // Entree de l'etape
  const entryScale = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 220 },
    from: 0.7,
    to: 1,
  });

  const opacity = interpolate(
    localFrame,
    [0, 8, STEP_DURATION - 12, STEP_DURATION],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  // Glow bleu du numero
  const numGlow = interpolate(
    localFrame % 60,
    [0, 15, 30, 45, 60],
    [0.5, 1, 0.6, 0.9, 0.5],
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
        opacity,
        transform: `scale(${entryScale})`,
        padding: '0 60px',
      }}
    >
      {/* Grand numero */}
      <div
        style={{
          fontFamily: "'Inter', 'Arial Black', sans-serif",
          fontWeight: 900,
          fontSize: '200px',
          color: '#1E40AF',
          lineHeight: 1,
          transform: `scale(${pulseScale})`,
          textShadow: `
            0 0 ${numGlow * 40}px rgba(30,64,175,0.8),
            0 0 ${numGlow * 80}px rgba(30,64,175,0.4),
            0 0 ${numGlow * 120}px rgba(59,130,246,0.2)
          `,
          marginBottom: '24px',
        }}
      >
        {step.num}
      </div>

      {/* Ligne separatrice */}
      <div
        style={{
          width: '120px',
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #3B82F6, transparent)',
          marginBottom: '32px',
          borderRadius: '2px',
        }}
      />

      {/* Texte de l'etape */}
      <div
        style={{
          fontFamily: "'Inter', 'Arial', sans-serif",
          fontWeight: 700,
          fontSize: '48px',
          color: '#FFFFFF',
          textAlign: 'center',
          letterSpacing: '-0.5px',
          lineHeight: 1.2,
          textShadow: '0 2px 20px rgba(0,0,0,0.5)',
        }}
      >
        {step.text}
      </div>

      {/* Indicateur de progression */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginTop: '50px',
        }}
      >
        {STEPS.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === step.num - 1 ? '40px' : '10px',
              height: '10px',
              borderRadius: '5px',
              backgroundColor: i === step.num - 1 ? '#3B82F6' : 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
              boxShadow: i === step.num - 1 ? '0 0 12px rgba(59,130,246,0.8)' : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const Scene4Processus = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  const totalDuration = STEPS.length * STEP_DURATION;

  // Quelle etape est active
  const currentStepIndex = Math.min(
    Math.floor(localFrame / STEP_DURATION),
    STEPS.length - 1
  );
  const stepLocalFrame = localFrame % STEP_DURATION;

  // Transition slash
  const transitionFrame = stepLocalFrame;
  const isInTransition = transitionFrame < TRANSITION_DURATION && localFrame > 0;
  const transitionProgress = isInTransition
    ? transitionFrame / TRANSITION_DURATION
    : 0;

  const sceneOpacity = interpolate(
    localFrame,
    [0, 8, totalDuration - 15, totalDuration],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: sceneOpacity,
        overflow: 'hidden',
      }}
    >
      {/* Fond avec grille subtile */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(30,64,175,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30,64,175,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Etape courante */}
      <StepDisplay
        step={STEPS[currentStepIndex]}
        localFrame={stepLocalFrame}
        fps={fps}
        isActive={true}
      />

      {/* Transition slash */}
      {isInTransition && (
        <SlashTransition progress={transitionProgress} />
      )}
    </div>
  );
};
