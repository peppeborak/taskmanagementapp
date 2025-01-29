import supertest from 'supertest'
import { app } from '../server'
import * as dbQueries from '../utils/db-queries'

jest.mock('../utils/db-queries', () => {
  return {
    taskFetchOneDb: jest.fn().mockReturnValue([
      {
        id: 1,
        userId: 1,
        listId: 1,
        title: 'test',
        description: null,
        dueDate: null,
        isDeleted: 0,
        isCompleted: 0,
      },
    ]),
  }
})

describe('GET api/v1/task/1', () => {
  it('should return 200 and return the task', async () => {
    const response = await supertest(app).get('/api/v1/tasks/1').send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      task: [
        {
          description: null,
          dueDate: null,
          id: 1,
          isCompleted: 0,
          isDeleted: 0,
          listId: 1,
          title: 'test',
          userId: 1,
        },
      ],
    })
  })
  it('should return 400 if taskId is not a number', async () => {
    const response = await supertest(app).get('/api/v1/tasks/abc').send()

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'Invalid task id' })
  })
  it('should return 400 if taskId is negative', async () => {
    const response = await supertest(app).get('/api/v1/tasks/-1').send()

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'Invalid task id' })
  })
  it('should return 404 if task is not found', async () => {
    jest
      .spyOn(dbQueries, 'taskFetchOneDb')
      .mockReturnValueOnce(Promise.resolve([]))
    const response = await supertest(app).get('/api/v1/tasks/1')

    expect(response.statusCode).toBe(404)
    expect(response.body).toEqual({ message: 'Task not found' })
  })
  it('should return 500 if db query fails', async () => {
    jest
      .spyOn(dbQueries, 'taskFetchOneDb')
      .mockRejectedValueOnce(new Error('DB Error'))
    const response = await supertest(app).get('/api/v1/tasks/1').send()

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({ message: 'Internal Server Error' })
  })
})
