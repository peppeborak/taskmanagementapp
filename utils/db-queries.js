import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'kalle123',
  database: 'task_management_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export const createUserDb = async (email, passwordHash) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO users (email, passwordHash) VALUES (?, ?)',
      [email, passwordHash]
    )
    return result // Contains metadata about the query (e.g., insertId)
  } catch (err) {
    throw err
  }
}

export const getUserDb = async (email) => {
  const [rows] = await pool.query(
    'SELECT id, email, passwordHash FROM users WHERE email = ?',
    [email]
  )
  return rows[0] // Return the first matching user
}
