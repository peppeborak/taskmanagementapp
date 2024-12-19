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

type Props = {
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
  isDarkMode: boolean
}

export const LoginCard = ({ setIsDarkMode, isDarkMode }: Props) => {
  const [password, setPassword] = useState('') // Store user entered password
  const [email, setEmail] = useState('') // Store user entered password


  // Handle Login button
  const handleLoginButtonOnClick = () => {
    console.log('Email submitted:', email)

    console.log('Password submitted:', password)
  }

  // Handle password onChange
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
          width: '100%', // Let the card fill the entire available width
          maxWidth: 400, // Set a maximum width of 400px for the card, so it doesn't stretch too wide
          padding: 2, // Add padding inside the card to create space around the content
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Login
          </Typography>

          <Box
            sx={{
              display: 'flex', // Use flexbox to layout the content inside the Box
              flexDirection: 'column', // Stack the items vertically (column direction)
              gap: 2, // Add a gap between the elements inside the Box (TextFields)
            }}
          >
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleEmailTextfieldChange}
              fullWidth /* Make the TextField take up the full width of the parent container (Box) */
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password} // Bind the value of the input to the password state so that they are always in sync
              onChange={handlePasswordTextfieldChange} // Call function on change (When typing)
              autoComplete="current-password"
              variant="outlined"
              fullWidth
            />
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleLoginButtonOnClick} // Call function on click
            disabled={password.length === 0} // Disable button if no password is typed
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