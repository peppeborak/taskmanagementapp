import { Container } from '@mui/material'
import { LoginCard } from '../components/LoginCard'


type Props = {
  isDarkMode: any
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const Login = ({ isDarkMode, setIsDarkMode }: Props) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <LoginCard isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </Container>
  )
}
