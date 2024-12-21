import { ThemeProvider } from '@emotion/react'
import { darkTheme } from '../theme/theme'
import { Box, CssBaseline, Paper, Typography } from '@mui/material'
import { SideBarList } from '../components/SideBarList'

export const Dashboard = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      
      <SideBarList />
    </ThemeProvider>
  )
}
