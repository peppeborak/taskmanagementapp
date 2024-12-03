import express from 'express'
import { signupHandler } from './handlers/signup-handler.js'
import { loginHandler } from './handlers/login-handler.js'
import { createListHandler } from './handlers/create-list.js'
const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Authenticate
app.post('/signup', signupHandler)
app.post('/login', loginHandler)

// Create list
app.post('/lists', createListHandler)


app.listen(PORT, () => {
  console.log('Server running on port:', PORT)
})
