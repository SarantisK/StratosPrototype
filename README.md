# Stratos — Website-Mockup

Ein Demo-Webauftritt für **Stratos**, ein europäisches Unternehmen für
Drohnenabwehr (Counter-UAS). Die Seite ist ein Muster für den Kunden – modern,
dunkel und produktorientiert, mit 3D-Effekten.

> Eine ganz einfache Schritt-für-Schritt-Anleitung steht in
> [`ANLEITUNG.md`](./ANLEITUNG.md) im selben Ordner.

---

## Was du brauchst

- **Node.js 18 oder neuer** (damit kommt `npm` automatisch mit)
- Einen Browser (Chrome, Edge, Firefox …)

Prüfen, ob Node installiert ist:

```bash
node -v
```

> **Windows-Tipp:** Wird `node` nicht gefunden, einmal diese Zeile in
> PowerShell ausführen und es neu versuchen:
>
> ```powershell
> $env:Path = [Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [Environment]::GetEnvironmentVariable("Path","User")
> ```

---

## Starten in 3 Schritten

```bash
cd stratos-site     # 1. In den Projektordner wechseln
npm install         # 2. Einmalig: Pakete installieren
npm run dev         # 3. Seite starten
```

Danach im Browser öffnen: **http://localhost:5173**
Zum Stoppen im Terminal **Strg + C** drücken.

---

## Die wichtigsten Befehle

| Befehl | Was es macht |
|---|---|
| `npm run dev` | Startet die Seite zum Anschauen und Bearbeiten |
| `npm run build` | Erstellt die fertige Version zum Veröffentlichen |
| `npm run preview` | Zeigt die fertige Version lokal an |

---

## Wie das Projekt aufgebaut ist

Der gesamte Code liegt im Ordner `src/`:

- `pages/` – die einzelnen Seiten (Start, Produkt, Technologie, Kontakt …)
- `components/` – wiederkehrende Bausteine (Navigation, Footer …)
- `three/` – die 3D-Szenen
- `graphics/` – Grafiken und Icons
- `i18n.jsx` – Umschaltung Deutsch / Englisch

Die Seite hat 9 Unterseiten, ist zweisprachig (Deutsch zuerst) und im
dunklen, cinematischen Look gehalten.

---

## Gut zu wissen

- **3D braucht WebGL** – das können alle modernen Browser.
- Nach Änderungen am besten einmal `npm run build` laufen lassen, um zu
  prüfen, dass alles fehlerfrei baut.
- Deutsche Sonderzeichen (ä, ö, ü, ß) immer korrekt schreiben und Dateien
  als UTF-8 speichern.

---

## Worum es bei Stratos geht

Stratos schützt kritische Infrastruktur vor Drohnen – **defensiv,
nicht-tödlich und ohne Sprengstoff**, mit KI-Erkennung und einem Menschen,
der die Kontrolle behält. Inhalt und Strategie stehen in den `.md`-Dateien
im Hauptordner.
