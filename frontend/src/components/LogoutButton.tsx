import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const LogoutButton = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    console.log('Signing out')
    localStorage.removeItem('token')
    navigate('/') // Navigate to the loginscreen
  }

  return (
    <Button color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  )
}
