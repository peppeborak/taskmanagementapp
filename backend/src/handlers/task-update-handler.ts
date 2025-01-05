import { Request, Response } from 'express'
import { taskUpdateDb } from '../utils/db-queries'

export const taskUpdateHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskId = +req.params.id
    const { newTaskTitle } = req.body
    const userId = req.user.id

    // Validate userId
    if (!userId || isNaN(userId)) {
      res.status(400).json({ message: 'User id is required' })
      return
    }

    // Validate newTaskName
    if (!newTaskTitle || newTaskTitle.trim() === '') {
      res.status(400).json({ message: 'Task title is required' })
      return
    }

    // Query database
    const rowsAffected = await taskUpdateDb(newTaskTitle, userId, taskId)

    // Check if query was successful
    if (rowsAffected === 0) {
      res.status(404).json({ message: 'Failed to update the task' })
      return
    }

    // Respond with the updated list name
    res.status(200).json({
      message: 'List updated successfully',
      updatedName: newTaskTitle,
    })
    return
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}
