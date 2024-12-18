import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Container,
  Box,
} from '@mui/material'

export const Login = () => {
  return (
    <Container
      maxWidth="sm" // Set container to small
      sx={{
        display: 'flex', // Use flexbox to layout the content inside the container
        justifyContent: 'center', // Center all the components inside
        alignItems: 'center', // Center all the items
        height: '100vh', // Limit height to 100px
      }}
    >
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
              fullWidth /* Make the TextField take up the full width of the parent container (Box) */
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              fullWidth
            />
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" size="large">
            Login
          </Button>
        </CardActions>
      </Card>
    </Container>
  )
}
