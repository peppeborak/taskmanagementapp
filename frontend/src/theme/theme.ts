import { createTheme } from '@mui/material/styles'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Primary color (blue)
    },
    secondary: {
      main: '#ff4081', // Secondary color (pink)
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h5: {
      fontWeight: 700, // Custom style for h5 headings
    },
  },
  spacing: 4, // Global spacing scale for padding/margin
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1e1e1e', // Dark background (a softer black)
      paper: '#292929', // Lighter dark for cards and surfaces
    },
    text: {
      primary: '#e0e0e0', // Lighter text for better contrast on dark backgrounds
      secondary: '#a0a0a0', // Slightly less emphasized secondary text
    },
    primary: {
      main: '#e3f2fd', // Primary accent color (ChatGPT greenish)
    },
    secondary: {
      main: '#f44336', // Secondary accent color (red for highlights or buttons)
    },
  },
  spacing: 4, // Global spacing scale for padding/margin
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})

export { lightTheme, darkTheme }

export default { lightTheme, darkTheme }
