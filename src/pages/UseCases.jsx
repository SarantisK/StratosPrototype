import { useT } from '../i18n.jsx'
import { PageHeader, SectionHead, CTA, useReveal } from '../components/ui.jsx'
import { Icon } from '../graphics/Interceptor.jsx'

export default function UseCases() {
  const { t } = useT()
  const ref = useReveal()

  const CIVIL = [
    [t('Flughäfen', 'Airports'), t('Schutz des Flugbetriebs vor unautorisierten Drohnen — ohne Trümmerrisiko über Rollfeld und Terminal.', 'Protecting flight operations from unauthorised drones — without debris risk over apron and terminal.')],
    [t('Energie & Versorgung', 'Energy & utilities'), t('Kraftwerke, Umspannwerke und kritische Versorgungspunkte gegen gezielte Störungen absichern.', 'Securing power plants, substations and critical supply points against targeted disruption.')],
    [t('Häfen & Logistik', 'Ports & logistics'), t('Sensible Knoten in Lieferketten und Seeverkehr vor Aufklärung und Sabotage schützen.', 'Protecting sensitive nodes in supply chains and maritime traffic from reconnaissance and sabotage.')],
    [t('Stadien & Großveranstaltungen', 'Stadiums & major events'), t('Temporäre Schutzzonen über Menschenmengen — relevant etwa für die FIFA WM 2026.', 'Temporary protective zones over crowds — relevant for the FIFA World Cup 2026, for example.')],
    [t('Private Sicherheit', 'Private security'), t('Sicherheitsdienstleister und Betreiber sensibler Standorte mit einer einsetzbaren Lösung ausstatten.', 'Equipping security providers and operators of sensitive sites with a deployable solution.')],
    [t('Behörden & öffentliche Sicherheit', 'Authorities & public safety'), t('Regierungsgebäude, Polizei und sensible Einrichtungen verantwortungsvoll schützen.', 'Responsibly protecting government buildings, police and sensitive facilities.')],
  ]

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow={t('Einsatz · Zivil & CRITIS', 'Use-cases · Civil & CRITIS')}
        title={t('Ein Schirm für sensible Räume.', 'A shield for sensitive spaces.')}
        lead={t(
          'Überall dort, wo Drohnenbedrohungen auf Orte treffen, an denen Kollateralschäden keine Option sind. Genau hier — im zivilen Schutz kritischer Infrastruktur — setzt Stratos an, wo klassische Anbieter aufhören.',
          'Wherever drone threats meet places where collateral damage is not an option. This is exactly where Stratos starts — civilian protection of critical infrastructure, where conventional providers stop.',
        )}
      >
        <CTA to="/kontakt">{t('Schutzbedarf besprechen', 'Discuss your needs')}</CTA>
      </PageHeader>

      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <SectionHead eyebrow={t('Primärer Fokus', 'Primary focus')} title={t('Zivil und kritische Infrastruktur.', 'Civil and critical infrastructure.')} lead={t('Wettbewerber adressieren fast ausschließlich militärische Beschaffung. Der nicht-letale Ansatz von Stratos macht den Schutz ziviler Räume erst möglich.', 'Competitors address almost exclusively military procurement. Stratos’ non-lethal approach is what makes protecting civilian spaces possible in the first place.')} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CIVIL.map(([title, desc], i) => (
              <div key={title} className="reveal panel group rounded-xl p-7 transition-colors hover:border-cyan/40" style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-md border border-line text-cyan" aria-hidden="true"><Icon name="radar" className="h-4 w-4" /></span>
                  <span className="hud text-muted">CRITIS</span>
                </div>
                <h3 className="mb-2 text-lg text-ink">{title}</h3>
                <p className="text-pretty text-sm leading-relaxed text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* military as one segment, not the default */}
      <section className="border-b border-line bg-base-2">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <SectionHead eyebrow={t('Auch militärisch', 'Defence too')} title={t('Schutz für Liegenschaften und Stützpunkte.', 'Protection for bases and facilities.')} />
            <p className="reveal text-pretty text-lg leading-relaxed text-muted">
              {t(
                'Der nicht-letale Ansatz ist auch im militärischen Umfeld relevant: für Stützpunkte, Depots und vorgeschobene Stellungen, in denen Trümmer und Kollateralschäden ein Risiko bleiben. Stratos versteht sich hier als ergänzender Layer zu bestehender Luftverteidigung.',
                'The non-lethal approach is relevant in defence too: for bases, depots and forward positions where debris and collateral damage remain a risk. Here Stratos acts as a complementary layer to existing air defence.',
              )}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
