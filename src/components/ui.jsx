import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useT } from '../i18n.jsx'

/* reveal-on-scroll, reduced-motion safe via CSS */
export function useReveal() {
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

export function PageHeader({ eyebrow, title, lead, children }) {
  return (
    <header className="relative border-b border-line">
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true"
        style={{ background: 'radial-gradient(90% 70% at 80% 0%, rgba(52,207,230,0.08), transparent 60%)' }} />
      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-8 sm:pt-36">
        <p className="eyebrow mb-5">{eyebrow}</p>
        <h1 className="display max-w-4xl text-balance text-[clamp(2.4rem,6vw,4.6rem)] text-ink">{title}</h1>
        {lead && <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">{lead}</p>}
        {children && <div className="mt-9">{children}</div>}
      </div>
    </header>
  )
}

export function SectionHead({ index, eyebrow, title, lead }) {
  return (
    <div className="reveal max-w-3xl">
      <div className="mb-5 flex items-center gap-4">
        {index && <span className="hud text-cyan">{index}</span>}
        <span className="h-px w-10 bg-line" aria-hidden="true" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="text-balance text-[clamp(1.9rem,4vw,3rem)] text-ink">{title}</h2>
      {lead && <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">{lead}</p>}
    </div>
  )
}

export function CTA({ to, href, children, variant = 'primary', className = '' }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors touch-manipulation '
  const styles =
    variant === 'primary'
      ? 'bg-cyan text-base hover:bg-cyan-deep'
      : 'border border-line text-ink hover:border-cyan/50 hover:text-cyan'
  const cls = base + styles + ' ' + className
  if (to) return <Link to={to} className={cls}>{children}</Link>
  return <a href={href} className={cls}>{children}</a>
}

export function ArrowLink({ to, children }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-2 hud text-cyan transition-colors hover:text-ink">
      {children}
      <span className="transition-transform group-hover:translate-x-1">→</span>
    </Link>
  )
}

export function TrustBadges({ className = '' }) {
  const { t } = useT()
  const badges = [
    t('Made in Europe', 'Made in Europe'),
    t('Kein Sprengstoff — kein Kollateralschaden', 'No warhead — no collateral damage'),
    t('Human-in-the-loop', 'Human-in-the-loop'),
  ]
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-3 ${className}`}>
      {badges.map((b) => (
        <li key={b} className="hud flex items-center gap-2 text-muted">
          <span className="status-dot bg-cyan text-cyan" aria-hidden="true" />
          {b}
        </li>
      ))}
    </ul>
  )
}

export function Wordmark({ onClick }) {
  return (
    <Link to="/" onClick={onClick} className="group inline-flex items-center gap-2.5">
      <span className="relative grid h-7 w-7 place-items-center" aria-hidden="true">
        <span className="absolute inset-0 rounded-full border border-cyan/50" />
        <span className="status-dot bg-cyan text-cyan" />
      </span>
      <span className="display text-lg tracking-[0.16em] text-ink">STRATOS</span>
    </Link>
  )
}

/* generic bordered card grid cell */
export function Panel({ children, className = '' }) {
  return <div className={`panel rounded-xl p-7 ${className}`}>{children}</div>
}
