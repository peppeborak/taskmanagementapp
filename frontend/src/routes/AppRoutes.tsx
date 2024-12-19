import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '../pages/Login'
import { Signup } from '../pages/Signup'
import { Notfound } from '../pages/Notfound'

export const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/*" element={<Notfound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
