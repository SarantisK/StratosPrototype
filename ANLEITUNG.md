# Stratos – Website-Entwurf: Anleitung

Willkommen! Dieses Dokument zeigt Ihnen in wenigen Minuten, wie Sie den
Entwurf der Stratos-Website auf Ihrem eigenen Rechner ansehen können.

---

## Was ist das?

Dies ist ein **Entwurf (Proof-of-Concept) der zukünftigen Stratos-Website** –
eine erste, gestalterisch ausgearbeitete Vorschau, noch keine
veröffentlichte Live-Seite.

Sie können den Entwurf vollständig im Browser durchklicken: alle Seiten,
die Sprachumschaltung Deutsch/Englisch und die interaktive 3D-Ansicht des
Produkts.

---

## In 3 Schritten starten

Sie brauchen dafür nur ein kostenloses Programm namens **Node.js**, das die
Website lokal auf Ihrem Computer bereitstellt.

**1. Node.js installieren** (einmalig)

Laden Sie die Version „LTS" von der offiziellen Seite herunter und
installieren Sie sie wie ein normales Programm:
👉 https://nodejs.org

**2. Das Projekt vorbereiten**

Öffnen Sie ein Terminal (Windows: „PowerShell", Mac: „Terminal"), wechseln
Sie in den Projektordner und führen Sie einmalig aus:

```bash
cd stratos-site
npm install
```

Dieser Schritt lädt die benötigten Bausteine herunter und kann beim ersten
Mal ein bis zwei Minuten dauern.

**3. Die Website starten**

```bash
npm run dev
```

Im Terminal erscheint eine Adresse. Öffnen Sie diese in Ihrem Browser:

👉 **http://localhost:5173**

Fertig – die Website läuft jetzt lokal. Zum Beenden im Terminal
`Strg + C` drücken.

---

## Was Sie sehen

Die Seite ist als vollständige Website mit mehreren Bereichen angelegt.
Über das Menü oben erreichen Sie:

| Bereich | Inhalt |
|---|---|
| **Start** | Einstieg mit interaktiver Lagedarstellung |
| **Technologie** | Wie das Schutzsystem funktioniert |
| **Produkt** | Der Interceptor SI-1 als interaktives 3D-Modell |
| **Einsatz** | Anwendungsfälle (zivil & kritische Infrastruktur) |
| **Ethik** | Verantwortung, menschliche Kontrolle |
| **Newsroom** | Neuigkeiten & Wissen |
| **Über uns** | Team & Mission |
| **Karriere** | Offene Stellen |
| **Kontakt** | Anfragen für Vertrieb, Demo & Partnerschaft |

**Tipps zum Ausprobieren:**
- Oben rechts können Sie zwischen **Deutsch und Englisch** umschalten.
- Auf der Seite **Produkt** lässt sich das 3D-Modell beim Scrollen drehen
  und „auseinanderfalten".
- Probieren Sie die Seite auch auf dem **Smartphone** aus – das Layout
  passt sich an.

---

## Bitte beachten

- Es handelt sich um einen **Entwurf**: Texte, Zahlen und Bilder sind
  teils Platzhalter und dienen der Veranschaulichung.
- Die 3D-Ansichten benötigen einen **aktuellen Browser**
  (Chrome, Edge, Firefox oder Safari in neuer Version).
- Falls beim Start die Meldung „node wird nicht erkannt" erscheint:
  Terminal schließen, neu öffnen und Schritt 2–3 wiederholen
  (Node.js wird erst nach einem Neustart erkannt).

---

## Wie es weitergehen könnte

Mögliche nächste Schritte auf dem Weg zur fertigen Website:

1. **Inhalte finalisieren** – endgültige Texte, Bilder und Daten
   gemeinsam abstimmen.
2. **Veröffentlichung** – die Seite auf einer eigenen Internet-Adresse
   (z. B. *stratos.de*) online stellen.
3. **Erweiterungen** – etwa Kontaktformular mit echtem Mail-Versand,
   Newsroom-Beiträge oder ein mehrsprachiger Ausbau.

Sprechen Sie uns gerne an – wir begleiten jeden dieser Schritte.
