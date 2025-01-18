import supertest from 'supertest'
import { app } from '../server'
import * as dbQueries from '../utils/db-queries'

jest.mock('../utils/db-queries', () => {
  return {
    listUpdateDb: jest.fn().mockReturnValue(1),
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

describe('PUT api/v1/lists/id', () => {
  it('should return 200 and new list name', async () => {
    const response = await supertest(app).put('/api/v1/lists/1').send({
      newListName: 'test',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      message: 'List updated successfully',
      updatedName: 'test',
    })
  })

  it('should return 400 if empty string', async () => {
    const response = await supertest(app).put('/api/v1/lists/1').send({
      newListName: '',
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'List name is required' })
  })

  it('should return 400 if white spaces', async () => {
    const response = await supertest(app).put('/api/v1/lists/1').send({
      newListName: '     ',
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'List name is required' })
  })

  it('should return 400 if newListName is missing', async () => {
    const response = await supertest(app).put('/api/v1/lists/1').send({})

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'List name is required' })
  })

  it('should return 404 if the list ID does not exist', async () => {
    jest.spyOn(dbQueries, 'listFetchOneDb').mockResolvedValueOnce([])

    const response = await supertest(app).put('/api/v1/lists/999').send({
      newListName: 'test',
    })

    expect(response.statusCode).toBe(404)
    expect(response.body).toEqual({ message: 'List not found' })
  })

  it('should return 500 if database query fails', async () => {
    jest
      .spyOn(dbQueries, 'listUpdateDb')
      .mockRejectedValueOnce(new Error('DB Error'))

    const response = await supertest(app).put('/api/v1/lists/1').send({
      newListName: 'test',
    })

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({ message: 'Internal Server Error' })
  })
})
