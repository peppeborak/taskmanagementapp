import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export const createUserDb = async (email, passwordHash) => {
  const [result] = await pool.query(
    'INSERT INTO users (email, passwordHash) VALUES (?, ?)',
    [email, passwordHash]
  )
  return result // Returns ?
}

export const getUserDb = async (email) => {
  const [rows] = await pool.query(
    'SELECT id, email, passwordHash FROM users WHERE email = ?',
    [email]
  )
  return rows[0] // Returns user
}

export const listCreateDb = async (userId, listName) => {
  const [list] = await pool.query(
    'INSERT INTO lists (userId, name) VALUES (?, ?)',
    [userId, listName]
  )
  return list.insertId // Returns the id of the new list
}

export const listFetchAllDb = async (userId) => {
  const [lists] = await pool.query('SELECT * FROM lists WHERE userId = ?', [
    userId,
  ])
  return [lists] // Returns an array with all the lists
}

export const listFetchOneDb = async (userId, listId) => {
  const [list] = await pool.query(
    'SELECT * FROM lists WHERE userId = ? AND id = ?',
    [userId, listId]
  )
  return list[0] // Returns the first object in the array
}

export const listUpdateDb = async (newListName, userId, listId) => {
  const [list] = await pool.query(
    `
    UPDATE lists 
    SET name = ?
    WHERE userId = ? AND id = ?`,
    [newListName, userId, listId]
  )
  return list.affectedRows // Returns the number of rows updated (should be 1 or 0)
}

export const listDeleteDb = async (userId, listId) => {
  const [list] = await pool.query(
    'DELETE FROM lists WHERE userId = ? AND id = ?',
    [userId, listId]
  )
  return list.affectedRows // Returns the number of rows deleted
}

export const taskCreateDb = async (
  userId,
  listId,
  taskTitle,
  taskDescription
) => {
  const [task] = await pool.query(
    'INSERT INTO tasks (userId, listId, title, description) VALUES (?, ?, ?, ?)',
    [userId, listId, taskTitle, taskDescription]
  )
  return task.insertId // Returns the id of the new task
}

export const taskFetchAllDb = async (userId) => {
  const [tasks] = await pool.query('SELECT * FROM tasks WHERE userId = ?', [
    userId,
  ])
  return [tasks] // Returns an array with all the tasks
}

export const taskFetchOneDb = async (userId, taskId) => {
  const [task] = await pool.query(
    'SELECT * FROM tasks WHERE userId = ? AND id = ?',
    [userId, taskId]
  )
  return task[0] // Returns the first object in the array
}

export const taskUpdateDb = async (newTaskTitle, userId, taskId) => {
  const [task] = await pool.query(
    `
    UPDATE tasks 
    SET title = ?
    WHERE userId = ? AND id = ?`,
    [newTaskTitle, userId, taskId]
  )
  return task.affectedRows // Returns the number of rows updated (should be 1 or 0)
}

export const taskDeleteDb = async (userId, taskId) => {
  const [task] = await pool.query(
    `
    UPDATE tasks 
    SET isDeleted = 1
    WHERE userId = ? AND id = ?`,
    [userId, taskId]
  )
  return task.affectedRows // Returns the number of rows deleted
}
