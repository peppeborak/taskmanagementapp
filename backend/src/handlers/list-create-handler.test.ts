import supertest from 'supertest'
import { app } from '../server'
import * as dbQueries from '../utils/db-queries'

jest.mock('../utils/db-queries', () => {
  return {
    listCreateDb: jest.fn().mockReturnValue(1),
  }
})

describe('POST api/v1/lists', () => {
  it('should return 201 and id of the created list', async () => {
    const response = await supertest(app)
      .post('/api/v1/lists')
      .send({ listName: 'test' })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      message: 'Successfully created list',
      list: { id: 1, userId: 1, name: 'test' },
    })
  })

  it('should return 400 if list name is empty', async () => {
    const response = await supertest(app)
      .post('/api/v1/lists')
      .send({ listName: '' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'List name is required' })
  })

  it('should return 400 if list name is missing', async () => {
    const response = await supertest(app).post('/api/v1/lists').send({})

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'List name is required' })
  })

  it('should return 400 if list name is whitespaces', async () => {
    const response = await supertest(app)
      .post('/api/v1/lists')
      .send({ listName: '     ' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'List name is required' })
  })

  it('should return 500 if database query fails', async () => {
    jest
      .spyOn(dbQueries, 'listCreateDb')
      .mockRejectedValue(new Error('DB error'))

      const response = await supertest(app)
      .post('/api/v1/lists')
      .send({ listName: 'test' })

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({ message: 'Internal Server Error' })
  })
})
