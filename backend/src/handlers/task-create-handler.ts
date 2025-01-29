import { Request, Response } from 'express'
import { taskCreateDb } from '../utils/db-queries'

export const taskCreateHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { listId, taskTitle, taskDescription } = req.body
    const userId = req.user.id

    // Validate taskTitle
    if (!taskTitle || taskTitle.trim() == '') {
      res.status(400).json({ message: 'Task title is required' })
      return
    }
    // Validate userId
    if (!userId || isNaN(listId)) {
      res.status(400).json({ message: 'User id is required' })
      return
    }
    // Query database
    const response = await taskCreateDb(
      userId,
      listId,
      taskTitle,
      taskDescription
    )

    // Respond with the task id and task name
    res.status(201).json({
      message: 'Successfully created task',
      task: { userId: userId, taskId: response, name: taskTitle },
    })
    return
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}
