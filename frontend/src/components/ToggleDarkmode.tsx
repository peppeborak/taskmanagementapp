import { Button } from '@mui/material'
import { useState } from 'react'

const [isDarkMode, setIsDarkMode] = useState(false) // State to toggle themes

export const ToggleDarkmode = () => {
  return (
    <Button onClick={() => setIsDarkMode(!isDarkMode)}>Toggle Dark Mode</Button>
  )
}
