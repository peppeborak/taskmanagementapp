import { listFetchOneDb } from '../utils/db-queries.js'

export const listFetchOneHandler = async (req, res) => {
  try {
    const listId = req.params.id
    const userId = req.user.id

    // Validate userId
    if (!listId || isNaN(listId)) {
      return res.status(400).json({ message: 'User id is required'})
    }

    // Query database
    const list = await listFetchOneDb(userId, listId)

    // Check if list exists
    if (!list) {
      return res.status(404).json({ message: 'List not found' })
    }

    // Respond with the list
    return res.status(200).json({ list })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
