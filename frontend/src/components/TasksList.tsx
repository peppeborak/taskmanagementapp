import {
  Box,
  List,
  ListItem,
  Paper,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { selectedList } from '../pages/Dashboard'
import { fetchTasksFromApi } from '../services/api'

interface Task {
  id: number
  userId: number
  listId: number
  title: string
  description?: null | string
  dueDate?: null | string
  isDeleted: number
}
interface TasksListProps {
  selectedLists: selectedList[]
}

export const TasksList = ({ selectedLists }: TasksListProps) => {
  const [allTasks, setAllTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const result = await fetchTasksFromApi()
        setAllTasks(result.result)
      } catch (error) {
        console.error('Error loading tasks', error)
      }
    }
    fetchAllTasks()
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap', // Allow items to wrap to the next row
        gap: 2,
        justifyContent: 'flex-start',
      }}
    >
      {selectedLists.map((list: selectedList) => (
        <Paper
          key={list.listId}
          elevation={3}
          sx={{
            height: 350,
            width: 250,
          }}
        >
          <Typography variant="h6" align="center">
            {list.listName}
          </Typography>
          <List key={list.listId}>
            {allTasks
              .filter((task) => task.listId === list.listId)
              .map((task: Task) => (
                <ListItem key={task.id}>
                  <Typography>{task.title}</Typography>
                </ListItem>
              ))}
          </List>
        </Paper>
      ))}
    </Box>
  )
}
