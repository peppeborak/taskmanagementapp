import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getUserDb } from '../utils/db-queries.js'

const SECRET_KEY = 'Peppe'

export const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).send('Email and password are required')
    }

    // Fetch the user from the database
    const user = await getUserDb(email)

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password)
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
