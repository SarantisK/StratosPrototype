import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DroneScene from '../three/DroneScene.jsx'
import { product } from '../three/scrollState.js'
import { InterceptorFront, Icon } from '../graphics/Interceptor.jsx'

gsap.registerPlugin(ScrollTrigger)

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.14 },
    )
    el.querySelectorAll('.reveal').forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])
  return ref
}

const toneClass = (t) => (t === 'amber' ? 'text-amber' : t === 'nominal' ? 'text-nominal' : 'text-cyan')

const SCENES = [
  {
    eyebrow: 'Stratos SI-1 · Abfangdrohne',
    title: ['Konstruiert für', 'den Abfang.'],
    hud: ['STATUS', 'BEREIT'],
    rows: [
      ['Bauart', 'VTOL-Interceptor'],
      ['Antrieb', 'Carbon · 4 Rotoren'],
      ['Sektor', 'E-04'],
    ],
    tone: 'cyan',
  },
  {
    eyebrow: '01 · Antrieb',
    title: ['Aerodynamisches Design', '& Carbon-Antrieb.'],
    hud: ['ANTRIEB', 'CARBON'],
    rows: [
      ['Rotoren', '4 × Direktantrieb'],
      ['Struktur', 'Carbon-Composite'],
      ['Start', 'Senkrecht (VTOL)'],
    ],
    tone: 'cyan',
  },
  {
    eyebrow: '02 · Sensorik',
    title: ['KI-gestützte Zielerfassung', 'bei Nacht.'],
    hud: ['SENSORIK', 'EO / IR'],
    rows: [
      ['Modus', 'Nachtsicht'],
      ['Erfassung', 'KI · Echtzeit'],
      ['Objektiv', 'aktiv'],
    ],
    tone: 'amber',
  },
  {
    eyebrow: '03 · Aufbau',
    title: ['Innen: Kühlung', 'und Energie.'],
    hud: ['AUFBAU', 'EXPLODED'],
    rows: [
      ['Akku', 'modular'],
      ['Kühlsystem', 'aktiv'],
      ['Wartung', 'werkzeugarm'],
    ],
    tone: 'nominal',
  },
]

function Cinematic() {
  const stageRef = useRef(null)
  const [scene, setScene] = useState(0)
  const [render3d, setRender3d] = useState(true)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    product.animate = !reduce

    const io = new IntersectionObserver(([e]) => setRender3d(e.isIntersecting), { threshold: 0 })
    if (stageRef.current) io.observe(stageRef.current)

    if (reduce) return () => io.disconnect()

    let last = -1
    const st = ScrollTrigger.create({
      trigger: stageRef.current,
      start: 'top top',
      end: '+=3200',
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress
        product.p = p
        const idx = p < 0.16 ? 0 : p < 0.45 ? 1 : p < 0.72 ? 2 : 3
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
  }, [])

  return (
    <div ref={stageRef} className="relative h-screen w-full overflow-hidden bg-base">
      <div className="absolute inset-0" aria-hidden="true">
        <Canvas
          dpr={[1, 2]}
          frameloop={render3d ? 'always' : 'never'}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0.5, 6.4], fov: 34, near: 0.1, far: 100 }}
        >
          <DroneScene />
        </Canvas>
      </div>

      {/* grade + vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 35%, transparent 50%, rgba(6,8,12,0.72) 100%), linear-gradient(to top, rgba(6,8,12,0.92), transparent 40%)',
        }}
      />

      {/* console frame */}
      <div className="pointer-events-none absolute inset-4 bracket sm:inset-6" aria-hidden="true" />
      <div className="pointer-events-none absolute left-6 top-6 hidden items-center gap-2 sm:flex">
        <span className="status-dot bg-nominal text-nominal" />
        <span className="hud text-muted">STRATOS SI-1 · KONSTRUKTION</span>
      </div>

      {/* statements + telemetry */}
      <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-end px-5 pb-20 sm:px-8 sm:pb-16">
        <div className="grid items-end gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            {SCENES.map((s, i) => (
              <div
                key={i}
                className="transition-opacity duration-500"
                style={{ display: i === scene ? 'block' : 'none' }}
              >
                <p className="eyebrow mb-4">{s.eyebrow}</p>
                <h1 className="display text-[clamp(2.1rem,5.6vw,4.4rem)] text-ink">
                  {s.title[0]}
                  <br />
                  <span className={`${toneClass(s.tone)} ${s.tone === 'cyan' ? 'text-glow-cyan' : ''}`}>
                    {s.title[1]}
                  </span>
                </h1>
              </div>
            ))}
          </div>
          <div className="justify-self-start lg:justify-self-end">
            {SCENES.map((s, i) => (
              <div key={i} className="glass w-72 rounded-xl p-5" style={{ display: i === scene ? 'block' : 'none' }}>
                <div className="mb-4 flex items-center justify-between">
                  <span className="hud text-muted">{s.hud[0]}</span>
                  <span className={`hud ${toneClass(s.tone)}`}>{s.hud[1]}</span>
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
            <span
              key={i}
              className="h-px flex-1 transition-colors duration-500"
              style={{ background: i <= scene ? 'var(--color-cyan)' : 'var(--color-line)' }}
            />
          ))}
          <span className="hud text-faint">{String(scene + 1).padStart(2, '0')} / 04</span>
        </div>
      </div>

      {scene === 0 && (
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 hud text-faint">SCROLLEN ↓</div>
      )}
    </div>
  )
}

/* ---------- extended detail ---------- */

const SPECS = [
  ['Wirkprinzip', 'Nicht-letaler Abfang · sprengstofffrei'],
  ['Sensorik', 'Radar + EO/IR Sensor-Fusion'],
  ['Autonomie', 'KI-Zielerfassung · Human-in-the-loop'],
  ['Struktur', 'Carbon-Composite'],
  ['Abfangreichweite', 'bis 5 km'],
  ['Einsatzhöhe', 'bis 1.500 m'],
  ['Topspeed', '180 km/h'],
  ['Reaktionszeit', '< 8 s'],
]

const FEATURES = [
  ['net', 'Nicht-letaler Abfang', 'Neutralisiert Zieldrohnen ohne Sprengstoff und ohne herabfallende Trümmerlast.'],
  ['ai', 'KI-Zielerfassung', 'Klassifiziert und priorisiert anfliegende Bedrohungen autonom in Echtzeit.'],
  ['radar', 'Sensor-Fusion', 'Radar und EO/IR verschmelzen zu einem durchgehenden, lückenlosen Lagebild.'],
  ['human', 'Human-in-the-loop', 'Jede Wirkmaßnahme wird durch einen Operator bestätigt — die Kontrolle bleibt beim Menschen.'],
  ['range', 'Schnelle Reaktion', 'Abfang bis 5 km Entfernung und 1.500 m Höhe, in unter acht Sekunden.'],
  ['swarm', 'Schwarmabwehr', 'Mehrere Abfangdrohnen koordinieren sich gegen mehrere Ziele zugleich.'],
]

const STATS = [
  ['bis 5 km', 'Abfangreichweite'],
  ['< 8 s', 'Reaktionszeit'],
  ['1.500 m', 'Einsatzhöhe'],
  ['180 km/h', 'Topspeed'],
]

const VARIANTS = [
  {
    name: 'STRATOS SI-1',
    role: 'Interceptor · Aktiver Abfang',
    seeker: '#ff7a3c',
    tag: 'ABFANG',
    tone: 'amber',
    rows: [
      ['Reichweite', '5 km'],
      ['Topspeed', '180 km/h'],
      ['Wirkprinzip', 'nicht-letal'],
      ['Flugzeit', '~ 18 min'],
    ],
  },
  {
    name: 'STRATOS SI-1 SCOUT',
    role: 'Frühwarnung · Aufklärung',
    seeker: '#34cfe6',
    tag: 'AUFKLÄRUNG',
    tone: 'cyan',
    rows: [
      ['Loiter-Zeit', '~ 45 min'],
      ['Sensorik', 'Radar + EO/IR'],
      ['Reichweite', '8 km'],
      ['Rolle', 'Klassifizierung'],
    ],
  },
]

function Details() {
  const ref = useReveal()
  return (
    <div ref={ref} className="border-t border-line bg-base-2">
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="reveal">
            <p className="eyebrow mb-6">Das Abfangsystem</p>
            <h2 className="display text-[clamp(2.2rem,5vw,3.6rem)] leading-[0.95] text-ink">
              Abfangen.
              <br />
              <span className="text-cyan text-glow-cyan">Ohne Sprengstoff.</span>
            </h2>
            <p className="mt-6 max-w-lg text-pretty leading-relaxed text-muted">
              Die SI-1 ist ein senkrechtstartender Interceptor, der feindliche Drohnen nicht-letal und
              sprengstofffrei neutralisiert. KI-gestützt und unter menschlicher Freigabe — entwickelt
              für den Einsatz über bewohnten Räumen.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-3 py-1.5 hud text-amber">
              <span className="status-dot bg-amber text-amber" aria-hidden="true" /> Illustrative
              Zielwerte · System in Entwicklung
            </span>
          </div>
          <dl className="reveal grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {SPECS.map(([k, v]) => (
              <div key={k} className="bg-raised p-5">
                <dt className="hud text-faint">{k}</dt>
                <dd className="mt-1.5 text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-24">
          <h3 className="reveal mb-10 text-balance text-2xl text-ink">Was die SI-1 ausmacht</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(([icon, title, desc], i) => (
              <div
                key={title}
                className="reveal panel group rounded-xl p-7 transition-colors hover:border-cyan/40"
                style={{ transitionDelay: `${(i % 3) * 70}ms` }}
              >
                <span className="mb-5 inline-grid h-11 w-11 place-items-center rounded-lg border border-line text-cyan transition-colors group-hover:border-cyan/50">
                  <Icon name={icon} className="h-5 w-5" />
                </span>
                <h4 className="mb-2 text-lg text-ink">{title}</h4>
                <p className="text-pretty text-sm leading-relaxed text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal mt-20 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map(([value, label]) => (
            <div key={label} className="bg-raised p-7">
              <div className="display text-[clamp(2rem,4vw,2.8rem)] text-cyan">{value}</div>
              <div className="mt-2 text-sm text-ink">{label}</div>
              <div className="hud mt-3 text-faint">Zielwert</div>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <h3 className="reveal mb-10 text-balance text-2xl text-ink">Zwei Rollen, ein System</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            {VARIANTS.map((v) => (
              <div key={v.name} className="reveal panel overflow-hidden rounded-xl">
                <div className="relative grid place-items-center border-b border-line bg-base/40 p-6">
                  <InterceptorFront className="w-44" seeker={v.seeker} />
                  <span className={`absolute right-5 top-5 hud ${toneClass(v.tone)}`}>{v.tag}</span>
                </div>
                <div className="p-7">
                  <h4 className="display text-xl tracking-wide text-ink">{v.name}</h4>
                  <p className="mt-1 text-sm text-muted">{v.role}</p>
                  <div className="mt-5 grid grid-cols-2 gap-x-6">
                    {v.rows.map(([k, val]) => (
                      <div key={k} className="flex items-center justify-between border-t border-line py-2.5">
                        <span className="text-sm text-muted">{k}</span>
                        <span className="hud text-ink">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductSection() {
  return (
    <section id="produkt" className="border-t border-line">
      <Cinematic />
      <Details />
    </section>
  )
}
