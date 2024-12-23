import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'
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
    <>
      {selectedLists.map((list: selectedList) => (
        <Box
        key={list.listId}
          sx={{
            padding: 2,
            border: '1px solid black',
            marginBottom: 2,
            height: [250, 300],
            width: [150, 200],
          }}
        >
            <Typography variant='h6' align='center' >{list.listName}</Typography>
            <List key={list.listId}>
              {allTasks
                .filter((task) => task.listId === list.listId)
                .map((task: Task) => (
                  <ListItem key={task.id}>
                    <Typography>{task.title}</Typography>
                  </ListItem>
                ))}
            </List>
          </Box>
      ))}
    </>
  )
}

/*          {selectedLists.map((list: selectedList) => (
      <List key={list.listId} sx={{ marginBottom: 2 }}>
        <ListItem>
        <ListItemText primary={list.listName} />
        </ListItem>
      </List>
    ))}
      */
