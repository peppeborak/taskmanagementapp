import { Request, Response } from 'express'
import { listFetchOneDb } from '../utils/db-queries'

export const listFetchOneHandler = async (
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

    // Query database
    const list = await listFetchOneDb(userId, listId)

    // Check if list exists
    if (!list) {
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
