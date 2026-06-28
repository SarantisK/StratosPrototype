// WCAG-Kontrast-Hilfsfunktionen (rein, ohne Abhängigkeiten).
// Genutzt für die sanfte Barrierefreiheits-Warnung im Custom Palette Creator.

// '#rrggbb' | '#rgb' -> { r, g, b } (0..255). Fällt bei Unsinn auf Schwarz zurück.
export function hexToRgb(hex) {
  let h = String(hex || '').trim().replace(/^#/, '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  if (h.length !== 6 || /[^0-9a-fA-F]/.test(h)) return { r: 0, g: 0, b: 0 }
  const n = parseInt(h, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

// Relative Luminanz nach WCAG 2.x.
export function relativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex)
  const lin = (c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

// Kontrastverhältnis 1..21.
export function contrastRatio(hexA, hexB) {
  const la = relativeLuminance(hexA)
  const lb = relativeLuminance(hexB)
  const light = Math.max(la, lb)
  const dark = Math.min(la, lb)
  return (light + 0.05) / (dark + 0.05)
}

// Lesbarkeit für Normaltext (WCAG AA = 4.5:1).
export function isReadable(text, bg) {
  return contrastRatio(text, bg) >= 4.5
}
