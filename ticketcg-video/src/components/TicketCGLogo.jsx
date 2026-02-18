import React from 'react';

/**
 * TicketCG Logo — SVG vectoriel reconstruit fidelement
 * Billet stylise avec texte "TicketCG" et decoupes laterales
 */
export const TicketCGLogo = ({ scale = 1, glowIntensity = 0 }) => {
  const glowColor = `rgba(30, 64, 175, ${glowIntensity})`;
  const glowSpread = glowIntensity * 40;

  return (
    <svg
      width={320 * scale}
      height={120 * scale}
      viewBox="0 0 320 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: glowIntensity > 0
          ? `drop-shadow(0 0 ${glowSpread}px ${glowColor}) drop-shadow(0 0 ${glowSpread * 0.5}px #1E40AF)`
          : 'none',
      }}
    >
      {/* Fond du billet avec coins arrondis */}
      <rect x="2" y="2" width="316" height="116" rx="14" ry="14"
        fill="#0D1B3E" stroke="#1E40AF" strokeWidth="2.5" />

      {/* Decoupes laterales gauche (demi-cercles) */}
      <circle cx="2" cy="60" r="12" fill="#0A0A0F" />
      {/* Decoupes laterales droit */}
      <circle cx="318" cy="60" r="12" fill="#0A0A0F" />

      {/* Ligne pointillee centrale verticale */}
      <line x1="38" y1="18" x2="38" y2="102"
        stroke="#1E40AF" strokeWidth="1.5" strokeDasharray="5 4" />
      <line x1="282" y1="18" x2="282" y2="102"
        stroke="#1E40AF" strokeWidth="1.5" strokeDasharray="5 4" />

      {/* Zone gauche — Icone ticket/billet */}
      <g transform="translate(14, 34)">
        {/* Petite icone billet stylisee */}
        <rect x="0" y="0" width="18" height="12" rx="2"
          fill="none" stroke="#60A5FA" strokeWidth="1.5" />
        <line x1="4" y1="4" x2="14" y2="4"
          stroke="#60A5FA" strokeWidth="1" />
        <line x1="4" y1="8" x2="10" y2="8"
          stroke="#60A5FA" strokeWidth="1" />
        {/* Petits cones de decoupe */}
        <circle cx="0" cy="6" r="2.5" fill="#0A0A0F" />
        <circle cx="18" cy="6" r="2.5" fill="#0A0A0F" />
      </g>

      {/* Texte principal "Ticket" */}
      <text
        x="52"
        y="72"
        fontFamily="'Inter', 'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="44"
        fill="#FFFFFF"
        letterSpacing="-1"
      >
        Ticket
      </text>

      {/* Texte "CG" en bleu electrique */}
      <text
        x="213"
        y="72"
        fontFamily="'Inter', 'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="44"
        fill="#3B82F6"
        letterSpacing="-1"
      >
        CG
      </text>

      {/* Sous-titre */}
      <text
        x="52"
        y="96"
        fontFamily="'Inter', 'Arial', sans-serif"
        fontWeight="400"
        fontSize="11"
        fill="#64748B"
        letterSpacing="2"
      >
        LA BILLETTERIE DU CONGO
      </text>

      {/* Accent lumineux en haut */}
      <rect x="2" y="2" width="316" height="2" rx="14"
        fill="url(#topGlow)" opacity="0.6" />

      <defs>
        <linearGradient id="topGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0D1B3E" />
          <stop offset="30%" stopColor="#1E40AF" />
          <stop offset="70%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#0D1B3E" />
        </linearGradient>
      </defs>
    </svg>
  );
};
