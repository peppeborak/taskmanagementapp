import { listFetchAllDb } from '../utils/db-queries.js'

export const listFetchAllHandler = async (req, res) => {
  try {
    const userId = req.user.id

    // Validate
    if (!listId || isNaN(listId)) {
      return res.status(400).json({ message: 'User id is required' })
    }

    // Query database
    const [result] = await listFetchAllDb(userId)

    // Respond with all lists
    return res.status(200).json({ result })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
