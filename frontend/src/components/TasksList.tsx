import { Box, Divider, List, ListItem, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { selectedList } from '../pages/Dashboard'
import { fetchTasksFromApi } from '../services/api'
import { MinimizeTaskListButton } from './MinimizeTaskListButton'
import { AddTaskButton } from './AddTaskButton'
import { DeleteTaskButton } from './DeleteTaskButton'

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
  setSelectedLists: React.Dispatch<React.SetStateAction<selectedList[]>>
}

export const TasksList = ({
  selectedLists,
  setSelectedLists,
}: TasksListProps) => {
  const [allTasks, setAllTasks] = useState<Task[]>([])

  // Load all tasks on load
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
      {/* Map all selected lists */}
      {selectedLists.map((list: selectedList) => (
        <Paper
          key={list.listId}
          elevation={3}
          sx={{
            height: 350,
            width: 250,
          }}
        >
          {/* Box for title and buttons*/}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" align="left" sx={{ mt: 2, ml: 2 }}>
              {list.listName}
            </Typography>
            {/* Box for buttons */}
            <Box sx={{ display: 'flex', mt: 1 }}>
              <MinimizeTaskListButton
                selectedLists={selectedLists}
                setSelectedLists={setSelectedLists}
                listId={list.listId}
              />
              <AddTaskButton />
            </Box>
          </Box>
          <Divider sx={{mt: 1}}/>
          {/* Map all tasks in selectedList */}
          <List key={list.listId}>
            {allTasks
              .filter(
                (task) => task.listId === list.listId && task.isDeleted === 0
              )
              .map((task: Task) => (
                <Box key={task.id}
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                >
                  <ListItem key={task.id}>
                    <Typography>{task.title}</Typography>
                  </ListItem>
                    <DeleteTaskButton />
                  <Divider component="li" />
                </Box>
              ))}
          </List>
        </Paper>
      ))}
    </Box>
  )
}
