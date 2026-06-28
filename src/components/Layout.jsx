import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useT } from '../i18n.jsx'
import { Wordmark } from './ui.jsx'
import ThemePanel from './ThemePanel.jsx'
import { scroll, product } from '../three/scrollState.js'

gsap.registerPlugin(ScrollTrigger)

function useNav() {
  const { t } = useT()
  return [
    [t('Technologie', 'Technology'), '/technologie'],
    [t('Produkt', 'Product'), '/produkt'],
    [t('Einsatz', 'Use-Cases'), '/einsatz'],
    [t('Ethik', 'Ethics'), '/ethik'],
    [t('Newsroom', 'Newsroom'), '/newsroom'],
    [t('Über uns', 'About'), '/ueber'],
  ]
}

function LangSwitch() {
  const { lang, setLang } = useT()
  return (
    <div className="inline-flex items-center rounded-full border border-line p-0.5" role="group" aria-label="Sprache / Language">
      {['de', 'en'].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
            lang === l ? 'bg-cyan text-base' : 'text-muted hover:text-ink'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

function Nav() {
  const { t } = useT()
  const items = useNav()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const linkCls = ({ isActive }) =>
    `hud transition-colors ${isActive ? 'text-cyan' : 'text-muted hover:text-ink'}`
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid || open ? 'border-line bg-base/80 backdrop-blur-xl' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Wordmark onClick={() => setOpen(false)} />
        <nav className="hidden items-center gap-7 lg:flex">
          {items.map(([label, to]) => (
            <NavLink key={to} to={to} className={linkCls}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <LangSwitch />
          <NavLink
            to="/kontakt"
            className="rounded-full border border-cyan/40 bg-cyan/10 px-4 py-2 text-sm font-semibold text-cyan transition-colors hover:bg-cyan/20"
          >
            {t('Kontakt', 'Contact')}
          </NavLink>
        </div>
        <button className="hud text-ink lg:hidden" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label={t('Menü', 'Menu')}>
          {open ? t('SCHLIESSEN', 'CLOSE') : t('MENÜ', 'MENU')}
        </button>
      </div>
      {open && (
        <div className="border-t border-line bg-base/95 px-5 py-4 lg:hidden">
          {[...items, [t('Karriere', 'Careers'), '/karriere'], [t('Kontakt', 'Contact'), '/kontakt']].map(([label, to]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)} className="block py-2.5 hud text-muted">
              {label}
            </NavLink>
          ))}
          <div className="mt-3"><LangSwitch /></div>
        </div>
      )}
    </header>
  )
}

function Footer() {
  const { t } = useT()
  const cols = [
    [t('Lösung', 'Solution'), [[t('Technologie', 'Technology'), '/technologie'], [t('Produkt', 'Product'), '/produkt'], [t('Einsatz', 'Use-Cases'), '/einsatz']]],
    [t('Unternehmen', 'Company'), [[t('Über uns', 'About'), '/ueber'], [t('Ethik & Governance', 'Ethics & Governance'), '/ethik'], [t('Karriere', 'Careers'), '/karriere']]],
    [t('Ressourcen', 'Resources'), [[t('Newsroom', 'Newsroom'), '/newsroom'], [t('Kontakt', 'Contact'), '/kontakt']]],
  ]
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-muted">
              {t(
                'Europäische, nicht-letale Drohnenabwehr für den Schutz kritischer Infrastruktur.',
                'European, non-lethal counter-UAS defence for the protection of critical infrastructure.',
              )}
            </p>
          </div>
          {cols.map(([title, links]) => (
            <div key={title}>
              <div className="hud mb-4 text-faint">{title}</div>
              <ul className="space-y-2.5">
                {links.map(([label, to]) => (
                  <li key={to}>
                    <NavLink to={to} className="text-sm text-muted transition-colors hover:text-ink">
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="hud text-faint">© {new Date().getFullYear()} STRATOS · {t('MOCKUP-VORSCHAU', 'MOCKUP PREVIEW')}</p>
          <p className="hud text-faint">{t('MÜNCHEN · EUROPA', 'MUNICH · EUROPE')}</p>
        </div>
      </div>
    </footer>
  )
}

function useSmoothScroll() {
  const lenisRef = useRef(null)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    scroll.animate = !reduce
    product.animate = !reduce
    if (reduce) return
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])
  return lenisRef
}

export default function Layout() {
  const { t } = useT()
  const lenisRef = useSmoothScroll()
  const { pathname } = useLocation()

  // reset scroll + recompute pinned triggers on every route change
  useEffect(() => {
    const lenis = lenisRef.current
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    const id = requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()))
    return () => cancelAnimationFrame(id)
  }, [pathname, lenisRef])

  return (
    <>
      <a href="#inhalt" className="skip-link">{t('Zum Inhalt springen', 'Skip to content')}</a>
      <Nav />
      <main id="inhalt">
        <Outlet />
      </main>
      <Footer />
      <ThemePanel />
    </>
  )
}
