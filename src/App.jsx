import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import getTheme from './constants/theme'
import { ThemeModeProvider, useThemeMode } from './context/ThemeModeContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './index.css'

function ThemedApp() {
  const { mode } = useThemeMode()
  const theme = getTheme(mode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

function App() {
  return (
    <ThemeModeProvider>
      <ThemedApp />
    </ThemeModeProvider>
  )
}

export default App