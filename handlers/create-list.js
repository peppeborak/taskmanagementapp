import { createListDb } from '../utils/db-queries.js'

export const createListHandler = async (req, res) => {
  try {
    const { userId, listName } = req.body

    // Validate input
    if (!listName || listName == '') {
      return res.status(400).send('List name is required')
    }

    if (!userId) {
      return res.status(400).send('User id is required')
    }

    await createListDb(userId, listName)

    return res.status(201).send('Successfully created List')
  } catch (err) {
    console.error(err)
    return res.status(500).send('Internal Server Error')
  }
}
