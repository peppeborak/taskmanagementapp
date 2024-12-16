import { listDeleteDb, listFetchOneDb } from '../utils/db-queries.js'

export const listDeleteHandler = async (req, res) => {
  try {
    const listId = req.params.id
    const userId = req.user.id

    // Validate userId
    if (!listId || isNaN(listId)) {
      return res.status(400).json({ message: 'User id is required' })
    }
    // Fetch the list
    const list = await listFetchOneDb(userId, listId)

    // Validate list
    if (!list) {
      return res.status(400).json({ message: 'List does not exist' })
    }

    // Query database
    const rowsDeleted = await listDeleteDb(userId, listId)

    // Check if query failed
    if (rowsDeleted === 0) {
      return res.status(400).json({ message: 'Failed to delete the list.' })
    }

    // Respond with
    return res.status(200).json({ message: 'Successfully deleted list' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
