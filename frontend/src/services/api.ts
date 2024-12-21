import axios from 'axios'

interface LoginRequestProps {
  email: string
  password: string
}
interface LoginResponse {
  message: string
  token: string
}

const API_URL = 'http://localhost:3000/api/v1' // API URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

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
    throw error // Throw error
  }
}

export const fetchListsFromApi = async () => {
  try {
    const token = localStorage.getItem('token') // Get token from storage
    const response = await api.get('/lists', {
      // Pass URL and config
      headers: {
        Authorization: `Bearer ${token}`, // Attach token
      },
    })
    console.log(response.data)
    return response.data // Return the array of lists
  } catch (error) {
    console.error('Error:', error)
    throw error // Throw the error so it can be caught in useEffect
  }
}

export const fetchTasksFromApi = async (listId: number) => {
  try {
    const token = localStorage.getItem('token') // Get token from storage
    const response = await api.get(`/lists/${listId}`, {
      // Pass URL and config
      headers: {
        Authorization: `Bearer ${token}`, // Attach token
      },
    })
    return response.data // Return the array of tasks
  } catch (error) {
    console.error('Error:', error)
    throw error // Throw error
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
    throw error // Throw error
  }
}

export default api
