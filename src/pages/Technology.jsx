import { Link } from 'react-router-dom'
import { useT } from '../i18n.jsx'
import { PageHeader, SectionHead, CTA, useReveal, TrustBadges } from '../components/ui.jsx'

export default function Technology() {
  const { t } = useT()
  const ref = useReveal()

  const STEPS = [
    ['01', t('Erfassung', 'Detection'), t('Sensor-Fusion aus Radar und EO/IR erkennt und verfolgt Ziele im geschützten Luftraum — auch bei geringer Signatur.', 'Sensor fusion of radar and EO/IR detects and tracks targets in the protected airspace — even at low signature.')],
    ['02', t('KI-Zielerfassung', 'AI targeting'), t('Die KI klassifiziert anfliegende Drohnen, trennt sie von harmlosen Objekten und priorisiert Bedrohungen in Echtzeit.', 'AI classifies incoming drones, separates them from harmless objects and prioritises threats in real time.')],
    ['03', t('Human-in-the-loop', 'Human-in-the-loop'), t('Ein Operator bestätigt die Einsatzentscheidung. Die Kontrolle über jede Maßnahme bleibt beim Menschen.', 'An operator confirms the engagement decision. Control over every measure stays with a human.')],
    ['04', t('Nicht-letale Abwehr', 'Non-lethal response'), t('Das Ziel wird sprengstofffrei neutralisiert — ohne Detonation, ohne herabfallende Trümmerlast.', 'The target is neutralised without explosives — no detonation, no falling debris.')],
  ]

  const CHAIN = [
    ['Sensorik', t('Radar · EO/IR', 'Radar · EO/IR'), t('Erfassung & Tracking', 'Detection & tracking')],
    ['C2 / KI', t('Lagebild · Klassifizierung', 'Picture · classification'), t('Priorisierung in Echtzeit', 'Real-time prioritisation')],
    ['Operator', t('Human-in-the-loop', 'Human-in-the-loop'), t('Freigabe der Maßnahme', 'Authorises the measure')],
    ['Effektor', t('SI-1 Interceptor', 'SI-1 interceptor'), t('Nicht-letaler Abfang', 'Non-lethal intercept')],
  ]

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow={t('Technologie · Counter-UAS', 'Technology · Counter-UAS')}
        title={t('Erkennen. Entscheiden. Abwehren.', 'Detect. Decide. Defend.')}
        lead={t(
          'Stratos ist ein KI-gestütztes, nicht-letales Counter-UAS-System für den Schutz kritischer Infrastruktur — sprengstofffrei und unter durchgehender menschlicher Kontrolle.',
          'Stratos is an AI-assisted, non-lethal counter-UAS system for protecting critical infrastructure — explosive-free and under continuous human control.',
        )}
      >
        <TrustBadges />
      </PageHeader>

      {/* problem */}
      <section className="border-b border-line bg-base-2">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <SectionHead index="01 / Bedrohung" eyebrow={t('Die Ausgangslage', 'The starting point')} title={t('Günstige Drohnen, teure Abwehr.', 'Cheap drones, expensive defence.')} lead={t('Die Bedrohung durch unbemannte Systeme wächst schneller als die Antworten darauf — technisch, wirtschaftlich und gesellschaftlich.', 'The threat from unmanned systems grows faster than the answers to it — technically, economically and socially.')} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {[
              [t('Kostenasymmetrie', 'Cost asymmetry'), t('Ein FPV-Quadrocopter kostet wenige hundert Euro. Klassische Abwehr antwortet mit einem Vielfachen — wirtschaftlich nicht skalierbar.', 'An FPV quadcopter costs a few hundred euros. Conventional defence answers with a multiple — not economically scalable.')],
              [t('Risiko im zivilen Raum', 'Risk over civilian areas'), t('Explosive Systeme erzeugen über Flughäfen oder Veranstaltungen Trümmer und Kollateralschäden — kaum vertretbar.', 'Explosive systems create debris and collateral damage over airports or events — hardly justifiable.')],
              [t('Masse und Tempo', 'Mass and speed'), t('Schwärme und schnelle Anflüge verlangen automatisierte Erfassung in Echtzeit — manuelle Verfahren kommen nicht hinterher.', 'Swarms and fast approaches require automated real-time detection — manual procedures cannot keep up.')],
            ].map(([k, d], i) => (
              <div key={k} className="reveal bg-raised p-8" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="hud mb-6 text-cyan">0{i + 1}</div>
                <h3 className="mb-3 text-xl text-ink">{k}</h3>
                <p className="text-pretty leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* system */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <SectionHead index="02 / System" eyebrow={t('Vom Signal zur Entscheidung', 'From signal to decision')} title={t('Vier Schritte. Kontrolle in jedem.', 'Four steps. Control in each.')} />
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(([n, title, desc], i) => (
              <li key={n} className="reveal panel group relative rounded-xl p-7" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="hud mb-8 text-cyan/40 transition-colors group-hover:text-cyan">{n}</div>
                <h3 className="mb-3 text-lg text-ink">{title}</h3>
                <p className="text-pretty text-sm leading-relaxed text-muted">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* non-lethal contrast */}
      <section className="border-b border-line bg-base-2">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <SectionHead index="03 / Differenzierung" eyebrow={t('Das Unterscheidungsmerkmal', 'The differentiator')} title={t('Kein Sprengstoff. Kein Kollateralschaden.', 'No warhead. No collateral damage.')} lead={t('Der sprengstofffreie Ansatz entscheidet, wo ein System überhaupt eingesetzt werden darf — und öffnet Stratos den Weg in zivile Sicherheitsmärkte.', 'The explosive-free approach decides where a system may be used at all — and opens civilian security markets for Stratos.')} />
            </div>
            <div className="reveal grid gap-px overflow-hidden rounded-xl border border-line bg-line">
              <div className="bg-raised p-7">
                <div className="hud mb-3 text-muted">{t('Kinetisch / explosiv', 'Kinetic / explosive')}</div>
                <ul className="space-y-2 text-muted">
                  {[t('Detonation im Luftraum', 'Detonation in the air'), t('Trümmer und Kollateralschäden', 'Debris and collateral damage'), t('In zivilen Räumen kaum vertretbar', 'Hardly justifiable over civilian areas')].map((x) => (
                    <li key={x} className="flex items-start gap-3"><span className="mt-2 h-px w-3 shrink-0 bg-muted/50" aria-hidden="true" /><span className="line-through decoration-muted/30">{x}</span></li>
                  ))}
                </ul>
              </div>
              <div className="bg-cyan/[0.06] p-7">
                <div className="hud mb-3 text-cyan">{t('Stratos · nicht-letal', 'Stratos · non-lethal')}</div>
                <ul className="space-y-2 text-ink">
                  {[t('Sprengstofffreie Neutralisierung', 'Explosive-free neutralisation'), t('Keine herabfallende Trümmerlast', 'No falling debris'), t('Einsetzbar über bewohnten Räumen', 'Usable over populated areas'), t('Menschliche Kontrolle in jeder Phase', 'Human control at every stage')].map((x) => (
                    <li key={x} className="flex items-start gap-3"><span className="mt-1 text-cyan" aria-hidden="true">›</span><span>{x}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* interoperability */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <SectionHead index="04 / Integration" eyebrow={t('Offene Architektur', 'Open architecture')} title={t('Fügt sich in bestehende Abwehrketten ein.', 'Fits into existing defence chains.')} lead={t('Stratos ersetzt keine bestehende Luftverteidigung, sondern ergänzt sie um den nicht-letalen Counter-UAS-Layer — interoperabel mit vorhandener Sensorik und Leitstellen.', 'Stratos does not replace existing air defence — it adds the non-lethal counter-UAS layer, interoperable with existing sensors and command posts.')} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CHAIN.map(([k, sub, d], i) => (
              <div key={k} className="reveal relative" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="panel h-full rounded-xl p-6">
                  <div className="hud mb-3 text-cyan">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="text-lg text-ink">{k}</h3>
                  <p className="mt-1 hud text-faint">{sub}</p>
                  <p className="mt-4 text-sm text-muted">{d}</p>
                </div>
                {i < CHAIN.length - 1 && <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-cyan/40 lg:block" aria-hidden="true">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* complement positioning */}
      <section className="border-b border-line bg-base-2">
        <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
          <div className="reveal max-w-3xl">
            <p className="eyebrow mb-5">{t('Marktposition', 'Market position')}</p>
            <h2 className="display text-balance text-[clamp(2rem,4.5vw,3.4rem)] text-ink">
              {t('Der Counter-UAS-Layer, den die großen Plattformen ', 'The counter-UAS layer the large platforms ')}
              <span className="text-cyan">{t('offenlassen.', 'leave open.')}</span>
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted">
              {t(
                'Europäische Defense-AI-Plattformen decken Land, Luft, See und EW ab — aber kein dediziertes Counter-UAS-Produkt. Stratos besetzt genau diese Lücke, zivil-tauglich und nicht-letal.',
                'European defence-AI platforms cover land, air, sea and EW — but no dedicated counter-UAS product. Stratos fills exactly that gap, civilian-ready and non-lethal.',
              )}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <CTA to="/produkt">{t('Das Produkt ansehen', 'See the product')}</CTA>
              <CTA to="/einsatz" variant="ghost">{t('Einsatzfelder', 'Use-cases')}</CTA>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
