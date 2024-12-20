import express from 'express'
import cors from 'cors'
import { signupHandler } from './handlers/signup-handler.js'
import { loginHandler } from './handlers/login-handler.js'
import { listFetchAllHandler } from './handlers/list-fetch-all-handler.js'
import { listCreateHandler } from './handlers/list-create-handler.js'
import { listFetchOneHandler } from './handlers/list-fetch-one-handler.js'
import { listDeleteHandler } from './handlers/list-delete-handler.js'
import { listUpdateHandler } from './handlers/list-update-handler.js'
import { authenticateToken } from './middlewares/authenticate-token.js'
import { taskCreateHandler } from './handlers/task-create-handler.js'
import { taskFetchAllHandler } from './handlers/task-fetch-all-handler.js'
import { taskFetchOneHandler } from './handlers/task-fetch-one-handler.js'
import { taskUpdateHandler } from './handlers/task-update-handler.js'
import { taskDeleteHandler } from './handlers/task-delete-handler.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

// Authentication
app.post('/api/v1/signup', signupHandler)
app.post('/api/v1/login', loginHandler)

// Secure endpoints

// List endpoints
app.post('/api/v1/lists', authenticateToken, listCreateHandler)
app.get('/api/v1/lists', authenticateToken, listFetchAllHandler)
app.get('/api/v1/lists/:id', authenticateToken, listFetchOneHandler)
app.put('/api/v1/lists/:id', authenticateToken, listUpdateHandler)
app.delete('/api/v1/lists/:id', authenticateToken, listDeleteHandler)

// Task endpoints
app.post('/api/v1/tasks', authenticateToken, taskCreateHandler)
app.get('/api/v1/tasks', authenticateToken, taskFetchAllHandler)
app.get('/api/v1/tasks/:id', authenticateToken, taskFetchOneHandler)
app.put('/api/v1/tasks/:id', authenticateToken, taskUpdateHandler)
app.delete('/api/v1/tasks/:id', authenticateToken, taskDeleteHandler)

// Server
app.listen(process.env.PORT, () => {
  console.log('Server running on port:', process.env.PORT)
})
