import supertest from 'supertest'
import { app } from '../server'
import bcrypt from 'bcrypt'
import * as dbQueries from '../utils/db-queries'


// Mock getUserDb
jest.mock('../utils/db-queries', () => {
  return {
    getUserDb: jest
      .fn()
      .mockReturnValue({ email: 'test@test.com', passwordHash: 'test' }),
  }
})

// Mock bcrypt
jest.mock('bcrypt')
const mockBcrypt = jest.mocked(bcrypt)
const hashSpy = jest
  .spyOn(mockBcrypt, 'hash')
  .mockResolvedValue('hashedpassword')
const compareSpy = jest.spyOn(mockBcrypt, 'compare').mockReturnValue(true)

describe('POST /api/v1/login', () => {
  it('should return 200 and a valid token if successful login', async () => {
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

  it('should return 400 and Email is required if email is empty', async () => {
    const response = await supertest(app)
      .post('/api/v1/login')
      .send({ email: '', password: 'test' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      message: 'Email is required',
    })
  })

  it('should return 400 and Email is required if email is whitespace only', async () => {
    const response = await supertest(app)
      .post('/api/v1/login')
      .send({ email: '     ', password: 'test' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      message: 'Email is required',
    })
  })

  it('should return 400 and Password is required if password is whitespace only', async () => {
    const response = await supertest(app)
      .post('/api/v1/login')
      .send({ email: 'test@test.com', password: '     ' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      message: 'Password is required',
    })
  })

  it('should return 400 and Password is required if password is empty', async () => {
    const response = await supertest(app)
      .post('/api/v1/login')
      .send({ email: 'test@test.com', password: '' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      message: 'Password is required',
    })
  })

  it('should return 400 if invalid email format', async () => {
    const response = await supertest(app)
      .post('/api/v1/login')
      .send({ email: 'test', password: 'test' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'Invalid email format' })
  })

  it('should return 401 and Invalid email or password if wrong password', async () => {
    compareSpy.mockReturnValueOnce(false)
    const response = await supertest(app)
      .post('/api/v1/login')
      .send({ email: 'test@test.com', password: 'test' })

    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({ message: 'Invalid email or password' })
  })

  it('should return 401 and Invalid email or password if user does not exist', async () => {
    jest
      .spyOn(dbQueries, 'getUserDb')
      .mockReturnValueOnce(Promise.resolve(undefined as any))

    const response = await supertest(app)
      .post('/api/v1/login')
      .send({ email: 'test@test.com', password: 'test' })

    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({ message: 'Invalid email or password' })
  })

  it('should return 500 if database query fails', async () => {
    jest.spyOn(dbQueries, 'getUserDb').mockRejectedValue(new Error('DB error'))

    const response = await supertest(app)
      .post('/api/v1/login')
      .send({ email: 'test@test.com', password: 'test123' })

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({ message: 'An error occurred during login' })
  })
})
