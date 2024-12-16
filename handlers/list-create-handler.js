import { listCreateDb } from '../utils/db-queries.js'

export const listCreateHandler = async (req, res) => {
  try {
    const { listName } = req.body
    const userId = req.user.id
    console.log(`User ID: ${userId}, List Name: ${listName}`);

    // Validate listName
    if (!listName || listName.trim() == '') {
      return res.status(400).json({ message: 'List name is required' })
    }
    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: 'User id is required' })
    }
    // Query database
    const listId = await listCreateDb(userId, listName)

    // Respond with the list
    return res.status(201).json({
      message: 'Successfully created list',
      list: { id: listId, userId, name: listName },
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
