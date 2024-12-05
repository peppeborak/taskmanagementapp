import express from 'express'
import { signupHandler } from './handlers/signup-handler.js'
import { loginHandler } from './handlers/login-handler.js'
import { listFetchAllHandler } from './handlers/list-fetch-all-handler.js'
import { listCreateHandler } from './handlers/list-create-handler.js'
const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Authenticate
app.post('/signup', signupHandler)
app.post('/login', loginHandler)

// List endpoints
app.post('/lists', listCreateHandler)
app.get('/lists', listFetchAllHandler)

app.listen(PORT, () => {
  console.log('Server running on port:', PORT)
})
