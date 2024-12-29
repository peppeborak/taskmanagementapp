import { Box, IconButton, Toolbar, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'

import MenuIcon from '@mui/icons-material/Menu'
import { LogoutButton } from './LogoutButton'

export const NavBar = () => {
  return (
    <Box 
    sx={{ flexGrow: 'row' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Management App
          </Typography>
          <LogoutButton/>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
