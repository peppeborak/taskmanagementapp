import { Request, Response } from 'express'
import { listFetchAllDb } from '../utils/db-queries'

export const listFetchAllHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user.id

    // Validate user id
    if (!userId || isNaN(userId)) {
      res.status(400).json({ message: 'User id is required' })
      return
    }

    // Query database
    const result = await listFetchAllDb(userId)

    // Respond with all lists
    res.status(200).json({ result })
    return
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}