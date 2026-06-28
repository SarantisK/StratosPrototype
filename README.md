# Stratos — Website-Mockup

Ein visuell hochwertiger, produktorientierter Marketing-Site-Prototyp für
**Stratos**, ein europäisches Counter-UAS-Unternehmen (Drohnenabwehr). Dieses
Mockup dient als Proof-of-Concept für den Kunden.

> **Kundenfreundliche Kurzanleitung:** siehe [`ANLEITUNG.md`](../ANLEITUNG.md)
> im Projekt-Root.

Stack: **Vite 6 · React 19 · Tailwind v4** · React Router 7 · Three.js
(`@react-three/fiber` + `drei`, live 3D) · GSAP ScrollTrigger + Lenis
(cinematisches, gepinntes Scrollen).

---

## Voraussetzungen

- **Node.js 18+** (empfohlen: aktuelle LTS) inkl. `npm`
- Browser mit WebGL (für die 3D-Szenen)

```bash
node -v
npm -v
```

> **Windows-Hinweis:** Node ist via winget unter `C:\Program Files\nodejs`
> installiert, in einer frischen PowerShell-Session aber evtl. nicht im PATH.
> Falls `node` nicht gefunden wird, PATH einmalig aktualisieren:
>
> ```powershell
> $env:Path = [Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [Environment]::GetEnvironmentVariable("Path","User")
> ```

---

## Installation

```bash
cd stratos-site
npm install
```

---

## Befehle

| Befehl | Zweck |
|---|---|
| `npm run dev` | Dev-Server mit Hot Reload → http://localhost:5173 (SPA-Fallback für Deep-Links) |
| `npm run build` | Produktions-Build nach `dist/` (zugleich Kompilier-Check) |
| `npm run preview` | Den erzeugten Build lokal ansehen |

---

## Aufbau (Kurzüberblick)

```
stratos-site/
├── src/
│   ├── main.jsx          # Einstieg + Provider (Router, Sprache)
│   ├── App.jsx           # Routen-Definition (9 Seiten + Redirect)
│   ├── i18n.jsx          # Sprachumschaltung DE/EN (useT)
│   ├── index.css         # Tailwind-v4-Theme & Basis-Styles
│   ├── components/       # Layout, Nav, Footer, UI-Bausteine
│   ├── pages/            # Eine Komponente pro Route
│   ├── sections/         # Größere Abschnitte (z. B. Produkt-Cinematic)
│   ├── three/            # 3D-Szenen (Three.js / react-three-fiber)
│   └── graphics/         # SVG-Grafiken & Icons
└── package.json
```

Routen (deutsch): `/` · `technologie` · `produkt` · `einsatz` · `ethik` ·
`newsroom` · `ueber` · `karriere` · `kontakt`. Mehrseitig (echtes React
Router), zweisprachig (**Deutsch primär**, EN umschaltbar), dunkel/cinematisch.

---

## Hinweise & Gotchas

- **3D/WebGL:** Home und Produktseite enthalten je eine gepinnte 3D-Szene.
  Die `<Canvas>` pausiert (`frameloop="never"`), wenn sie aus dem Viewport
  scrollt.
- **Bundle-Größe:** ~1,3 MB (Three + drei) — für ein Mockup akzeptabel;
  bei Bedarf die 3D-Canvases lazy-laden.
- **PowerShell-Build-Warnung:** PowerShell verpackt Vites Chunk-Size-Warnung
  als `NativeCommandError` — **harmlos**, solange der Exit-Code `0` ist.
- **Reduced Motion:** Bei `prefers-reduced-motion` werden Lenis/Pinning und
  3D-Animationen automatisch deaktiviert.
- **Umlaute:** Deutsche Sonderzeichen (ä/ö/ü/ß) korrekt schreiben, Dateien
  als UTF-8 speichern.
- **Immer mit `npm run build` verifizieren** — fängt r3f/GSAP/Router-Probleme,
  die der Dev-Server maskieren kann.

---

## Nächste Schritte

- **Inhalte finalisieren** — Platzhalter durch finale Inhalte ersetzen
  (Quelle: die Strategie-`.md`-Dateien im Projekt-Root).
- **Performance** — 3D-`<Canvas>` lazy-laden, um das initiale Bundle zu
  verkleinern.
- **SEO/Meta** — Title, Meta-Description und Open-Graph je Route.
- **Deployment** — `dist/` auf einem Static Host (Vercel/Netlify/Cloudflare
  Pages) veröffentlichen; SPA-Fallback für Deep-Links konfigurieren.
- **Kontaktformular** — an ein echtes Backend/Mail anbinden.
- **Accessibility** — vor dem Finalisieren erneut gegen die
  Web-Design-Guidelines prüfen.

---

## Hintergrund

Stratos positioniert sich als **defensives, nicht-letales / sprengstofffreies**
Counter-UAS-System mit KI-Zielerkennung und Human-in-the-Loop — der zivil
einsetzbare Schutz für kritische Infrastruktur. Strategie- und
Inhaltsgrundlage sind die `.md`-Dateien im Projekt-Root.
