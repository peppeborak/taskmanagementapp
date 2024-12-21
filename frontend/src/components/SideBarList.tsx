import { useEffect, useState } from 'react'
import { listsFetchAllFromApi, tasksFetchAllFromApi } from '../services/api.ts'
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'
interface List {
  id: number
  name: string
  isDeleted: number
  userId: number
}

interface Task {
  id: number
  userId: number
  listId: number
  title: string
  description?: null | string
  dueDate?: null | string
  isDeleted: number
}

interface OpenedList {
  listId: number
  name: string
  tasks: Task[]
}

export const SideBarList = () => {
  const [sideBarLists, setSideBarLists] = useState([])

  useEffect(() => {
    const handleSideBarLoad = async () => {
      try {
        const data = await listsFetchAllFromApi()
        setSideBarLists(data.result)
      } catch (error) {
        console.error('Error loading sidebar', error)
        throw error
      }
    }

    handleSideBarLoad()
  }, [])

  return (
    <Box
      sx={{
        width: '20vw',
        height: '100vh',
        borderRight: '1px solid rgba(0,0,0, 0,12',
        overflowY: 'auto',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          textAlign: 'center', // Center text horizontally
          padding: 2, // Add padding around the text
        }}
      >
        <Typography variant="h5">Your lists</Typography>
      </Box>
      <Box>
        <List>
          {sideBarLists.map((list: List) => (
            <ListItem key={list.id}>{list.name}</ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}
