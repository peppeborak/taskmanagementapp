import { RowDataPacket } from "mysql2"
// Auth types

export type TokenUser = {
  email: string
  id: number
}

export type LoginUser = {
    email: string
    id: number
    password: number
}

// Db types

export type UserRowDataPacket = RowDataPacket & {
  id: number;
  email: string;
  passwordHash: string;
}


export type ListCreateInput = {
  userId: number
  listName: string
}
export interface User {
  email: string
  passwordHash: string
  id: number
}

export interface List {
  listId: number
  listName: string
  isDeleted: number
  userId: number
}

export interface Task {
  taskId: number
  userId: number
  listId: number
  taskTitle: string
  newTaskTitle: string
  taskDescription: string | null
  dueDate: string | null
  isDeleted: boolean
  isCompleted: boolean
}
