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
  const [result] = await pool.query(
    'INSERT INTO users (email, passwordHash) VALUES (?, ?)',
    [email, passwordHash]
  )
  return result
}

export const getUserDb = async (email) => {
  const [rows] = await pool.query(
    'SELECT id, email, passwordHash FROM users WHERE email = ?',
    [email]
  )
  return rows[0]
}

export const listCreateDb = async (userId, listName) => {
  const [list] = await pool.query(
    'INSERT INTO lists (userId, name) VALUES (?, ?)',
    [userId, listName]
  )
  console.log(list)
  return list.insertId // Returns the id of the new list
}

export const listFetchAllDb = async (userId) => {
  const [lists] = await pool.query('SELECT * FROM lists WHERE userId = ?', [
    userId,
  ])
  return [lists] // Returns an array with all the lists
}

export const listFetchOneDb = async (userId, listId) => {
  const [rows] = await pool.query(
    'SELECT * FROM lists WHERE userId = ? AND id = ?',
    [userId, listId]
  )
  return rows[0] // Returns the first object in the array
}

export const listDeleteDb = async (userId, listId) => {
  const [list] = await pool.query(
    'DELETE FROM lists WHERE userId = ? AND id = ?',
    [userId, listId]
  )
  return list.affectedRows // Returns the number of rows deleted
}

export const listUpdateDb = async (newListName, userId, listId) => {
  const [list] = await pool.query(
    `
    UPDATE lists 
    SET name = ?
    WHERE userId = ? AND id = ?`,
    [newListName, userId, listId]
  )
  return list.affectedRows // Returns the number of rows updated
}
