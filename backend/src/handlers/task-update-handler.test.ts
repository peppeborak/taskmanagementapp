import supertest from 'supertest'
import { app } from '../server'
import * as dbQueries from '../utils/db-queries'

jest.mock('../utils/db-queries', () => {
  return { taskUpdateDb: jest.fn().mockReturnValue(1) }
})

describe('PUT api/v1/tasks/id', () => {
  it('should return 200 and the new title', async () => {
    const response = await supertest(app)
      .put('/api/v1/tasks/1')
      .send({ newTaskTitle: 'test' })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      message: 'List updated successfully',
      updatedName: 'test',
    })
  })
  it('should return 400 if newTaskTitle is missing', async () => {
    const response = await supertest(app).put('/api/v1/tasks/1').send({})

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'Task title is required' })
  })
  it('should return 400 if newTaskTitle is empty', async () => {
    const response = await supertest(app)
      .put('/api/v1/tasks/1')
      .send({ newTaskTitle: '' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'Task title is required' })
  })
  it('should return 400 if newTaskTitle is whitespaces', async () => {
    const response = await supertest(app)
      .put('/api/v1/tasks/1')
      .send({ newTaskTitle: '     ' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'Task title is required' })
  })
  it('should return 500 if DB query fails', async () => {
    jest
      .spyOn(dbQueries, 'taskUpdateDb')
      .mockRejectedValueOnce(new Error('DB Error'))

    const response = await supertest(app)
      .put('/api/v1/tasks/1')
      .send({ newTaskTitle: 'test' })

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({ message: 'Internal Server Error' })
  })
})
