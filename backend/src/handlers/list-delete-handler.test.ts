import supertest from 'supertest'
import { app } from '../server'
import * as dbQueries from '../utils/db-queries'

jest.mock('../utils/db-queries', () => {
  return {
    listDeleteDb: jest.fn().mockReturnValue(1),
    listFetchOneDb: jest.fn().mockReturnValue({
      list: {
        id: 1,
        userId: 1,
        name: 'test',
        isDeleted: 0,
      },
    }),
  }
})


describe('DELETE api/v1/lists/id', () => {
  it('should return 200 if successful', async () => {
    const response = await supertest(app).delete('/api/v1/lists/1').send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ message: 'Successfully deleted list' })
  })

  it('should return 400 if list does not exist', async () => {
    jest
      .spyOn(dbQueries, 'listFetchOneDb')
      .mockReturnValueOnce(Promise.resolve([]))

    const response = await supertest(app).delete('/api/v1/lists/1').send()

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'List does not exist' })
  })

  it('should return 400 if failed to delete list', async () => {
    jest
      .spyOn(dbQueries, 'listDeleteDb')
      .mockReturnValueOnce(Promise.resolve(0))

    const response = await supertest(app).delete('/api/v1/lists/1').send()

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'Failed to delete list' })
  })

  it('should return 500 if database query fails', async () => {
    jest.spyOn(dbQueries, 'listFetchOneDb').mockRejectedValueOnce(new Error('DB error'))

    const response = await supertest(app)
      .delete('/api/v1/lists/1')
      .send()

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({ message: 'Internal Server Error' })
  })
})
