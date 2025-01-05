import { Request, Response, NextFunction } from 'express'
import { TokenUser } from './utils'
import jwt from 'jsonwebtoken'

declare module 'express-serve-static-core' {
  interface Request {
    user: TokenUser
  }
}

// Middleware to check if the user is authenticated
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Get the token from user
    const token = req.header('Authorization')?.split(' ')[1]

    //  Check if token is provided
    if (!token) {
      res.status(401).json({ message: 'Access denied. No token provided.' })
      return
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenUser
    req.user = decoded
    next()
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' })
    return
  }
}
