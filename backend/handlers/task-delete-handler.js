import { taskDeleteDb } from '../utils/db-queries.js'

export const taskDeleteHandler = async (req, res) => {
  try {
    const taskId = req.params.id
    const userId = req.user.id

    // Validate userId
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ message: 'Task id is required' })
    }

    // Validate taskId
    if (!taskId || isNaN(taskId)) {
      return res.status(400).json({ message: 'Task id is required' })
    }

    // Query database
    const rowsDeleted = await taskDeleteDb(userId, taskId)
    // Check if query was successful
    if (rowsDeleted === 0) {
      return res.status(400).json({ message: 'Failed to delete task' })
    }

    // Respond with a success message
    return res.status(200).json({ message: 'Successfully deleted task' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
