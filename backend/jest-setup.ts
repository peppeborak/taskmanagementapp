import { NextFunction, Request, Response } from 'express'
import { TokenUser } from './src/types'

jest.mock('./src/middlewares/authenticate-token', () => ({
  authenticateToken: (req: Request, res: Response, next: NextFunction) => {
    req.user = { id: 1, email: 'peppe@test.com' } as TokenUser
    next()
  }
}))
