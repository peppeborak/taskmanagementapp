import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './routes/Login'
import { Signup } from './routes/Signup'
import { Notfound } from './routes/Notfound'



function App() {

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

export default App
