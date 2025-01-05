import { Request, Response } from 'express'
import { taskFetchOneDb } from '../utils/db-queries'

export const taskFetchOneHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskId = +req.params.id
    const userId = req.user.id

    // Validate userId
    if (!userId || isNaN(userId)) {
      res.status(400).json({ message: 'User id is required' })
      return
    }

    // Query database
    const task = await taskFetchOneDb(userId, taskId)

    // Check if list exists
    if (!task) {
      res.status(404).json({ message: 'Task not found' })
      return
    }

    // Respond with the list
    res.status(200).json({ task })
    return
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}