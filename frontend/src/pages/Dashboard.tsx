import { ThemeProvider } from '@emotion/react'
import { useState } from 'react'
import { darkTheme } from '../theme/theme'
import { CssBaseline, Typography } from '@mui/material'

export const Dashboard = () => {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Typography >
        Welcome to your Task Management App! 
      </Typography>
    </ThemeProvider>
  )
}
