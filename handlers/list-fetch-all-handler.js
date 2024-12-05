import { listFetchAllDb } from '../utils/db-queries.js'

export const listFetchAllHandler = async (req, res) => {
  try {
    const { userId } = req.body

    // Validate
    if (!userId) {
      return res.status(400).send('User id is required')
    }

    // Query database
    const [result] = await listFetchAllDb(userId)

    return res.status(200).send(result)
  } catch (err) {
    console.error(err)
    return res.status(500).send('Internal Server Error')
  }
}
