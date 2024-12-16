import jwt from 'jsonwebtoken'

// Middleware to check if the user is authenticated
export const authenticateToken = (req, res, next) => {
  try {
    // Get the token from user
    const token = req.header('Authorization')?.split(' ')[1]

    //  Check if token is provided
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Access denied. No token provided.' })
    }

    // Verify the token using the secret key
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token.' })
  }
}
