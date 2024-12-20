import { ThemeProvider } from '@emotion/react'
import { darkTheme } from '../theme/theme'
import { Container, CssBaseline, Typography } from '@mui/material'
import { ListsCollection } from '../components/ListsCollection'

export const Dashboard = () => {



  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container >
      <Typography >
        Welcome to your Task Management App! 
      </Typography>

      <ListsCollection />

      </Container>


    </ThemeProvider>
  )
}
