import { taskFetchOneDb } from '../utils/db-queries.js'

export const taskFetchOneHandler = async (req, res) => {
  try {
    const taskId = req.params.id
    const userId = req.user.id

    // Validate userId
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ message: 'User id is required'})
    }

    // Query database
    const task = await taskFetchOneDb(userId, taskId)

    // Check if list exists
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    // Respond with the list
    return res.status(200).json({ task })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
