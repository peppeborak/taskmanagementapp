import express from 'express'
import { signupHandler } from './handlers/signup-handler.js'
import { loginHandler } from './handlers/login-handler.js'
import { listFetchAllHandler } from './handlers/list-fetch-all-handler.js'
import { listCreateHandler } from './handlers/list-create-handler.js'
import { listFetchOneHandler } from './handlers/list-fetch-one-handler.js'
import { listDeleteHandler } from './handlers/list-delete-handler.js'
import { listUpdateHandler } from './handlers/list-update-handler.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

app.use(express.json())

// Authenticate
app.post('/signup', signupHandler)
app.post('/login', loginHandler)

// List endpoints
app.post('/lists', listCreateHandler)
app.get('/lists', listFetchAllHandler)
app.get('/lists/:id', listFetchOneHandler)
app.delete('/lists/:id', listDeleteHandler)
app.put('/lists/:id', listUpdateHandler)

app.listen(process.env.PORT, () => {
  console.log('Server running on port:', process.env.PORT)
})
