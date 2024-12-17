import { taskUpdateDb } from '../utils/db-queries.js'

export const taskUpdateHandler = async (req, res) => {
  try {
    const taskId = req.params.id
    const { newTaskTitle } = req.body
    const userId = req.user.id

    // Validate userId
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ message: 'User id is required' })
    }

    // Validate newTaskName
    if (!newTaskTitle || newTaskTitle.trim() === '') {
      return res.status(400).json({ message: 'Task title is required' })
    }

    // Query database
    const rowsAffected = await taskUpdateDb(newTaskTitle, userId, taskId)

    // Check if query was successful
    if (rowsAffected === 0) {
      return res
        .status(404)
        .json({ message: 'Failed to update the task' })
    }

    // Respond with the updated list name
    return res.status(200).json({
      message: 'List updated successfully',
      updatedName: newTaskTitle,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
