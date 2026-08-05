import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import theme from './constants/theme'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './index.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
