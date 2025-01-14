import supertest from 'supertest'
import { app } from '../server'
import * as dbQueries from '../utils/db-queries'

jest.mock('../utils/db-queries', () => {
  return {
    listFetchAllDb: jest.fn().mockReturnValue([
      {
        id: 1,
        userId: 1,
        name: 'Shopping list',
        isDeleted: 0,
      },
      {
        id: 2,
        userId: 1,
        name: 'Renovations',
        isDeleted: 0,
      },
    ]),
  }
})

describe('GET api/v1/lists', () => {
  it('should return 200 and an array with 2 lists', async () => {
    const response = await supertest(app).get('/api/v1/lists').send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      result: [
        {
          id: 1,
          userId: 1,
          name: 'Shopping list',
          isDeleted: 0,
        },
        {
          id: 2,
          userId: 1,
          name: 'Renovations',
          isDeleted: 0,
        },
      ],
    })
  })

  it('should return 500 if database query fails', async () => {
    jest
      .spyOn(dbQueries, 'listFetchAllDb')
      .mockRejectedValueOnce(new Error('DB error'))

    const response = await supertest(app).get('/api/v1/lists').send()

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({message: 'Internal Server Error'})
  })
})
