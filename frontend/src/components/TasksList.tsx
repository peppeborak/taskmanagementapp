import {
  Box,
  List,
  Paper,
  Typography,
  Checkbox,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { selectedList } from '../pages/Dashboard'
import { fetchTasksFromApi } from '../services/api'
import { MinimizeTaskListButton } from './MinimizeTaskListButton'
import { AddTaskButton } from './AddTaskButton'
import { DeleteTaskButton } from './DeleteTaskButton'
import { AddTaskInputField } from './AddTaskInputField'

export interface Task {
  id: number
  userId: number
  listId: number
  title: string
  description?: null | string
  dueDate?: null | string
  isDeleted: number
  isCompleted: boolean
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
  const [activeTextFieldListId, setActiveTextFieldListId] = useState<
    number | null
  >(null)
  const [newTaskTitle, setNewTaskTitle] = useState<string>('')

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

  // Handle InputFieldvisible
  const showTaskInputForList = (listId: number) => {
    setActiveTextFieldListId(listId)
  }

  // Handle CheckBox toggle
  const handleToggleCheckBox = (taskId: number) => {
    // Map all tasks, find correct task, open it and edit isCompleted. All other task is same
    const newAllTasksList = allTasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    )
    setAllTasks(newAllTasksList)
  }

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
            overflowY: 'auto',
          }}
        >
          {/* Top Box for title and buttons*/}
          <Box
            sx={{
              borderBottom: '1px solid rgba(0,0,0,0.12)',
            }}
            padding={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* Box for List name */}
            <Box>
              <Typography variant="h6">{list.listName}</Typography>
            </Box>
            {/* Box for buttons */}
            <Box>
              <MinimizeTaskListButton
                selectedLists={selectedLists}
                setSelectedLists={setSelectedLists}
                listId={list.listId}
              />
              <AddTaskButton
                listId={list.listId}
                showTaskInputForList={showTaskInputForList}
              />
            </Box>
          </Box>
          {/* Tasks Section */}
          <List key={list.listId}>
            {/* Add Task input field */}
            {activeTextFieldListId === list.listId && (
              <AddTaskInputField
                listId={list.listId}
                allTasks={allTasks}
                setAllTasks={setAllTasks}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
                setActiveTextFieldListId={setActiveTextFieldListId}
              />
            )}
            {/* Map all tasks with listId */}
            {allTasks
              .filter(
                (task) => task.listId === list.listId && task.isDeleted === 0
              )
              .map((task: Task) => (
                <Box
                  key={task.id}
                  className="hover-box"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    padding: 1,
                    marginBottom: 1,
                    borderRadius: 1,
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Checkbox
                      size="small"
                      checked={!!task.isCompleted}
                      onClick={() => handleToggleCheckBox(task.id)}
                    />
                    {/* Task Title */}
                    <Typography>{task.title}</Typography>
                  </Box>
                  {/* Delete Task Button */}
                  <Box>
                    <DeleteTaskButton
                      taskId={task.id}
                      allTasks={allTasks}
                      setAllTasks={setAllTasks}
                    />
                  </Box>
                </Box>
              ))}
          </List>
        </Paper>
      ))}
    </Box>
  )
}
