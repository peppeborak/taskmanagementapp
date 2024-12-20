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
    // Make api call
    const response = await api.post('/login', {
      email,
      password,
    })

    return response.data // Returns the data (message and token)
  } catch (error: any) {
    console.error('Error:', error)
    throw error // Throw error
  }
}

export default api
