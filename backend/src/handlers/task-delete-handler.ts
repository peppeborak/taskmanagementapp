import { Request, Response } from 'express'
import { taskDeleteDb } from '../utils/db-queries'

export const taskDeleteHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskId = +req.params.id
    const userId = req.user.id

    // Validate userId
    if (!userId || isNaN(userId)) {
      res.status(400).json({ message: 'Task id is required' })
      return
    }

    // Validate taskId
    if (!taskId || taskId <= 0) {
      res.status(400).json({ message: 'Invalid task id' })
      return
    }

    // Query database
    const rowsDeleted = await taskDeleteDb(userId, taskId)
    // Check if query was successful
    if (rowsDeleted === 0) {
      res.status(404).json({ message: 'Task does not exist' })
      return
    }

    // Respond with a success message
    res.status(200).json({ message: 'Successfully deleted task' })
    return
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}
