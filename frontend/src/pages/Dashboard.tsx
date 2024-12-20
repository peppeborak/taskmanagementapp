import { ThemeProvider } from '@emotion/react'
import { darkTheme } from '../theme/theme'
import { Box, CssBaseline, Paper, Typography } from '@mui/material'
import { ListsCollection } from '../components/ListsCollection'

export const Dashboard = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <Typography variant="h4" gutterBottom>
          Welcome to your Task Management App!
        </Typography>
      <Box maxWidth="400px" maxHeight="600px">
        <Paper elevation={3}>
          <Box>
            <ListsCollection />
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  )
}
