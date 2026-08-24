import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AppRoutes from './routes/AppRoutes'
import getTheme from './constants/theme'
import { ThemeModeProvider, useThemeMode } from './context/ThemeModeContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
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
      {/* Sprint 01: this was missing entirely — every toast.success/
          toast.error call across the app (Login, Register, Admin logout,
          Blog/Gallery/FAQ/Testimonials/Notifications CRUD, student pages —
          21 files call toast()) was previously firing with nothing mounted
          to render it. */}
      <ToastContainer position="top-right" autoClose={3500} newestOnTop />
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