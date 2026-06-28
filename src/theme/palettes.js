// Vordefinierte Farbpaletten für den Theme-Changer.
// Jede Palette ist eine vollständige Map der `--color-*`-Tokens aus index.css (@theme),
// plus `scheme` (steuert color-scheme für native Controls) und UI-Metadaten.
//
// Token-Namen MÜSSEN exakt den @theme-Tokens entsprechen, damit die Tailwind-Utilities
// (bg-base, text-ink, text-cyan …) zur Laufzeit mitziehen.

export const DEFAULT_KEY = 'stratos'

// Reihenfolge der Token-Keys → wird beim Anwenden auf --color-<key> gemappt.
export const TOKEN_KEYS = [
  'base',
  'base-2',
  'raised',
  'ink',
  'muted',
  'faint',
  'line',
  'cyan',
  'cyan-deep',
  'amber',
  'amber-deep',
  'nominal',
]

export const PALETTES = {
  stratos: {
    id: 'stratos',
    label: 'Stratos',
    scheme: 'dark',
    swatch: ['#06080c', '#e9edf3', '#34cfe6'],
    tokens: {
      base: '#06080c',
      'base-2': '#0a0e15',
      raised: '#0e131c',
      ink: '#e9edf3',
      muted: '#8893a6',
      faint: '#5a6475',
      line: '#1a2230',
      cyan: '#34cfe6',
      'cyan-deep': '#1c8ba1',
      amber: '#ff7a3c',
      'amber-deep': '#c4501f',
      nominal: '#5fe3a1',
    },
  },

  dark: {
    id: 'dark',
    label: 'Dark',
    scheme: 'dark',
    swatch: ['#020304', '#f1f3f6', '#9aa6b8'],
    tokens: {
      base: '#020304',
      'base-2': '#070a0e',
      raised: '#0c0f14',
      ink: '#f1f3f6',
      muted: '#8a93a1',
      faint: '#565e6b',
      line: '#171c24',
      cyan: '#9aa6b8',
      'cyan-deep': '#5f6b7c',
      amber: '#e8895a',
      'amber-deep': '#b75d33',
      nominal: '#6fce9f',
    },
  },

  bright: {
    id: 'bright',
    label: 'Bright',
    scheme: 'light',
    swatch: ['#f4f6fa', '#10151d', '#0e7c9b'],
    tokens: {
      base: '#f4f6fa',
      'base-2': '#eaeef4',
      raised: '#ffffff',
      ink: '#10151d',
      muted: '#5b6675',
      faint: '#8a94a3',
      line: '#d6dde6',
      cyan: '#0e7c9b',
      'cyan-deep': '#0a5c74',
      amber: '#d65a1e',
      'amber-deep': '#a8430f',
      nominal: '#1f9d63',
    },
  },

  neon: {
    id: 'neon',
    label: 'Neon',
    scheme: 'dark',
    swatch: ['#04020a', '#f5e9ff', '#00f0ff'],
    tokens: {
      base: '#04020a',
      'base-2': '#0a0618',
      raised: '#120a26',
      ink: '#f5e9ff',
      muted: '#a98fd6',
      faint: '#6e5a9b',
      line: '#2a1a4a',
      cyan: '#00f0ff',
      'cyan-deep': '#0095b3',
      amber: '#ff2d9b',
      'amber-deep': '#c40f6e',
      nominal: '#6bff9e',
    },
  },

  pastel: {
    id: 'pastel',
    label: 'Pastel',
    scheme: 'light',
    swatch: ['#f3eef0', '#3a3340', '#7c6db0'],
    tokens: {
      base: '#f3eef0',
      'base-2': '#ece5ea',
      raised: '#fbf8fa',
      ink: '#3a3340',
      muted: '#7a7186',
      faint: '#a89fb3',
      line: '#e0d6df',
      cyan: '#7c6db0',
      'cyan-deep': '#5b4d8c',
      amber: '#d98a7a',
      'amber-deep': '#b56554',
      nominal: '#6cae90',
    },
  },
}

// Geordnete Liste für die UI-Kacheln.
export const PALETTE_LIST = [
  PALETTES.stratos,
  PALETTES.bright,
  PALETTES.dark,
  PALETTES.neon,
  PALETTES.pastel,
]
