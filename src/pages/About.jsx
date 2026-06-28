import { useT } from '../i18n.jsx'
import { PageHeader, SectionHead, CTA, useReveal } from '../components/ui.jsx'

export default function About() {
  const { t } = useT()
  const ref = useReveal()

  const TEAM = [
    ['N. N.', t('CEO & Mitgründer', 'CEO & co-founder'), t('Strategie, Beschaffung und Partnerschaften.', 'Strategy, procurement and partnerships.')],
    ['N. N.', t('CTO & Mitgründer', 'CTO & co-founder'), t('Sensorik, KI-Zielerfassung und Systemarchitektur.', 'Sensors, AI targeting and system architecture.')],
    ['N. N.', t('Head of Engineering', 'Head of Engineering'), t('Antrieb, Aufbau und Integration der Abfangdrohne.', 'Propulsion, build and integration of the interceptor.')],
  ]

  const VALUES = [
    [t('Defensiv', 'Defensive'), t('Wir bauen Schutzsysteme, keine Eskalationstechnologie.', 'We build protective systems, not escalation technology.')],
    [t('Europäisch', 'European'), t('Entwickelt und gebaut in Europa, für demokratische Sicherheit.', 'Developed and built in Europe, for democratic security.')],
    [t('Schnell', 'Fast'), t('Tempo und Iteration statt schwerfälliger Konzern-Prozesse.', 'Speed and iteration instead of slow corporate processes.')],
    [t('Belegbar', 'Provable'), t('Wir kommunizieren, was wir zeigen können — Tests statt Versprechen.', 'We communicate what we can show — tests, not promises.')],
  ]

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow={t('Über uns', 'About')}
        title={t('Wir bauen den Schutz, den Europa offenlässt.', 'Building the protection Europe leaves open.')}
        lead={t(
          'Stratos ist ein junges europäisches Defense-Tech-Unternehmen mit einem klaren Fokus: nicht-letale, sprengstofffreie Drohnenabwehr für den Schutz kritischer Infrastruktur.',
          'Stratos is a young European defence-tech company with a clear focus: non-lethal, explosive-free counter-UAS for protecting critical infrastructure.',
        )}
      />

      <section className="border-b border-line bg-base-2">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <SectionHead eyebrow={t('Mission', 'Mission')} title={t('Schützen, was zählt.', 'Protect what matters.')} />
            <p className="reveal text-pretty text-lg leading-relaxed text-muted">
              {t(
                'Während große Defense-AI-Plattformen Land, Luft und See abdecken, bleibt der dedizierte Counter-UAS-Layer offen — gerade für zivile Räume. Stratos schließt diese Lücke mit einem Ansatz, der bewusst nicht-letal ist und damit dort einsetzbar wird, wo Kollateralschäden keine Option sind.',
                'While large defence-AI platforms cover land, air and sea, the dedicated counter-UAS layer stays open — especially for civilian spaces. Stratos closes that gap with a deliberately non-lethal approach, usable where collateral damage is not an option.',
              )}
            </p>
          </div>
        </div>
      </section>

      {/* team */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <SectionHead eyebrow={t('Team', 'Team')} title={t('Die Menschen hinter Stratos.', 'The people behind Stratos.')} lead={t('Platzhalter-Profile für das Mockup — im Launch ersetzt durch echte Gründer- und Team-Porträts.', 'Placeholder profiles for the mockup — replaced at launch with real founder and team portraits.')} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map(([name, role, desc], i) => (
              <div key={role} className="reveal panel rounded-xl p-7" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="mb-5 h-16 w-16 rounded-full border border-line bg-base" aria-hidden="true" />
                <h3 className="text-lg text-ink">{name}</h3>
                <p className="hud mt-1 text-cyan">{role}</p>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* values */}
      <section className="border-b border-line bg-base-2">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <SectionHead eyebrow={t('Werte', 'Values')} title={t('Wofür wir stehen.', 'What we stand for.')} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(([title, desc]) => (
              <div key={title} className="reveal bg-raised p-7">
                <h3 className="mb-3 text-lg text-ink">{title}</h3>
                <p className="text-pretty text-sm leading-relaxed text-muted">{desc}</p>
              </div>
            ))}
          </div>
          <div className="reveal mt-12 flex flex-wrap gap-4">
            <CTA to="/karriere">{t('Offene Rollen', 'Open roles')}</CTA>
            <CTA to="/kontakt" variant="ghost">{t('Kontakt aufnehmen', 'Get in touch')}</CTA>
          </div>
        </div>
      </section>
    </div>
  )
}
