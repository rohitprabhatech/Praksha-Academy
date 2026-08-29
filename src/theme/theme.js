import { createTheme } from '@mui/material/styles'

// ─── Praksha Academy Design Tokens ───────────────────────────────────────────
// DO NOT change without team sign-off.
// Source: Global Color & Theme Requirements (Mandatory for All Frontend Developers)

export const colors = {
  primaryBlue: '#2563EB',
  primaryBlueHover: '#1D4ED8',
  secondaryOrange: '#F59E0B',
  secondaryOrangeHover: '#D97706',
  successGreen: '#22C55E',
  errorRed: '#EF4444',

  pageBackground: '#F8FAFC',
  cardBackground: '#FFFFFF',
  sectionBackground: '#F1F5F9',
  borderColor: '#E2E8F0',
  dividerColor: '#CBD5E1',

  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textLight: '#94A3B8',
  textWhite: '#FFFFFF',
}

export const spacing = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
}

// ─── Mode-aware theme factory ─────────────────────────────────────────────────
// Called by App.jsx as getTheme(mode) where mode is 'light' | 'dark'.
const getTheme = (mode = 'light') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: colors.primaryBlue,
        dark: colors.primaryBlueHover,
        contrastText: colors.textWhite,
      },
      secondary: {
        main: colors.secondaryOrange,
        dark: colors.secondaryOrangeHover,
        contrastText: colors.textWhite,
      },
      success: {
        main: colors.successGreen,
        contrastText: colors.textWhite,
      },
      error: {
        main: colors.errorRed,
        contrastText: colors.textWhite,
      },
      background: {
        default: mode === 'dark' ? '#0F172A' : colors.pageBackground,
        paper: mode === 'dark' ? '#1E293B' : colors.cardBackground,
      },
      text: {
        primary: mode === 'dark' ? '#F1F5F9' : colors.textPrimary,
        secondary: mode === 'dark' ? '#94A3B8' : colors.textSecondary,
      },
      divider: colors.dividerColor,
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
      h1: { fontFamily: "'Poppins', sans-serif", fontWeight: 700 },
      h2: { fontFamily: "'Poppins', sans-serif", fontWeight: 700 },
      h3: { fontFamily: "'Poppins', sans-serif", fontWeight: 600 },
      h4: { fontFamily: "'Poppins', sans-serif", fontWeight: 600 },
      h5: { fontFamily: "'Poppins', sans-serif", fontWeight: 600 },
      h6: { fontFamily: "'Poppins', sans-serif", fontWeight: 600 },
      button: { fontFamily: "'Poppins', sans-serif", fontWeight: 600, textTransform: 'none' },
    },
    shape: {
      borderRadius: 10, // within the mandated 8–12 px range
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: '10px 24px',
            transition: 'all 0.3s ease',
          },
          containedPrimary: {
            backgroundColor: colors.primaryBlue,
            '&:hover': { backgroundColor: colors.primaryBlueHover },
          },
          containedSecondary: {
            backgroundColor: colors.secondaryOrange,
            '&:hover': { backgroundColor: colors.secondaryOrangeHover },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow:
              mode === 'dark'
                ? '0 30px 60px rgba(0, 0, 0, 0.4)'
                : '0 30px 60px rgba(15, 23, 42, 0.08)',
          },
        },
      },
    },
  })

export default getTheme
