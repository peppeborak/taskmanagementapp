import { Request, Response } from 'express'
import { listFetchOneDb } from '../utils/db-queries'

export const listFetchOneHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const listId = +req.params.id
    const userId = req.user.id

    // Validate listId
    if (isNaN(listId) || listId <= 0) {
      res.status(400).json({ message: 'Invalid list id' })
      return
    }

    // Validate userId
    if (!userId || isNaN(userId)) {
      res.status(400).json({ message: 'User id is required' })
      return
    }

    // Query database
    const list = await listFetchOneDb(userId, listId)
    // Db returns an array

    // Check if array is empty
    if (list.length === 0) {
      res.status(404).json({ message: 'List not found' })
      return
    }

    // Respond with the list
    res.status(200).json({ list })
    return
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}
