import { createContext, useContext, useEffect, useState } from 'react'

/**
 * Lightweight bilingual layer. Instead of key files, components call
 * t('Deutsch', 'English') inline. German is the primary language; English is
 * the secondary market language (NATO / investors / security firms).
 */
const Ctx = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('stratos-lang') || 'de')
  useEffect(() => {
    localStorage.setItem('stratos-lang', lang)
    document.documentElement.lang = lang
  }, [lang])
  const t = (de, en) => (lang === 'en' ? (en ?? de) : de)
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>
}

export function useT() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useT must be used within LanguageProvider')
  return c
}
