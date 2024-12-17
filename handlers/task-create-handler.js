import { taskCreateDb } from '../utils/db-queries.js'

export const taskCreateHandler = async (req, res) => {
  try {
    const { listId, taskTitle, taskDescription } = req.body
    const userId = req.user.id
    console.log(`User ID: ${userId}, Task Name: ${taskTitle}`)

    // Validate taskName
    if (!taskTitle || taskTitle.trim() == '') {
      return res.status(400).json({ message: 'Task name is required' })
    }
    // Validate userId
    if (!userId || isNaN(listId)) {
      return res.status(400).json({ message: 'User id is required' })
    }
    // Query database
    const taskId = await taskCreateDb(userId, listId, taskTitle, taskDescription)

    // Respond with the task id and task name
    return res.status(201).json({
      message: 'Successfully created task',
      task: { taskId: taskId, name: taskTitle },
    })  
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
