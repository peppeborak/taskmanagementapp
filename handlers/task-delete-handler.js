import { taskDeleteDb } from '../utils/db-queries.js'

export const taskDeleteHandler = async (req, res) => {
  try {
    const taskId = req.params.id
    const userId = req.user.id

    // Validate userId
    if (!userId || isNaN(userId)) {
      res.send(400).json({ message: 'Task id is required' })
    }

    // Validate taskId
    if (!taskId || isNaN(taskId)) {
      res.send(400).json({ message: 'Task id is required' })
    }

    // Query database
    const rowsdeleted = taskDeleteDb(userId, taskId)
    // Check if query was successful
    if (rowsdeleted === 0) {
      res.send(400).json({ message: 'Failed to delete task' })
    }

    // Respond with a success message
    res.status(200).json({ message: 'Successfully deleted task' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
