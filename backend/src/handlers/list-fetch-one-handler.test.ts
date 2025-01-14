import supertest from 'supertest'
import { app } from '../server'
import * as dbQueries from '../utils/db-queries'

jest.mock('../utils/db-queries', () => {
  return {
    listFetchOneDb: jest.fn().mockReturnValue([
      {
        id: 1,
        userId: 1,
        name: 'Shopping list',
        isDeleted: 0,
      },
    ]),
  }
})

describe('GET api/v1/lists/1', () => {
  it('should return 200 and an array with 1 list', async () => {
    const response = await supertest(app).get('/api/v1/lists/1').send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      list: [
        {
          id: 1,
          userId: 1,
          name: 'Shopping list',
          isDeleted: 0,
        },
      ],
    })
  })

  it('should return 404 and list not found', async () => {
    jest
      .spyOn(dbQueries, 'listFetchOneDb')
      .mockReturnValueOnce(Promise.resolve([]))

    const response = await supertest(app).get('/api/v1/lists/1').send()

    expect(response.statusCode).toBe(404)
    expect(response.body).toEqual({ message: 'List not found' })
  })
})
