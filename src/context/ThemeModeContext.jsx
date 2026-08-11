import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeModeContext = createContext(null)

const STORAGE_KEY = 'praksha-theme-mode'
const THEME_MODES = new Set(['light', 'dark'])

export function ThemeModeProvider({ children }) {
 const [mode, setMode] = useState(() => {
  if (typeof window === 'undefined') return 'light'
  const savedMode = localStorage.getItem(STORAGE_KEY)
  return THEME_MODES.has(savedMode) ? savedMode : 'light'
 })

 useEffect(() => {
  document.documentElement.setAttribute('data-theme', mode)
  localStorage.setItem(STORAGE_KEY, mode)
 }, [mode])

 const value = useMemo(
  () => ({
   mode,
   toggleMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
  }),
  [mode]
 )

 return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>
}

export function useThemeMode() {
 const ctx = useContext(ThemeModeContext)
 if (!ctx) throw new Error('useThemeMode must be used within ThemeModeProvider')
 return ctx
}
