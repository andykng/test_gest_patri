import React from 'react';
import { Img, staticFile } from 'remotion';

/**
 * TicketCG Logo — vrai logo SVG avec fond blanc arrondi
 * pour assurer la lisibilite sur le fond noir de la video
 */
export const TicketCGLogo = ({ scale = 1, glowIntensity = 0 }) => {
  const glowSpread = glowIntensity * 50;
  // Le logo SVG original est 1088x944, ratio ~1.15:1
  // On affiche dans un conteneur 400x340 (meme ratio)
  const width = 400 * scale;
  const height = 346 * scale;
  const borderRadius = 28 * scale;
  const padding = 20 * scale;

  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: '#FFFFFF',
        padding,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: glowIntensity > 0
          ? `
            0 0 ${glowSpread}px rgba(30,64,175,${glowIntensity * 0.8}),
            0 0 ${glowSpread * 1.8}px rgba(59,130,246,${glowIntensity * 0.4}),
            0 0 ${glowSpread * 0.3}px rgba(255,255,255,${glowIntensity * 0.6})
          `
          : '0 8px 40px rgba(0,0,0,0.4)',
        border: glowIntensity > 0
          ? `2px solid rgba(96,165,250,${glowIntensity * 0.6})`
          : '2px solid rgba(255,255,255,0.1)',
      }}
    >
      <Img
        src={staticFile('ticketcg-logo.svg')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  );
};
