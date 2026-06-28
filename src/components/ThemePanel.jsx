import { useEffect, useRef, useState } from 'react'
import { useT } from '../i18n.jsx'
import { PALETTE_LIST, PALETTES, DEFAULT_KEY } from '../theme/palettes.js'
import {
  applyPalette,
  applyCustom,
  saveTheme,
  clearTheme,
  loadSaved,
} from '../theme/themeStore.js'
import { contrastRatio } from '../theme/contrast.js'

const DEFAULT_CORE = {
  bg: PALETTES[DEFAULT_KEY].tokens.base,
  text: PALETTES[DEFAULT_KEY].tokens.ink,
  accent: PALETTES[DEFAULT_KEY].tokens.cyan,
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
    </svg>
  )
}

export default function ThemePanel() {
  const { t } = useT()
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('palettes')
  const [activeKey, setActiveKey] = useState(DEFAULT_KEY)
  const [core, setCore] = useState(DEFAULT_CORE)
  const [status, setStatus] = useState('')
  const panelRef = useRef(null)
  const fabRef = useRef(null)
  const wasOpen = useRef(false)

  // Gespeicherten Zustand in die UI spiegeln (Theme selbst wird bereits in main.jsx angewandt).
  useEffect(() => {
    const saved = loadSaved()
    if (!saved) return
    if (saved.type === 'palette') {
      setActiveKey(saved.key)
      setTab('palettes')
    } else if (saved.type === 'custom' && saved.core) {
      setCore(saved.core)
      setTab('custom')
    }
  }, [])

  // Escape schließt, Klick außerhalb schließt, Fokus wandert ins Panel.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    const onPointer = (e) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target) &&
        fabRef.current && !fabRef.current.contains(e.target)
      ) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onPointer)
    panelRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onPointer)
    }
  }, [open])

  // Fokus beim Schließen zurück auf den Auslöser.
  useEffect(() => {
    if (wasOpen.current && !open) fabRef.current?.focus()
    wasOpen.current = open
  }, [open])

  const ratio = contrastRatio(core.text, core.bg)
  const lowContrast = ratio < 4.5

  function pickPalette(key) {
    applyPalette(key)
    setActiveKey(key)
    setStatus('')
  }

  function selectTab(next) {
    setTab(next)
    setStatus('')
    // Vorschau an die jeweilige Quelle angleichen.
    if (next === 'custom') applyCustom(core)
    else applyPalette(activeKey)
  }

  function updateCore(part) {
    const next = { ...core, ...part }
    setCore(next)
    applyCustom(next) // Echtzeit-Injektion
    setStatus('')
  }

  function handleSave() {
    if (tab === 'custom') saveTheme({ type: 'custom', core })
    else saveTheme({ type: 'palette', key: activeKey })
    setStatus(t('Gespeichert — bleibt nach Reload aktiv.', 'Saved — persists after reload.'))
  }

  function handleReset() {
    clearTheme()
    applyPalette(DEFAULT_KEY)
    setActiveKey(DEFAULT_KEY)
    setCore(DEFAULT_CORE)
    setTab('palettes')
    setStatus(t('Auf Stratos-Standard zurückgesetzt.', 'Reset to Stratos default.'))
  }

  const tabBtn = (id, label) =>
    `flex-1 rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
      tab === id ? 'bg-cyan text-base' : 'text-muted hover:text-ink'
    }`

  return (
    <>
      <button
        ref={fabRef}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="theme-panel"
        aria-label={t('Design anpassen', 'Customize design')}
        className="glass fixed right-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-50 flex h-12 w-12 touch-manipulation items-center justify-center rounded-full text-cyan shadow-lg transition-transform hover:scale-105 motion-reduce:transition-none"
      >
        <GearIcon />
      </button>

      {open && (
        <div
          ref={panelRef}
          id="theme-panel"
          role="dialog"
          aria-modal="false"
          aria-label={t('Design anpassen', 'Customize design')}
          tabIndex={-1}
          className="glass fixed right-5 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-50 max-h-[calc(100vh-7rem)] w-[320px] max-w-[calc(100vw-2.5rem)] touch-manipulation overflow-y-auto overscroll-contain rounded-xl p-4 outline-none motion-reduce:transition-none"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="eyebrow">{t('Design', 'Theme')}</span>
            <button
              onClick={() => setOpen(false)}
              aria-label={t('Schließen', 'Close')}
              className="hud text-muted hover:text-ink"
            >
              ✕
            </button>
          </div>

          <div className="mb-4 flex gap-1 rounded-lg border border-line p-1">
            <button onClick={() => selectTab('palettes')} className={tabBtn('palettes')} aria-pressed={tab === 'palettes'}>
              {t('Paletten', 'Palettes')}
            </button>
            <button onClick={() => selectTab('custom')} className={tabBtn('custom')} aria-pressed={tab === 'custom'}>
              {t('Eigene', 'Custom')}
            </button>
          </div>

          {tab === 'palettes' ? (
            <div className="grid grid-cols-2 gap-2.5">
              {PALETTE_LIST.map((p) => {
                const isActive = activeKey === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => pickPalette(p.id)}
                    aria-pressed={isActive}
                    className={`rounded-lg border p-2 text-left transition-colors ${
                      isActive ? 'border-cyan' : 'border-line hover:border-muted'
                    }`}
                  >
                    <span className="flex h-8 overflow-hidden rounded-md" aria-hidden="true">
                      {p.swatch.map((c, i) => (
                        <span key={i} className="flex-1" style={{ backgroundColor: c }} />
                      ))}
                    </span>
                    <span className="mt-2 flex items-center gap-1.5">
                      {isActive && <span className="status-dot bg-cyan text-cyan" />}
                      <span className="hud text-ink">{p.label}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="space-y-3">
              {[
                ['bg', t('Hintergrund', 'Background')],
                ['text', t('Text', 'Text')],
                ['accent', t('Akzent', 'Accent')],
              ].map(([key, label]) => (
                <div key={key} className="flex items-center justify-between gap-3">
                  <label htmlFor={`color-${key}`} className="text-sm text-muted">
                    {label}
                  </label>
                  <span className="flex items-center gap-2">
                    <span className="hud text-faint">{core[key].toUpperCase()}</span>
                    <input
                      id={`color-${key}`}
                      type="color"
                      value={core[key]}
                      onChange={(e) => updateCore({ [key]: e.target.value })}
                      className="h-8 w-12 cursor-pointer rounded border border-line bg-transparent"
                    />
                  </span>
                </div>
              ))}

              <p className="hud text-muted">
                {t('Kontrast', 'Contrast')} {ratio.toFixed(1)}:1
              </p>
              {lowContrast && (
                <p role="alert" className="rounded-md border border-amber/40 bg-amber/10 p-2 text-xs text-amber">
                  {t(
                    'Achtung: Der Kontrast ist zu gering für barrierefreie Lesbarkeit.',
                    'Warning: contrast is too low for accessible readability.',
                  )}
                </p>
              )}
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 rounded-full border border-cyan/40 bg-cyan/10 px-4 py-2 text-sm font-semibold text-cyan transition-colors hover:bg-cyan/20"
            >
              {t('Speichern', 'Save')}
            </button>
            <button
              onClick={handleReset}
              className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-muted transition-colors hover:text-ink"
            >
              {t('Zurücksetzen', 'Reset')}
            </button>
          </div>

          <p className="mt-2 hud text-nominal" aria-live="polite">
            {status}
          </p>
        </div>
      )}
    </>
  )
}
