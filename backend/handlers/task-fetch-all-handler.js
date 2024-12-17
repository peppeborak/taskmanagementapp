import { taskFetchAllDb } from '../utils/db-queries.js'

export const taskFetchAllHandler = async (req, res) => {
  try {
    const userId = req.user.id

    // Validate user id
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ message: 'User id is required' })
    }

    // Query database
    const [result] = await taskFetchAllDb(userId)

    // Respond with all tasks
    return res.status(200).json({ result })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
