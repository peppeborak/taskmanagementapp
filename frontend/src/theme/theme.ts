import { createTheme } from '@mui/material/styles'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#B2967D', // Darker background (brown)
      paper: '#E7D8C9', // Slightly lighter for cards (beige)
    },
    divider: '#000000', // Black for borders and dividers
    text: {
      primary: '#000000', // black text
      secondary: 'rgba(0, 0, 0, 0.7)', // Muted text (black)
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '.hover-box': {
          backgroundColor: 'rgba(0,0,0,0.05)',
          borderRadius: '4px',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.1)', // Hover effect NEED TO change colors
          },
        },
      },
    },
  },
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212', // Dark background
      paper: '#1e1e1e', // Slightly lighter for cards
    },
    divider: 'rgba(255, 255, 255, 0.12)', // Subtle gray for borders and dividers
    text: {
      primary: '#ffffff', // Bright white text
      secondary: 'rgba(255, 255, 255, 0.7)', // Muted text
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '.hover-box': {
          backgroundColor: 'rgba(0,0,0,0.05)',
          borderRadius: '4px',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.3)', // Hover effect
          },
        },
      },
    },
  },
})

export { lightTheme, darkTheme }

export default { lightTheme, darkTheme }
