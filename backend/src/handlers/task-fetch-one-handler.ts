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

    // Validate taskId
    if (isNaN(taskId) || taskId <= 0) {
      res.status(400).json({ message: 'Invalid task id' })
      return
    }

    // Query database
    const task = await taskFetchOneDb(userId, taskId)

    // Check if task exists (if array is empty)
    if (task.length === 0) {
      res.status(404).json({ message: 'Task not found' })
      return
    }

    // Respond with the task
    res.status(200).json({ task })
    return
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}
