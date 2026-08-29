/**
 * useTheme — hook wrapper around ThemeModeContext.
 * Import from here instead of importing ThemeModeContext directly.
 *
 * Usage:
 *   const { mode, toggleMode } = useTheme()
 */
export { useThemeMode as useTheme } from '../context/ThemeModeContext'
