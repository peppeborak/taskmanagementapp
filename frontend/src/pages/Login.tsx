import { Container } from '@mui/material'
import { LoginCard } from '../components/LoginCard'

type Props = {
  isDarkMode: any
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const Login = ({isDarkMode, setIsDarkMode}: Props) => {

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
        <LoginCard isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </Container>
  )
}
