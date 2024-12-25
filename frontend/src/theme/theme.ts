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
    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#EEE4E1', // Custom hover background
            transition: 'all 0.3s ease', // Smooth transition
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
    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#1976d2', // Custom hover background
            transition: 'all 0.3s ease', // Smooth transition
          },
        },
      },
    },
  },
})

export { lightTheme, darkTheme }

export default { lightTheme, darkTheme }
