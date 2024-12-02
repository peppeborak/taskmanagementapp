import express from 'express'
import { signupHandler } from './handlers/signup-handler.js'
import { loginHandler } from './handlers/login-handler.js'
const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/signup', signupHandler)
app.post('/login', loginHandler)

app.listen(PORT, () => {
  console.log('Server running on port:', PORT)
})
