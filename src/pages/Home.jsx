import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ConsoleScene from '../three/ConsoleScene.jsx'
import { scroll } from '../three/scrollState.js'
import { useT } from '../i18n.jsx'
import { CTA, TrustBadges, SectionHead, ArrowLink, useReveal } from '../components/ui.jsx'

gsap.registerPlugin(ScrollTrigger)

function Hero() {
  const { t } = useT()
  const stageRef = useRef(null)
  const [scene, setScene] = useState(0)
  const [render3d, setRender3d] = useState(true)

  const SCENES = [
    { eyebrow: t('Stratos C2 · Luftraum-Lagebild', 'Stratos C2 · Airspace picture'), title: [t('Sehen, was den', 'See what threatens'), t('Luftraum bedroht.', 'the airspace.')], hud: ['SYSTEM-MODUS', 'AUTO'], rows: [['Sektor', 'E-04'], ['Tracks aktiv', '04'], ['Status', t('Überwachung', 'Monitoring')]], tone: 'cyan' },
    { eyebrow: t('01 · Erfassung', '01 · Detection'), title: [t('Erkennen, bevor', 'Detect before'), t('es nah kommt.', 'it gets close.')], hud: ['SENSOR-FUSION', 'RADAR + EO/IR'], rows: [['Track', '0x1F3A'], ['Distanz', '1.240 m'], ['Klasse', 'FPV']], tone: 'cyan' },
    { eyebrow: t('02 · Freigabe', '02 · Authorisation'), title: [t('Entscheiden — Mensch', 'Decide — human'), t('in der Schleife.', 'in the loop.')], hud: ['FREIGABE', 'OPERATOR'], rows: [['Kontrolle', 'Human-in-the-loop'], ['Maßnahme', t('bereit', 'ready')]], tone: 'cyan' },
    { eyebrow: t('03 · Abwehr', '03 · Response'), title: [t('Neutralisieren.', 'Neutralise.'), t('Nicht-letal.', 'Non-lethal.')], hud: ['STATUS', t('NEUTRALISIERT', 'NEUTRALISED')], rows: [['Wirkmittel', t('sprengstofffrei', 'no warhead')], ['Trümmerlast', t('keine', 'none')]], tone: 'nominal' },
  ]

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver(([e]) => setRender3d(e.isIntersecting), { threshold: 0 })
    if (stageRef.current) io.observe(stageRef.current)
    if (reduce) {
      setScene(0)
      return () => io.disconnect()
    }
    let last = -1
    const st = ScrollTrigger.create({
      trigger: stageRef.current,
      start: 'top top',
      end: '+=2600',
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        scroll.p = self.progress
        const idx = Math.min(3, Math.floor(self.progress / 0.25 + 0.0001))
        if (idx !== last) {
          last = idx
          setScene(idx)
        }
      },
    })
    return () => {
      st.kill()
      io.disconnect()
    }
  }, [t])

  const tone = (x) => (x === 'nominal' ? 'text-nominal' : 'text-cyan')

  return (
    <div ref={stageRef} className="relative h-screen w-full overflow-hidden bg-base">
      <div className="absolute inset-0" aria-hidden="true">
        <Canvas dpr={[1, 2]} frameloop={render3d ? 'always' : 'never'} gl={{ antialias: true, alpha: true }} camera={{ position: [21, 17, 27], fov: 38, near: 0.1, far: 220 }}>
          <ConsoleScene />
        </Canvas>
      </div>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ background: 'radial-gradient(120% 90% at 70% 10%, transparent 40%, rgba(6,8,12,0.55) 100%), linear-gradient(to top, rgba(6,8,12,0.85), transparent 45%)' }} />
      <div className="pointer-events-none absolute inset-4 bracket sm:inset-6" aria-hidden="true" />
      <div className="pointer-events-none absolute left-6 top-20 hidden items-center gap-2 sm:flex">
        <span className="status-dot bg-nominal text-nominal" />
        <span className="hud text-muted">STRATOS C2 · LIVE</span>
      </div>

      <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-end px-5 pb-20 sm:px-8 sm:pb-16">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            {SCENES.map((s, i) => (
              <div key={i} style={{ display: i === scene ? 'block' : 'none' }}>
                <p className="eyebrow mb-4">{s.eyebrow}</p>
                <h1 className="display text-[clamp(2.4rem,6.5vw,5.2rem)] text-ink">
                  {s.title[0]}
                  <br />
                  <span className={`${tone(s.tone)} ${s.tone === 'cyan' ? 'text-glow-cyan' : ''}`}>{s.title[1]}</span>
                </h1>
              </div>
            ))}
          </div>
          <div className="justify-self-start lg:justify-self-end">
            {SCENES.map((s, i) => (
              <div key={i} className="glass w-72 rounded-xl p-5" style={{ display: i === scene ? 'block' : 'none' }}>
                <div className="mb-4 flex items-center justify-between">
                  <span className="hud text-muted">{s.hud[0]}</span>
                  <span className={`hud ${tone(s.tone)}`}>{s.hud[1]}</span>
                </div>
                <div className="space-y-2.5">
                  {s.rows.map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between border-t border-white/5 pt-2.5">
                      <span className="text-sm text-muted">{k}</span>
                      <span className="hud text-ink">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex items-center gap-3" aria-hidden="true">
          {SCENES.map((_, i) => (
            <span key={i} className="h-px flex-1 transition-colors duration-500" style={{ background: i <= scene ? 'var(--color-cyan)' : 'var(--color-line)' }} />
          ))}
          <span className="hud text-faint">{String(scene + 1).padStart(2, '0')} / 04</span>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const { t } = useT()
  const ref = useReveal()

  const QUICK = [
    [t('Technologie', 'Technology'), t('Wie das nicht-letale Counter-UAS-System erkennt, entscheidet und abwehrt.', 'How the non-lethal counter-UAS system detects, decides and defends.'), '/technologie'],
    [t('Produkt', 'Product'), t('Die SI-1 Abfangdrohne — von der Sensorik bis zum Aufbau.', 'The SI-1 interceptor — from sensors to internal build.'), '/produkt'],
    [t('Einsatz', 'Use-Cases'), t('Schutz für Flughäfen, Energie, Häfen, Stadien und Behörden.', 'Protection for airports, energy, ports, stadiums and authorities.'), '/einsatz'],
  ]

  return (
    <div ref={ref}>
      <Hero />

      {/* defender framing */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
          <p className="reveal eyebrow mb-6">{t('Die Idee', 'The idea')}</p>
          <h2 className="reveal display max-w-4xl text-balance text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[0.98] text-ink">
            {t('Schützen, ', 'Protecting ')}
            <span className="text-cyan text-glow-cyan">{t('was zählt.', 'what matters.')}</span>
          </h2>
          <p className="reveal mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            {t(
              'Stratos baut den Counter-UAS-Layer, den die großen Defense-AI-Plattformen offenlassen: nicht-letal, sprengstofffrei und einsetzbar über bewohnten Räumen — vom Flughafen bis zum Stadion.',
              'Stratos builds the counter-UAS layer the large defence-AI platforms leave open: non-lethal, explosive-free and usable over populated areas — from airports to stadiums.',
            )}
          </p>
          <TrustBadges className="reveal mt-10" />
          <div className="reveal mt-10 flex flex-wrap gap-4">
            <CTA to="/technologie">{t('So funktioniert es', 'How it works')}</CTA>
            <CTA to="/kontakt" variant="ghost">{t('Kontakt aufnehmen', 'Get in touch')}</CTA>
          </div>
        </div>
      </section>

      {/* quick links */}
      <section className="border-t border-line bg-base-2">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {QUICK.map(([title, desc, to], i) => (
              <Link key={to} to={to} className="reveal panel group rounded-xl p-8 transition-colors hover:border-cyan/40" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="hud mb-8 text-cyan/50">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="mb-3 text-xl text-ink">{title}</h3>
                <p className="text-pretty text-sm leading-relaxed text-muted">{desc}</p>
                <div className="mt-6 hud text-cyan opacity-0 transition-opacity group-hover:opacity-100">{t('ÖFFNEN →', 'OPEN →')}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* newsroom teaser */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="mb-12 flex items-end justify-between gap-6">
            <SectionHead eyebrow={t('Newsroom & Insights', 'Newsroom & insights')} title={t('Counter-UAS, verständlich erklärt.', 'Counter-UAS, clearly explained.')} />
            <div className="reveal hidden sm:block"><ArrowLink to="/newsroom">{t('ZUM NEWSROOM', 'TO NEWSROOM')}</ArrowLink></div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              [t('Battle-Calculus', 'Battle-Calculus'), t('Warum günstige Drohnen teure Abwehr schlagen — und wie sich die Ökonomie umkehren lässt.', 'Why cheap drones beat expensive defence — and how to flip the economics.')],
              [t('Lessons aus der Ukraine', 'Lessons from Ukraine'), t('Was reale Einsätze über Drone Walls und europäische Drohnenabwehr lehren.', 'What real operations teach about drone walls and European counter-UAS.')],
              [t('FIFA WM 2026', 'FIFA World Cup 2026'), t('Temporäre Schutzzonen über Stadien als Bewährungsprobe für Counter-UAS.', 'Temporary protective zones over stadiums as a proving ground for counter-UAS.')],
            ].map(([title, desc], i) => (
              <Link key={title} to="/newsroom" className="reveal panel group rounded-xl p-7 transition-colors hover:border-cyan/40" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="hud mb-4 text-cyan">{t('EXPLAINER', 'EXPLAINER')}</div>
                <h3 className="mb-2 text-lg text-ink">{title}</h3>
                <p className="text-pretty text-sm leading-relaxed text-muted">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
