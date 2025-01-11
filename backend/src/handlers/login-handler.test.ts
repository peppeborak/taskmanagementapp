import supertest from 'supertest'
import { app } from '../server'
import bcrypt from 'bcrypt'

jest.mock('../utils/db-queries', () => {
  return {
    getUserDb: jest
      .fn()
      .mockReturnValue({ email: 'peppe@test.com', passwordHash: 'peppe123' }),
  }
})

jest.mock('bcrypt')
const mockBcrypt = jest.mocked(bcrypt)
const hashSpy = jest
  .spyOn(mockBcrypt, 'hash')
  .mockResolvedValue('hashedpassword')
const compareSpy = jest.spyOn(mockBcrypt, 'compare').mockReturnValue(true)

describe('POST /api/v1/login', () => {
  it('Should return successful login', async () => {
    const email = 'peppe@test.com'
    const password = 'peppe123'

    const response = await supertest(app)
      .post('/api/v1/login')
      .send({ email: email, password: password })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      email: 'peppe@test.com',
      message: 'Login successful!',
      token: expect.any(String),
    })
  })

  it('Should return incorrect password', async () => {
    const email = 'peppe@test.com'
    const password = 'peppe123'

    compareSpy.mockReturnValueOnce(false)
    const response = await supertest(app)
      .post('/api/v1/login')
      .send({ email: email, password: password })


    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({ message: 'Invalid password' })
  })
})
