import axios from 'axios'

interface LoginRequestProps {
  email: string
  password: string
}
interface LoginResponse {
  message: string
  token: string
}
interface SignupRequestProps {
  email: string
  password: string
}
interface SignupResponse {
  message: string
  result: number
}

// API URL for backend requests
const API_URL = 'http://localhost:3000/api/v1'

// Create axios instance with basic configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Auth API requests

export const signupToApi = async ({
  email,
  password,
}: SignupRequestProps): Promise<SignupResponse> => {
  try {
    const response = await api.post('/signup', {
      email: email,
      password: password,
    })
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const loginPost = async ({
  email,
  password,
}: LoginRequestProps): Promise<LoginResponse> => {
  try {
    const response = await api.post('/login', {
      email,
      password,
    })
    return response.data // Returns the data (message and token)
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// Lists API requests
export const fetchListsFromApi = async () => {
  try {
    const token = localStorage.getItem('token') // Get token from storage
    const response = await api.get('/lists', {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token
      },
    })
    return response.data // Return the array of lists
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const createListToApi = async (newListName: string) => {
  try {
    const token = localStorage.getItem('token') // Get token from storage
    const response = await api.post(
      `/lists`,
      { listName: newListName },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token
        },
      }
    )
    return response.data // Return the array of tasks
  } catch (error) {
    console.error('Error:', error)
    throw error // Throw error
  }
}

export const deleteListToApi = async (listId: number) => {
  try {
    const token = localStorage.getItem('token') // Get token from storage
    const response = await api.delete(`/lists/${listId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token
      },
    })
    return response.data // Return response
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// Tasks API request
export const fetchTasksFromApi = async () => {
  try {
    const token = localStorage.getItem('token') // Get token from storage
    const response = await api.get(`/tasks/`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token
      },
    })
    return response.data // Return the array of tasks
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const createTaskToApi = async (listId: number, newTaskTitle: string) => {
  try {
    const token = localStorage.getItem('token') // Get token from storage
    const response = await api.post(
      `/tasks`,
      {
        listId: listId,
        taskTitle: newTaskTitle,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token
        },
      }
    )
    return response.data // Return the response
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const deleteTaskToApi = async (taskId: number) => {
  try {
    const token = localStorage.getItem('token') // Get token from storage
    const response = await api.delete(`/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token
      },
    })
    return response.data // Return response
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export default api
