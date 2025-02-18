import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { createUserDb } from '../utils/db-queries'

export const signupHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body

    // Validate email
    if (!email || email.trim() === '') {
      res.status(400).json({ message: 'Email is required' })
      return
    }
    // Validate password
    if (!password || password.trim() === '') {
      res.status(400).json({ message: 'Password is required' })
      return
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Store the user in the database
    const result = await createUserDb(email, hashedPassword)

    // Send the result
    res.status(201).json({ message: 'User created successfully', result })
    return
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}
