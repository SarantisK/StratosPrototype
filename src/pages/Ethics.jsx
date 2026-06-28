import { useT } from '../i18n.jsx'
import { PageHeader, SectionHead, CTA, useReveal } from '../components/ui.jsx'

export default function Ethics() {
  const { t } = useT()
  const ref = useReveal()

  const PRINCIPLES = [
    [t('Menschliche Kontrolle', 'Human control'), t('Keine Wirkmaßnahme ohne Bestätigung durch einen Operator. Die KI erkennt und schlägt vor — der Mensch entscheidet.', 'No engagement without operator confirmation. The AI detects and proposes — the human decides.')],
    [t('Transparenz', 'Transparency'), t('Nachvollziehbare Entscheidungen statt Blackbox. Jede Maßnahme ist protokolliert und überprüfbar.', 'Traceable decisions instead of a black box. Every measure is logged and auditable.')],
    [t('Verantwortungsvolle KI', 'Responsible AI'), t('Klar als Schutzsystem ausgelegt, nicht als Eskalationstechnologie. Defensiv, nicht offensiv.', 'Designed clearly as a protective system, not an escalation technology. Defensive, not offensive.')],
    [t('Sorgfältige Kundenwahl', 'Careful customer vetting'), t('Stratos liefert ausschließlich an demokratische Staaten und geprüfte zivile Betreiber.', 'Stratos supplies only democratic states and vetted civilian operators.')],
    [t('Europäische Wertebasis', 'European values'), t('Entwickelt und gebaut in Europa, für demokratische Sicherheit und regulatorische Anschlussfähigkeit.', 'Developed and built in Europe, for democratic security and regulatory compatibility.')],
    [t('Verantwortungsvolle Kommunikation', 'Responsible communication'), t('Wir kommunizieren sachlich und geben keine sicherheitskritischen Details preis (OPSEC).', 'We communicate factually and do not disclose security-critical details (OPSEC).')],
  ]

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow={t('Ethik & Governance', 'Ethics & governance')}
        title={t('Verantwortung ist Teil der Technologie.', 'Responsibility is part of the technology.')}
        lead={t(
          'In einem sensiblen Markt entscheidet Vertrauen. Stratos vermeidet ethische Fragen nicht, sondern beantwortet sie — sachlich, überprüfbar und mit dem Menschen in der Entscheidung.',
          'In a sensitive market, trust is decisive. Stratos does not avoid ethical questions — it answers them, factually, verifiably and with the human in the decision.',
        )}
      />

      {/* human in the loop */}
      <section className="border-b border-line bg-base-2">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <SectionHead eyebrow={t('Das Prinzip', 'The principle')} title={t('Der Mensch bleibt in der Schleife.', 'The human stays in the loop.')} />
            <div className="reveal space-y-4">
              <p className="text-pretty text-lg leading-relaxed text-muted">
                {t(
                  'Eine häufige Sorge im Umgang mit KI-gestützter Sicherheitstechnik ist, dass Systeme eigenständig über Wirkmaßnahmen entscheiden. Bei Stratos ist das ausgeschlossen.',
                  'A common concern with AI-assisted security technology is that systems decide on engagements autonomously. With Stratos, that is ruled out.',
                )}
              </p>
              <p className="text-pretty leading-relaxed text-muted">
                {t(
                  'Die KI übernimmt Erfassung, Klassifizierung und Priorisierung. Die Entscheidung über eine Maßnahme trifft immer ein Operator. So bleibt die Verantwortung dort, wo sie hingehört — beim Menschen.',
                  'The AI handles detection, classification and prioritisation. The decision on any measure is always taken by an operator. Responsibility stays where it belongs — with a human.',
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* principles grid */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <SectionHead eyebrow={t('Grundsätze', 'Principles')} title={t('Sechs Leitlinien, an denen wir uns messen lassen.', 'Six principles we hold ourselves to.')} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map(([title, desc], i) => (
              <div key={title} className="reveal bg-raised p-7" style={{ transitionDelay: `${(i % 3) * 60}ms` }}>
                <div className="hud mb-4 text-cyan">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="mb-3 text-lg text-ink">{title}</h3>
                <p className="text-pretty text-sm leading-relaxed text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-base-2">
        <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 text-center">
          <h2 className="reveal display mx-auto max-w-3xl text-balance text-[clamp(2rem,4.5vw,3.2rem)] text-ink">
            {t('Schutz, Kontrolle und Verantwortung — nicht Eskalation.', 'Protection, control and responsibility — not escalation.')}
          </h2>
          <div className="reveal mt-9 flex justify-center"><CTA to="/kontakt">{t('Fragen? Sprechen Sie mit uns', 'Questions? Talk to us')}</CTA></div>
        </div>
      </section>
    </div>
  )
}
