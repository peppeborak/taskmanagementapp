import mysql, { RowDataPacket, ResultSetHeader } from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()
import { List, User, Task, ListCreateInput, UserRowDataPacket } from '../types'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export const createUserDb = async (
  email: string,
  passwordHash: string
): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO users (email, passwordHash) VALUES (?, ?)',
    [email, passwordHash]
  )
  return result.insertId // Returns the new user ID
}

export const getUserDb = async (email: string): Promise<UserRowDataPacket> => {
  const [rows] = await pool.query<UserRowDataPacket[]>(
    'SELECT id, email, passwordHash FROM users WHERE email = ?',
    [email]
  )
  return rows[0] // Returns the user
}

export const listCreateDb = async ({
  userId,
  listName,
}: ListCreateInput): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO lists (userId, name) VALUES (?, ?)',
    [userId, listName]
  )
  return result.insertId // Returns the new list ID
}

export const listFetchAllDb = async (userId: number): Promise<List[]> => {
  const [rows] = await pool.query<List[] & RowDataPacket[]>(
    'SELECT * FROM lists WHERE userId = ?',
    [userId]
  )
  return rows // Returns all lists
}

export const listFetchOneDb = async (
  userId: number,
  listId: number
): Promise<List[]> => {
  const [rows] = await pool.query<List[] & RowDataPacket[]>(
    'SELECT * FROM lists WHERE userId = ? AND id = ?',
    [userId, listId]
  )
  return rows // Return the list
}

export const listUpdateDb = async (
  newListName: string,
  userId: number,
  listId: number
): Promise<number> => {
  const [rows] = await pool.query<ResultSetHeader>(
    `
    UPDATE lists 
    SET name = ?
    WHERE userId = ? AND id = ?`,
    [newListName, userId, listId]
  )
  return rows.affectedRows // Returns number of rows updated
}

export const listDeleteDb = async (
  userId: number,
  listId: number
): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    `
    UPDATE lists 
    SET isDeleted = 1
    WHERE userId = ? AND id = ?`,
    [userId, listId]
  )
  return result.affectedRows // Returns number of rows deleted
}

export const taskCreateDb = async (
  userId: number,
  listId: number,
  taskTitle: string,
  taskDescription: string
): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO tasks (userId, listId, title, description) VALUES (?, ?, ?, ?)',
    [userId, listId, taskTitle, taskDescription]
  )
  return result.insertId // Returns the new task ID
}

export const taskFetchAllDb = async (userId: number): Promise<Task[]> => {
  const [rows] = await pool.query<Task[] & RowDataPacket[]>(
    'SELECT * FROM tasks WHERE userId = ?',
    [userId]
  )
  return rows // Returns all tasks
}

export const taskFetchOneDb = async (
  userId: number,
  taskId: number
): Promise<Task[]> => {
  const [rows] = await pool.query<Task[] & RowDataPacket[]>(
    'SELECT * FROM tasks WHERE userId = ? AND id = ?',
    [userId, taskId]
  )
  return rows // Returns the task
}

export const taskUpdateDb = async (
  newTaskTitle: string,
  userId: number,
  taskId: number
): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    `
    UPDATE tasks 
    SET title = ?
    WHERE userId = ? AND id = ?`,
    [newTaskTitle, userId, taskId]
  )
  return result.affectedRows // Returns the number of rows updated (should be 1 or 0)
}

export const taskDeleteDb = async (
  userId: number,
  taskId: number
): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    `
    UPDATE tasks 
    SET isDeleted = 1
    WHERE userId = ? AND id = ?`,
    [userId, taskId]
  )
  return result.affectedRows // Returns the number of rows deleted
}
