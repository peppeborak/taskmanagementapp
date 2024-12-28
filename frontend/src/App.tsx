import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Notfound } from './pages/Notfound'
import { Dashboard } from './pages/Dashboard'
import ProtectedRoutes from './utils/ProtectedRoutes'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme } from './theme/theme'

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/*" element={<Notfound />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
