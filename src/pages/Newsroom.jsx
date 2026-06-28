import { useT } from '../i18n.jsx'
import { PageHeader, SectionHead, useReveal } from '../components/ui.jsx'

export default function Newsroom() {
  const { t } = useT()
  const ref = useReveal()

  const EXPLAINERS = [
    ['Battle-Calculus', t('Warum günstige Drohnen teure Abwehr schlagen — und wie sich die Ökonomie der Luftverteidigung umkehren lässt.', 'Why cheap drones beat expensive defence — and how to reverse the economics of air defence.'), t('Infografik', 'Infographic')],
    [t('Threat Breakdown', 'Threat breakdown'), t('Shahed-136, Lancet-3, FPV-Quadrocopter: welche Bedrohung von welchem System ausgeht.', 'Shahed-136, Lancet-3, FPV quadcopters: which threat comes from which system.'), t('Analyse', 'Analysis')],
    [t('Lessons aus der Ukraine', 'Lessons from Ukraine'), t('Was reale Einsätze über Drohnenabwehr, Tempo und Iteration lehren.', 'What real operations teach about counter-UAS, speed and iteration.'), t('Einordnung', 'Briefing')],
    ['Drone Wall / EDDI', t('Was die European Drone Defence Initiative für die Sicherheitsarchitektur Europas bedeutet.', 'What the European Drone Defence Initiative means for Europe’s security architecture.'), t('Kontext', 'Context')],
    [t('FIFA WM 2026', 'FIFA World Cup 2026'), t('Temporäre Schutzzonen über Stadien als Bewährungsprobe für Counter-UAS.', 'Temporary protective zones over stadiums as a proving ground for counter-UAS.'), t('Use-Case', 'Use-case')],
    [t('Sensor-Fusion erklärt', 'Sensor fusion explained'), t('Wie Radar und EO/IR zu einem lückenlosen Lagebild verschmelzen.', 'How radar and EO/IR merge into a seamless airspace picture.'), 'Explainer'],
  ]

  const BUILD = [
    [t('Iteration Log', 'Iteration log'), t('Vom Prototyp zur nächsten Version — Fortschritte, soweit öffentlich kommunizierbar.', 'From prototype to next version — progress, where publicly shareable.')],
    [t('Test-Update', 'Test update'), t('Einblicke in Testphasen, ohne sicherheitskritische Details preiszugeben.', 'Glimpses into test phases without disclosing security-critical details.')],
    [t('Founders First', 'Founders first'), t('Die Gründer kommunizieren Mission, Lernkurve und Herausforderungen direkt.', 'The founders communicate mission, learnings and challenges directly.')],
    [t('Roadmap-Snippet', 'Roadmap snippet'), t('Vorsichtige Einblicke in geplante Entwicklungsschritte — OPSEC-konform.', 'Careful glimpses into planned development steps — OPSEC-compliant.')],
  ]

  const GLOSSARY = [
    ['Counter-UAS', t('Maßnahmen und Systeme zur Erkennung und Abwehr unbemannter Luftfahrzeuge.', 'Measures and systems to detect and defeat unmanned aircraft.')],
    ['FPV', t('First-Person-View-Drohne — günstig, schnell, manuell oder autonom gesteuert.', 'First-person-view drone — cheap, fast, manually or autonomously flown.')],
    ['Interceptor', t('Abfangdrohne, die eine Zieldrohne nicht-letal neutralisiert.', 'Interceptor drone that neutralises a target drone non-lethally.')],
    ['EW', t('Electronic Warfare — Wirkung über das elektromagnetische Spektrum.', 'Electronic warfare — effects via the electromagnetic spectrum.')],
    ['Human-in-the-loop', t('Eine menschliche Freigabe ist Teil jeder Wirkentscheidung.', 'A human authorisation is part of every engagement decision.')],
    ['Sensor-Fusion', t('Zusammenführung mehrerer Sensoren zu einem Lagebild.', 'Combining multiple sensors into a single situational picture.')],
  ]

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow={t('Newsroom & Insights', 'Newsroom & insights')}
        title={t('Counter-UAS, verständlich erklärt.', 'Counter-UAS, clearly explained.')}
        lead={t(
          'Stratos will die erklärende Stimme für Drohnenabwehr sein. Hier bündeln wir Explainer, Einordnungen und Entwicklungs-Updates — die Basis, die unsere Social-Media-Kanäle speist.',
          'Stratos aims to be the explaining voice for counter-UAS. Here we collect explainers, briefings and development updates — the base that feeds our social channels.',
        )}
      />

      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <SectionHead eyebrow={t('Der Counter-UAS-Explainer', 'The counter-UAS explainer')} title={t('Komplexes, einfach gemacht.', 'Complex made simple.')} />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {EXPLAINERS.map(([title, desc, tag], i) => (
              <article key={title} className="reveal panel group flex flex-col rounded-xl p-7 transition-colors hover:border-cyan/40" style={{ transitionDelay: `${(i % 3) * 60}ms` }}>
                <div className="hud mb-5 text-cyan">{tag}</div>
                <h3 className="mb-3 text-lg text-ink">{title}</h3>
                <p className="text-pretty text-sm leading-relaxed text-muted">{desc}</p>
                <span className="mt-6 hud text-faint">{t('IN VORBEREITUNG', 'COMING SOON')}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* build in public */}
      <section className="border-b border-line bg-base-2">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <SectionHead eyebrow={t('Velocity · Build in Public', 'Velocity · Build in public')} title={t('Entwicklung sichtbar gemacht.', 'Development made visible.')} lead={t('Authentizität schlägt Perfektion: Wir dokumentieren Fortschritt offen — innerhalb der Grenzen von OPSEC.', 'Authenticity beats perfection: we document progress openly — within the limits of OPSEC.')} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BUILD.map(([title, desc], i) => (
              <div key={title} className="reveal panel rounded-xl p-6" style={{ transitionDelay: `${i * 60}ms` }}>
                <h3 className="mb-2 text-base text-ink">{title}</h3>
                <p className="text-pretty text-sm leading-relaxed text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* glossary */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <SectionHead eyebrow={t('Glossar', 'Glossary')} title={t('Die wichtigsten Begriffe.', 'The key terms.')} />
          <dl className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {GLOSSARY.map(([term, def]) => (
              <div key={term} className="bg-raised p-6">
                <dt className="hud text-cyan">{term}</dt>
                <dd className="mt-2 text-sm text-pretty leading-relaxed text-muted">{def}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  )
}
