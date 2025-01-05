import { Request, Response } from 'express'
import { listUpdateDb } from '../utils/db-queries'

export const listUpdateHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const listId = +req.params.id
    const { newListName } = req.body
    const userId = req.user.id

    // Validate listId
    if (!listId || isNaN(listId)) {
      res.status(400).json({ message: 'List id is required' })
      return
    }

    // Validate newListName
    if (!newListName || newListName.trim() === '') {
      res.status(400).json({ message: 'List name is required' })
      return
    }

    // Validate userId
    if (!userId || isNaN(userId)) {
      res.status(400).json({ message: 'User id is required' })
      return
    }

    // Query database
    const rowsAffected = await listUpdateDb(newListName, userId, listId)

    // Check if query was successful
    if (rowsAffected === 0) {
      res.status(404).json({ message: 'Failed to update list' })
      return
    }

    // Respond with the updated list name
    res.status(200).json({
      message: 'List updated successfully',
      updatedName: newListName,
    })
    return
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}
