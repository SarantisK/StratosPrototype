import { useState } from 'react'
import { useT } from '../i18n.jsx'
import { PageHeader, useReveal } from '../components/ui.jsx'

export default function Contact() {
  const { t } = useT()
  const ref = useReveal()
  const [subject, setSubject] = useState('sales')
  const [sent, setSent] = useState(false)

  const OPTIONS = [
    ['sales', t('Beschaffung / Sales', 'Procurement / sales'), t('Sie evaluieren Stratos für Beschaffung oder Schutzbedarf.', 'You are evaluating Stratos for procurement or protection needs.')],
    ['demo', t('Demo anfragen', 'Request a demo'), t('Sie möchten das System und den Ansatz im Detail sehen.', 'You want to see the system and approach in detail.')],
    ['partner', t('Partnerschaft', 'Partner with us'), t('Sensorik-, Integrations- oder Industriepartnerschaft.', 'Sensor, integration or industry partnership.')],
    ['careers', t('Karriere', 'Careers'), t('Sie wollen am Counter-UAS-Layer mitbauen.', 'You want to help build the counter-UAS layer.')],
  ]

  const FIELDS = [
    ['name', t('Name', 'Name'), 'text', 'name', t('Vor- und Nachname …', 'Full name …')],
    ['organization', t('Organisation', 'Organisation'), 'text', 'organization', t('Behörde, Unternehmen oder Einheit …', 'Authority, company or unit …')],
    ['email', t('E-Mail', 'Email'), 'email', 'email', 'name@organisation.eu'],
  ]

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow={t('Kontakt', 'Contact')}
        title={t('Sprechen Sie mit dem Team.', 'Talk to the team.')}
        lead={t(
          'Für Beschaffungsstellen, Betreiber kritischer Infrastruktur, Partner und Investoren. Wählen Sie Ihr Anliegen — wir melden uns vertraulich zurück.',
          'For procurement bodies, operators of critical infrastructure, partners and investors. Choose your topic — we reply confidentially.',
        )}
      />

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_1fr]">
          {/* differentiated entry points */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {OPTIONS.map(([id, label, desc]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSubject(id)}
                  aria-pressed={subject === id}
                  className={`reveal rounded-xl border p-6 text-left transition-colors ${
                    subject === id ? 'border-cyan/60 bg-cyan/[0.06]' : 'border-line bg-raised hover:border-cyan/40'
                  }`}
                >
                  <div className={`hud mb-3 ${subject === id ? 'text-cyan' : 'text-faint'}`}>{subject === id ? '● ' : ''}{label}</div>
                  <p className="text-pretty text-sm leading-relaxed text-muted">{desc}</p>
                </button>
              ))}
            </div>
            <div className="mt-8 space-y-3">
              <a href="mailto:kontakt@stratos.eu" className="hud block text-cyan hover:text-ink">KONTAKT@STRATOS.EU</a>
              <p className="hud text-muted">{t('MÜNCHEN · EUROPA', 'MUNICH · EUROPE')}</p>
            </div>
          </div>

          {/* form */}
          <form className="reveal glass h-fit rounded-xl p-7" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
            <div aria-live="polite">
              {sent ? (
                <div className="flex min-h-72 flex-col items-start justify-center">
                  <div className="hud mb-3 text-nominal">● {t('EINGEGANGEN', 'RECEIVED')}</div>
                  <p className="display text-2xl text-ink">{t('Danke. Wir melden uns.', 'Thank you. We’ll be in touch.')}</p>
                  <p className="mt-2 text-muted">{t('Ihre Anfrage wurde erfasst (Demo-Mockup).', 'Your request was recorded (demo mockup).')}</p>
                </div>
              ) : (
                <div className="space-y-5">
                  <label htmlFor="f-subject" className="block">
                    <span className="hud mb-2 block text-muted">{t('Anliegen', 'Topic')}</span>
                    <select id="f-subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full rounded-md border border-line bg-base px-4 py-3 text-ink focus:border-cyan">
                      {OPTIONS.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
                    </select>
                  </label>
                  {FIELDS.map(([name, label, type, ac, ph]) => (
                    <label key={name} htmlFor={`f-${name}`} className="block">
                      <span className="hud mb-2 block text-muted">{label}</span>
                      <input id={`f-${name}`} name={name} required type={type} autoComplete={ac} inputMode={type === 'email' ? 'email' : 'text'} spellCheck={type === 'email' ? false : undefined} placeholder={ph} className="w-full rounded-md border border-line bg-base px-4 py-3 text-ink placeholder:text-faint focus:border-cyan" />
                    </label>
                  ))}
                  <label htmlFor="f-msg" className="block">
                    <span className="hud mb-2 block text-muted">{t('Nachricht', 'Message')}</span>
                    <textarea id="f-msg" name="message" rows={3} placeholder={t('Ihr Anliegen in Stichworten …', 'Your request in brief …')} className="w-full resize-none rounded-md border border-line bg-base px-4 py-3 text-ink placeholder:text-faint focus:border-cyan" />
                  </label>
                  <button type="submit" className="w-full touch-manipulation rounded-md bg-cyan px-6 py-3 font-semibold text-base transition-colors hover:bg-cyan-deep">
                    {t('Anfrage senden', 'Send request')}
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
