import { useEffect, useState } from 'react'
import { fetchListsFromApi } from '../services/api.ts'
import { Box, List, ListItem, Typography } from '@mui/material'
import { ListAddInputField } from './ListAddInputField.tsx'
export interface List {
  id: number
  name: string
  isDeleted: number
  userId: number
}

export const SideBarList = () => {
  const [sideBarLists, setSideBarLists] = useState<List[]>([])

  useEffect(() => {
    const handleSideBarLoad = async () => {
      try {
        const data = await fetchListsFromApi()
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
        flexDirection: 'column',
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
          <ListAddInputField
            setSideBarLists={setSideBarLists}
            sideBarLists={sideBarLists}
          />
          {sideBarLists.map((list: List) => (
            <ListItem key={list.id}>{list.name}</ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}
