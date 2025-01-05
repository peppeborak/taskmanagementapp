import { Request, Response } from 'express'
import { listCreateDb } from '../utils/db-queries'


export const listCreateHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { listName } = req.body

    // Ensure req.user is defined
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const userId = req.user.id

    // Validate listName
    if (!listName || listName.trim() == '') {
      res.status(400).json({ message: 'List name is required' })
      return
    }

    // Validate userId
    if (!userId || isNaN(userId)) {
      res.status(400).json({ message: 'User id is required' })
      return
    }

    // Query database
    const listId = await listCreateDb({ userId, listName })

    // Respond with the list
     res.status(201).json({
      message: 'Successfully created list',
      list: { id: listId, userId: userId, name: listName },
    })
    return 
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error' })
    return 
  }
}
