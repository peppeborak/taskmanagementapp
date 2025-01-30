import { Container } from '@mui/material'
import { SignupCard } from '../components/SignupCard'

export const Signup = () => {
  return (
    <Container
      maxWidth="sm" // Set container to small
      sx={{
        display: 'flex', // Use flexbox to layout the content inside the container
        justifyContent: 'center', // Center all the components inside
        alignItems: 'center', // Center all the items
        height: '100vh',
      }}
    >
      <SignupCard />
    </Container>
  )
}
