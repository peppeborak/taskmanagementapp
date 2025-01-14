import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getUserDb } from '../utils/db-queries'
import { Request, Response } from 'express'
import dotenv from 'dotenv'
import validator from 'validator'

dotenv.config()

export const loginHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body

    // Validate email
    if (!email || email.trim() == '') {
      res.status(400).json({ message: 'Email is required' })
      return
    }

    // Validate password
    if (!password || password.trim() == '') {
      res.status(400).json({ message: 'Password is required' })
      return
    }

    // Check if email is valid
    if (!validator.isEmail(email)) {
      res.status(400).json({ message: 'Invalid email format' })
      return
    }

    // Query the user from the database
    const user = await getUserDb(email)

    // Check if user exists
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' })
      return
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.passwordHash)
    if (!passwordMatch) {
      res.status(401).json({ message: 'Invalid email or password' })
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
