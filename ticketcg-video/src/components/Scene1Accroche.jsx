import React from 'react';
import { useCurrentFrame, interpolate, useVideoConfig } from 'remotion';

// Deux lignes fixes pour le layout, mots reveals progressivement
const LINE1_WORDS = ["Tu", "organises", "un"];
const LINE2_WORDS = ["evenement", "a", "Brazzaville", "?"];
const ALL_WORDS = [...LINE1_WORDS, ...LINE2_WORDS];

export const Scene1Accroche = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  // ~3 mots/seconde
  const wordsVisible = Math.min(
    Math.floor((localFrame / fps) * 3.2),
    ALL_WORDS.length
  );

  // Flash global
  const flashOpacity = interpolate(
    localFrame,
    [0, 3, 7],
    [0.6, 0.1, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  const sceneOpacity = interpolate(
    localFrame,
    [0, 6, 160, 180],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  const cursorVisible = Math.floor(localFrame / 8) % 2 === 0;

  const renderWords = (words, startIdx) => {
    return words.map((word, i) => {
      const globalIdx = startIdx + i;
      const isVisible = globalIdx < wordsVisible;
      const isLatest = globalIdx === wordsVisible - 1;

      return (
        <span
          key={i}
          style={{
            opacity: isVisible ? 1 : 0,
            textShadow: isLatest
              ? '0 0 25px rgba(255,255,255,0.95), 0 0 50px rgba(30,64,175,0.7)'
              : 'none',
            marginRight: i < words.length - 1 ? '16px' : '0',
            display: 'inline-block',
          }}
        >
          {word}
        </span>
      );
    });
  };

  const showCursorOnLine1 = wordsVisible > 0 && wordsVisible <= LINE1_WORDS.length;
  const showCursorOnLine2 = wordsVisible > LINE1_WORDS.length && wordsVisible < ALL_WORDS.length;

  const textStyle = {
    fontFamily: "'Inter', 'Arial Black', sans-serif",
    fontWeight: 900,
    fontSize: '76px',
    color: '#FFFFFF',
    lineHeight: 1.2,
    letterSpacing: '-2px',
    textAlign: 'center',
    display: 'block',
    whiteSpace: 'nowrap',
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: sceneOpacity,
        padding: '0 60px',
      }}
    >
      {/* Flash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#FFFFFF',
          opacity: flashOpacity,
          pointerEvents: 'none',
        }}
      />

      <div style={{ textAlign: 'center', width: '100%' }}>
        {/* Ligne 1 */}
        <div style={textStyle}>
          {renderWords(LINE1_WORDS, 0)}
          {showCursorOnLine1 && (
            <span style={{ color: '#3B82F6', opacity: cursorVisible ? 1 : 0, marginLeft: '6px' }}>|</span>
          )}
        </div>
        {/* Ligne 2 */}
        <div style={textStyle}>
          {renderWords(LINE2_WORDS, LINE1_WORDS.length)}
          {showCursorOnLine2 && (
            <span style={{ color: '#3B82F6', opacity: cursorVisible ? 1 : 0, marginLeft: '6px' }}>|</span>
          )}
        </div>
      </div>
    </div>
  );
};
