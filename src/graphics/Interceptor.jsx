/* Stylised, non-photoreal counter-UAS INTERCEPTOR (vertical-launch type).
   Modelled on the reference: rocket-like fuselage, two perforated wings,
   four rotors below, orange seeker pod at the nose. No animation. */

function Rotor({ cx, cy, rx = 38, dim = 1 }) {
  return (
    <g opacity={dim}>
      {/* short arm stub */}
      <line x1={cx} y1={cy} x2={cx < 200 ? cx + 14 : cx - 14} y2={cy - 10} stroke="#1a2a34" strokeWidth="6" strokeLinecap="round" />
      {/* static two-blade prop (edge-on, not spinning) */}
      <ellipse cx={cx} cy={cy} rx={rx} ry="4" fill="#2a3d49" opacity="0.55" transform={`rotate(22 ${cx} ${cy})`} />
      <ellipse cx={cx} cy={cy} rx={rx} ry="4" fill="#2a3d49" opacity="0.55" transform={`rotate(-22 ${cx} ${cy})`} />
      <ellipse cx={cx} cy={cy} rx={rx} ry="2" fill="#4be0f2" opacity="0.25" />
      <circle cx={cx} cy={cy} r="6" fill="#0c151d" stroke="#4be0f2" strokeWidth="1" opacity="0.85" />
    </g>
  )
}

export function InterceptorFront({ className = '', seeker = '#ff7a3c' }) {
  return (
    <svg viewBox="0 0 400 500" className={className} role="img" aria-label="Stratos SI-1 Abfangdrohne">
      <defs>
        <linearGradient id="fuse" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0c1820" />
          <stop offset="42%" stopColor="#243947" />
          <stop offset="58%" stopColor="#2c4351" />
          <stop offset="100%" stopColor="#0a141c" />
        </linearGradient>
        <linearGradient id="wing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22343f" />
          <stop offset="100%" stopColor="#0f1a22" />
        </linearGradient>
        <radialGradient id="seekerGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={seeker} stopOpacity="0.9" />
          <stop offset="60%" stopColor={seeker} stopOpacity="0.5" />
          <stop offset="100%" stopColor={seeker} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="floor" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#34cfe6" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#34cfe6" stopOpacity="0" />
        </radialGradient>
        <pattern id="mesh" width="11" height="11" patternUnits="userSpaceOnUse">
          <circle cx="5.5" cy="5.5" r="1.7" fill="#0a141c" opacity="0.7" />
        </pattern>
      </defs>

      <ellipse cx="200" cy="300" rx="180" ry="150" fill="url(#floor)" />

      {/* rear rotors (behind, dimmer) */}
      <Rotor cx="150" cy="322" rx="30" dim={0.5} />
      <Rotor cx="250" cy="322" rx="30" dim={0.5} />

      {/* wings */}
      <g>
        <path d="M196 196 L78 214 Q66 216 66 224 L66 236 Q66 244 80 244 L196 236 Z" fill="url(#wing)" stroke="#34607010" strokeWidth="1" />
        <path d="M204 196 L322 214 Q334 216 334 224 L334 236 Q334 244 320 244 L204 236 Z" fill="url(#wing)" />
        {/* perforated texture */}
        <path d="M196 196 L78 214 Q66 216 66 224 L66 236 Q66 244 80 244 L196 236 Z" fill="url(#mesh)" />
        <path d="M204 196 L322 214 Q334 216 334 224 L334 236 Q334 244 320 244 L204 236 Z" fill="url(#mesh)" />
        {/* cyan leading edge */}
        <path d="M78 214 L196 200 M322 214 L204 200" stroke="#4be0f2" strokeWidth="1.5" opacity="0.5" fill="none" />
      </g>

      {/* front rotors */}
      <Rotor cx="112" cy="346" rx="40" />
      <Rotor cx="288" cy="346" rx="40" />

      {/* tail fins (top) */}
      <path d="M188 96 L176 70 L196 86 Z" fill="#1a2a34" />
      <path d="M212 96 L224 70 L204 86 Z" fill="#1a2a34" />

      {/* fuselage */}
      <path
        d="M200 72 Q216 72 222 104 L226 300 Q226 332 200 332 Q174 332 174 300 L178 104 Q184 72 200 72 Z"
        fill="url(#fuse)"
        stroke="#3c5666"
        strokeWidth="1.5"
      />
      {/* fuselage highlight + panel lines */}
      <path d="M200 78 Q210 80 214 108 L216 290" stroke="#ffffff" strokeWidth="3" opacity="0.06" fill="none" />
      <path d="M180 150 L220 150 M180 210 L220 210 M180 270 L220 270" stroke="#3c5666" strokeWidth="1" opacity="0.45" />
      <text x="200" y="200" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="13" letterSpacing="2" fill="#7d93a3" opacity="0.8">SI-1</text>

      {/* seeker pod (nose, front-bottom) */}
      <circle cx="200" cy="356" r="30" fill="url(#seekerGlow)" />
      <line x1="200" y1="332" x2="200" y2="346" stroke="#1a2a34" strokeWidth="7" />
      <circle cx="200" cy="356" r="15" fill="#10171c" stroke={seeker} strokeWidth="1.5" />
      <circle cx="200" cy="356" r="8" fill={seeker} opacity="0.85" />
      <circle cx="196" cy="352" r="2.5" fill="#fff" opacity="0.8" />

      {/* registration ticks */}
      <g stroke="#34cfe6" strokeWidth="1.2" opacity="0.35" fill="none">
        <path d="M34 44 h18 M34 44 v18" />
        <path d="M366 44 h-18 M366 44 v18" />
        <path d="M34 456 h18 M34 456 v-18" />
        <path d="M366 456 h-18 M366 456 v-18" />
      </g>
    </svg>
  )
}

const ICONS = {
  net: 'M4 6h16M4 12h16M4 18h16M8 4v16M12 4v16M16 4v16',
  ai: 'M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2M7 7h10v10H7zM10 10h4v4h-4z',
  radar: 'M12 12L12 3M12 12l7 4M12 21a9 9 0 1 1 9-9',
  human: 'M12 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM5 21v-1a7 7 0 0 1 14 0v1',
  range: 'M3 12h18M3 12l4-4M3 12l4 4M21 12l-4-4M21 12l-4 4',
  swarm: 'M6 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M18 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M12 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M7.5 7.5L11 16M16.5 7.5L13 16M8 6h8',
}

export function Icon({ name, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  )
}
