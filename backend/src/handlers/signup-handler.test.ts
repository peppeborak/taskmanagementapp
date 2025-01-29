import supertest from 'supertest'
import { app } from '../server'
import * as dbQueries from '../utils/db-queries'

jest.mock('../utils/db-queries', () => {
  return { createUserDb: jest.fn().mockReturnValue(1) }
})

describe('POST api/v1/signup', () => {
  it('should return 201 and id', async () => {
    const response = await supertest(app)
      .post('/api/v1/signup')
      .send({ email: 'test@test.com', password: 'test123' })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      message: 'User created successfully',
      result: 1,
    })
  })
  it('should return 400 if email is missing', async () => {
    const response = await supertest(app)
      .post('/api/v1/signup')
      .send({ password: 'test123' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'Email is required' })
  })
  it('should return 400 if email is empty', async () => {
    const response = await supertest(app)
      .post('/api/v1/signup')
      .send({ email: '', password: 'test123' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'Email is required' })
  })
  it('should return 400 if email is whitespaces', async () => {
    const response = await supertest(app)
      .post('/api/v1/signup')
      .send({ email: '    ', password: 'test123' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'Email is required' })
  })
  it('should return 400 if password is missibg', async () => {
    const response = await supertest(app)
      .post('/api/v1/signup')
      .send({ email: 'test@test.com' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'Password is required' })
  })
  it('should return 400 if password is empty', async () => {
    const response = await supertest(app)
      .post('/api/v1/signup')
      .send({ email: 'test@test.com', password: '' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'Password is required' })
  })
  it('should return 400 if password is whitespaces ', async () => {
    const response = await supertest(app)
      .post('/api/v1/signup')
      .send({ email: 'test@test.com', password: '    ' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'Password is required' })
  })
  it('should return 500 if db query fails', async () => {
    jest
      .spyOn(dbQueries, 'createUserDb')
      .mockRejectedValueOnce(new Error('DB Error'))
    const response = await supertest(app)
      .post('/api/v1/signup')
      .send({ email: 'test@test.com', password: 'test123' })

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({ message: 'Internal Server Error' })
  })
})
