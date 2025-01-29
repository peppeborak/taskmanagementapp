import supertest from 'supertest'
import { app } from '../server'
import * as dbQueries from '../utils/db-queries'

jest.mock('../utils/db-queries', () => {
  return {
    taskCreateDb: jest.fn().mockReturnValue(1),
  }
})

describe('POST api/v1/tasks', () => {
  it('should return 200 and return userId, taskId, taskTitle', async () => {
    const response = await supertest(app)
      .post('/api/v1/tasks')
      .send({ listId: 1, taskTitle: 'test', taskDescription: null })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      message: 'Successfully created task',
      task: { userId: 1, taskId: 1, name: 'test' },
    })
  })
  it('should return 400 if taskTitle is missing', async () => {
    const response = await supertest(app)
      .post('/api/v1/tasks')
      .send({ listId: 1, taskDescription: null })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'Task title is required' })
  })
  it('should return 400 if taskTitle is empty', async () => {
    const response = await supertest(app)
      .post('/api/v1/tasks')
      .send({ listId: 1, taskTitle: '', taskDescription: null })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'Task title is required' })
  })
  it('should return 400 if taskTitle is whitespaces', async () => {
    const response = await supertest(app)
      .post('/api/v1/tasks')
      .send({ listId: 1, taskTitle: '     ', taskDescription: null })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'Task title is required' })
  })
  
  it('should return 500 if DB query fails', async () => {
    jest
      .spyOn(dbQueries, 'taskCreateDb')
      .mockRejectedValueOnce(new Error('DB Error'))
    const response = await supertest(app)
      .post('/api/v1/tasks')
      .send({ listId: 1, taskTitle: 'test', taskDescription: null })

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({ message: 'Internal Server Error' })
  })
})
