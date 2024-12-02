import bcrypt from 'bcrypt'
import { createUserDb } from '../utils/db-queries.js'

export const signupHandler = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).send('Email and password are required')
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Store the user in the database
    const result = await createUserDb(email, hashedPassword)

    // Send response
    return res
      .status(201)
      .send({ message: 'User created successfully', result })
  } catch (err) {
    console.error(err)
    return res.status(500).send('Internal Server Error')
  }
}
