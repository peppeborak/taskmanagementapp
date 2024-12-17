import bcrypt from 'bcrypt'
import { createUserDb } from '../utils/db-queries.js'

export const signupHandler = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).send('Email and password is required')
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Store the user in the database
    const result = await createUserDb(email, hashedPassword)

    // Send the result
    return res
      .status(201)
      .json({ message: 'User created successfully', result })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
