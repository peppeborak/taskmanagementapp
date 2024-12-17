import { listUpdateDb, listFetchOneDb } from '../utils/db-queries.js'

export const listUpdateHandler = async (req, res) => {
  try {
    const listId = req.params.id
    const { listName } = req.body
    const userId = req.user.id

    // Validate list
    if (!listName || listName.trim() === '') {
      return res.status(400).json({ message: 'List name is required' })
    }

    // Validate listName
    if (!listId || isNaN(listId)) {
      return res.status(400).json({ message: 'List id is required' })
    }

    // Validate userId
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ message: 'User id is required' }  )
    }

    // Fetch the list
    const list = await listFetchOneDb(userId, listId)

    // Check if list exists
    if (!list) {
      return res.status(400).json({ message: 'List does not exist' })
    }

    // Query database
    const rowsAffected = await listUpdateDb(listName, userId, listId)

    // Check if query was successful
    if (rowsAffected === 0) {
      return res
        .status(404)
        .json({ message: 'List not found or not authorized' })
    }

    // Respond with the updated list name
    return res.status(200).json({
      message: 'List updated successfully',
      updatedName: listName,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
