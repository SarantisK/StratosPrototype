import { useT } from '../i18n.jsx'
import { PageHeader, SectionHead, CTA, useReveal } from '../components/ui.jsx'

export default function Careers() {
  const { t } = useT()
  const ref = useReveal()

  const ROLES = [
    [t('KI-Engineer (Zielerfassung)', 'AI Engineer (targeting)'), t('Du bringst der SI-1 bei, Bedrohungen von harmlosen Objekten zu unterscheiden — in Echtzeit, bei Tag und Nacht.', 'You teach the SI-1 to tell threats from harmless objects — in real time, day and night.')],
    [t('Robotics-Engineer', 'Robotics Engineer'), t('Du baust den Antrieb und die Flugregelung des senkrechtstartenden Interceptors.', 'You build the propulsion and flight control of the vertical-launch interceptor.')],
    [t('Aerospace-Engineer', 'Aerospace Engineer'), t('Du verantwortest Aerodynamik, Struktur und Carbon-Aufbau der Abfangdrohne.', 'You own aerodynamics, structure and carbon build of the interceptor.')],
    [t('Software-Engineer (C2)', 'Software Engineer (C2)'), t('Du entwickelst das Lagebild und die Operator-Oberfläche des Schutzsystems.', 'You build the situational picture and operator interface of the protective system.')],
  ]

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow={t('Karriere', 'Careers')}
        title={t('Bauen Sie mit am europäischen Counter-UAS-Layer.', 'Build Europe’s counter-UAS layer with us.')}
        lead={t(
          'Im Talentmangel der Defense-Tech-Branche suchen wir Menschen, die an einer defensiven, nicht-letalen Mission mitbauen wollen — mit Tempo, Verantwortung und echtem Impact.',
          'In a defence-tech talent shortage, we look for people who want to build a defensive, non-lethal mission — with speed, responsibility and real impact.',
        )}
      >
        <CTA to="/kontakt">{t('Initiativ bewerben', 'Apply spontaneously')}</CTA>
      </PageHeader>

      <section className="border-b border-line bg-base-2">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <SectionHead eyebrow={t('Warum Stratos', 'Why Stratos')} title={t('Mission, Tempo und ein klarer ethischer Rahmen.', 'Mission, speed and a clear ethical frame.')} />
            <p className="reveal text-pretty text-lg leading-relaxed text-muted">
              {t(
                'Bei Stratos arbeitest du an einem System, das Menschen und Infrastruktur schützt — nicht-letal, unter menschlicher Kontrolle und in Europa gebaut. Kurze Wege, echte Verantwortung und Einblick in den gesamten Entwicklungsprozess.',
                'At Stratos you work on a system that protects people and infrastructure — non-lethal, under human control and built in Europe. Short paths, real responsibility and insight into the whole development process.',
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <SectionHead eyebrow={t('Offene Rollen', 'Open roles')} title={t('Rollen als Geschichte, nicht als Stellenanzeige.', 'Roles as a story, not a job ad.')} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {ROLES.map(([title, desc], i) => (
              <div key={title} className="reveal panel group flex items-start justify-between gap-6 rounded-xl p-7 transition-colors hover:border-cyan/40" style={{ transitionDelay: `${(i % 2) * 70}ms` }}>
                <div>
                  <h3 className="mb-2 text-lg text-ink">{title}</h3>
                  <p className="text-pretty text-sm leading-relaxed text-muted">{desc}</p>
                </div>
                <span className="hud shrink-0 text-cyan opacity-0 transition-opacity group-hover:opacity-100">→</span>
              </div>
            ))}
          </div>
          <p className="reveal mt-8 hud text-faint">{t('PLATZHALTER-ROLLEN FÜR DAS MOCKUP', 'PLACEHOLDER ROLES FOR THE MOCKUP')}</p>
        </div>
      </section>
    </div>
  )
}
