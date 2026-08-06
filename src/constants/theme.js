import { createTheme } from '@mui/material/styles'

const theme = createTheme({
 palette: {
  primary: {
   main: '#1d4ed8',
   contrastText: '#ffffff',
  },
  secondary: {
   main: '#f97316',
   contrastText: '#111827',
  },
  background: {
   default: '#f8fafc',
   paper: '#ffffff',
  },
  text: {
   primary: '#0f172a',
   secondary: '#475569',
  },
 },
 typography: {
  fontFamily: ['Inter', 'system-ui', 'sans-serif'].join(','),
  h1: {
   fontSize: '3rem',
   fontWeight: 700,
   letterSpacing: '-0.03em',
  },
  h2: {
   fontSize: '2rem',
   fontWeight: 700,
  },
  h3: {
   fontSize: '1.5rem',
   fontWeight: 600,
  },
  body1: {
   fontSize: '1rem',
   lineHeight: 1.7,
  },
  button: {
   fontSize: '1rem',
   textTransform: 'none',
   fontWeight: 800,
  },
 },
 shape: {
  borderRadius: 16,
 },
 spacing: 8,
 components: {
  MuiButton: {
   styleOverrides: {
    root: {
     borderRadius: 999,
     fontWeight: 800,
     padding: '1rem 2rem',
     minHeight: 46,
    },
   },
  },
  MuiCard: {
   styleOverrides: {
    root: {
     borderRadius: 24,
     boxShadow: '0 30px 60px rgba(15, 23, 42, 0.08)',
    },
   },
  },
 },
})

export default theme
