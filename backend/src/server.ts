import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import { authenticateToken } from './middlewares/authenticate-token'
import { listCreateHandler } from './handlers/list-create-handler'
import { loginHandler } from './handlers/login-handler'
import { listFetchAllHandler } from './handlers/list-fetch-all-handler'
import { listFetchOneHandler } from './handlers/list-fetch-one-handler'
import { listUpdateHandler } from './handlers/list-update-handler'
import { listDeleteHandler } from './handlers/list-delete-handler'
import { taskCreateHandler } from './handlers/task-create-handler'
import { taskFetchAllHandler } from './handlers/task-fetch-all-handler'
import { taskFetchOneHandler } from './handlers/task-fetch-one-handler'
import { taskUpdateHandler } from './handlers/task-update-handler'
import { taskDeleteHandler } from './handlers/task-delete-handler'

dotenv.config()

export const app = express()

app.use(cors())
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
)

app.use(bodyParser.json())

// Auth routes

app.post('/api/v1/login', loginHandler)

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
