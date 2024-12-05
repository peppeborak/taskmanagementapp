import { listCreateDb } from '../utils/db-queries.js'

export const listCreateHandler = async (req, res) => {
  try {
    const { userId, listName } = req.body

    // Validate input
    if (!listName || listName.trim() == '') {
      return res.status(400).send('List name is required')
    }

    if (!userId) {
      return res.status(400).send('User id is required')
    }

    await listCreateDb(userId, listName)

    return res.status(201).send('Successfully created List')
  } catch (err) {
    console.error(err)
    return res.status(500).send('Internal Server Error')
  }
}
