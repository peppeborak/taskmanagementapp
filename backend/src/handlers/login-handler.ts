import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getUserDb } from '../utils/db-queries'
import { Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

export const loginHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body

    // Validate email and password
    if (!email || !password) {
      res.status(400).send('Email and password are required')
      return
    }

    // Query the user from the database
    const user = await getUserDb(email)

    // Check if user exists
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.passwordHash)
    if (!passwordMatch) {
      res.status(401).json({ message: 'Invalid password' })
      return
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      }
    )

    // Respond with the token
    res
      .status(200)
      .json({ message: 'Login successful!', email: user.email, token })
    return
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'An error occurred during login' })
    return
  }
}
