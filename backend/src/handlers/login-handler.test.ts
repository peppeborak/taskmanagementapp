import supertest from 'supertest'
import { app } from '../server'
import bcrypt from 'bcrypt'
import * as dbQueries from '../utils/db-queries'

jest.mock('../utils/db-queries', () => {
  return {
    getUserDb: jest
      .fn()
      .mockReturnValue({ email: 'test@test.com', passwordHash: 'test' }),
  }
})

jest.mock('bcrypt')
const mockBcrypt = jest.mocked(bcrypt)
const hashSpy = jest
  .spyOn(mockBcrypt, 'hash')
  .mockResolvedValue('hashedpassword')
const compareSpy = jest.spyOn(mockBcrypt, 'compare').mockReturnValue(true)

describe('POST /api/v1/login', () => {
  it('should return 200 and successful login', async () => {
    const response = await supertest(app)
      .post('/api/v1/login')
      .send({ email: 'test@test.com', password: 'test123' })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      email: 'test@test.com',
      message: 'Login successful!',
      token: expect.any(String),
    })
  })

  it('should return 404 and user not found', async () => {
    jest
      .spyOn(dbQueries, 'getUserDb')
      .mockReturnValueOnce(Promise.resolve(undefined as any))

    const response = await supertest(app)
      .post('/api/v1/login')
      .send({ email: 'test@test.com', password: 'test' })

    expect(response.statusCode).toBe(404)
  })

  it('should return 401 and incorrect password', async () => {
    compareSpy.mockReturnValueOnce(false)
    const response = await supertest(app)
      .post('/api/v1/login')
      .send({ email: 'test@test.com', password: 'test' })

    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({ message: 'Invalid password' })
  })
})
