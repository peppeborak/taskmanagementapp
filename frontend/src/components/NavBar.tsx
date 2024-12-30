import { Box, Toolbar, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import MenuDrawer from './MenuDrawer'
import { LogoutButton } from './LogoutButton'

export const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 'row' }}>
      <AppBar position="static">
        <Toolbar>
          <MenuDrawer />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Management App
          </Typography>
          <LogoutButton />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
