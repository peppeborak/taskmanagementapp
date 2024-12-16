import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getUserDb } from '../utils/db-queries.js'
import dotenv from 'dotenv'
dotenv.config()

const SECRET_KEY = process.env.JWT_SECRET

export const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate email and password
    if (!email || !password) {
      return res.status(400).send('Email and password are required')
    }

    // Query the user from the database
    const user = await getUserDb(email)

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.passwordHash)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: '1h',
    })

    // Respond with the token
    return res.status(200).json({ message: 'Login successful!', token })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'An error occurred during login.' })
  }
}
