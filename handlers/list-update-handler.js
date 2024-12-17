import { listUpdateDb } from '../utils/db-queries.js'

export const listUpdateHandler = async (req, res) => {
  try {
    const listId = req.params.id
    const { newListName } = req.body
    const userId = req.user.id

    // Validate listId
    if (!listId || isNaN(listId)) {
      return res.status(400).json({ message: 'List id is required' })
    }

    // Validate newListName
    if (!newListName || newListName.trim() === '') {
      return res.status(400).json({ message: 'List name is required' })
    }

    // Validate userId
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ message: 'User id is required' })
    }

    // Query database
    const rowsAffected = await listUpdateDb(newListName, userId, listId)

    // Check if query was successful
    if (rowsAffected === 0) {
      return res
        .status(404)
        .json({ message: 'List not found or not authorized' })
    }

    // Respond with the updated list name
    return res.status(200).json({
      message: 'List updated successfully',
      updatedName: newListName,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
