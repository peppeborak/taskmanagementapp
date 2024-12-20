import { useEffect, useState } from 'react'
import { listsFetchAllFromApi, tasksFetchAllFromApi } from '../services/api.ts'
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
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

export const ListsCollection = () => {
  const [lists, setLists] = useState<List[]>([])
  const [openedLists, setOpenedLists] = useState<OpenedList[]>([]) // Lists that have been clicked

  useEffect(() => {
    const loadLists = async () => {
      try {
        const data = await listsFetchAllFromApi()
        setLists(data.result)
      } catch (error) {
        console.error('Could not load lists', error)
      }
    }
    loadLists()
  }, [])

  const handleListClick = async (listId: number, name: string) => {
    const listAlreadyOpened = openedLists.find(
      (openedList) => openedList.listId === listId
    ) // Check if list is already opened
    if (listAlreadyOpened) return // Do nothing
    try {
      const data = await tasksFetchAllFromApi(listId)
      const newList: OpenedList = {
        listId,
        name,
        tasks: data.result,
      }
      setOpenedLists((prev) => [...prev, newList])
    } catch (error) {
      console.error('Could not retrieve tasks', error)
    }
  }

  return (
    <Box>
      <Typography variant="h5">My Lists</Typography>
      <List>
        {lists.map((list) => (
          <ListItem
            key={list.id}
            onClick={() => handleListClick(list.id, list.name)}
          >
            <ListItemText>{list.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
