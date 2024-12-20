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
  headers: { 'Content-Type': 'application/json' },
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

export const ListsFetchAllFromApi = async () => {
  try {
    const token = localStorage.getItem('token') // Get token from storage
    const response = await api.get('/lists', {
      // Pass URL and config
      headers: {
        Authorization: `Bearer ${token}`, // Attach token
      },
    })
    return response.data // Return the array of lists
  } catch (error) {
    console.error('Error:', error)
    throw error // Throw the error so it can be caught in useEffect
  }
}

export default api
