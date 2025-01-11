import supertest from 'supertest'
import { app } from '../server'

jest.mock('../utils/db-queries', () => {
  return {
    listCreateDb: jest.fn().mockReturnValue(1),
  }
})

describe('POST api/v1/lists', () => {
  it('Should return 201 and id of created list', async () => {
    const response = await supertest(app)
      .post('/api/v1/lists')
      .send({ listName: 'test' })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      message: 'Successfully created list',
      list: { id: 1, userId: 1, name: 'test' },
    })
  })

  it('Should return 400 and list name is required', async () => {
    const response = await supertest(app)
      .post('/api/v1/lists')
      .send({ listName: '' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'List name is required' })
  })

  it('Should return 400 if listName is missing', async () => {
    const response = await supertest(app).post('/api/v1/lists').send({})

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'List name is required' })
  })
})
