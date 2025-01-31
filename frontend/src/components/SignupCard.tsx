import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { loginPost, signupToApi } from '../services/api'
import { useNavigate } from 'react-router-dom'

export const SignupCard = () => {
  const [password, setPassword] = useState('')
  const [passwordVerify, setPasswordVerify] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleEmailChamge = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const handlePasswordVerifyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordVerify(event.target.value)
  }

  const handleSignupClick = async () => {
    try {
      // Check if password === passwordVerify
      if (password !== passwordVerify) {
        console.log('password does not match')
        // Add notification
        return
      }
      console.log('password matches')
      // Create account
      await signupToApi({ email, password })
      // Add notification
      // Login
      const loginResponse = await loginPost({ email, password })
      localStorage.setItem('token', loginResponse.token)
      // Redirect to dashboard
      navigate('/dashboard')
      return
    } catch (error: any) {
      console.log('Error:', error)
      throw error
    }
  }

  const handleRedirectClick = () => {
    navigate('/')
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
            Create account
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {/* Email */}
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              slotProps={{
                htmlInput: { autoComplete: 'off' },
              }}
              fullWidth
              value={email}
              onChange={handleEmailChamge}
            />
            {/* Password */}
            <TextField
              id="password"
              label="Password"
              type="password"
              slotProps={{
                htmlInput: { autoComplete: 'off' },
              }}
              variant="outlined"
              fullWidth
              value={password}
              onChange={handlePasswordChange}
            />
            <TextField
              id="passwordVerify"
              label="Verify password"
              type="password"
              slotProps={{
                htmlInput: { autoComplete: 'off' },
              }}
              variant="outlined"
              fullWidth
              value={passwordVerify}
              onChange={handlePasswordVerifyChange}
            />
          </Box>
        </CardContent>
        {/* Buttons */}
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSignupClick}
            disabled={
              !isEmailValid(email) ||
              password.length === 0 ||
              passwordVerify.length === 0
            }
          >
            Sign up
          </Button>
        </CardActions>
        <Box sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Typography
            align="center"
            sx={{
              '&:hover': {
                color: 'lightblue',
                cursor: 'pointer',
              },
            }}
            onClick={handleRedirectClick}
          >
            Already have an account?
          </Typography>
        </Box>
      </Card>
    </>
  )
}
