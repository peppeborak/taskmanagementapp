import { Request, Response } from 'express'
import { listDeleteDb, listFetchOneDb } from '../utils/db-queries'

export const listDeleteHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const listId = +req.params.id
    const userId = req.user.id

    // Validate userId
    if (!userId || isNaN(userId)) {
      res.status(400).json({ message: 'User id is required' })
      return
    }
    // Fetch the list
    const list = await listFetchOneDb(userId, listId)

    // Validate list
    if (!list) {
      res.status(400).json({ message: 'List does not exist' })
      return
    }

    // Query database
    const rowsDeleted = await listDeleteDb(userId, listId)

    // Check if query failed
    if (rowsDeleted === 0) {
      res.status(400).json({ message: 'Failed to delete list' })
      return
    }

    // Respond with a success message
    res.status(200).json({ message: 'Successfully deleted list' })
    return
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}
