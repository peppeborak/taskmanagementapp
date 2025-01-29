import { app } from '../server'
import supertest from 'supertest'
import * as dbQueries from '../utils/db-queries'

jest.mock('../utils/db-queries', () => {
  return {
    taskFetchAllDb: jest.fn().mockReturnValue([
      {
        id: 1,
        userId: 1,
        listId: 1,
        title: 'test1',
        description: null,
        dueDate: null,
        isDeleted: 0,
        isCompleted: 0,
      },
      {
        id: 2,
        userId: 1,
        listId: 1,
        title: 'test2',
        description: null,
        dueDate: null,
        isDeleted: 0,
        isCompleted: 0,
      },
    ]),
  }
})

describe('GET api/v1/tasks', () => {
  it('should return 200 and all tasks', async () => {
    const response = await supertest(app).get('/api/v1/tasks').send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      result: [
        {
          id: 1,
          userId: 1,
          listId: 1,
          title: 'test1',
          description: null,
          dueDate: null,
          isDeleted: 0,
          isCompleted: 0,
        },
        {
          id: 2,
          userId: 1,
          listId: 1,
          title: 'test2',
          description: null,
          dueDate: null,
          isDeleted: 0,
          isCompleted: 0,
        },
      ],
    })
  })
  it('should return 500 if DB query fails', async () => {
    jest
      .spyOn(dbQueries, 'taskFetchAllDb')
      .mockRejectedValueOnce(new Error('DB Error'))

    const response = await supertest(app).get('/api/v1/tasks')

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({ message: 'Internal Server Error' })
  })
})
