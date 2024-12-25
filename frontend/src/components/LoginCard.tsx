import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Box,
} from '@mui/material'
import { useState } from 'react'
import { loginPost } from '../services/api.ts'
import { useNavigate } from 'react-router-dom'

type Props = {
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
  isDarkMode: boolean
}

export const LoginCard = ({ setIsDarkMode, isDarkMode }: Props) => {
  const [password, setPassword] = useState('') // Store user entered password
  const [email, setEmail] = useState('') // Store user entered password
  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const navigate = useNavigate()

  // Handle Login request
  const handleLoginButtonOnClick = async () => {
    try {
      const data = await loginPost({ email, password })
      localStorage.setItem('token', data.token) // Save token in local storage
      console.log('Login successful')
      navigate('/dashboard') // Navigate to their dashboard when login is successful
    } catch (error: any) {
      console.log('Error:', error)
      throw error
    }
  }

  // Handle email onChange
  const handleEmailTextfieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value) // Update email variable with value from inputfield
  }

  // Handle password onChange
  const handlePasswordTextfieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value) // Update password variable with value from inputfield
  }

  return (
    <>
      <Card
        sx={{
          width: '100%',
          maxWidth: 400,
          padding: 2,
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Login
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {/* Email textfield */}
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleEmailTextfieldChange}
              slotProps={{
                htmlInput: { autoComplete: 'off' },
              }}
              fullWidth /* Make the TextField take up the full width of the parent container (Box) */
            />
            {/* Password textfield */}
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password} // Bind the value of the input to the password state so that they are always in sync
              onChange={handlePasswordTextfieldChange} // Call function on change (When typing)
              slotProps={{
                htmlInput: { autoComplete: 'off' },
              }}
              variant="outlined"
              fullWidth
            />
          </Box>
        </CardContent>
        {/* Buttons */}
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleLoginButtonOnClick}
            disabled={!isEmailValid(email) || password.length === 0} // Disable button if email is not valid or password textfield is empty
          >
            Login
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            Toggle Dark Mode
          </Button>
        </CardActions>
      </Card>
    </>
  )
}
