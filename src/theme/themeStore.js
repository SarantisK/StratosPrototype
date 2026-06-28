// Theme anwenden + persistieren.
// Kern: überschreibt die Tailwind-v4 @theme-Variablen (--color-*) per Inline-Style auf
// <html>. Da alle Utilities var(--color-*) referenzieren, ändert sich die ganze Seite live.

import { PALETTES, DEFAULT_KEY, TOKEN_KEYS } from './palettes.js'
import { relativeLuminance } from './contrast.js'

export const STORAGE_KEY = 'stratos-theme'

// Setzt die Token-Map (und optional color-scheme) auf das <html>-Element.
export function applyTokens(tokens, scheme) {
  const root = document.documentElement
  for (const key of TOKEN_KEYS) {
    const val = tokens[key]
    if (val != null) root.style.setProperty(`--color-${key}`, val)
  }
  if (scheme) root.style.colorScheme = scheme
}

// Entfernt alle Overrides -> zurück zu den @theme-Defaults aus index.css.
function clearOverrides() {
  const root = document.documentElement
  for (const key of TOKEN_KEYS) root.style.removeProperty(`--color-${key}`)
  root.style.removeProperty('color-scheme')
}

export function applyPalette(key) {
  const pal = PALETTES[key] || PALETTES[DEFAULT_KEY]
  applyTokens(pal.tokens, pal.scheme)
}

// Leitet aus 3 Kernfarben (Hintergrund/Text/Akzent) die volle Tokenmap ab.
// Neutraltöne via color-mix(), damit sie zum Verhältnis Text/Hintergrund passen.
export function deriveCustom({ bg, text, accent }) {
  const scheme = relativeLuminance(bg) > 0.4 ? 'light' : 'dark'
  const mix = (a, pct, b) => `color-mix(in srgb, ${a} ${pct}%, ${b})`
  return {
    scheme,
    tokens: {
      base: bg,
      'base-2': mix(text, 5, bg),
      raised: mix(text, 9, bg),
      ink: text,
      muted: mix(text, 62, bg),
      faint: mix(text, 42, bg),
      line: mix(text, 14, bg),
      cyan: accent,
      'cyan-deep': mix(accent, 70, '#000000'),
      // Threat/Status bleiben semantisch fix (wie im @theme-Default).
      amber: '#ff7a3c',
      'amber-deep': '#c4501f',
      nominal: '#5fe3a1',
    },
  }
}

export function applyCustom(core) {
  const { tokens, scheme } = deriveCustom(core)
  applyTokens(tokens, scheme)
}

// --- Persistenz (localStorage) ---

export function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed && (parsed.type === 'palette' || parsed.type === 'custom')) return parsed
    return null
  } catch {
    return null
  }
}

export function saveTheme(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* localStorage nicht verfügbar (Private Mode o.ä.) — Demo läuft trotzdem */
  }
}

export function clearTheme() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
  clearOverrides()
}

// Beim App-Start aufrufen (vor dem ersten Render), um Flash zu vermeiden.
export function applySavedTheme() {
  const saved = loadSaved()
  if (!saved) return
  if (saved.type === 'palette') applyPalette(saved.key)
  else if (saved.type === 'custom' && saved.core) applyCustom(saved.core)
}
