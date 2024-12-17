import express from 'express'
import { signupHandler } from './handlers/signup-handler.js'
import { loginHandler } from './handlers/login-handler.js'
import { listFetchAllHandler } from './handlers/list-fetch-all-handler.js'
import { listCreateHandler } from './handlers/list-create-handler.js'
import { listFetchOneHandler } from './handlers/list-fetch-one-handler.js'
import { listDeleteHandler } from './handlers/list-delete-handler.js'
import { listUpdateHandler } from './handlers/list-update-handler.js'
import dotenv from 'dotenv'
import { authenticateToken } from './middlewares/authenticate-token.js'
import { taskCreateHandler } from './handlers/task-create-handler.js'
import { taskFetchAllHandler } from './handlers/task-fetch-all-handler.js'
import { taskFetchOneHandler } from './handlers/task-fetch-one-handler.js'
import { taskUpdateHandler } from './handlers/task-update-handler.js'
dotenv.config()
const app = express()

app.use(express.json())

// Authentication
app.post('/signup', signupHandler)
app.post('/login', loginHandler)

// Secure list endpoints

// List endpoints
app.post('/lists', authenticateToken, listCreateHandler)
app.get('/lists', authenticateToken, listFetchAllHandler)
app.get('/lists/:id', authenticateToken, listFetchOneHandler)
app.put('/lists/:id', authenticateToken, listUpdateHandler)
app.delete('/lists/:id', authenticateToken, listDeleteHandler)

// Task endpoints
app.post('/tasks', authenticateToken, taskCreateHandler)
app.get('/tasks', authenticateToken, taskFetchAllHandler)
app.get('/tasks/:id', authenticateToken, taskFetchOneHandler)
app.put('/tasks/:id', authenticateToken, taskUpdateHandler)



// Server
app.listen(process.env.PORT, () => {
  console.log('Server running on port:', process.env.PORT)
})
