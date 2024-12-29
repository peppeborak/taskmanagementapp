import { Container, ThemeProvider } from '@mui/material'
import { lightTheme, darkTheme } from '../theme/theme' // Import both themes
import { useState } from 'react'
import { LoginCard } from '../components/LoginCard'

export const Login = () => {
  const [isDarkMode, setIsDarkMode] = useState(true) // State to toggle themes

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Container
        maxWidth="sm" // Set container to small
        sx={{
          display: 'flex', // Use flexbox to layout the content inside the container
          justifyContent: 'center', // Center all the components inside
          alignItems: 'center', // Center all the items
          height: '100vh',
        }}
      >
        <LoginCard setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
      </Container>
    </ThemeProvider>
  )
}
